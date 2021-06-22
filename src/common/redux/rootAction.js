import { createActions } from "redux-actions";

const staticActions = {
  SYSTEM: {
    SET_SYSTEM: void 0,
  },
  APPLICATION: {
    SET_APPLICATION: void 0,
    INIT_APPLICATION: void 0,
  },
  TEST: void 0,
  // /**
  //  * @param {string} pageName
  //  * @param {object} params
  //  * @param {object} options {@link /Consts/constants.js} 参照constants.js文件
  //  */
  // GOTO: (pageName, params = {}, options = {}) => ({
  //   pageName,
  //   params,
  //   options,
  // }),
  // REPLACE: (pageName, params = {}, options = {}, replacePage = null) => ({
  //   replacePage,
  //   pageName,
  //   params,
  //   options,
  // }),
  // // 对待不友好的, 一定要
  // GOBACK: (pageName) => ({
  //   pageName,
  // }),
};
export default createActions(staticActions, {
  // prefix: "global",
  // namespace: ".",
});
