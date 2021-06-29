import { createModel } from "@src/common/redux";

export default createModel({
  name: "Home3",
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
      console.log("pages/home/index.model.js/saga/didMount");
    },
  },
  selector: {},
});
