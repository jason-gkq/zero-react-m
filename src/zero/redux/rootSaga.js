/**
 * takeEvery 多个实例同时启动
 * takeLatest 只执行这个任务是最后被启动的那个，之前的这个任务会被自动取消
 * put
 * call  call 同样支持调用对象方法，你可以使用以下形式，为调用的函数提供一个 this 上下文
 *    yield call([obj, obj.method], arg1, arg2, ...) // 如同 obj.method(arg1, arg2 ...)
 * apply 提供了另外一种调用的方式
 *    yield apply(obj, obj.method, [arg1, arg2, ...])
 * cps 表示的是延续传递风格
 *    const content = yield cps(readFile, '/path/to/file')
 * all 自动执行
 */
import {
  all,
  take,
  put,
  fork,
  call,
  select,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
import platform from "platform";

import staticActions from "./rootAction";
import { getEnv } from "./rootSelector";

import {
  cookieStorage,
  sessionStorage,
  setCommonData,
  setAxiosBase,
} from "../api";

import { guid } from "../utils";

import { themes } from "../core/themeContext";
import { Toast, Modal } from "../components/index";

const initEnv = function* () {
  const env = yield select(getEnv);
  let clientId = cookieStorage.getItem("__clientId");
  if (!clientId) {
    clientId = guid();
    cookieStorage.setItem(
      "__clientId",
      clientId,
      Infinity,
      "/",
      cookieStorage.getDomain()
    );
  }
  const parentSessionId = guid();
  const sessionId = parentSessionId;
  const onLunchTime = Date.now();

  Object.assign(
    env,
    {
      parentSessionId,
      sessionId,
      onLunchTime,
      __clientId: clientId,
      version: process.env.VERSION,
      platformType: process.env.application,
      theme: "A",
    },
    process.env.productConfig
  );
  /**
   * 设置axios拦截器
   */
  yield call(setAxiosBase, env);
  yield put(staticActions.env.setEnv({ ...env }));
  const themeInfo = themes[env.theme];
  Object.keys(themeInfo).forEach((key) => {
    document.documentElement.style.setProperty(key, themeInfo[key]);
  });
};

const changeTheme = function* ({ payload: { theme } }) {
  if (!themes[theme]) {
    return;
  }
  const themeInfo = themes[theme];
  Object.keys(themeInfo).forEach((key) => {
    document.documentElement.style.setProperty(key, themeInfo[key]);
  });
  yield put(staticActions.env.setEnv({ theme }));
};

const setAppCode = function* ({ payload: { appCode } }) {
  yield call(setCommonData, { appCode });
  yield put(staticActions.env.setEnv({ appCode }));
};

const setServiceUrl = function* ({ payload: { SERVICE_URL } }) {
  yield call(setCommonData, { SERVICE_URL });
  yield put(staticActions.env.setEnv({ SERVICE_URL }));
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
    author: processEnv.author,
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

// navigate
const goTo = function* () {
  while (true) {
    const { payload: { url, payload = {}, options = {} } = {} } = yield take(
      staticActions.navigate.goTo
    );
    Zero.goTo({ url, payload, options });
  }
};

const goBack = function* () {
  while (true) {
    const { payload: { delta, url = "" } = {} } = yield take(
      staticActions.navigate.goBack
    );
    Zero.goBack({ delta, url });
  }
};

const redirect = function* () {
  while (true) {
    const {
      payload: { url = "/index/index", payload = {}, options = {} } = {},
    } = yield take(staticActions.navigate.redirect);
    Zero.redirect({ url, payload, options });
  }
};

const reLaunch = function* () {
  while (true) {
    const {
      payload: { url = null, payload = {}, options = {} } = {},
    } = yield take(staticActions.navigate.reLaunch);
    if (url) {
      yield Zero.redirect({ url, payload, options });
    }
    window.location.reload();
  }
};

// const login = function* ({ payload }) {
//   try {
//     const user = yield httpsClient.post(`gateway/user/smsLogin`, {
//       mobile: "13800000000",
//       code: "1111",
//     });
//     user["isLogin"] = true;
//     user["mobile"] = user.user && user.user.mobile;
//     yield put(staticActions.user.setUser(user));
//   } catch (error) {
//     yield put(staticActions.user.setUser({ isLogin: false }));
//   }
// };

// const loginSuccess = function* ({ payload }) {};

const takeLogout = function* () {
  while (true) {
    yield take(staticActions.user.logout);
    yield call(Zero.post, `gateway/user/logout`);
    yield put(staticActions.user.setUser({ isLogin: false }));
    // TODO: 进入登录页或者首页
    Zero.goBack();
  }
};

const rootLunch = function* () {
  yield call(checkLogin);
  yield put(staticActions.env.setEnv({ status: true }));
};

const checkLogin = function* () {
  try {
    const user = yield call(Zero.post, `gateway/user/currentUser`);
    user["isLogin"] = false;
    if (user && user.user && user.user.mobile) {
      user["isLogin"] = true;
    }
    user["mobile"] = user.user && user.user.mobile;
    yield call(sessionStorage.set, "user", user, Infinity);
    yield put(staticActions.user.setUser(user));

    yield put(staticActions.app.getDefaultCar());
  } catch (error) {
    yield call(sessionStorage.remove, "user");
    yield put(staticActions.user.setUser({ isLogin: false }));
  }
};

export const toastCall = function* (method, { payload }) {
  if (method === "hide") {
    yield call([Toast, method]);
  } else {
    const { content, duration, onClose, mask } = payload;
    yield call([Toast, method], content, duration, onClose, mask);
  }
};

export const alertShow = function* () {
  while (true) {
    const { payload } = yield take(staticActions.alert.show);
    yield call(Modal.alert, payload);
  }
};

export default function* staticSagas() {
  /**
   * 路由
   */
  yield fork(goTo);
  yield fork(goBack);
  yield fork(redirect);
  yield fork(reLaunch);
  yield fork(takeLogout);
  yield fork(alertShow);

  /**
   * 系统信息初始化
   */
  yield all([initSystem(), initEnv()]);
  yield all([rootLunch()]);

  yield takeLatest(staticActions.env.changeTheme, changeTheme);
  yield takeLatest(staticActions.env.setAppCode, setAppCode);
  yield takeLatest(staticActions.env.setServiceUrl, setServiceUrl);

  // toast
  yield takeLatest(staticActions.toast.success, toastCall, "success");
  yield takeLatest(staticActions.toast.fail, toastCall, "fail");
  yield takeLatest(staticActions.toast.info, toastCall, "info");
  yield takeLatest(staticActions.toast.loading, toastCall, "loading");
  yield takeLatest(staticActions.toast.offline, toastCall, "offline");
  yield takeLatest(staticActions.toast.hide, toastCall, "hide");

  // yield takeLatest(staticActions.alert.show, alertShow);
  /**
   * 用户
   */
  // yield takeLatest(staticActions.user.login, login);
  // yield takeLatest(staticActions.user.logout, logout);
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
