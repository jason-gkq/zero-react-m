/**
 * 1. 初始化store
 * 2. 设置axios拦截器
 * 3. 初始化语言包
 * 4. 定义项目入口 sdfsd
 */
import React, { lazy } from "react";
import {
  BrowserRouter,
  HashRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";

import { createModel, store } from "../redux";
import { setAxiosBase } from "../net";

import { Layout } from "../components";
import "../style/index.less";

const homepage = process.env.publicUrlOrPath.slice(0, -1);

const AppPage = lazy(
  async () =>
    await import(/* webpackChunkName: 'home' */ "@src/pages/home/index")
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
            <Layout>
              <Switch>
                <Route path={homepage} component={AppPage} />
                <Redirect to={homepage} />
              </Switch>
            </Layout>
          </BrowserRouter>
        </Provider>
      );
    }
  }
  return AppComponent;
};
