import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Dasbor from "./pages/Dasbor";
import Alur_konten from "./pages/Alur_konten";
import Saluran from "./pages/Saluran";
import Analitik from "./pages/Analitik";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PengeditIndexPage from "./pages/pengedit/PengeditIndexPage";
import Role from "./middleware/Role";
import KreatorSamping from "./pages/kreator/SampingKreator";
import PengeditSamping from "./pages/pengedit/PengeditSamping";
import AdminSamping from "./pages/admin/SampingAdmin";
import AdminIndexPage from "./pages/admin/AdminIndexPage";
import KreatorIndexPage from "./pages/kreator/KreatorIndexPage";
import KreatorLayout from "./pages/kreator/KreatorLayout";
import PengeditLayout from "./pages/pengedit/PengeditLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import KreatorSaluran from "./pages/kreator/KreatorSaluran";
import AdminSaluran from "./pages/admin/AdminSaluran";

export default function App() {
  return (
    <BrowserRouter> 
      <Routes>
        {/* Rute Utama yang menggunakan MainLayout (Sidebar, Header, dll) */}
        <Route element={<KreatorLayout />}>
          <Route path="/kreator/dashboard" element={<KreatorIndexPage />} />
          <Route path="/kreator/alur-konten" element={<Alur_konten />} />
          <Route path="/kreator/saluran" element={<KreatorSaluran />} />
          <Route path="/kreator/analitik" element={<Analitik />} />
        </Route>
        <Route element={<PengeditLayout />}>
          <Route path="/pengedit/dashboard" element={<PengeditIndexPage />} />
          <Route path="/pengedit/alur-konten" element={<Alur_konten />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminIndexPage />} />
          <Route path="/admin/alur-konten" element={<Alur_konten />} />
          <Route path="/admin/saluran" element={<AdminSaluran />} />
        </Route>
        {/* Rute Autentikasi (Tampil penuh tanpa sidebar utama) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter >
  );
}