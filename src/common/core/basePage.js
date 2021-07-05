import RegisterPage from "./registerPage";
import { globalActions } from "../redux";

export default (pageModel) => (WrappedComponent) => {
  @RegisterPage(pageModel)
  class BasePageComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      this._config = WrappedComponent.getConfig() || {};
      // console.log("basePage-props>>>", props);
    }

    componentDidMount() {
      this.props.dispatch(
        globalActions.route.currentPage({
          pageId: this._config.pageId,
          title: this._config.name,
        })
      );
      /**
       * 前置执行 didMount 方法；
       */
      const { dispatch } = this.props;
      if (pageModel.actions.didMount) {
        dispatch(pageModel.actions.didMount(this.props.location.state));
      }
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
      const { $pageStatus } = this.props;
      // console.log($pageStatus);
      return super.render();
    }
  }
  return BasePageComponent;
};
