import React from "react";
import { Modal } from "antd-mobile";
import { Text, View } from "../../index";

export default class AlertContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
    this.onClose = this.onClose.bind(this);
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { actions, children, transparent, ...restProps } = this.props;
    const { visible } = this.state;
    const footer = [];
    if (actions && Array.isArray(actions) && actions.length > 0) {
      actions.reduce((footer, item) => {
        const button = {
          text: item.text || "确定",
        };
        if (item.onClick) {
          button["onPress"] = () => {
            item.onClick();
            this.onClose();
          };
        } else {
          button["onPress"] = () => {
            this.onClose();
          };
        }
        footer.push(button);
        return footer;
      }, footer);
    }

    return (
      <Modal
        {...restProps}
        transparent
        visible={visible}
        onClose={this.onClose}
        footer={footer}
        style={{
          // marginTop: title ? 8 : 0,
          paddingHorizontal: 12,
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              // color: colors.textBase,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            {children}
          </Text>
        </View>
      </Modal>
    );
  }
}
