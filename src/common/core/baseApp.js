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

import { createModel, store } from "../redux";
import { setAxiosBase } from "../net/defaultAxios";

import "../style/index.less";

// import "antd-mobile/dist/antd-mobile.css"; // or 'antd-mobile/dist/antd-mobile.less'

const homepage = "/" + store.getState().env.module;

const AppPage = lazy(
  async () =>
    await import(/* webpackChunkName: 'app' */ "@src/pages/home/index")
);
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
