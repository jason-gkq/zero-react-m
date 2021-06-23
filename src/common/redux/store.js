import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import {
  persistReducer,
  persistStore,
  persistCombineReducers,
} from "redux-persist"; //不要使用persistCombineReducers，已作废
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {
  batchActions,
  enableBatching,
  batchDispatchMiddleware,
} from "redux-batched-actions";
import createSagaMiddleware from "redux-saga";

import staticActions from "./rootAction";
import staticReducers from "./rootReducer";
import staticSagas from "./rootSaga";

const persistConfig = {
  key: "root",
  storage,
  throttle: 1000,
  timeout: 8000,
  whitelist: [],
};

function createReducer(asyncReducers) {
  const rootReducer = enableBatching(
    persistCombineReducers(persistConfig, {
      ...staticReducers,
      ...asyncReducers,
    })
  );
  return (state, action) => {
    if (action.error) {
      return state;
    }
    return rootReducer(state, action);
  };
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, thunkMiddleware];

if (!["prod", "pre"].includes(process.env.ENV)) {
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

const store = createStore(
  persistCombineReducers(persistConfig, staticReducers),
  applyMiddleware(...middlewares)
);

const persistor = persistStore(store);
sagaMiddleware.run(staticSagas);

store.asyncReducers = {};

let persistTimer = null;

const replaceReducer = (reducer) => {
  store.replaceReducer(createReducer(reducer));
  // 修复replaceReducer后persist被中断
  if (persistTimer) {
    clearTimeout(persistTimer);
    persistTimer = null;
  }
  persistTimer = setTimeout(() => {
    persistor.persist();
    persistTimer = null;
  }, 500);
};

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  replaceReducer(store.asyncReducers);
}

export function removeAsyncReducer(store, name) {
  const asyncReducers = store.asyncReducers;
  if (!asyncReducers[name]) {
    return;
  }
  const state = store.getState();
  delete asyncReducers[name];
  delete state[name];
  replaceReducer(asyncReducers);
}

store.globalActions = staticActions;

export { store, persistor, sagaMiddleware, batchActions };
