import { connect } from "react-redux";
import Content from "../components/Content";
import { globalSelectors } from "@/zero/redux";

export default connect(
  (state, { $model }) => {
    const { pageStatus } = $model.selectors.getState(state);
    return { pageStatus };
  },
  (dispatch, { $model, $globalActions }) => {
    return {
      loginOutAction() {
        dispatch($model.actions.loginOutAction());
        // dispatch($globalActions.user.logout());
      },
      // addVoucher() {
      //   // document.documentElement.style.setProperty({ "--theme-color": "red" });
      //   dispatch($model.actions.setState({ pageStatus: "cccccc" }));
      //   dispatch($globalActions.env.changeTheme({ theme: "C" }));
      // },
      // goTo() {
      //   dispatch($globalActions.navigate.goTo({ url: "/home/home2" }));
      // },
      // goBack() {
      //   dispatch($globalActions.navigate.goBack());
      // },
    };
  }
)(Content);
