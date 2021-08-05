import React from "react";
import ReactDOM from "react-dom";

export default function (WrappedComponent, config) {
  const div = document.createElement("div");
  document.body.appendChild(div);

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }
  const afterClose = () => {
    if (config && config.afterClose) {
      config.afterClose();
    }
    destroy();
  };
  const currentConfig = { ...config, afterClose, visible: true };

  function render(props) {
    setTimeout(() => {
      ReactDOM.render(<WrappedComponent {...props} />, div);
    });
  }

  render(currentConfig);
}
