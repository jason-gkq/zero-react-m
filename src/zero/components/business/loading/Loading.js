import React from "react";
import { View } from "../../index";
import "./index.less";

export default (props) => {
  const { children, text, ...restProps } = props;
  return (
    <View>
      <View className="loading-wrap flex-center-wrap flex-justify-center">
        <View className="page-loading-icon page-loading-circle">
          <View className="page-loading-icon loading-animation"></View>
        </View>
        {children ? children : <span>{text}</span>}
      </View>
    </View>
  );
};
