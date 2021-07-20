import React, { Component } from "react";
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
      <div className='middle ph100'>
        <h2 className='colorRed'>页面崩溃！</h2>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
