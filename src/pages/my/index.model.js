import { createModel } from "@/src/zero/redux";
import { put, call } from "redux-saga/effects";
import { store, globalActions } from "@/common/redux";
import backBlack from "@/assets/img/back-black.svg";
import React from "react";

export default createModel({
  name: "My",
  config: {
    pageId: "10011",
    barSettings: {
      title: "我的",
      right: [
        {
          // icon: <img src={backBlack} />,
          text: "设置",
          onClick: () => {
            console.log("shezhihihzihi", store);
            store.dispatch(
              globalActions.navigate.goTo({ url: "/setting/index" })
            );
          },
        },
      ],
    },
    isNeedLogin: false,
    isNeedPermission: false, // 如无权限，则无需配置
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
    *didMount({ $actions }) {
      console.log("pages/home/index.model.js/saga/didMount");
      // yield put($actions.setState({ pageStatus: "234324" }));
    },
  },
  selectors: {},
});
