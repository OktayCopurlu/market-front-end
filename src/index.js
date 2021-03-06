import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./provider/auth0-provider-with-history";
import Compose from "./provider/compose";
import { ContextProvider } from "./context/context";
import { ProductContextProvider } from "./context/productContext";
import loading from "./store/Loading.svg"
ReactDOM.render(
  <Compose components={[Router, Auth0ProviderWithHistory, ProductContextProvider, ContextProvider]}>
   <Suspense fallback={<h3 className="m-auto"><img className="m-auto" src={loading} alt="Loading..."/></h3>}><App /></Suspense>
  </Compose>,
  document.getElementById("root")
);

