import React, { Component } from "react";
// import { connect } from "react-redux";
// import * as styles from "./index.less";
import { BasePage } from "@common/core";
import model from "./index.model";

// import { globalActions } from "@common/redux";

import DivTest from "./containers/divTest";
@BasePage(model)
class Home extends Component {
  constructor(props) {
    super(props);
    // console.log("home-props----", props);
  }

  static getConfig() {
    return {
      pageId: "10011",
      name: "home",
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
    const { $model, $globalActions } = this.props;
    return <DivTest $model={$model} $globalActions={$globalActions} />;
  }
}
export default Home;

// export default connect(
//   (state) => {
//     return state;
//   },
//   (dispatch) => {
//     return {
//       addVoucher() {
//         dispatch(model.action.changeName("dsfds"));
//       },
//       goTo() {
//         dispatch(globalActions.navigate.goto({ url: "/home/home2" }));
//       },
//     };
//   }
// )(Home);
