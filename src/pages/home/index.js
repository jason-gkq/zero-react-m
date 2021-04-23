import React, { PureComponent } from "react";
import * as styles from "./index.less";
import { BasePage } from "@common/core"
import model from './index.model';
import Connect from '@common/redux';

@BasePage
class Home extends PureComponent {
  static model = model;
  render(){
    console.log('this.propsthis.props',this.props);
    return (
      <aside className={styles.content}>
        <div className={"middle ph100"}>
          <h2 className='colorRed'>欢迎使用XXXX系统</h2>
        </div>
      </aside>
    );
  }
}
export default Connect(Home)