import usaImg from "@assets/img/usa.svg";
import chinaImg from "@assets/img/china.svg";

const model = {
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
  sagas: {},
};

export default model;
