/**
 * 1. 初始化store
 * 2. 设置axios拦截器
 * 3. 初始化语言包
 * 4. 定义项目入口 sdfsd
 */
import React from "react";
import {
  // BrowserRouter,
  Router,
  // HashRouter,
  Switch,
  // Route,
  // Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

import RegisterStore from "./registerStore";
import RegisterApp from "./registerApp";

export default (appModel) => (WrappedComponent) => {
  @RegisterApp(appModel)
  class BaseAppComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      // const { dispatch } = props;
      this.onLunch = this.onLunch.bind(this);
      this.onLunch();
    }

    onLunch() {
      if (super.onLunch) {
        super.onLunch(this.props.$onLunchPayload);
      }
    }

    // reLunch(){}

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
        <Router history={this.props.$history}>
          <Switch>{this.props.$routes}</Switch>
        </Router>
      );
    }
  }
  return () => {
    const StoreBaseApp = connect(
      (state) => state,
      (dispatch) => {
        return { dispatch };
      }
    )(BaseAppComponent);
    return (
      <RegisterStore>
        <StoreBaseApp />
      </RegisterStore>
    );
  };
};
