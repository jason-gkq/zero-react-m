import React, { Suspense, Fragment } from "react";
import Header from "./header";
import Footer from "./footer";
import Content from "./content";
import { Switch } from "react-router-dom";
import { globalSelectors, globalActions } from "../../redux";
import { connect } from "react-redux";
import { PageLoading, ErrorBoundary } from "../business";
import { View } from "../basic";
class LayoutErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // this.setState({
    //   error,
    //   errorInfo,
    // });
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            height: "100vh",
          }}
        >
          <ErrorBoundary msg={"网络异常，请刷新重试"} />
        </View>
      );
    }
    return this.props.children;
  }
}

@connect((state) => {
  const { currentPage = {} } = globalSelectors.getRoute(state);
  const env = globalSelectors.getEnv(state);
  return { currentPage, appName: env.appName };
})
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const {
      $routes,
      $history,
      appConfig,
      appName,
      currentPage: { hideHeader },
    } = this.props;
    const tabBar = appConfig.tabBar;
    const path = $history.location.pathname;
    let arr = [];
    tabBar.list.map((item) => {
      arr.push(`/${appName}` + item.pagePath);
    });
    let isTabBar = arr.includes(path);
    return (
      <LayoutErrorBoundary>
        <View className='page-root'>
          <Suspense fallback={<PageLoading />}>
            {!hideHeader && <Header isTabBar={isTabBar} />}
            <Content isTabBar={isTabBar}>
              <Fragment>
                <Switch>{$routes}</Switch>
              </Fragment>
            </Content>
            <Footer appConfig={appConfig} isTabBar={isTabBar} />
          </Suspense>
        </View>
      </LayoutErrorBoundary>
    );
  }
}
