import React from "react";
import { store, injectGlobalActions, globalActions } from "../redux";
import { setAxiosBase } from "../net";
import { history, generateRoute } from "../navigate";
import "../style/index.less";

export default (model) => (WrappedComponent) => {
  class RegisterAppComponent extends React.Component {
    constructor(props) {
      super(props);
      /**
       * 合并app中的action进入全局action
       */
      injectGlobalActions(model.action);
      /**
       * 初始化项目环境变量
       */
      store.dispatch(globalActions.env.initEnv());
      /**
       * 初始化项目运行环境信息
       */
      store.dispatch(globalActions.system.initSystem());
      /**
       * 设置axios拦截器
       */
      setAxiosBase();
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
      if (model.initialize) {
        store.dispatch(model.actions.initState());
      }
      model.runSaga();
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
        if (model.actions.didMount) {
          store.dispatch(model.actions.didMount(this.state.$onLunchPayload));
        }
      }, 0);
    }

    componentWillUnmount() {
      // window.removeEventListener("resize");
      if (model.actions.willUnmount) {
        store.dispatch(
          model.actions.willUnmount({
            done: () => {
              if (!Object.values(Config.routes).includes(pageId)) {
                model.cancelSaga();
              }
            },
          })
        );
      } else {
        model.cancelSaga();
      }
    }
    render() {
      return (
        <WrappedComponent
          {...this.state}
          $store={store}
          $model={model}
          $history={history}
        />
      );
    }
  }

  return RegisterAppComponent;
};
