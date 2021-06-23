import React from "react";
// import "./app.css";
import "./app.less";
import { BaseApp } from "@common/core";
import model from "./app.model";

@BaseApp(model)
class App extends React.Component {
  constructor(props) {
    super(props);
  }
}

export default App;
