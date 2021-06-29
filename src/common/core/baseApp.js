/**
 * 1. 初始化store
 * 2. 设置axios拦截器
 * 3. 初始化语言包
 * 4. 定义项目入口 sdfsd
 */
import React, { lazy } from "react";
import {
  // BrowserRouter,
  Router,
  // HashRouter,
  Switch,
  // Route,
  // Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";

import { createModel, store } from "../redux";
import { history, generateRoute } from "../navigate";
import { setAxiosBase } from "../net";

import { Layout } from "../components";
import "../style/index.less";

window.addEventListener("resize", function () {
  // if(window.innerWidth <= 800) {
  //     div.style.display = 'none';
  // } else {
  //     div.style.display = 'block';
  // }
});
export default (appModel) => (WrappedComponent) => {
  const model = createModel(appModel);
  Object.assign(store.globalActions, model.action);
  setAxiosBase();
  // 设置axios拦截器
  class AppComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      store.dispatch(store.globalActions.env.initEnv());
      store.dispatch(store.globalActions.system.initSystem());
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
      const routes = generateRoute();
      return (
        <Provider store={store}>
          <Layout>
            {/* <BrowserRouter basename='/lcbtest'> */}
            <Router history={history}>
              <Switch>{routes}</Switch>
            </Router>
            {/* </BrowserRouter> */}
          </Layout>
        </Provider>
      );
    }
  }
  return AppComponent;
};
