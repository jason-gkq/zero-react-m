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
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.headerContentBtns}>
                <img src={backBlack} className={styles.headerIcon} />
              </div>
              <div className={styles.headerContentTitle}>乐车邦</div>
              <div
                className={[styles.headerContentBtns, styles.headerRight]}
              ></div>
            </div>
          </div>
          <div className={styles.headerPlaceholder}></div>
        </div>
      );
    }
    return this.props.children;
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.currentPage.title,
    };
  }
  render() {
    const { title } = this.state;
    return (
      <HeaderErrorBoundary>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.headerContentBtns}>
                <img src={backBlack} className={styles.headerIcon} />
              </div>
              <div className={styles.headerContentTitle}>{title}</div>
              <div
                className={[styles.headerContentBtns, styles.headerRight]}
              ></div>
            </div>
          </div>
          <div className={styles.headerPlaceholder}></div>
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
