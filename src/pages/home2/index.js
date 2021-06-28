import React, { Component } from "react";
import { connect } from "react-redux";
import * as styles from "./index.less";
import { BasePage } from "@common/core";
import model from "./index.model";

import { globalActions } from "@common/redux";

@BasePage(model)
class Home extends Component {
  constructor(props) {
    super(props);
  }

  static getConfig() {
    return {
      pageId: "10011",
      name: "home2",
      barSettings: {
        title: { text: "修改名片" },
        leftItems: [{ type: 1 }],
        rightItems: [
          {
            text: "保存",
            onPress: "$saveMessage",
          },
        ],
      },
    };
  }

  render() {
    return (
      <div>
        {/* <PageContent/> */}
        <div className={styles.testContainer}>
          <div onClick={this.props.addVoucher} className={styles.containerDiv}>
            我是一个home2
          </div>
          <div onClick={this.props.goTo} className={styles.containerDiv}>
            我是asdfasdfdiv{" "}
          </div>
          <div className={styles.containerDiv}>我是一个更多字而且第三个div</div>
        </div>
      </div>
    );
  }
}
// export default Connect(Home);

export default connect(
  (state, ownProps) => {
    console.log("home2-ownProps", ownProps);
    return state;
  },
  (dispatch) => {
    return {
      addVoucher() {
        // store.dispatch(store.globalActions.test());
        dispatch(model.actions.addVer("dsfds"));
      },
      goTo() {
        dispatch(globalActions.navigate.goto({ url: "/home3?a=1&b=3" }));
      },
    };
  }
)(Home);
