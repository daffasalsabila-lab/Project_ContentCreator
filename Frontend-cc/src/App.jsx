import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Dasbor from "./pages/Dasbor";
import Alur_konten from "./pages/Alur_konten";
import Saluran from "./pages/Saluran";
import Analitik from "./pages/Analitik";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Utama yang menggunakan MainLayout (Sidebar, Header, dll) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dasbor />} />
          <Route path="/alur-konten" element={<Alur_konten />} />
          <Route path="/saluran" element={<Saluran />} />
          <Route path="/analitik" element={<Analitik />} />
        </Route>

        {/* Rute Autentikasi (Tampil penuh tanpa sidebar utama) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}