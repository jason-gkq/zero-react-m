import React, { PureComponent } from "react";
import * as styles from "./index.less";
import { BasePage } from "@common/core"
import model from './index.model';
import Connect from '@common/redux';
import Header from '@common/components/header';

@BasePage
class Home extends PureComponent {
  static model = model;
  render(){
    return (
      <div>
        <Header/>
        {/* <PageContent/> */}
      </div>
    );
  }
}
export default Connect(Home)