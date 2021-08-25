import { createModel } from "@/src/zero/redux";
import { put, call, select } from "redux-saga/effects";

const model = createModel({
  // model名称，view层用于提取state的key，需要保证唯一
  name: "app",
  isGlobal: true,
  // 初始state状态
  state: {
    myDefaultCar: null,
    cityInfo: null,
  },
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
          pagePath: "/lcbtest/index/index",
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
          pagePath: "/lcbtest/my/my/index",
        },
      ],
    },
  },
  reducers: {},
  sagas: {
    *didMount(
      { $actions, $selectors, $globalActions, $globalSelectors },
      { payload: { done, ...option } }
    ) {
      /**
       * option 启动参数
       * done 不可删除
       */
      if (done) {
        done();
      }
    },
    *getDefaultCar({ $actions }) {
      const car = yield Zero.post(`gateway/mycar/getMyDefaultCar`, {
        serviceType: 1,
        cityId: 10101,
      });
      yield put(
        $actions.setState({
          myDefaultCar: car,
        })
      );
    },
  },
});

export default model;
