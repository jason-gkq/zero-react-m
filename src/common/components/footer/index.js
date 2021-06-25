import React, { Component } from "react";
import { connect } from "react-redux";

import { getRoute } from "../../redux";
import * as styles from "./index.less";

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
    this.state = {};
  }
  render() {
    return (
      <FooterErrorBoundary>
        <div className='footer'>footer</div>
      </FooterErrorBoundary>
    );
  }
}

export default connect(
  (state) => {
    const { currentPage = {} } = getRoute(state);
    return { currentPage };
  },
  (dispatch) => {
    return {
      dispatch,
    };
  }
)(Footer);
