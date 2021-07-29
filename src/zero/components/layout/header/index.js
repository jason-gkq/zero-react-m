import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { globalSelectors, globalActions, store } from "../../../redux";
import backBlack from "@/assets/img/back-black.svg";
import { Text, View } from "../../index";
import { NavBar } from "antd-mobile";
import PropTypes from "prop-types";

import "./index.less";

/**
 * TabBar页面：默认隐藏返回按钮
 * 其他页面配置在index.model.js/config 下配置：
 * 具体参数信息：
 * barSettings:{
 *  left:[{
 *    type: 1, //1：展示返回按钮
 *    hide: true, // 默认false, 需要隐藏左侧按钮配置为true
 *    onClick: ()=>{}//页面需要自定义返回功能时可配，默认返回上一页
 *  }],
 *  title:'页面标题',
 *  right: [{
 *    icon: <img src={backBlack} className="back-icon" /> // 自定义右侧图标,需要引入React
 *    text: '设置', // 自定义右侧文案
 *    onClick: ()=>{} // 自定义右侧按钮功能
 *  }]
 * }
 *
 * */

const itemProps = {
  text: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export class BarItem extends PureComponent {
  static propTypes = itemProps;
  static defaultProps = {
    onClick: () => {},
  };

  render() {
    const { icon, onClick, text, hide } = this.props;
    if (hide) {
      return null;
    }
    return (
      <View onClick={onClick}>
        {icon}
        {text && <Text className="right-text">{text}</Text>}
      </View>
    );
  }
}

const typeSettings = {
  1: {
    icon: <img src={backBlack} className="back-icon" />,
    text: "",
    onClick: () => {
      store.dispatch(globalActions.navigate.goBack());
    },
  },
};

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderBarItems(items) {
    if (!items || !items.length) {
      return null;
    }
    return items.map((item, index) => {
      const defaultProps = typeSettings[item.type] || {};
      const props = {
        ...defaultProps,
        ...item,
      };
      return <BarItem {...props} key={index} />;
    });
  }
  render() {
    const { isTabBar, barSettings } = this.props;
    if (!barSettings) {
      return null;
    }
    const {
      title,
      left = [{ type: 1, hide: false }],
      right = [],
    } = barSettings;
    return (
      <View className="page-header">
        <NavBar
          mode="light"
          icon={!isTabBar && this.renderBarItems(left)}
          rightContent={this.renderBarItems(right)}
        >
          {title}
        </NavBar>
      </View>
    );
  }
}

export default connect(
  (state) => {
    const { currentPage = {} } = globalSelectors.getRoute(state);
    return { barSettings: currentPage.barSettings };
  },
  (dispatch) => {
    return {
      // onBackAction() {
      //   console.log("被点击了onBackAction");
      //   dispatch(globalActions.navigate.goBack());
      // },
    };
  }
)(Header);
