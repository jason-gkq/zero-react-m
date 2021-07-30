import { createModel } from "@/src/zero/redux";
import { put, call, select } from "redux-saga/effects";
import axios from "axios";
import { cookieStorage } from "@/src/zero/cache";

export default createModel({
  name: "login",
  state: {
    systemName: "小程序",
    pageStatus: "loading",
    navigateUrl: "",
  },
  config: {
    pageId: "10011",
    title: "登录",
    isNeedLogin: false,
    hideHeader: true,
  },
  reducers: {},
  sagas: {
    *didMount({ $actions }, { payload }) {
      const { to = "", ...params } = payload;
      yield put(
        $actions.setState({
          navigateUrl: decodeURIComponent(to),
          pageStatus: "success",
          params,
        })
      );
    },
    *requestSmsCode({ $selectors, $globalActions, $actions }) {
      const { navigateUrl = "/index/index", params } = yield select(
        $selectors.getState
      );
      try {
        const user = yield axios.post(`gateway/user/smsLogin`, {
          mobile: "13800000000",
          code: "1111",
        });
        user["isLogin"] = false;
        if (user && user.user && user.user.mobile) {
          user["isLogin"] = true;
        }
        user["mobile"] = user.user && user.user.mobile;
        cookieStorage.setItem(
          "token",
          user.token,
          Infinity,
          cookieStorage.getDomain()
        );
        yield put($globalActions.user.setUser(user));

        yield put(
          $globalActions.navigate.redirect({
            url: navigateUrl,
            payload: params,
          })
        );
      } catch (error) {
        cookieStorage.removeItem("token", "", cookieStorage.getDomain());
        yield put($globalActions.user.setUser({ isLogin: false }));
      }
    },
  },
  selectors: {},
});
