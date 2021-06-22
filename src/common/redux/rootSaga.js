import {
  all,
  put,
  call,
  select,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
import staticActions from "./rootAction";
import { guid } from "@common/utils/util";
import { getApplication } from "./rootSelector";

import cookieStorage from "@common/cache/cookieStorage";

import axios from "axios";
import { instance } from "@common/net/defaultAxios";
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
const initApplication = function* () {
  const application = yield select(getApplication);
  let clientId = cookieStorage.getItem("__clientId");
  if (!clientId) {
    clientId = guid();
    cookieStorage.setItem("__clientId", clientId, Infinity);
  }
  const parentSessionId = guid();
  const sessionId = parentSessionId;
  const onLunchTime = Date.now();

  Object.assign(application, {
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
    appCode: process.env.APP_CODE,
    isNeedPermission: false /** 是否需要菜单-路由权限控制，根据页面路由判断是否具有权限；优先取页面路由中配置，若无配置，则取全局app中配置 */,
    isNeedLogin: false /** 是否需要所有页面强制登录；优先取页面路由中配置，若无配置，则取全局app中配置  */,
  });

  yield put(staticActions.application.setApplication({ ...application }));
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
  yield takeLatest(staticActions.application.initApplication, initApplication);
  yield takeLatest(staticActions.test, test);
  // yield all(rootSagas);
}
