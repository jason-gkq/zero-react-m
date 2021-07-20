import React, { Component } from 'react';
import { connect } from 'react-redux';

import { globalSelectors, globalActions, store } from '../../../redux';
import backBlack from '@/assets/img/back-black.svg';
import { Text } from '@/common/components';
import {NavBar} from "antd-mobile"

import './index.less';


class HeaderErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// 更新 state 使下一次渲染能够显示降级后的 UI
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// this.setState({
		//   error,
		//   errorInfo,
		// });
		// logErrorToMyService(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<NavBar
					mode="light"
					icon={<img src={backBlack} className="back-icon" />}
					// onLeftClick={() => console.log('onLeftClick')}
					rightContent={<Text>设置</Text>}
				>
					hasError
				</NavBar>
			);
		}
		return this.props.children;
	}
}

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { title } = this.props.currentPage;
		return (
			<HeaderErrorBoundary>
				<NavBar
					mode="light"
					icon={<img src={backBlack} className="back-icon" />}
					onLeftClick={() => this.props.onBackAction()}
				>
					{title}
				</NavBar>
			</HeaderErrorBoundary>
		);
	}
}

export default connect(
	(state) => {
		const { currentPage = {} } = globalSelectors.getRoute(state);
		return { currentPage };
	},
	(dispatch) => {
		return {
			onBackAction(){
			  dispatch(globalActions.navigate.goBack())
			}
		};
	}
)(Header);
