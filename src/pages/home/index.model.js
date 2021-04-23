import { call, put, select } from 'redux-saga/effects';
import createModel from '@src/common/core/createModel';
import { createSelector } from 'reselect';

export default createModel({
    name: 'Home',
    state: {
        systemName: '小程序'
    },
    action: {
        
    },
    reducer: {

    },
    saga:{
        *didMount(){
            console.log('didMount=========?')
        }
    },
    selector: {

    }
})