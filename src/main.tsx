import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/lato";
// Supports weights 400-800
import "@fontsource-variable/eb-garamond";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App configUrl="https://raw.githubusercontent.com/performant-software/cove-collections/refs/heads/main/data/documents/on-a-portrait-of-wordsworth-by-b-r-haydon.json" />
  </StrictMode>
);
