import { createModel } from "@src/common/redux";

export default createModel({
  name: "Home2",
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
    *didMount({ ...data }, { payload }) {
      console.log("pages/home/index.model.js/saga/didMount");
    },
    *addVer({ ...data }, { payload }) {
      console.log("payload::11", data, payload);
    },
  },
  selectors: {},
});
