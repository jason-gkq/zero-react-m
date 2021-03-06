import React, { Suspense, Fragment } from "react";
import Header from "./header";
import Footer from "./footer";
import Content from "./content";
import { Switch } from "react-router-dom";
import { globalSelectors } from "../../redux";
import { connect } from "react-redux";
import { PageLoading, Debugpanel } from "../business";
import { View } from "../basic";
import "./index.less";
import { AppConfigContext } from "../../core/configureContext";

@connect((state) => {
  const { currentPage = {} } = globalSelectors.getRoute(state);
  const env = globalSelectors.getEnv(state);
  return { currentPage, appName: env.appName };
})
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = AppConfigContext;

  render() {
    const {
      $routes,
      currentPage: { hideHeader, isTabBar },
    } = this.props;
    return (
      <View className="page-root">
        <Suspense fallback={<PageLoading />}>
          {!hideHeader && <Header isTabBar={isTabBar} />}
          <Content isTabBar={isTabBar}>
            <Fragment>
              <Switch>{$routes}</Switch>
            </Fragment>
          </Content>
          <Footer isTabBar={isTabBar} />
          <Debugpanel />
        </Suspense>
      </View>
    );
  }
}
