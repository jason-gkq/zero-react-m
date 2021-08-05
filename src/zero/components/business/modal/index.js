import React from "react";
import { Modal } from "antd-mobile";
import Portal from "../../hoc/protalFactory";

import AlertContainer from "./AlertContainer";

const modal = (props) => {
  const { children, ...restProps } = props;
  return <Modal {...restProps}>{children}</Modal>;
};

modal.alert = (props) => {
  console.log("content---> ", props);
  const { content: children, ...restProps } = props;
  Portal(AlertContainer, { children, ...restProps });
};

export default modal;
