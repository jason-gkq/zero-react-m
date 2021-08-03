import React from "react";
import { View, Button } from "@/zero/components";
import "../index.less";
export default (props) => {
  const { loginOutAction } = props;
  return (
    <View>
      <Button onClick={loginOutAction}>编辑我的车</Button>
    </View>
  );
};
