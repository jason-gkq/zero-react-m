import React from "react";
import { connect } from "react-redux";

export default (pageModel) => (WrappedComponent) => {
  // 实例级别model的情况
  @connect((state) => state)
  class RegisterPageComponent extends React.Component {
    constructor(props) {
      super(props);
      const { dispatch } = this.props;
      if (!pageModel) {
        return;
      }
      if (pageModel.initialize) {
        dispatch(pageModel.actions.initState());
      }
      console.log("this.props", this.props);
      pageModel.runSaga();
    }

    componentDidMount() {
      // TODO: 登录、权限 判断
      if (!pageModel) {
        return;
      }
      // 使用setTimeout解决跳转页面短暂空白问题
      setTimeout(() => {
        const { dispatch } = this.props;
        if (pageModel.actions.didMount) {
          dispatch(pageModel.actions.didMount(this.props.location.state));
        }
      }, 0);
    }

    componentWillUnmount() {
      if (!pageModel) {
        return;
      }
      const { dispatch } = this.props;
      if (pageModel.actions.willUnmount) {
        dispatch(
          pageModel.actions.willUnmount({
            done: () => {
              pageModel.cancelSaga();
            },
          })
        );
      } else {
        pageModel.cancelSaga();
      }
    }
    render() {
      return (
        <WrappedComponent dispatch={this.props.dispatch} $model={pageModel} />
      );
    }
  }

  return RegisterPageComponent;
};
