import RegisterModel from "./registerModel";
import { globalActions } from "../redux";

export default (model) => (WrappedComponent) => {
  @RegisterModel(model)
  class PageComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      this.dispatch = props.dispatch;
      this._config = WrappedComponent.getConfig() || {};
      // console.log(WrappedComponent.prototype);
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
