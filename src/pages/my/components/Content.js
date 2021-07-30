import React from "react";
import { View, Button } from "@/common/components";
import "../index.less";

// import china from "@/assets/img/logo.svg";
// import logo from "@/assets/img/logo.jpg";

export default (props) => {
  const { isLogin, userInfo, nickNameOrMoblie, goAction } = props;
  console.log("props------", props);

  return (
    <View className="mi-top-wrap">
      <View className="mi-top">
        {isLogin ? (
          <View className="mi-top-cont">
            {/* 已登录 */}
            {userInfo.faceImageUrl ? (
              <View
                className="mi-user-photo mi-sex-unman"
                onClick={() => goAction("user/info", "avatar")}
              >
                <img className="mi-user-img" src={userInfo.faceImageUrl}></img>
              </View>
            ) : (
              <View
                className="mi-user-photo"
                onClick={() => goAction("user/info", "avatar")}
              ></View>
            )}

            <View
              className="mi-user-name show-dots"
              onClick={() => goAction("user/info")}
            >
              {nickNameOrMoblie}
            </View>
            {/* <template v-if="carFullName">
              <View
                className="mi-car-info show-dots"
                onClick="editDefaultCar()"
              >
                {{ carFullName }}
              </View>
            </template>
            <View
              v-else
              className="mi-add-car flex-center-wrap"
              onClick="goAction('/webapp/car/info?serviceType=1', 'addCar')"
            >
              <svg className="svg mi-add-icon">
                <use xlink:href="/my/asset/src/style/sprite.svg#add"></use>
              </svg>
              <span>添加爱车</span>
            </View> */}
          </View>
        ) : (
          <View className="mi-top-cont">
            {/* <!-- 未登录 --> */}
            {/* <View
              className="mi-user-photo mi-sex-unman"
              onClick="goAction('login', 'avatar')"
            ></View>
            <span
              className="mi-click-login vertical-center"
              onClick="goAction('login', 'login')"
            >
              点击登录
            </span> */}
          </View>
        )}
      </View>
    </View>
  );
};
