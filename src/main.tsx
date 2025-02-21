/* eslint-disable react/react-in-jsx-scope */
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import "./App.css";
import "./i18n.ts";
import { Dashboard } from "./pages/dashboard.tsx";
import NavBar from "@/components/NavBar.tsx";

createRoot(document.getElementById("root")!).render(
  <div className="app-container">
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </BrowserRouter>
  </div>
);
