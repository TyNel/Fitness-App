import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Store from "./Store";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Store>
        <App />
      </Store>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
