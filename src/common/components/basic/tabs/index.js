import * as React from 'react';
import {
  DefaultTabBar as RMCDefaultTabBar,
  TabBarPropsType,
  Tabs as RMCTabs,
} from 'rmc-tabs';
import './index.less';

export class DefaultTabBar extends RMCDefaultTabBar {
    static defaultProps = {
      ...RMCDefaultTabBar.defaultProps,
      prefixCls: 'basic-tabs-default-bar',
    };
}

export default class Tabs extends React.PureComponent{
    static DefaultTabBar = DefaultTabBar;

    static defaultProps = {
        prefixCls: 'basic-tabs',
    };

    renderTabBar = (props) => {
        const { renderTab } = this.props;
        return <DefaultTabBar {...props} renderTab={renderTab} />;
    }

    render() {
        return <RMCTabs renderTabBar={this.renderTabBar} {...this.props} />;
    }
}