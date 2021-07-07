import React, { Component } from "react";
import { BasePage } from "@common/core";
import model from "./index.model";
import Content from "./containers/Content";

@BasePage(model)
class Login extends Component {
    constructor(props) {
        super(props);
    }
    static getConfig() {
        return {
          pageId: "10011",
          name: "登录",
          barSettings: {
            title: { text: "登录" },
            leftItems: [{ type: 1 }],
            rightItems: [],
          },
        };
    }
    render(){
        const { $model, $globalActions } = this.props
        return (
            <Content $model={$model} $globalActions={$globalActions} />
        )
    }
}
export default Login;