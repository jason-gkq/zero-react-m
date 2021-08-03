import React, { Component } from "react";
import { BasePage } from "@/src/zero/core";
import model from "./index.model";

import Content from "./containers/Content";
@BasePage(model)
class Edit extends Component {
  constructor(props) {
    super(props);
    // console.log("Set-props----", props);
  }

  render() {
    const { $model, $globalActions } = this.props;
    return <Content $model={$model} $globalActions={$globalActions} />;
  }
}
export default Edit;
