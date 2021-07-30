import React from "react";
import { View, Button } from "@/common/components";
import "../index.less";

// import china from "@/assets/img/logo.svg";
// import logo from "@/assets/img/logo.jpg";

export default (props) => {
  const { loginOutAction } = props;
  return (
    <View>
      <Button onClick={loginOutAction}>退出登录</Button>
    </View>
  );
};
