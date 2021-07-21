import { createModel } from "@/common/redux";
import { put, call } from "redux-saga/effects";
import usaImg from "@/assets/img/usa.svg";
import chinaImg from "@/assets/img/china.svg";

const model = createModel({
  // model名称，view层用于提取state的key，需要保证唯一
  name: "app",
  isGlobal: true,
  // 初始state状态
  state: {
    isNeedLogin: false,
    isNeedPermission: false,
  },
  config:{
    tabBar: {
      barTintColor: '#fff', //tabbar 背景色
      unselectedTintColor: '#000', //未选中的字体颜色
      tintColor: '#fa5a4b', //选中的字体颜色
      list: [
        {
          title: '首页',
          key: 'home',
          selectedIcon: '',
          icon: '',
          pagePath: "/lcbtest/index/index"
        },
        {
          title: '4S店',
          key: 'store',
          selectedIcon: '',
          icon: '',
          pagePath: "/lcbtest/index/index"
        },
        {
          title: '4S保养',
          key: 'baoyang',
          selectedIcon: '',
          icon: '',
          pagePath: "/lcbtest/index/index"
        },
        {
          title: '我的',
          key: 'my',
          selectedIcon: '',
          icon: '',
          pagePath: "/lcbtest/index/index"
        },
      ],
    }
  },
  reducers: {},
  sagas: {
    *didMount({ $actions, $globalActions }) {
      //TODO 项目启动 = appOnLaunch
      // console.log("pages/home/index.model.js/saga/didMount");
      // yield put($globalActions.env.changeTheme({ theme: "A" }));
    },
  },
});

export default model;
