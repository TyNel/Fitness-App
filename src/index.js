import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Store from "./Store";
import { ToastContainer } from "react-toastify";
import * as serviceWorker from "./serviceWorkerRegistration";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Store>
        <App />
        <ToastContainer
          theme={"colored"}
          position={"bottom-left"}
          autoClose={1250}
          closeOnClick={true}
        />
      </Store>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.register();
