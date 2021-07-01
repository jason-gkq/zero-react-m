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
      this.props.dispatch(
        globalActions.route.currentPage({
          pageId: this._config.pageId,
          title: this._config.name,
        })
      );
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
      console.log($pageStatus);
      return super.render();
    }
  }
  return BasePageComponent;
};
