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
import RegisterApp from "./registerApp";

export default (appModel) => (WrappedComponent) => {
  @RegisterApp(appModel)
  class AppComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      this.onLunch = this.onLunch.bind(this);
      this.onLunch();
    }

    onLunch() {
      if (super.onLunch) {
        super.onLunch(this.props.$onLunchPayload);
      }
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
        <Provider store={this.props.$store}>
          <Layout>
            {/* <BrowserRouter basename='/lcbtest'> */}
            <Router history={this.props.$history}>
              <Switch>{this.props.$routes}</Switch>
            </Router>
            {/* </BrowserRouter> */}
          </Layout>
        </Provider>
      );
    }
  }
  return AppComponent;
};
