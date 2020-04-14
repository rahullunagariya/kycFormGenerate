import React from "react";
import ReactDOM from "react-dom";
import CustomRoutes from "./routes";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducer from "./myReducers/index";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const mystore = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={mystore}>
    <CustomRoutes />
  </Provider>,
  document.getElementById("root")
);
