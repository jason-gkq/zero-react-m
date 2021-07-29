import React, { Component } from "react";
import { connect } from "react-redux";
import * as styles from "./index.less";
import { BasePage } from "@/src/zero/core";
import model from "./index.model";
import { PageLoading, Loading, ErrorBoundary } from "@/src/zero/components";

import { globalActions } from "@/src/zero/redux";

@BasePage(model)
class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PageLoading></PageLoading>
        <Loading></Loading>
        <ErrorBoundary>
          <div className={styles.containerDiv}>333</div>
        </ErrorBoundary>
        <div className={styles.testContainer}>
          <div onClick={this.props.addVoucher} className={styles.containerDiv}>
            去登录页
          </div>
          <div onClick={this.props.goTo} className={styles.containerDiv}>
            我是一个很多字div{" "}
          </div>
          <div className={styles.containerDiv}>我是一个更多字而且第三个div</div>
        </div>
      </div>
    );
  }
}
// export default Connect(Home);

export default connect(
  (state) => {
    return state;
  },
  (dispatch) => {
    return {
      addVoucher() {
        dispatch(
          globalActions.navigate.redirect({ url: "/common/login/index" })
        );
      },
      goTo() {
        dispatch(globalActions.navigate.goTo({ url: "/home/home1" }));
      },
    };
  }
)(Index);
