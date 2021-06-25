import React, { Suspense, Component } from "react";
import Header from "../header";
import Footer from "../footer";
import Content from "../content";

class LayoutErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    // return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    return <div className='page'>{this.props.children}</div>;
  }
}

export default class Layout extends React.Component {
  render() {
    return (
      <LayoutErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Content>{this.props.children}</Content>
          <Footer />
        </Suspense>
      </LayoutErrorBoundary>
    );
  }
}
