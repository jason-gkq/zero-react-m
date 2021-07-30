import { connect } from "react-redux";
import Content from "../components/Content";
import { globalSelectors } from "@/common/redux";

export default connect(
  (state, { $model }) => {
    const { pageStatus } = $model.selectors.getState(state);
    const { isLogin, userInfo, mobile = "" } = globalSelectors.getUser(state);
    let { nickName } = userInfo || {};
    return {
      pageStatus,
      isLogin,
      userInfo,
      nickNameOrMoblie: nickName
        ? nickName
        : mobile.slice(0, 3) + "****" + mobile.slice(7),
    };
  },
  (dispatch, { $model, $globalActions }) => {
    return {
      addVoucher() {
        // document.documentElement.style.setProperty({ "--theme-color": "red" });
        dispatch($model.actions.setState({ pageStatus: "cccccc" }));
        dispatch($globalActions.env.changeTheme({ theme: "C" }));
      },
      goAction(url, type) {
        console.log("----", url, type);

        // dispatch($globalActions.navigate.goTo({ url: "/home/home2" }));
      },
      goBack() {
        dispatch($globalActions.navigate.goBack());
      },
    };
  }
)(Content);
