import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./provider/auth0-provider-with-history";
import Compose from "./provider/compose";
import { ContextProvider } from "./context/context";
import { ProductContextProvider } from "./context/productContext"
ReactDOM.render(
  <Compose components={[Router, Auth0ProviderWithHistory, ProductContextProvider, ContextProvider]}>
    <App />
  </Compose>,
  document.getElementById("root")
);
