import React from "react";
import { connect } from "react-redux";

import {
  injectAsyncReducer,
  store,
  globalActions,
  globalSelectors,
} from "../redux";

export default (pageModel) => (WrappedComponent) => {
  // 实例级别model的情况
  // @connect((state) => ({
  //   $pageStatus: pageModel.selectors.getState(state).pageStatus,
  // }))
  // @connect((state) => state)
  class TargetComponent extends WrappedComponent {
    constructor(props) {
      super(props);
    }

    // TODO: 登录、权限 判断
    componentDidMount() {
      const { $isNeedLogin, $isNeedPermission, dispatch } = this.props;
      if ($isNeedLogin) {
        dispatch(globalActions.navigate.redirect({ url: "/index/index" }));
        return;
      }

      super.componentDidMount();
    }
  }

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

      const { dispatch } = this.props;

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

    componentDidMount() {
      const pageConfig = WrappedComponent.getConfig();
      this.props.dispatch(
        globalActions.route.currentPage({
          pageId: pageConfig.pageId,
          title: pageConfig.name,
        })
      );
      // pv 埋点
      // console.log("RegisterPageComponent-props>>>>", this.props);
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
      return (
        <TargetComponent
          {...this.props}
          $model={pageModel}
          $globalActions={globalActions}
        />
      );
    }
  }
  return RegisterPageComponent;
};
