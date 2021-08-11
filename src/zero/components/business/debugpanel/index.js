import React from "react";
import { View, Text, Modal } from "../../basic";
import Panel from "./Panel";
import Toggler from "./Toggle";
import { connect } from "react-redux";
import { globalSelectors, globalActions, store } from "../../../redux";
import Dragable from "../Dragable";

class PanelControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      pageX: 100,
      pageY: 100,
    };
    this.onToggle = this.onToggle.bind(this);
  }
  onToggle() {
    console.log("被点击了onToggle");
    this.setState({
      visible: !this.state.visible,
    });
  }
  //推拽回调函数
  setPanelPosition(left, top) {
    console.log("推拽回调函数", left, top);

    this.setState({ pageX: left, pageY: top });
  }
  render() {
    return (
      <View id="titleId">
        <View
          id="panelId"
          style={{ left: this.state.pageX, top: this.state.pageY }}
        >
          <Toggler id="contentId" onToggle={this.onToggle}></Toggler>
        </View>
        <Panel visible={this.state.visible} onClose={this.onToggle}></Panel>
        {/* <Dragable
          panelId="panelId"
          titleId="titleId"
          contentId="容器内除标题外的其他部分id"
          setPanelPosition={this.setPanelPosition.bind(this)}
        /> */}
      </View>
    );
  }
}
export default PanelControl;
// export default connect(
//   (state) => {
//     const { currentPage = {} } = globalSelectors.getRoute(state);
//     return { barSettings: currentPage.barSettings };
//   },
//   (dispatch) => {
//     return {
//       onToggle() {
//         console.log("被点击了onToggle");
//         // dispatch(globalActions.navigate.goBack());
//       },
//     };
//   }
// )(PanelControl);
