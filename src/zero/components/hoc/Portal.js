import React, { Component } from "react";
import ReactDOM from "react-dom";

export default function Portal(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      if (!this.node) {
        this.node = document.createElement("div");

        document.body.appendChild(this.node);
      }
    }
    //组件即将卸载时候删除dom节点
    componentWillUnmount() {
      this.node && this.node.remove();
    }
    //渲染内容
    renderContent() {
      return <WrappedComponent {...this.props} />;
    }
    render() {
      console.log("===========visible=====", this.props);

      const { visible } = this.props;
      //visible控制显示/隐藏
      if (visible)
        return (
          this.node && ReactDOM.createPortal(this.renderContent(), this.node)
        );
      else return null;
    }
  };
}
