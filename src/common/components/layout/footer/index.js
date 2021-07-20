import React, { Component } from 'react';
import { connect } from 'react-redux';

import { globalSelectors } from '../../../redux';
// import { TabBar } from '@/common/components';
import { TabBar } from 'antd-mobile';
import './index.less';

class FooterErrorBoundary extends Component {
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
			return <div>error footer</div>;
		}
		return this.props.children;
	}
}

const tabBar = {
	barTintColor: '#fff', //tabbar 背景色
	unselectedTintColor: '#000', //未选中的字体颜色
	tintColor: '#fa5a4b', //选中的字体颜色
	list: [{
		title: '首页',
		key: 'home',
		selectedIcon: '',
		icon: ''
	},{
		title: '4S店',
		key: 'store',
		selectedIcon: '',
		icon: ''
	},{
		title: '4S保养',
		key: 'baoyang',
		selectedIcon: '',
		icon: ''
	},{
		title: '我的',
		key: 'my',
		selectedIcon: '',
		icon: ''
	}
],
};

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'redTab',
			hidden: false, // 是否隐藏TabBar
		};
	}

	render() {
		return (
			<FooterErrorBoundary>
				<div className="page-footer">
					<TabBar
						unselectedTintColor={tabBar.unselectedTintColor}
						tintColor={tabBar.tintColor}
						barTintColor={tabBar.barTintColor}
						hidden={this.state.hidden}
					>
						{tabBar.list.map((tabBarItem) => {
							return (
								<TabBar.Item
									title={tabBarItem.title}
									key={tabBarItem.key}
									icon={
										<div
											style={{
												width: '25px',
												height: '25px',
												background:
													'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
											}}
										/>
									}
									selectedIcon={
										<div
											style={{
												width: '25px',
												height: '25px',
												background:
													'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
											}}
										/>
									}
									selected={this.state.selectedTab === tabBarItem.key} //是否选中
									onPress={() => {
										this.setState({
											selectedTab: tabBarItem.key,
										});
									}}
								></TabBar.Item>
							);
						})}
					</TabBar>
				</div>
			</FooterErrorBoundary>
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
			dispatch,
		};
	}
)(Footer);
