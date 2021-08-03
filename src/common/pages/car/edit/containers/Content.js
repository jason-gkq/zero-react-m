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
      },
    };
  }
)(Content);
