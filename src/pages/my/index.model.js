import { createModel } from "@/src/zero/redux";
import { put, call } from "redux-saga/effects";
import { store, globalActions } from "@/zero/redux";
import backBlack from "@/assets/img/back-black.svg";

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
