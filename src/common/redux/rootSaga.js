import {
  all,
  put,
  call,
  select,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
import axios from "axios";
import packageJson from "../../../package.json";
import platform from "platform";

import cookieStorage from "@common/cache/cookieStorage";
import staticActions from "./rootAction";
import { guid } from "@common/utils/util";
import { getEnv } from "./rootSelector";

const initEnv = function* () {
  const env = yield select(getEnv);
  let clientId = cookieStorage.getItem("__clientId");
  if (!clientId) {
    clientId = guid();
    cookieStorage.setItem("__clientId", clientId, Infinity);
  }
  const parentSessionId = guid();
  const sessionId = parentSessionId;
  const onLunchTime = Date.now();

  Object.assign(env, {
    parentSessionId,
    sessionId,
    onLunchTime,
    __clientId: clientId,
    env: process.env.ENV,
    platformType: process.env.application,
    module: process.env.publicUrlOrPath
      .slice(1)
      .slice(-process.env.publicUrlOrPath.length, -1),
    serviceUrl: process.env.SERVICE_URL,
    cdnUrl: process.env.CDN_URL,
    appCode: process.env.APP_CODE,
    isNeedPermission: false /** 是否需要菜单-路由权限控制，根据页面路由判断是否具有权限；优先取页面路由中配置，若无配置，则取全局app中配置 */,
    isNeedLogin: false /** 是否需要所有页面强制登录；优先取页面路由中配置，若无配置，则取全局app中配置  */,
  });

  yield put(staticActions.env.setEnv({ ...env }));
};

const initSystem = function* () {
  const processEnv = process.env;
  const {
    document: documentInfo,
    navigator: navigatorInfo,
    location: locationInfo,
    screen: screenInfo,
    innerHeight,
    innerWidth,
    outerHeight,
    outerWidth,
    screenTop,
    screenLeft,
  } = window;
  const platformInfo = platform.parse(navigatorInfo.userAgent);
  let system = {
    author: packageJson.author,
    platform: platformInfo.name,
    winWidth: innerWidth || documentInfo.body.clientWidth,
    winHeight: innerHeight || screenInfo.availHeight,
    /**
     * 根据运行环境解析出来的 platform 信息
     */
    onLunchPlatform: platformInfo,
    /**
     * 项目打包编译信息
     */
    onLunchPackage: {
      projectName: processEnv.npm_package_name || "",
      babelEnv: processEnv.BABEL_ENV,
      nodeEnv: processEnv.NODE_ENV,
      lang: processEnv.LANG,
      launchInstanceID: processEnv.LaunchInstanceID,
      version: processEnv.npm_package_version,
      lifecycleEvent: processEnv.npm_lifecycle_event,
      lifeycleScript: processEnv.npm_lifecycle_script,
      projectMain: processEnv.npm_package_main,
      projectType: processEnv.npm_package_type,
      publicUrlOrPath: processEnv.publicUrlOrPath,
      homepage: processEnv.npm_package_homepage,
    },
    /**
     * 项目启动时location信息
     */
    onLunchLocation: {
      hash: locationInfo.hash,
      host: locationInfo.host,
      hostname: locationInfo.hostname,
      href: locationInfo.href,
      origin: locationInfo.origin,
      pathname: locationInfo.pathname,
      port: locationInfo.port,
      protocol: locationInfo.protocol,
      search: locationInfo.search,
    },
    /**
     * 计算项目启动时所有宽高以及屏幕信息
     */
    onLunchScreen: {
      innerHeight, // 屏幕可用工作区高度
      innerWidth, // 屏幕可用工作区宽度
      outerHeight, // 屏幕高
      outerWidth, // 屏幕宽
      clientWidth: documentInfo.body.clientWidth, // 网页可见区域宽
      clientHeight: documentInfo.body.clientHeight, // 网页可见区域高
      offsetWidth: documentInfo.body.offsetWidth, // 网页可见区域宽 (包括边线和滚动条的宽)
      offsetHeight: documentInfo.body.offsetHeight, // 网页可见区域高 (包括边线的宽)
      scrollWidth: documentInfo.body.scrollWidth, // 网页正文全文宽
      scrollHeight: documentInfo.body.scrollHeight, // 网页正文全文高
      // scrollTop:
      //   documentInfo.body.scrollTop || document.documentElement.scrollTop, // .body.scrollTop 网页被卷去的高(ff) || documentElement.scrollTop网页被卷去的高(ie)
      // scrollLeft: documentInfo.body.scrollLeft, // 网页被卷去的左
      screenTop, // 网页正文部分上
      screenLeft, // 网页正文部分左
      height: screenInfo.height, // 屏幕分辨率的高
      width: screenInfo.width, // 屏幕分辨率的宽
      availHeight: screenInfo.availHeight, // 屏幕可用工作区高度
      availWidth: screenInfo.availWidth, // 屏幕可用工作区宽度
      colorDepth: screenInfo.colorDepth, // 屏幕设置的位彩色
      pixelDepth: screenInfo.pixelDepth, // 屏幕设置的像素/英寸
    },
    /**
     * 项目运行环境信息
     */
    onLunchNavigator: {
      onLine: navigatorInfo.onLine,
      appCodeName: navigatorInfo.appCodeName,
      appName: navigatorInfo.appName,
      appVersion: navigatorInfo.appVersion,
      connection: navigatorInfo.connection,
      cookieEnabled: navigatorInfo.cookieEnabled,
      language: navigatorInfo.language,
      platform: navigatorInfo.platform,
      userAgent: navigatorInfo.userAgent,
      vendor: navigatorInfo.vendor,
    },
  };
  yield put(staticActions.system.setSystem(system));
};

const test = function* ({ payload }) {
  axios
    .post(`gateway/manage/common/apiss/auth/queryUserAuth`, {
      groupId: 58,
      groupType: 2,
      groupKey: "2|58",
      ...payload,
    })
    .then((resp) => {
      console.log("queryUserAuth:resp::", resp);
      return Promise.resolve(resp);
    })
    .catch((e) => {
      console.log("queryUserAuth:e::", e);
      return null;
    });
};

export default function* staticSagas() {
  yield takeLatest(staticActions.system.initSystem, initSystem);
  yield takeLatest(staticActions.env.initEnv, initEnv);

  yield takeLatest(staticActions.test, test);
  // yield all(rootSagas);
}

// 用于缓存所有effects函数
// const rootSagas = [];
// // 对每个model进行操作-处理对应的effects
// for (let key in sagas) {
//   const watch = function* () {
//     yield takeLatest(key, function* (obj) {
//       // 第二个参数只传递了最常用的call,put进去，
//       // 如果想用更多其他'redux-saga/effects'的API，可在各自model中自行引入
//       try {
//         yield sagas[key](obj, { call, put });
//       } catch (e) {
//         // 统一处理effects抛出的错误
//       }
//     });
//   };
//   rootSagas.push(watch());
// }
