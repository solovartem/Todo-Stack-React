import React from "react";
import { Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";

import Todo from "../todo/todo";
import About from "../about/about";

export default props => {
  return (
    <HashRouter>
      <Redirect from="*" to="/todos" />
      <Route path="/todos" component={Todo} />
      <Route path="/about" component={About} />
    </HashRouter>
  );
};
