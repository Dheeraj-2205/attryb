import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LoginContextProvider from "./components/context/LoginContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <LoginContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginContextProvider>
  </React.StrictMode>
);
