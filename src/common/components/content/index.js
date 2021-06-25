import React, { Component } from "react";
import * as styles from "./index.less";

class ContentErrorBoundary extends Component {
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
      return <div>页面渲染出错</div>;
    }
    return this.props.children;
  }
}

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ContentErrorBoundary>
        <div className='content'>{this.props.children}</div>
      </ContentErrorBoundary>
    );
  }
}
