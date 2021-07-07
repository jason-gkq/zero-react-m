import React from "react";
import * as styles from "../index.less";

export default (props) => {
  const {onLoginAction, mobile} = props;
  return (
    <div className="psl-page-content">
      <div className="psl-tel-wrap clearfix fix-content">
        <input className="psl-tel" type="tel" placeholder="请输入手机号" value={mobile}/>
      </div>
      <button className="login-btn" onClick={onLoginAction}>登录</button>
    </div>
  );
};
