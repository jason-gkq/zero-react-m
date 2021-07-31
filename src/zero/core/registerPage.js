import React from "react";
import { connect } from "react-redux";
import { globalActions, globalSelectors } from "../redux";

import { AppConfigContext } from "./configureContext";

export default (pageModel) => (WrappedComponent) => {
  const mapStateToProps = (state, { location }) => {
    const { pageStatus } = pageModel.selectors.getState(state);
    const { isLogin: $isLogin } = globalSelectors.getUser(state);
    const { pathname: $route, state: $payload = {} } = location;

    return {
      $pageStatus: pageStatus,
      $route,
      $payload,
      $isLogin,
    };
  };

  class RegisterPageComponent extends React.Component {
    constructor(props, context) {
      super(props);

      const { dispatch, $route, $payload, $isLogin } = this.props;

      let { isNeedLogin, title } = context;

      if (pageModel.config && Reflect.has(pageModel.config, "isNeedLogin")) {
        isNeedLogin = pageModel.config.isNeedLogin;
      }
      if (pageModel.config && Reflect.has(pageModel.config, "title")) {
        title = pageModel.config.title;
      }
      document.title = title;
      const { hideHeader = false, barSettings = null, pageId } =
        pageModel.config || {};
      if (!pageId) {
        console.warn(`页面 ${$route} 未配置 pageId，请找数据组申请pageId`);
      }
      dispatch(
        globalActions.route.currentPage({
          route: $route,
          payload: $payload,
          title,
          pageId,
          hideHeader,
          barSettings,
        })
      );

      /* 判断登录跳转 */
      if (isNeedLogin && !$isLogin) {
        dispatch(
          globalActions.navigate.redirect({
            url: $route.endsWith("/common/login/index")
              ? `/common/login/index?to=${encodeURIComponent("/index/index")}`
              : `/common/login/index?to=${encodeURIComponent($route)}`,
            payload: $payload,
          })
        );
        return;
      }
      if (!pageModel) {
        return;
      }

      if (pageModel.initialize) {
        dispatch(pageModel.actions.initState());
      }

      pageModel.runSaga();
    }

    componentDidMount() {
      if (!pageModel) {
        return;
      }
    }

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
      const { ...restProps } = this.props;

      return (
        <WrappedComponent
          {...restProps}
          $model={pageModel}
          $globalActions={globalActions}
          $globalSelectors={globalSelectors}
        />
      );
    }
  }
  RegisterPageComponent.contextType = AppConfigContext;
  return connect(mapStateToProps)(RegisterPageComponent);
};
