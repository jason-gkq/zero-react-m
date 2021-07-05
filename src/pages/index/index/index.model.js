import { createModel } from "@src/common/redux";

export default createModel({
  name: "Index",
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
      console.log("pages/index/index.model.js/saga/didMount");
    },
  },
  selector: {},
});
