import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ProductProvider } from "./ProductContext";
import setupMockServer from "./api/mock.server";

import App from "./App";
setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </StrictMode>,
  rootElement
);
