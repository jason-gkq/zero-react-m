import AlertContainer from "./AlertContainer";
import React from "react";
import { AntModal } from "../../index";
// import ReactDom from "react-dom";
// import Portal from "../../hoc/Portal";

export default (title, content, actions = [{ text: "确定" }]) => {
  console.log("=========alert", title, content, actions);
  const alert = new AlertContainer({ title, content, actions, visible: true });
  return alert.render();
  // return AntModal.alert(title, content, actions);
  // return (
  //   <AlertContainer iner title={title} content={content} actions={actions} />
  // );
};

// class Alert extends React.Component {
//   render() {
//     const { title, content, actions = [{ text: "确定" }] } = this.props;
//     return <AlertContainer title={title} content={content} actions={actions} />;
//   }
// }

// export default Portal(Alert);
