// import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dasbor from "./pages/Dasbor";
import MainLayout from "./pages/MainLayout";
import Alur_konten from "./pages/Alur_konten"; 
import Channel from "./pages/Saluran";
import Analitik from "./pages/Analitik";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<MainLayout />}>
          <Route path="/Dasbor" element={<Dasbor />}></Route>
          <Route path="/Alur_konten" element={<Alur_konten />}></Route>
          <Route path="/saluran" element={<Channel />} />
          <Route path="/analitik" element={<Analitik />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;