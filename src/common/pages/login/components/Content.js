import React from "react";
import {
  Button,
  InputItem,
  Text,
  PageLoading,
  Loading,
  View,
} from "@/src/zero/components";

export default (props) => {
  const { onLoginAction, mobile } = props;
  return (
    <div className="psl-page-content">
      <div className="psl-tel-wrap clearfix fix-content">
        <InputItem
          className="psl-tel"
          type="phone"
          placeholder="请输入手机号"
          value={mobile}
        />
      </div>
      <div className="flex-center-wrap flex-justify-content psl-code-getcode clearfix">
        <InputItem
          className="psl-code"
          type="phone"
          placeholder="请输入验证码"
          value={mobile}
        />
        <Button className="psl-getcode fix-content">获取验证码</Button>
      </div>
      <Button className="login-btn" onClick={onLoginAction}>
        登录
      </Button>
    </div>
  );
};
