import React, { Component } from "react";
import { connect } from "react-redux";

import { globalSelectors, globalActions } from "../../../redux";
// import { TabBar } from '@/zero/components';
import { TabBar } from "antd-mobile";
import "./index.less";

class FooterErrorBoundary extends Component {
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
      return <div>error footer</div>;
    }
    return this.props.children;
  }
}
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabBar: props.appConfig.tabBar,
      selectedTab: props.appConfig.tabBar.list[0].key,
      hidden: false, // 是否隐藏TabBar
    };
  }

  render() {
    const tabBar = this.state.tabBar;
    const { isTabBar } = this.props;
    if (!isTabBar) {
      return null;
    }
    return (
      <FooterErrorBoundary>
        <div className='page-bottom'>
          <TabBar
            unselectedTintColor={tabBar.unselectedTintColor}
            tintColor={tabBar.tintColor}
            barTintColor={tabBar.barTintColor}
            hidden={this.state.hidden}
          >
            {tabBar.list.map((tabBarItem) => {
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
      </FooterErrorBoundary>
    );
  }
}

export default connect(
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
)(Footer);
