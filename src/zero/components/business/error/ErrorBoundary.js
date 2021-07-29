import React, { Component } from "react";
import { View, Text } from "../../index";
// import { Icon } from 'antd';

// 错误边界处理
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { errorInfo } = this.state;
    return errorInfo ? (
      <View className="middle ph100">
        <Text className="colorRed">页面崩溃！</Text>
      </View>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
