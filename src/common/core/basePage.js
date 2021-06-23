import attachModel from "./attachModel";

export default (model) => (WrappedComponent) => {
  @attachModel(model)
  class PageComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      this.state = {
        ...this.state,
      };
    }
    async componentDidMount() {
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
