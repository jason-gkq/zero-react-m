import attachModel from "./attachModel";
import { globalActions } from "../redux";

export default (model) => (WrappedComponent) => {
  @attachModel(model)
  class PageComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      this.dispatch = props.dispatch;
      this._config = WrappedComponent.getConfig() || {};
    }

    async componentDidMount() {
      this.dispatch(
        globalActions.route.currentPage({
          pageId: this._config.pageId,
          title: this._config.name,
        })
      );
      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }
    render() {
      return super.render();
    }
  }
  return PageComponent;
};
