import RegisterPage from "./registerPage";
import { globalActions } from "../redux";

export default (pageModel) => (WrappedComponent) => {
  @RegisterPage(pageModel)
  class BasePageComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      this.dispatch = props.dispatch;
      this._config = WrappedComponent.getConfig() || {};
      console.log(WrappedComponent.prototype, "BasePageComponent", props);
      // super.componentWillReceiveProps = (nextProps) => {
      //   console.log("nextProps,,,,,", nextProps);
      // };
    }
    // componentWillReceiveProps(nextProps) {
    //   // if (nextProps.location !== this.props.location) {
    //   //   // navigated!
    //   // }
    //   console.log(nextProps);
    // }
    // static getDerivedStateFromProps(nextProps) {
    //   console.log("-----", nextProps);
    //   return true;
    // }
    componentDidMount() {
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
  return BasePageComponent;
};
