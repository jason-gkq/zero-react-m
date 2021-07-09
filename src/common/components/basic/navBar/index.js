import classnames from 'classnames';
import React, { Component } from 'react';
import './index.less';
import { globalSelectors, globalActions, store } from '../../../redux';


export default class NavBar extends Component {
	static defaultProps = {
        prefixCls: "basic-navbar",
        mode: "dark",
		onLeftClick: () => {
			store.dispatch(globalActions.navigate.goBack())
		},
	};
	render() {
		const {
			prefixCls,
			className,
            mode,
			children,
			icon,
			onLeftClick,
			leftContent,
			rightContent,
			...restProps
		} = this.props;
		return (
			<div {...restProps} className={classnames(className, prefixCls, `${prefixCls}-${mode}`)}>
				<div className={`${prefixCls}-left`} role="button" onClick={onLeftClick}>
					{icon ? (
						<span className={`${prefixCls}-left-icon`} aria-hidden="true">
							{icon}
						</span>
					) : null}
					{leftContent}
				</div>
				<div className={`${prefixCls}-title`}>{children}</div>
				<div className={`${prefixCls}-right`}>{rightContent}</div>
			</div>
		);
	}
}