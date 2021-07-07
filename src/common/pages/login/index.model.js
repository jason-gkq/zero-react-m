import { createModel } from "@src/common/redux";
import { put, call } from "redux-saga/effects";
import axios from "axios";
import { cookieStorage } from "@src/common/cache";

export default createModel({
  name: "login",
  state: {
    systemName: "小程序",
    pageStatus: "loading",
  },
  reducers: {},
  sagas: {
    *didMount({ $actions }) {
      yield put($actions.setState({ pageStatus: "success" }));
    },
    *requestSmsCode({ $globalActions }) {
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
      } catch (error) {
        cookieStorage.removeItem("token", "", cookieStorage.getDomain());
        yield put($globalActions.user.setUser({ isLogin: false }));
      }
    },
  },
  selectors: {},
});
