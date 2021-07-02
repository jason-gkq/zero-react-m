import React, { Suspense, Fragment } from "react";
import Header from "../header";
import Footer from "../footer";
import Content from "../content";

import { ThemeContext } from "../../core/themeContext";

export default class Layout extends React.Component {
  render() {
    console.log(this.context);
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
Layout.contextType = ThemeContext;
