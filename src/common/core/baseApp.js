/**
 * 1. 初始化store
 * 2. 设置axios拦截器
 * 3. 初始化语言包
 * 4. 定义项目入口 sdfsd
 */
import React, { lazy } from "react";
import {
  BrowserRouter,
  Router,
  HashRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";

import { createModel, store } from "../redux";
import { history } from "../navigate";
import { setAxiosBase } from "../net";

import { Layout } from "../components";
import "../style/index.less";

// const homepage = process.env.publicUrlOrPath.slice(0, -1);

const Home = lazy(
  async () =>
    await import(/* webpackChunkName: 'home' */ "@src/pages/home/index")
);
const Home2 = lazy(
  async () =>
    await import(/* webpackChunkName: 'home2' */ "@src/pages/home2/index")
);

const Home3 = lazy(
  async () =>
    await import(/* webpackChunkName: 'home3' */ "@src/pages/home3/index")
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
          {/* <BrowserRouter basename="/calendar">
                <Link to="/today"/> // renders <a href="/calendar/today">
                <Link to="/tomorrow"/> // renders <a href="/calendar/tomorrow">
                ...
            </BrowserRouter> */}
          <Layout>
            {/* <BrowserRouter basename='/lcbtest'> */}
            <Router history={history}>
              <Switch>
                <Route path='/lcbtest/home' component={Home} />
                <Route path='/lcbtest/home2' component={Home2} />
                <Route path='/lcbtest/home3' component={Home3} />
                <Route>
                  <Home />
                </Route>
              </Switch>
            </Router>
            {/* </BrowserRouter> */}
          </Layout>
        </Provider>
      );
    }
  }
  return AppComponent;
};
