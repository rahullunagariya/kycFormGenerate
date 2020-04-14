import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "./history";
import kycForm from "./Components/KycFormView/kycForm.js";

const CustomesRoutes = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={kycForm} />
      </Switch>
    </div>
  </Router>
);

export default CustomesRoutes;
