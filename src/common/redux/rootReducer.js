import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import modelConfig from '@src/app/index.model';
// let reducer = {};

// reducer[modelConfig.name] = handleActions(modelConfig.reducers, modelConfig.state);


// const rootReducer = combineReducers({
// 	...reducer,
// });
// console.log('rootReducer----->',rootReducer);

export default modelConfig.reducers;
