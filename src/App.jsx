import React, { Suspense } from "react";
import "./assets/tailwind.css";
//import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
//import Orders from "./pages/Orders";
//import Customers from "./pages/Customers";
//import ErrorPage from "./pages/ErrorPage"; 
//import MainLayout from "./layouts/MainLayout";
//import AuthLayout from "./layouts/AuthLayout";
//import Login from "./pages/auth/Login";
//import Register from "./pages/auth/Register";
//import Forgot from "./pages/auth/Forgot";

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Orders = React.lazy(() => import("./pages/Orders"))
const Customers = React.lazy(() => import("./pages/Customers"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))


function App() {
  return (
    <Suspense fallback={<Loading />}>
    <Routes>
      {/* Bungkus semua rute yang menggunakan Sidebar/Navbar dengan MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />

        
        
        {/* Rute Error di dalam Layout (jika ingin tetap ada Sidebar) */}
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
      </Route>
<Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>
      {/* Fallback 404 biasanya diletakkan di luar Layout atau di dalam, tergantung desain */}
      <Route 
        path="*" 
        element={<ErrorPage code="404" title="Page Not Found" description="Halaman yang kamu cari tidak ada di menu kami." />} 
      />
    </Routes>
    </Suspense>
  );
}

export default App;