import { useState } from "react";
import "./assets/tailwind.css";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ErrorPage from "./pages/ErrorPage"; // Pastikan nama file sesuai

function App() {
  return (
    <div id="app-container" className="bg-[#F8F9FB] min-h-screen flex">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Main Content Area */}
      <div id="main-content" className="flex-1 flex flex-col min-w-0">
        {/* Header di bagian atas */}
        <Header />

        {/* Area Konten Utama */}
        <div className="p-4 flex-1">
          <Routes>
            {/* Halaman Utama */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />

            {/* Rute Error untuk Latihan */}
            <Route 
              path="/error-400" 
              element={<ErrorPage code="400" title="Bad Request" description="Waduh, permintaan kamu tidak bisa kami proses nih." />} 
            />
            <Route 
              path="/error-401" 
              element={<ErrorPage code="401" title="Unauthorized" description="Ups! Kamu harus login dulu untuk masuk ke sini." />} 
            />
            <Route 
              path="/error-403" 
              element={<ErrorPage code="403" title="Forbidden" description="Maaf ya, kamu tidak punya akses ke halaman rahasia ini." />} 
            />

            {/* Fallback 404 jika mengetik URL asal */}
            <Route 
              path="*" 
              element={<ErrorPage code="404" title="Page Not Found" description="Halaman yang kamu cari tidak ada di menu kami." />} 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;