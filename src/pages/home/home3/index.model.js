import { createModel } from "@/src/zero/redux";

export default createModel({
  name: "Home3",
  config: {
    pageId: "10011",
    barSettings: {
      title: "home3",
    },
    isNeedLogin: false,
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
    *didMount({}) {
      console.log("pages/home/index.model.js/saga/didMount");
    },
  },
  selector: {},
});
