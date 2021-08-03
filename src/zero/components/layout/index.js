import React, { Suspense, Fragment } from "react";
import Header from "./header";
import Footer from "./footer";
import Content from "./content";
import { Switch } from "react-router-dom";
import { globalSelectors } from "../../redux";
import { connect } from "react-redux";
import { PageLoading } from "../business";
import { View } from "../basic";
import "./index.less";
import { AppConfigContext } from "../../core/configureContext";

@connect((state) => {
  const { currentPage = {}, location } = globalSelectors.getRoute(state);
  const env = globalSelectors.getEnv(state);
  return { currentPage, appName: env.appName, location };
})
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = AppConfigContext;

  render() {
    const {
      $routes,
      $history,
      appName,
      currentPage: { hideHeader },
    } = this.props;
    const { tabBar } = this.context;
    const path = $history.location.pathname;
    let arr = [];
    ((tabBar && tabBar.list) || []).map((item) => {
      arr.push(`/${appName}` + item.pagePath);
    });
    let isTabBar = arr.includes(path);
    return (
      <View className='page-root'>
        <Suspense fallback={<PageLoading />}>
          {!hideHeader && <Header isTabBar={isTabBar} />}
          <Content isTabBar={isTabBar}>
            <Fragment>
              <Switch>{$routes}</Switch>
            </Fragment>
          </Content>
          <Footer isTabBar={isTabBar} />
        </Suspense>
      </View>
    );
  }
}
