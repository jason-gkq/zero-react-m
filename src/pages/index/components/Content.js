import React from "react";
import { View, Button, Image, Text } from "@/zero/components";
import "../index.less";

export default class Content extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Button onClick={this.props.onAction}>点击</Button>
      </View>
    );
  }
}
