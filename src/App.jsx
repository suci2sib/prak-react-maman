import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/tailwind.css";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div id="app-container" className="bg-gray-100 min-h-screen flex">
        {/* Wrapper untuk membagi Sidebar dan Konten */}
        <div id="layout-wrapper" className="flex flex-row flex-1">
          {/* Sidebar di sebelah kiri */}
          <Sidebar />

          {/* 2️⃣ Main Content di sebelah kanan */}
          <div id="main-content" className="flex-1 p-4 flex flex-col">
            {/* Header paling atas */}
            <Header />

            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
