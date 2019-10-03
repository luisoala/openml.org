import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { mainRoutes, clearRoutes } from "./index";

import MainLayout from "../layouts/Main";
import ClearLayout from "../layouts/Clear";
import Page404 from "./Page404";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, background, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, background, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout background={background}>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  );

const Routes = () => (
    <Router>
    <Switch>
      {childRoutes(MainLayout, mainRoutes)}
      {childRoutes(ClearLayout, clearRoutes)}
      <Route
        render={() => (
          <ClearLayout>
            <Page404 />
          </ClearLayout>
        )}
      />
    </Switch>
  </Router>
);

export default Routes;