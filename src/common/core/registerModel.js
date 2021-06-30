import React from "react";
import { connect } from "react-redux";

export default (model) => (WrappedComponent) => {
  // 实例级别model的情况
  class TargetComponent extends WrappedComponent {
    constructor(props) {
      super(props);

      const model = this.model;
      if (!model) {
        return;
      }
      model.runSaga();
      const { dispatch } = this.props;
      if (model.initialize) {
        dispatch(model.actions.initState());
      }
      this.props.$model = model;
    }

    componentDidMount() {
      if (super.componentDidMount) {
        super.componentDidMount();
      }
      const model = this.model;
      if (!model) {
        return;
      }
      const { dispatch } = this.props;
      if (model.actions.didMount) {
        dispatch(model.actions.didMount(this.props));
      }
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
      const model = this.model;
      if (!model) {
        return;
      }
      if (model.cache === false) {
        model.removeReducer();
      }
      if (model.actions.willUnmount) {
        dispatch(
          model.actions.willUnmount({
            done: () => {
              model.cancelSaga();
            },
          })
        );
      } else {
        model.cancelSaga();
      }
    }
  }

  if (!model) {
    console.log("attatchModel/没有model");
    return connect((state) => state)(TargetComponent);
  }

  @connect((state) => state)
  class ComponentWithModel extends React.Component {
    constructor(props) {
      super(props);
      model.runSaga();
      const { dispatch } = this.props;
      if (model.initialize) {
        dispatch(model.actions.initState());
      }
    }

    componentDidMount() {
      // 使用setTimeout解决跳转页面短暂空白问题
      setTimeout(() => {
        const { dispatch } = this.props;
        if (model.actions.didMount) {
          dispatch(model.actions.didMount(this.props));
        }
      }, 0);
    }
    componentWillUnmount() {
      const { dispatch, rootTag } = this.props;
      // const pageId = TargetComponent.getConfig().id;
      // if (Config.routes && Config.routes[rootTag]) {
      // 	delete Config.routes[rootTag];
      // }
      if (model.actions.willUnmount) {
        dispatch(
          model.actions.willUnmount({
            done: () => {
              if (!Object.values(Config.routes).includes(pageId)) {
                model.cancelSaga();
              }
            },
          })
        );
      } else {
        model.cancelSaga();
        // if (!Object.values(Config.routes).includes(pageId)) {
        // 	model.cancelSaga();
        // }
      }
    }
    render() {
      return <TargetComponent {...this.props} $model={model} />;
    }
  }

  return ComponentWithModel;
};
