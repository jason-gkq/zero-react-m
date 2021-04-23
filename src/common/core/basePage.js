import attachModel from './attachModel';

export default WrappedComponent => { 
    console.log('WrappedComponent-------->',WrappedComponent)
    @attachModel(WrappedComponent.model)
    class PageComponent extends WrappedComponent {
        constructor(props) {
            super(props);
            this.state = {
                ...this.state
            };
        }
        render(){
            return super.render();
        }
    }
    return PageComponent;
}

