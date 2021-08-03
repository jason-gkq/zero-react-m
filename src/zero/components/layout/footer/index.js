import React, { Component } from "react";
import { connect } from "react-redux";

import { globalSelectors, globalActions } from "../../../redux";
import { TabBar, View } from "../../index";
import "./index.less";
import { AppConfigContext } from "../../../core/configureContext";

@connect(
  (state) => {
    const { currentPage = {} } = globalSelectors.getRoute(state);
    const env = globalSelectors.getEnv(state);
    return { currentPage, appName: env.appName };
  },
  (dispatch) => {
    return {
      barAction(tabBarItem) {
        dispatch(
          globalActions.route.currentPage({
            selectedTabBarKey: tabBarItem.key,
          })
        );
        dispatch(globalActions.navigate.goTo({ url: tabBarItem.pagePath }));
      },
    };
  }
)
export default class extends Component {
  constructor(props, context) {
    super(props);
    const { tabBar } = context;
    this.state = {
      tabBar,
      hidden: false, // 是否隐藏TabBar
    };
  }

  static contextType = AppConfigContext;

  render() {
    const tabBar = this.state.tabBar;
    const {
      isTabBar,
      currentPage: { selectedTabBarKey },
    } = this.props;
    if (!isTabBar) {
      return null;
    }
    return (
      <View className="page-footer">
        <TabBar
          unselectedTintColor={tabBar.unselectedTintColor}
          tintColor={tabBar.tintColor}
          barTintColor={tabBar.barTintColor}
          hidden={this.state.hidden}
        >
          {((tabBar && tabBar.list) || []).map((tabBarItem) => {
            return (
              <TabBar.Item
                title={tabBarItem.title}
                key={tabBarItem.key}
                icon={
                  <View
                    style={{
                      width: "25px",
                      height: "25px",
                      background:
                        "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
                    }}
                  />
                }
                selectedIcon={
                  <View
                    style={{
                      width: "25px",
                      height: "25px",
                      background:
                        "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat",
                    }}
                  />
                }
                selected={selectedTabBarKey === tabBarItem.key} //是否选中
                onPress={() => {
                  this.props.barAction(tabBarItem);
                }}
              ></TabBar.Item>
            );
          })}
        </TabBar>
      </View>
    );
  }
}
