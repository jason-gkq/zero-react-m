import { createActions, handleActions } from "redux-actions";
import { takeEvery, takeLatest } from "redux-saga/effects";
import { createSelector } from "reselect";

import {
  injectAsyncReducer,
  removeAsyncReducer,
  sagaMiddleware,
  globalActions,
} from "./configureStore";

export const isObject = (obj) =>
  Object.prototype.toString.call(obj) === "[object Object]";

export const toUpperCaseStyle = (map) =>
  Object.entries(map).reduce((result, [key, val]) => {
    key = key.replace(/([A-Z])/g, "_$1").toUpperCase();
    if (isObject(val)) {
      val = toUpperCaseStyle(val);
    }
    result[key] = val;
    return result;
  }, {});

export const createActionsFromMap = (map, prefix = "") => {
  map = toUpperCaseStyle({
    initState: void 0,
    setState: void 0,
    ...map,
  });
  return createActions(map, { prefix });
};

// From: https://github.com/redux-utilities/redux-actions/blob/master/src/utils/flattenWhenNode.js
export const flatten = (
  map,
  partialFlatMap = {},
  partialFlatActionType = ""
) => {
  const connectNamespace = (type) =>
    partialFlatActionType ? `${partialFlatActionType}.${type}` : type;

  Object.keys(map).forEach((type) => {
    const nextNamespace = connectNamespace(type);
    const mapValue = map[type];

    if (isObject(mapValue)) {
      flatten(mapValue, partialFlatMap, nextNamespace);
    } else {
      partialFlatMap[nextNamespace] = mapValue;
    }
  });

  return partialFlatMap;
};

export const createReducerFromMap = (map, actions, initialState) => {
  map = flatten({
    initState() {
      return initialState;
    },
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    ...map,
  });
  map = Object.entries(map).reduce((result, [key, val]) => {
    const creator = key
      .split(".")
      .reduce((actions, propKey) => actions[propKey], actions);
    if (!creator) {
      throw Error(`undefined action creator: ${key}`);
    }
    result[creator.toString()] = val;
    return result;
  }, {});

  return handleActions(map, initialState);
};

const toLocalSelectors = (selectors, getState) =>
  Object.entries(selectors).reduce(
    (result, [key, selector]) => {
      result[key] = createSelector(getState, selector);
      return result;
    },
    {
      getState,
    }
  );

const createSagaFromMap = (map, actions, selectors) => {
  map = flatten(map);
  map = Object.entries(map).map(([key, val]) => {
    let shouldTakeEvery = false;
    const actionType = key
      .split(".")
      .reduce((actions, propKey) => {
        if (propKey.startsWith("$")) {
          shouldTakeEvery = true;
          propKey = propKey.slice(1);
        }
        return actions[propKey];
      }, actions)
      .toString();
    return [actionType, val, shouldTakeEvery];
  });
  return function* () {
    for (let i = 0, len = map.length; i < len; i++) {
      const item = map[i];
      if (item[2]) {
        yield takeEvery(item[0], item[1], {
          $actions: actions,
          $selectors: selectors,
          $globalActions: globalActions,
        });
      } else {
        yield takeLatest(item[0], item[1], {
          $actions: actions,
          $selectors: selectors,
          $globalActions: globalActions,
        });
      }
    }
  };
};

// 填补actionMap
const fillActionMap = (actionMap, map) => {
  Object.keys(map).forEach((key) => {
    if (isObject(map[key])) {
      if (!actionMap[key]) {
        actionMap[key] = {};
      }
      fillActionMap(actionMap[key], map[key]);
    }
    if (!actionMap[key]) {
      actionMap[key] = void 0;
    }
  });
};

export default function createDucks({
  name,
  state = {},
  initialize = false,
  cache = true,
  actions: actionMap = {},
  reducers: reducerMap = {},
  sagas: sagaMap = {},
  selectors = {},
}) {
  fillActionMap(actionMap, reducerMap);
  fillActionMap(actionMap, sagaMap);

  const sliceAction = createActionsFromMap(actionMap, name);
  const sliceSelector = toLocalSelectors(selectors, (state) => state[name]);
  let sliceReducer = createReducerFromMap(
    reducerMap,
    sliceAction,
    state,
    // Object.assign({ pageStatus: "success" }, state),
    name
  );
  const sliceSaga = createSagaFromMap(sagaMap, sliceAction, sliceSelector);

  injectAsyncReducer(name, sliceReducer);

  return {
    name,
    initialize,
    cache,
    selectors: sliceSelector,
    actions: sliceAction,
    reducers: sliceReducer,
    removeReducer() {
      removeAsyncReducer(name);
      // if (__DEV__) {
      // 	console.log(`reducer of ${name} has been removed`);
      // }
    },
    runSaga() {
      if (this._sagaTask) {
        return;
      }
      this._sagaTask = sagaMiddleware.run(sliceSaga);
    },
    cancelSaga() {
      if (!this._sagaTask) {
        return;
      }
      this._sagaTask.cancel();
      this._sagaTask = null;
      // if (__DEV__) {
      console.log(`saga of ${name} has been canceled`);
      // }
    },
  };
}
