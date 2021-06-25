import React, { Component } from "react";
import { connect } from "react-redux";
import * as styles from "./index.less";
import { BasePage } from "@common/core";
import model from "./index.model";
// import Connect from "@common/redux";
// import { store } from "@common/redux/configureStore";
@BasePage(model)
class Home extends Component {
  constructor(props) {
    super(props);
  }

  static getConfig() {
    return {
      pageId: "10011",
      name: "AppCardData",
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
            我是一个div
          </div>
          <div className={styles.containerDiv}>我是一个很多字div </div>
          <div className={styles.containerDiv}>我是一个更多字而且第三个div</div>
        </div>
      </div>
    );
  }
}
// export default Connect(Home);

export default connect(
  (state) => {
    // const { activeTab, headerTabs} = model.selector.getState(state);
    // return {
    //     activeTab, headerTabs
    // };
    return state;
  },
  (dispatch) => {
    return {
      addVoucher() {
        // store.dispatch(store.globalActions.test());
        dispatch(model.action.changeName("dsfds"));
      },
    };
  }
)(Home);
