import React from "react";
import { store, injectGlobalActions, globalActions } from "../redux";
import { history, generateRoute } from "../navigate";
import "../style/index.less";

export default (appModel) => (WrappedComponent) => {
  class RegisterAppComponent extends React.Component {
    constructor(props) {
      super(props);
      /**
       * 合并app中的action进入全局action
       */
      injectGlobalActions(appModel.action);
      /**
       * 初始化项目环境变量
       */
      store.dispatch(globalActions.env.initEnv());
      /**
       * 初始化项目运行环境信息
       */
      store.dispatch(globalActions.system.initSystem());
      /**
       * 初始化路由，并获取对应路由列表
       */
      const { state: onLunchPayload = {}, search = "" } = history.location;
      if (search) {
        search.split("&").reduce((onLunchPayload, v) => {
          if (v && v.includes("=")) {
            const temp = v.split("=");
            onLunchPayload[temp[0]] = temp[1];
          }
          return onLunchPayload;
        }, onLunchPayload);
      }
      this.state = {
        $onLunchPayload: onLunchPayload,
        $routes: generateRoute(),
      };
      /**
       * 运行app中 saga
       */
      if (appModel.initialize) {
        store.dispatch(appModel.actions.initState());
      }
      appModel.runSaga();
    }

    componentDidMount() {
      /**
       * 添加事件监听
       */
      window.addEventListener("resize", function () {
        // if(window.innerWidth <= 800) {
        //     div.style.display = 'none';
        // } else {
        //     div.style.display = 'block';
        // }
      });
      // 使用setTimeout解决跳转页面短暂空白问题
      setTimeout(() => {
        if (appModel.actions.didMount) {
          store.dispatch(appModel.actions.didMount(this.state.$onLunchPayload));
        }
      }, 0);
    }

    componentWillUnmount() {
      // window.removeEventListener("resize");
      if (appModel.actions.willUnmount) {
        store.dispatch(
          appModel.actions.willUnmount({
            done: () => {
              appModel.cancelSaga();
            },
          })
        );
      } else {
        appModel.cancelSaga();
      }
    }
    render() {
      return (
        <WrappedComponent
          {...this.state}
          $store={store}
          $model={appModel}
          $history={history}
        />
      );
    }
  }

  return RegisterAppComponent;
};
