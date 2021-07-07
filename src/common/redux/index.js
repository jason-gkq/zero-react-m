export { default as createModel } from "./createModel";
export {
  store,
  sagaMiddleware,
  removeAsyncReducer,
  injectAsyncReducer,
  injectGlobalActions,
  globalActions,
} from "./configureStore";

export { getEnv, getSystem, getRoute } from "./rootSelector";


import * as globalSelectors from "./rootSelector";

export {globalSelectors};

export function injectGlobalSelectors(selectors) {
  Object.assign(globalSelectors, selectors);
}