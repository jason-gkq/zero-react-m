import { createModel } from '@/common/redux';
import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { cookieStorage } from '@/common/cache';

export default createModel({
	name: 'login',
	state: {
		systemName: '小程序',
		pageStatus: 'success',
		navigateUrl: '',
	},
	config: {
		pageId: '10011',
		title: '登录',
		isNeedLogin: false,
		hideHeader: true,
		hideTabBar: true,
	},
	reducers: {},
	sagas: {
		*didMount({ $actions }, { payload }) {
			console.log('-------common.login.didMount:::', payload);
			if (payload.to) {
				yield put($actions.setState({ navigateUrl: payload.to }));
			}
			// yield put($actions.setState({ pageStatus: "success" }));
		},
		*requestSmsCode({ $selectors, $globalActions, $actions }) {
			const { navigateUrl } = yield select($selectors.getState);
			try {
				const user = yield axios.post(`gateway/user/smsLogin`, {
					mobile: '13800000000',
					code: '1111',
				});
				user['isLogin'] = false;
				if (user && user.user && user.user.mobile) {
					user['isLogin'] = true;
				}
				user['mobile'] = user.user && user.user.mobile;
				cookieStorage.setItem('token', user.token, Infinity, cookieStorage.getDomain());
				yield put($globalActions.user.setUser(user));
				if (navigateUrl) {
					yield put($globalActions.navigate.redirect({ url: navigateUrl }));
				} else {
					yield put($globalActions.navigate.redirect({url: "/lcbtest/index/index"}));
				}
			} catch (error) {
				cookieStorage.removeItem('token', '', cookieStorage.getDomain());
				yield put($globalActions.user.setUser({ isLogin: false }));
			}
		},
	},
	selectors: {},
});
