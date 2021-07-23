import React, { Suspense, Fragment } from 'react';
import Header from './header';
import Footer from './footer';
import Content from './content';
import { PageLoading } from '@/common/components';
import { Router, Switch, Route } from 'react-router-dom';
import { globalSelectors, globalActions, store } from '../../redux';
import { connect } from 'react-redux';

class Layout extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const {
			$routes,
			$history,
			appConfig,
			appName,
			currentPage: { hideHeader },
		} = this.props;
		const tabBar = appConfig.tabBar;
		const path = $history.location.pathname;
		let arr = [];
		tabBar.list.map((item) => {
			arr.push(`/${appName}` + item.pagePath);
		});
		let isTabBar = arr.includes(path);
		return (
			<div className="page-root">
				<Suspense fallback={<PageLoading />}>
					{!hideHeader && <Header isTabBar={isTabBar} />}
					<Content isTabBar={isTabBar}>
						<Fragment>
							<Switch>{$routes}</Switch>
						</Fragment>
					</Content>
					<Footer appConfig={appConfig} isTabBar={isTabBar} />
				</Suspense>
			</div>
		);
	}
}

export default connect(
	(state) => {
		const { currentPage = {} } = globalSelectors.getRoute(state);
		const env = globalSelectors.getEnv(state);
		return { currentPage, appName: env.appName };
	},
	(dispatch) => {
		return {};
	}
)(Layout);
