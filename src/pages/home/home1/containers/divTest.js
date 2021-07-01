import { connect } from "react-redux";
import DivTest from "../components/divTest";

export default connect(
  (state, { $model }) => {
    const { pageStatus } = $model.selectors.getState(state);
    return { pageStatus };
  },
  (dispatch, { $model, $globalActions }) => {
    return {
      addVoucher() {
        dispatch($model.actions.setState({ pageStatus: "cccccc" }));
      },
      goTo() {
        dispatch($globalActions.navigate.goto({ url: "/home/home2" }));
      },
      goBack() {
        dispatch($globalActions.navigate.goback());
      },
    };
  }
)(DivTest);
