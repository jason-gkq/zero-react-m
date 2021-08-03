import React, { Component } from "react";
import { BasePage } from "@/src/zero/core";
import model from "./index.model";

import Content from "./containers/Content";
@BasePage(model)
class Home extends Component {
  constructor(props) {
    super(props);
    // console.log("home-props----", props);
  }

  render() {
    const { $model, $globalActions, $globalSelectors } = this.props;
    return (
      <Content
        $model={$model}
        $globalActions={$globalActions}
        $globalSelectors={$globalSelectors}
      />
    );
  }
}
export default Home;
