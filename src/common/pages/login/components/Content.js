import React from 'react';
import { Text, WingBlank, WhiteSpace, NavBar, Flex, Tabs, Badge } from '@common/components';
import backBlack from '@assets/img/back-black.svg';

const styles = {
	backgroundColor: 'blue',
	headerIcon: {
		width: 17,
		height: 17,
		display: 'block',
	},
};

const tabs2 = [
	{ title: 'First Tab', sub: '1' },
	{ title: 'Second Tab', sub: '2' },
	{ title: 'Third Tab', sub: '3' },
];

export default (props) => {
	const { onLoginAction, mobile } = props;
	return (
		<div className="psl-page-content">
			<Text>Text</Text>
			<WhiteSpace height={50}>WhiteSpace</WhiteSpace>
			<WhiteSpace height={10} style={styles} />

			<WingBlank margin={16}>
				<Text>WingBlank</Text>
			</WingBlank>

			<WhiteSpace height={10} style={styles} />

			<div className="psl-tel-wrap clearfix fix-content">
				<input className="psl-tel" type="tel" placeholder="请输入手机号" value={mobile} />
			</div>
			<button className="login-btn" onClick={onLoginAction}>
				登录
			</button>

			<NavBar
				mode="light"
				icon={<img src={backBlack} style={styles.headerIcon} />}
				onLeftClick={() => console.log('onLeftClick')}
				rightContent={<Text>设置</Text>}
			>
				NavBar
			</NavBar>

			<NavBar
				mode="dark"
				icon={<img src={backBlack} style={styles.headerIcon} />}
				onLeftClick={() => console.log('onLeftClick')}
				rightContent={<Text>设置</Text>}
			>
				NavBar
			</NavBar>
			<Flex>
				<WhiteSpace>Flex</WhiteSpace>
				<WhiteSpace>Flex</WhiteSpace>
				<WhiteSpace>Flex</WhiteSpace>
			</Flex>

			<Tabs tabs={tabs2} initialPage={1} tabBarPosition="bottom" renderTab={(tab) => <span>{tab.title}</span>}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '150px',
						backgroundColor: '#fff',
					}}
				>
					Content of first tab
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '150px',
						backgroundColor: '#fff',
					}}
				>
					Content of second tab
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '150px',
						backgroundColor: '#fff',
					}}
				>
					Content of third tab
				</div>
			</Tabs>

			<Badge dot>
				<span style={{ width: '26px', height: '26px', background: '#ddd', display: 'inline-block' }} />
			</Badge>
		</div>
	);
};
