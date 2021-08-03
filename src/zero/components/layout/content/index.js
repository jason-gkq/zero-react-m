import React from "react";
import { View } from "../../basic";
import "./index.less";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <View className='page-content'>{this.props.children}</View>;
  }
}
