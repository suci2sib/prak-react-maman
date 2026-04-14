import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/tailwind.css"; 
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";

const Main = () => {
  return (
    // 1️⃣ & 2️⃣ App Container & Layout Wrapper
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      
      {/* Wrapper untuk membagi Sidebar dan Konten */}
      <div id="layout-wrapper" className="flex flex-row flex-1">
        
        {/* Sidebar di sebelah kiri */}
        <Sidebar />

        {/* 2️⃣ Main Content di sebelah kanan */}
        <div id="main-content" className="flex-1 p-4 flex flex-col">
          {/* Header paling atas */}
          <Header />
          
          {/* Dashboard mengisi sisa ruang */}
          <main className="flex-1 mt-4">
            <Dashboard />
          </main>
        </div>

      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);