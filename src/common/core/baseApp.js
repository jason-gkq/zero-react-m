/**
 * 1. 初始化store
 * 2. 设置axios拦截器
 * 3. 初始化语言包
 * 4. 定义项目入口 sdfsd
 */
import React from "react";
import { Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import { Layout } from "../components";
import { ThemeContext } from "./themeContext";

import RegisterApp from "./registerApp";

export default (appModel) => (WrappedComponent) => {
  @RegisterApp(appModel)
  class AppComponent extends WrappedComponent {
    constructor(props) {
      super(props);
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
      const { $store, $history, $routes, $theme } = this.props;
      return (
        <Provider store={$store}>
          <ThemeContext.Provider value={$theme}>
            <Layout>
              {/* <BrowserRouter basename='/lcbtest'> */}
              <Router history={$history}>
                <Switch>{$routes}</Switch>
              </Router>
              {/* </BrowserRouter> */}
            </Layout>
          </ThemeContext.Provider>
        </Provider>
      );
    }
  }
  return AppComponent;
};
