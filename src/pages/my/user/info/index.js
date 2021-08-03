import React, { Component } from "react";
import { BasePage } from "@/src/zero/core";
import model from "./index.model";

import Content from "./containers/Content";
@BasePage(model)
class Info extends Component {
  constructor(props) {
    super(props);
    // console.log("Info-props----", props);
  }

  render() {
    const { $model, $globalActions } = this.props;
    return <Content $model={$model} $globalActions={$globalActions} />;
  }
}
export default Info;
