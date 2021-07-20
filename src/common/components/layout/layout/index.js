import React, { Suspense, Fragment } from "react";
import Header from "../header";
import Footer from "../footer";
import Content from "../content";
import {PageLoading} from "@/common/components";
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='page-root'>
        <Suspense fallback={<PageLoading/>}>
          <Fragment>
            <Header />
            <Content>{this.props.children}</Content>
            <Footer />
          </Fragment>
        </Suspense>
      </div>
    );
  }
}
