import { createModel } from "@src/common/redux";
import { put, call } from "redux-saga/effects";

export default createModel({
  name: "Home",
  state: {
    systemName: "小程序",
    pageStatus: "hhh",
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
    *didMount({ $actions }) {
      console.log("pages/home/index.model.js/saga/didMount");
      yield put($actions.setState({ pageStatus: "234324" }));
    },
  },
  selectors: {},
});
