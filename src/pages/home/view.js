import React, { PureComponent } from "react";
import * as styles from "./index.less";
import { BasePage } from "@common/core"
import model from './index.model';

@BasePage
export default class extends PureComponent {
  static model = model;
  componentDidMount(){
    console.log('componentDidMount');
    
  }
  render(){
    console.log('model',model)
    return (
      <aside className={styles.content}>
        <div className={"middle ph100"}>
          <h2 className='colorRed'>欢迎使用XXXX系统</h2>
        </div>
      </aside>
    );
  }
}