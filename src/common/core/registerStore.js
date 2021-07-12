import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux";
import { Layout } from "../components";
import "../style/index.less";

export default (props) => {
  return (
    <Provider store={store}>
      <Layout>{props.children}</Layout>
    </Provider>
  );
};
