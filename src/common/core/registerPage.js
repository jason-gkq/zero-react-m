import React from "react";
import { connect } from "react-redux";

import {
  injectAsyncReducer,
  store,
  globalActions,
  globalSelectors,
} from "../redux";

// import { getThemeContext } from "./themeContext";

export default (pageModel) => (WrappedComponent) => {
  // 实例级别model的情况
  // @connect((state) => ({
  //   $pageStatus: pageModel.selectors.getState(state).pageStatus,
  // }))
  // @connect((state) => state)
  // class TargetComponent extends WrappedComponent {
  //   constructor(props) {
  //     super(props);
  //   }
  // }

  @connect((state) => {
    const $pageStatus = pageModel.selectors.getState(state).pageStatus;
    const pageConfig = WrappedComponent.getConfig();
    let $isNeedLogin = globalSelectors.getEnv(state).isNeedLogin;
    let $isNeedPermission = globalSelectors.getEnv(state).isNeedPermission;

    if (Reflect.has(pageConfig, "isNeedLogin")) {
      $isNeedLogin = pageConfig.isNeedLogin;
    }
    if (Reflect.has(pageConfig, "isNeedPermission")) {
      $isNeedPermission = pageConfig.isNeedPermission;
    }
    return {
      $pageStatus,
      $isNeedLogin,
      $isNeedPermission,
    };
  })
  // @connect()
  class RegisterPageComponent extends React.Component {
    constructor(props) {
      super(props);

      // const { dispatch } = this.props;
      // const { $isNeedLogin, $isNeedPermission, dispatch } = this.props;
      // if ($isNeedLogin) {
      //   dispatch(globalActions.navigate.redirect({ url: "/index/index" }));
      //   return;
      // }
      if (!pageModel) {
        return;
      }

      // if (!store.asyncReducers[pageModel.name]) {
      //   injectAsyncReducer(pageModel.name, pageModel.reducers);
      // }
      if (pageModel.initialize) {
        dispatch(pageModel.actions.initState());
      }

      pageModel.runSaga();
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //   console.log("sdfsdf", this.context);
    // }

    componentDidMount() {
      // TODO: 登录、权限 判断

      // pv 埋点
      console.log("RegisterPageComponent-props>>>>", this.props);
      if (!pageModel) {
        return;
      }
      // 使用setTimeout解决跳转页面短暂空白问题
      // setTimeout(() => {
      //   const { dispatch } = this.props;
      //   if (pageModel.actions.didMount) {
      //     dispatch(pageModel.actions.didMount(this.props.location.state));
      //   }
      // }, 0);
    }

    // static getDerivedStateFromProps(...data) {
    //   console.log("-----", data);
    //   return true;
    // }

    componentWillUnmount() {
      if (!pageModel) {
        return;
      }
      const { dispatch } = this.props;
      if (pageModel.cache === false) {
        pageModel.removeReducer();
      }
      if (pageModel.actions.willUnmount) {
        dispatch(
          pageModel.actions.willUnmount({
            done: () => {
              pageModel.cancelSaga();
            },
          })
        );
      } else {
        pageModel.cancelSaga();
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          $model={pageModel}
          $globalActions={globalActions}
        />
      );
    }
  }
  // RegisterPageComponent.contextType = getThemeContext();
  return RegisterPageComponent;
};
