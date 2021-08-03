import React, { Component } from "react";
import { connect } from "react-redux";

import { globalSelectors, globalActions } from "../../../redux";
// import { TabBar } from '@/zero/components';
import { TabBar } from "antd-mobile";
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
      selectedTab: tabBar.list[0].key,
      hidden: false, // 是否隐藏TabBar
    };
  }

  static contextType = AppConfigContext;

  render() {
    const tabBar = this.state.tabBar;
    const { isTabBar } = this.props;
    if (!isTabBar) {
      return null;
    }
    return (
      <div className='page-footer'>
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
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background:
                        "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat",
                    }}
                  />
                }
                selectedIcon={
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background:
                        "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat",
                    }}
                  />
                }
                selected={this.state.selectedTab === tabBarItem.key} //是否选中
                onPress={() => {
                  this.setState({
                    selectedTab: tabBarItem.key,
                  });
                  this.props.barAction(tabBarItem);
                }}
              ></TabBar.Item>
            );
          })}
        </TabBar>
      </div>
    );
  }
}
