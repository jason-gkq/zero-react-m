/**
 * 项目启动入口
 * 1. 采用装饰器进行项目生命周期管理
 * 2. 项目全局样式编写
 */

import React from "react";
import { BaseApp } from "@/zero/core";
import model from "./app.model";
import "./app.less";

@BaseApp(model)
class App extends React.Component {
  constructor(props) {
    super(props);
  }
}

export default App;
