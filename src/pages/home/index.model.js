import { call, put, select } from 'redux-saga/effects';
import createModel from '@src/common/core/createModel';
import { createSelector } from 'reselect';

export default createModel({
    name: 'Home',
    state: {
        systemName: '小程序'
    },
    action: {
        changeName:(name)=>{
            console.log(name)
        }
    },
    reducer: {
        changeName(state,{payload}){
            return {
                ...state,
                systemName: payload
            }
        }
    },
    saga:{
        *didMount(){
            console.log('pages/home/index.model.js/saga/didMount')
        }
    },
    selector: {

    }
})