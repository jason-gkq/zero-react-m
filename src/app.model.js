import usaImg from "@assets/img/usa.svg";
import chinaImg from "@assets/img/china.svg";

const model = {
  // model名称，view层用于提取state的key，需要保证唯一
  name: "app",
  // 初始state状态
  state: {
    isNeedPermission: false /** 是否需要菜单-路由权限控制，根据页面路由判断是否具有权限；优先取页面路由中配置，若无配置，则取全局app中配置 */,
    isNeedLogin: false /** 是否需要所有页面强制登录；优先取页面路由中配置，若无配置，则取全局app中配置 */,
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
  // reducer
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
  // saga
  sagas: {},
};

export default model;
