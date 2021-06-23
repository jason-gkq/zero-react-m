/**
 * 1. 初始化store
 * 2. 设置axios拦截器
 * 3. 初始化语言包
 * 4. 定义项目入口 sdfsd
 */
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  HashRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
// import { PersistGate } from 'redux-persist/integration/react';
import { store } from "@redux/store";
import packageJson from "../../../package.json";
import { setAxiosBase } from "@common/net/defaultAxios";

import "@common/style/index.less";

// import "antd-mobile/dist/antd-mobile.css"; // or 'antd-mobile/dist/antd-mobile.less'
import createModel from "./createModel";
const systemInfo = { packageJson, processEnv: process.env };

const homepage =
  packageJson.homepage && packageJson.homepage.slice(0, -1)
    ? packageJson.homepage.slice(0, -1)
    : "/";

const AppPage = lazy(
  async () =>
    await import(/* webpackChunkName: 'app' */ "@src/pages/home/index")
);

export default (appModel) => (WrappedComponent) => {
  const model = createModel(appModel);
  Object.assign(store.globalActions, model.action);
  setAxiosBase();
  // 设置axios拦截器
  class AppComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      store.dispatch(store.globalActions.application.initApplication());
      store.dispatch(store.globalActions.system.setSystem(systemInfo));
    }

    componentDidMount() {
      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }
    render() {
      return (
        <Provider store={store}>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              {/* {super.render()} */}
              <Switch>
                <Route path={homepage} component={AppPage} />
                <Redirect to={homepage} />
              </Switch>
            </Suspense>
          </BrowserRouter>
        </Provider>
      );
    }
  }
  return AppComponent;
};
