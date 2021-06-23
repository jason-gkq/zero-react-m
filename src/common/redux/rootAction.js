import { createActions } from "redux-actions";

const staticActions = {
  SYSTEM: {
    SET_SYSTEM: void 0,
    INIT_SYSTEM: void 0,
  },
  ENV: {
    SET_ENV: void 0,
    INIT_ENV: void 0,
  },
  ROUTE: {
    SET_ROUTE: void 0,
  },
  NAVIGATE: {
    /**
     * @param {string} pageName
     * @param {object} params
     * @param {object} options {@link /Consts/constants.js} 参照constants.js文件
     */
    GOTO: (pageName, params = {}, options = {}) => ({
      pageName,
      params,
      options,
    }),
    // 对待不友好的, 一定要
    GOBACK: (pageName) => ({
      pageName,
    }),
    RE_LAUNCH: () => ({}),
    REDIRECT: () => ({}),
    REPLACE: (pageName, params = {}, options = {}, replacePage = null) => ({
      replacePage,
      pageName,
      params,
      options,
    }),
  },
  SHARE: void 0,
  TEST: void 0,
};
export default createActions(staticActions, {
  // prefix: "global",
  // namespace: ".",
});
