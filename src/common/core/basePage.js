import attachModel from './attachModel';

export default WrappedComponent => { 
    console.log('basePage/WrappedComponent-------->',WrappedComponent.model)
    @attachModel(WrappedComponent.model)
    class PageComponent extends WrappedComponent {
        constructor(props) {
            super(props);
            this.state = {
                ...this.state
            };
        }
        async componentWillMount() {
            if (super.componentWillMount) {
                super.componentWillMount();
            }
        }
        render(){
            return super.render();
        }
    }
    return PageComponent;
}

