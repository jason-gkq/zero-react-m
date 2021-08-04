import { AntModal } from "../../index";
import React from "react";
import alert from "./Alert";

const Modal = (props) => {
  return <AntModal {...props}></AntModal>;
};
Modal.alert = alert;

export default Modal;
