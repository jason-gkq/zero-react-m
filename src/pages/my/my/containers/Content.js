import { connect } from "react-redux";
import Content from "../components/Content";
import { globalSelectors } from "@/zero/redux";

export default connect(
  (state, { $model }) => {
    const { pageStatus } = $model.selectors.getState(state);
    const { isLogin, userInfo, mobile = "" } = globalSelectors.getUser(state);
    const { myDefaultCar } = globalSelectors.app.getState(state);
    const car = myDefaultCar;
    let { nickName } = userInfo || {};
    return {
      pageStatus,
      isLogin,
      userInfo,
      nickNameOrMoblie: nickName
        ? nickName
        : mobile.slice(0, 3) + "****" + mobile.slice(7),
      carFullName:
        car && car.brandTypeId
          ? (car.brandName ? car.brandName + " " : "") +
            car.carTypeName +
            " " +
            car.yearType +
            " " +
            car.name
          : "",
    };
  },
  (dispatch, { $model, $globalActions }) => {
    return {
      addVoucher() {
        // document.documentElement.style.setProperty({ "--theme-color": "red" });
        dispatch($model.actions.setState({ pageStatus: "cccccc" }));
        dispatch($globalActions.env.changeTheme({ theme: "C" }));
      },
      goAction(url) {
        // dispatch(
        //   $globalActions.alert.show({
        //     title: "cc",
        //     content: "登录失效",
        //     actions: [
        //       { text: "取消" },
        //       {
        //         text: "确定",
        //         onClick: (e) => {
        //           console.log("aaaaaa", e);
        //         },
        //       },
        //     ],
        //   })
        // );
        // dispatch($globalActions.toast.info("test"));
        dispatch($globalActions.navigate.goTo({ url }));
      },
      goBack() {
        dispatch($globalActions.navigate.goBack());
      },
    };
  }
)(Content);
