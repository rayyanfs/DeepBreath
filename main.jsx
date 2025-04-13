import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PointsProvider } from "../contexts/PointsContext.jsx";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PointsProvider>
        <App />
      </PointsProvider>
    </BrowserRouter>
  </StrictMode>
);
