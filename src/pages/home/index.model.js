import createModel from "@src/common/core/createModel";

export default createModel({
  name: "Home",
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
