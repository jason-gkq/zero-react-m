import { createModel } from "@/src/zero/redux";
import { put, call, select } from "redux-saga/effects";

const model = createModel({
  // model名称，view层用于提取state的key，需要保证唯一
  name: "app",
  isGlobal: true,
  // 初始state状态
  state: {},
  config: {
    title: "乐车邦",
    isNeedLogin: false,
    isNeedPermission: false,
    tabBar: {
      barTintColor: "#fff", //tabbar 背景色
      unselectedTintColor: "#000", //未选中的字体颜色
      tintColor: "#fa5a4b", //选中的字体颜色
      list: [
        {
          title: "首页",
          key: "home",
          selectedIcon: "",
          icon: "",
          pagePath: "/index/index",
        },
        // {
        // 	title: '4S店',
        // 	key: 'store',
        // 	selectedIcon: '',
        // 	icon: '',
        // 	pagePath: '/shop/index',
        // },
        // {
        // 	title: '4S保养',
        // 	key: 'baoyang',
        // 	selectedIcon: '',
        // 	icon: '',
        // 	pagePath: '/webapp/index',
        // },
        {
          title: "我的",
          key: "my",
          selectedIcon: "",
          icon: "",
          pagePath: "/my/index",
        },
      ],
    },
  },
  reducers: {},
  sagas: {
    *didMount({ $actions, $globalActions, $globalSelectors }) {
      //TODO 项目启动 = appOnLaunch
    },
  },
});

export default model;
