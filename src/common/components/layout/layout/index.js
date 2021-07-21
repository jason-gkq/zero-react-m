import React, { Suspense, Fragment } from 'react';
import Header from '../header';
import Footer from '../footer';
import Content from '../content';
import { PageLoading } from '@/common/components';
import { Router, Switch, Route } from 'react-router-dom';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { $routes, appConfig } = this.props;
		return (
			<div className="page-root">
				<Suspense fallback={<PageLoading />}>
					<Header />
					<Content>
						<Fragment>
							<Switch>{$routes}</Switch>
						</Fragment>
					</Content>
					<Footer appConfig={appConfig}/>
				</Suspense>
			</div>
		);
	}
}
