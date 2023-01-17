import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Router>
    <GoogleOAuthProvider clientId="88991067861-dlbuok2ipt37jeo5qo7b61dttia5u0ed.apps.googleusercontent.com">
      <App tab="home" />
    </GoogleOAuthProvider>
  </Router>
);
