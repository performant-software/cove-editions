import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/lato";
// Supports weights 400-800
import "@fontsource-variable/eb-garamond";
import config from "../data/test-config.json";
import about from "../data/test-about-config.json";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App config={config} about={about} />
  </StrictMode>
);
