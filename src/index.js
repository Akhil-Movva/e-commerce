import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ProductProvider } from "./ProductContext";
import setupMockServer from "./api/mock.server";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ProductProvider>
      <Router>
        <App />
      </Router>
    </ProductProvider>
  </StrictMode>,
  rootElement
);
