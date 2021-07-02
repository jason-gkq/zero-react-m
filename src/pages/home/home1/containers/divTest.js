import { connect } from "react-redux";
import DivTest from "../components/DivTest";

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
        dispatch($globalActions.navigate.goTo({ url: "/home/home2" }));
      },
      goBack() {
        dispatch($globalActions.navigate.goBack());
      },
    };
  }
)(DivTest);
