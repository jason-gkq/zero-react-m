import React from "react";
import { View, Button, Image, Text } from "@/zero/components";
import "../index.less";

// import china from "@/assets/img/logo.svg";
// import logo from "@/assets/img/logo.jpg";

export default (props) => {
  const { isLogin, userInfo, nickNameOrMoblie, goAction, carFullName } = props;
  return (
    <View className="mi-top-wrap">
      <View className="mi-top">
        {isLogin ? (
          <View className="mi-top-cont">
            {/* 已登录 */}
            {userInfo.faceImageUrl ? (
              <View
                className="mi-user-photo mi-sex-unman"
                onClick={() => goAction("/my/user/info/index")}
              >
                <Image
                  size={60}
                  className="mi-user-img"
                  src={userInfo.faceImageUrl}
                ></Image>
              </View>
            ) : (
              <View
                className="mi-user-photo"
                onClick={() => goAction("/my/user/info/index")}
              ></View>
            )}

            <View
              className="mi-user-name show-dots"
              onClick={() => goAction("/my/user/info/index")}
            >
              {nickNameOrMoblie}
            </View>
            {carFullName ? (
              <View
                className="mi-car-info show-dots"
                onClick={() => goAction("/common/car/edit/index")}
              >
                {carFullName}
              </View>
            ) : (
              <View
                className="mi-add-car flex-center-wrap"
                onClick={() => goAction()}
              >
                <Image className="mi-add-icon"></Image>
                {/* <svg className="svg mi-add-icon">
                  <use xlink:href="/my/asset/src/style/sprite.svg#add"></use>
                </svg> */}
                <Text>添加爱车</Text>
              </View>
            )}
          </View>
        ) : (
          <View className="mi-top-cont">
            {/* <!-- 未登录 --> */}
            <View
              className="mi-user-photo mi-sex-unman"
              onClick={() => goAction("/common/login/index")}
            ></View>
            <Text
              className="mi-click-login vertical-center"
              onClick={() => goAction("/common/login/index")}
            >
              点击登录
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
