import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dasbor from "./pages/Dasbor";
import MainLayout from "./pages/MainLayout";
import Alur_konten from "./pages/Alur_konten";
import Channel from "./pages/Saluran";
import Analitik from "./pages/Analitik";

// Tombol saklar tema dari folder components di luar src
import ThemeToggle from "../components/ThemeToggle";

function App() {
  return (
    <BrowserRouter>
      {/* Tombol saklar tema di pojok kanan atas */}
      {/* <ThemeToggle /> */}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<MainLayout />}>
          <Route path="/Dasbor" element={<Dasbor />} />
          <Route path="/Alur_konten" element={<Alur_konten />} />
          <Route path="/saluran" element={<Channel />} />
          <Route path="/analitik" element={<Analitik />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;