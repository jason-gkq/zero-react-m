import { createModel } from "@/src/zero/redux";
import { put, call, select } from "redux-saga/effects";

export default createModel({
  name: "my/user/info",
  config: {
    pageId: "10011",
    barSettings: {
      title: "个人资料",
    },
  },
  state: {
    systemName: "小程序",
  },
  reducers: {
    changeName(state, { payload }) {
      return {
        ...state,
        systemName: payload,
      };
    },
  },
  sagas: {
    *didMount({ $actions }) {},
    *loginOutAction({
      $actions,
      $selectors,
      $globalActions,
      $globalSelectors,
    }) {
      yield put($globalActions.user.logout());
      // const { isLogin } = yield select($globalSelectors.getUser);
      // console.log("logout", isLogin);
      // if (!isLogin) {
      //   yield put($globalActions.navigate.goBack());
      // }
    },
  },
  selectors: {},
});
