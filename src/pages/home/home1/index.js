import React, { Component } from "react";
import { BasePage } from "@common/core";
import model from "./index.model";

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
