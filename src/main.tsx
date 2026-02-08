import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { LenisProvider } from "./providers/LenisProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LenisProvider>
      <App />
    </LenisProvider>
  </React.StrictMode>,
);
