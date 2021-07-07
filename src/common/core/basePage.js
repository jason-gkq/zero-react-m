import RegisterPage from "./registerPage";
import { globalActions } from "../redux";

export default (pageModel) => (WrappedComponent) => {
  @RegisterPage(pageModel)
  class BasePageComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      this._config = WrappedComponent.getConfig() || {};
    }

    componentDidMount() {
      /**
       * 前置执行 didMount 方法；
       */
      const { dispatch } = this.props;
      if(!pageModel) { return; }
      // setTimeout(() => {
      if (pageModel.actions.didMount) {
        /* TODO 传入页面options 即可： this.props.location.state */
        dispatch(pageModel.actions.didMount(this.props.location.state || {}));
      }
      // }, 0);
      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    render() {
      return super.render();
    }
  }
  return BasePageComponent;
};
