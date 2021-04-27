import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ProductProvider } from "./ProductContext";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

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
