import React from "react";
import { AntModal, Text, View } from "../../index";
import Portal from "../../hoc/Portal";

class AlertContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log("=====props", props);

    this.state = {
      visible: true,
    };
  }
  onClose = (callback) => {
    this.setState(
      {
        visible: false,
      },
      () => {
        setTimeout(callback, 100);
      }
    );
  };

  render() {
    console.log("======AlertContainer", this.props);

    const { title, actions, content, afterClose } = this.props;
    const footer = actions.map((button) => {
      const orginPress = button.onClick || function () {};
      button.onClick = () => {
        this.onClose(orginPress);
      };
      return button;
    });

    return (
      <AntModal
        transparent
        title={title}
        visible={this.state.visible}
        footer={footer}
        afterClose={afterClose}
        style={{
          marginTop: title ? 8 : 0,
          paddingHorizontal: 12,
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: colors.textBase,
              fontSize: 15,
              lineHeight: 20,
              textAlign: "center",
            }}
          >
            {content}
          </Text>
        </View>
      </AntModal>
    );
  }
}
export default Portal(AlertContainer);
