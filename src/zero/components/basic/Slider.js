import React from "react";
import { View } from "./View";
class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return <View>{children}</View>;
  }
}

export default Slider;
