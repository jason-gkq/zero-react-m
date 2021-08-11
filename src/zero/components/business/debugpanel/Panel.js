import React from "react";
import { View, Text, Modal } from "../../basic";
import "./index.less";

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { visible = false, onClose } = this.props;
    return (
      <Modal
        transparent={false}
        visible={visible}
        closable={true}
        animationType="slide-up"
        onClose={onClose}
        className="modalStyle"
        wrapClassName="wrapStyle"
      >
        <View>
          <Text style={{ textAlign: "center" }}>Content...</Text>
          <Text style={{ textAlign: "center" }}>Content...</Text>
        </View>
      </Modal>
    );
  }
}

export default Panel;
