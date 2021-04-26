import { connect } from 'react-redux';

const Connect = (ChildComponent) => {
	// !mapStateToProp && (mapStateToProp = (state) => ({ ...state }));
	const mapStateToProp = (state) =>({...state});
	const mapDispatchToProp = (dispatch) => {
		return { dispatch };
	};

	return connect(mapStateToProp, mapDispatchToProp)(ChildComponent);
};

export default Connect;
