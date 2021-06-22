import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as styles from "./index.less";
import { BasePage } from "@common/core";
import model from "./index.model";
import Connect from "@common/redux";
import Header from "@common/components/header";
import { store } from "@common/redux/store";
// @BasePage
class Home extends PureComponent {
  static model = model;
  render() {
    return (
      <div>
        <Header />
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
        store.dispatch(store.globalActions.test());
        dispatch(model.action.changeName("dsfds"));
      },
    };
  }
)(Home);
