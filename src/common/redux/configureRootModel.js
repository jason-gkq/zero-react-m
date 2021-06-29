import {
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { createActions, handleActions } from "redux-actions";

import appModel from "@src/app.model";
import { guid } from "@common/utils/util";

const staticActions = { INIT_STATE: void 0, SET_STATE: void 0 };

const rootModel = {
  // 初始state状态
  state: {
    isNeedPermission: false /** 是否需要菜单-路由权限控制，根据页面路由判断是否具有权限；优先取页面路由中配置，若无配置，则取全局app中配置 */,
    isNeedLogin: false /** 是否需要所有页面强制登录；优先取页面路由中配置，若无配置，则取全局app中配置 */,
    ...(appModel || {}).state,
  },
  actions: {
    ...(appModel || {}).actions,
  },
  // reducer
  reducers: {
    setApp: (state, { payload }) => {
      let app = (state || {}).app || {};
      const clientId = app.__clientId && payload.__clientId;
      if (payload && payload.app) {
        Object.assign(app, payload.app);
      } else {
        Object.assign(app, {
          ...payload,
        });
      }
      app.__clientId = clientId;
      return {
        ...state,
        app,
      };
    },
    setSystem(state, { payload }) {
      return {
        ...state,
        system: {
          ...payload,
        },
      };
    },
    setLanguage: (state, { payload }) => {
      const { language } = payload || {};
      const flag = state.languages.find((item) => {
        return item.key === language;
      });
      if (language && flag) {
        localStorage.setItem("language", language);
        return {
          ...state,
          language,
        };
      } else {
        return state;
      }
    },
    ...(appModel || {}).reducers,
  },
  sagas: {
    *initApp({ $action }) {
      const parentSessionId = guid();
      const sessionId = parentSessionId;
      const __clientId = guid();
      const onLunchTime = Date.now();
      const app = {
        __clientId,
        parentSessionId,
        sessionId,
        onLunchTime,
      };
      console.log("$action", $action);
      yield put($action.setApp({ app }));
    },
    ...(appModel || {}).sagas,
  },
};

export function createActionManager() {
  const isObject = (obj) =>
    Object.prototype.toString.call(obj) === "[object Object]";

  const fillActionMap = (actions, map) => {
    Object.keys(map).forEach((key) => {
      if (isObject(map[key])) {
        if (!actions[key]) {
          actions[key] = {};
        }
        fillActionMap(actions[key], map[key]);
      }
      if (!actions[key]) {
        actions[key] = void 0;
      }
    });
  };

  const toUpperCaseStyle = (map) =>
    Object.entries(map).reduce((result, [key, val]) => {
      key = key.replace(/([A-Z])/g, "_$1").toUpperCase();
      if (isObject(val)) {
        val = toUpperCaseStyle(val);
      }
      result[key] = val;
      return result;
    }, {});

  const getStaticActions = () => createActions(staticActions);

  const getAsyncActions = ({
    actions = {},
    reducers = {},
    sagas = {},
    name,
  }) => {
    fillActionMap(actions, reducers);
    fillActionMap(actions, sagas);
    const actionMap = toUpperCaseStyle(
      Object.assign(actions, {
        initState: void 0,
        setState: void 0,
      })
    );
    return createActions(actionMap, { prefix: name, namespace: "." });
  };

  return {
    getStaticActions,
    getAsyncActions,
  };
}

// export function createReducerManager(initialReducers) {
//   // 创建一个将 key 映射到 reducer 的对象
//   const reducers = { ...initialReducers };

//   // 创建初始 CombinedReducer
//   let combinedReducer = combineReducers(reducers);

//   // 存储 key 的数组，用于删除 reducer 时删除 state 中对应的数据
//   const keysToRemove = [];

//   return {
//     getReducerMap: () => reducers,

//     // 这个 root reducer 函数在该对象中暴露出
//     // 并将传递给 store
//     reduce: (state, action) => {
//       // 如果已删除任何 reducer，请先清理 state 中对应的值
//       if (keysToRemove.length > 0) {
//         state = { ...state };
//         for (let key of keysToRemove) {
//           delete state[key];
//         }
//         keysToRemove = [];
//       }

//       // Delegate to the combined reducer
//       return combinedReducer(state, action);
//     },

//     // 添加具有指定 key 的新 reducer
//     add: (key, reducer) => {
//       if (!key || reducers[key]) {
//         return;
//       }

//       // 将 reducer 添加到 reducer 映射中
//       reducers[key] = reducer;

//       // 生成新的 combined reducer
//       combinedReducer = combineReducers(reducers);
//     },

//     // 使用指定的 key 删除 reducer
//     remove: (key) => {
//       if (!key || !reducers[key]) {
//         return;
//       }

//       // 从 reducer 映射中删除它
//       delete reducers[key];

//       // 将 key 添加到要清理的 key 列表中
//       keysToRemove.push(key);

//       // 生成新的 combined reducer
//       combinedReducer = combineReducers(reducers);
//     },
//   };
// }

function createReducerManager({ actionMap, reducerMap, initialState }) {
  const isObject = (obj) =>
    Object.prototype.toString.call(obj) === "[object Object]";

  const flatten = (map, partialFlatMap = {}, partialFlatActionType = "") => {
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
  let reducers = flatten({
    initState() {
      return initialState;
    },
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    ...reducerMap,
  });

  reducers = Object.entries(reducers).reduce((result, [key, val]) => {
    const creator = key
      .split(".")
      .reduce((actionMap, propKey) => actionMap[propKey], actionMap);
    if (!creator) {
      throw Error(`undefined action creator: ${key}`);
    }
    result[creator.toString()] = val;
    return result;
  }, {});

  return handleActions(reducers, initialState);
}

function createSagaManager({ sagaMap, actionMap, selectors }) {
  const isObject = (obj) =>
    Object.prototype.toString.call(obj) === "[object Object]";

  const flatten = (map, partialFlatMap = {}, partialFlatActionType = "") => {
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
            $action: actions,
            $selector: selectors,
          });
        } else {
          yield takeLatest(item[0], item[1], {
            $action: actions,
            $selector: selectors,
          });
        }
      }
    };
  };
  return createSagaFromMap(sagaMap, actionMap, selectors);
}

const actions = Object.assign(
  createActionManager().getStaticActions(),
  createActionManager().getAsyncActions(rootModel)
);

const rootReducer = createReducerManager({
  actionMap: actions,
  reducerMap: rootModel.reducers,
  initialState: rootModel.state,
});

const sagas = createSagaManager({
  sagaMap: rootModel.sagas,
  actionMap: actions,
  selectors: rootModel.selectors,
});

const reducer = {
  app: rootReducer,
};
export default { sagas, reducer, actions };
