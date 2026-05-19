import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

// Lazy Loading Imports
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Products = React.lazy(() => import("./pages/Products")); 
const Components = React.lazy(() => import("./pages/Component")); 

// 1️⃣ Import ProductDetail dengan React.lazy()
const ProductDetail = React.lazy(() => import("./pages/ProductDetail")); 

const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Bungkus semua rute yang menggunakan Sidebar/Navbar dengan MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/components" element={<Components />} />
          

          {/* 1️⃣ Route baru untuk detail produk dengan parameter :id */}
          <Route path="/products/:id" element={<ProductDetail />} /> 

          {/* Rute Error di dalam Layout */}
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

        {/* Fallback 404 */}
        <Route 
          path="*" 
          element={<ErrorPage code="404" title="Page Not Found" description="Halaman yang kamu cari tidak ada di menu kami." />} 
        />
      </Routes>
    </Suspense>
  );
}

export default App;