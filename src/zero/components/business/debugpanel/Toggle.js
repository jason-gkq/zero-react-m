import React from "react";
import debug from "@/assets/img/debug.png";
import { View, Image } from "../../basic/index";

const styles = {
  wrapper: {
    position: "absolute",
    bottom: 150,
    borderWidth: 1,
    borderColor: "#ff0000",
    borderStyle: "solid",
  },
  image: {
    width: 40,
    height: 40,
  },
};

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onToggle } = this.props;
    return (
      <View style={styles.wrapper} onClick={onToggle}>
        <Image style={styles.image} src={debug}></Image>
      </View>
    );
  }
}

export default Toggle;
