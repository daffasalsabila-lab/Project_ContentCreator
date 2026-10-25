// import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dasboard";
import MainLayout from "./pages/MainLayout";
import Pipeline from "./pages/pipeline";
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
          <Route path="/pipeline" element={<Pipeline />}></Route>
          <Route path="/dasboard" element={<Dashboard />}></Route>
          <Route path="/saluran" element={<Channel />} />
          <Route path="/analitik" element={<Analitik />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
