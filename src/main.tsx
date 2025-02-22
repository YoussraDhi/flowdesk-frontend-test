/* eslint-disable react/react-in-jsx-scope */
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "@/pages/about.tsx";
import Dashboard from "@/pages/dashboard.tsx";
import Error from "@/pages/error.tsx";
import Home from "@/pages/home.tsx";
import NavBar from "@/components/ui/NavBar.tsx";

import "./index.css";
import "./App.css";
import "./i18n.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);
