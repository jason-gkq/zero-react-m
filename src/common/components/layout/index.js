import React, { Suspense, Fragment } from "react";
import Header from "../header";
import Footer from "../footer";
import Content from "../content";
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='page'>
        <Suspense fallback={<div>Loading...</div>}>
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
