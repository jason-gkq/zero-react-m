import React from "react";
// import "./app.css"; RegisterApp,
import "./app.less";
import { BaseApp } from "@common/core";
import model from "./app.model";

// @RegisterApp(model)
@BaseApp(model)
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  onLunch() {}
}

export default App;
