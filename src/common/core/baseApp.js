/**
 * 1. 初始化store
 * 2. 设置axios拦截器
 * 3. 初始化语言包
 * 4. 定义项目入口 sdfsd
 */
import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeContext } from "./themeContext";
import { PageLoading } from '@/common/components';
import RegisterApp from "./registerApp";

const AppPage = lazy(() => import(/* webpackChunkName: 'app' */ '../components/layout/layout'));

export default (appModel) => (WrappedComponent) => {
  @RegisterApp(appModel)
  class AppComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      this.state = {
        status: "loading",
      };
    }

    componentDidMount() {
      const { $store, $onLunchPayload } = this.props;
      const unsubscribe = $store.subscribe(() => {
        const {
          env: { status },
        } = $store.getState();
        if (status) {
          this.setState({
            status: "success",
          });
          unsubscribe();
        }
      });
      if (appModel.actions.didMount) {
        setTimeout(() => {
          $store.dispatch(
            appModel.actions.didMount({
              ...$onLunchPayload,
              done: () => {
                // this.setState({
                //   status: "success",
                // });
              },
            })
          );
        }, 0);
      }
      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    renderContent() {
      const { $routes } = this.props;
      const { status } = this.state;
      switch (status) {
        case "loading":
          return <div>Loading...</div>;
        case "error":
          return <div>网络异常</div>;
        default:
          return (
            <Switch>
              <Route path='/lcbtest'>
                <AppPage $routes={$routes} appConfig={appModel.config} />
              </Route>
            </Switch>
          );
      }
    }

    render() {
      const { $store, $history, $theme } = this.props;
      return (
        <Provider store={$store}>
          <ThemeContext.Provider value={$theme}>
						<Suspense fallback={<PageLoading/>}>
              <Router history={$history}>{this.renderContent()}</Router>
            </Suspense>
          </ThemeContext.Provider>
        </Provider>
      );
    }
  }
  return AppComponent;
};
