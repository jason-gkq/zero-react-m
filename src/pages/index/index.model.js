import { createModel } from "@/src/zero/redux";

export default createModel({
  name: "Index",
  config: {
    pageId: "10011",
    isNeedLogin: true,
    hideHeader: true,
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
    *didMount() {
      // console.log("pages/index/index.model.js/saga/didMount");
    },
  },
  selector: {},
});
