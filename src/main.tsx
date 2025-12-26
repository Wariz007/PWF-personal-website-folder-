import { createRoot } from "react-dom/client";
import Root from "./Root.tsx";
import "./styles/main.scss";
import { BrowserRouter } from "react-router-dom";

const base = import.meta.env.BASE_URL; // <-- dynamic base

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={base}>
    <Root />
  </BrowserRouter>
);