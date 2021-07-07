import React, { Component } from "react";
import { connect } from "react-redux";

import { getRoute } from "../../redux";
import * as styles from "./index.less";
import backBlack from "@assets/img/back-black.svg";

class HeaderErrorBoundary extends Component {
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
      return (
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerContentLeft}>
              <img src={backBlack} className={styles.headerIcon} />
            </div>
            <div className={styles.headerContentTitle}>乐车邦</div>
            <div
              className={[styles.headerContentRight]}
            ></div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { title } = this.props.currentPage;
    return (
      <HeaderErrorBoundary>
        <div className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.headerContentLeft}>
                <img src={backBlack} className={styles.headerIcon} />
              </div>
              <div className={[styles.headerContentTitle, styles.showDots]}>{title}</div>
              <div
                className={[styles.headerContentRight]}
              ></div>
            </div>
        </div>
      </HeaderErrorBoundary>
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
)(Header);
