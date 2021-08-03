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
    console.log("0000", this.props);

    const {
      $routes,
      appName,
      currentPage: { hideHeader, route },
    } = this.props;
    const { tabBar } = this.context;
    let arr = [];
    ((tabBar && tabBar.list) || []).map((item) => {
      arr.push(`/${appName}` + item.pagePath);
    });
    let isTabBar = arr.includes(route);
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
        </Suspense>
      </View>
    );
  }
}
