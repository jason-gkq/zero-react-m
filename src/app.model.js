import { createModel } from "@src/common/redux";
import { put, call } from "redux-saga/effects";
import usaImg from "@assets/img/usa.svg";
import chinaImg from "@assets/img/china.svg";

const model = createModel({
  // model名称，view层用于提取state的key，需要保证唯一
  name: "app",
  // 初始state状态
  state: {
    language: localStorage.getItem("language") || "zh-CN",
    languages: [
      {
        key: "en-US",
        title: "English",
        flag: usaImg,
      },
      {
        key: "zh-CN",
        title: "中文",
        flag: chinaImg,
      },
    ],
  },
  reducers: {
    setLanguage: (state, action) => {
      const { language } = action.payload || {};
      const flag = state.languages.find((item) => {
        return item.key === language;
      });
      if (language && flag) {
        localStorage.setItem("language", language);
        return {
          ...state,
          language,
        };
      } else {
        return state;
      }
    },
  },
  sagas: {
    *didMount({ $actions, $globalActions }) {
      // console.log("pages/home/index.model.js/saga/didMount");
      yield put($globalActions.env.changeTheme({ theme: "B" }));
    },
  },
});

export default model;
