import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeRedirect from "./components/HomeRedirect";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const MemberDashboard = React.lazy(() => import("./pages/MemberDashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const MemberOrders = React.lazy(() => import("./pages/MemberOrders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Components = React.lazy(() => import("./pages/Component"));
const FiturXyz = React.lazy(() => import("./pages/FiturXyz"));
const Notes = React.lazy(() => import("./pages/Notes"));
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
        <Route path="/" element={<HomeRedirect />} />

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="components" element={<Components />} />
            <Route path="fitur-xyz" element={<FiturXyz />} />
            <Route path="notes" element={<Notes />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute role="member" />}>
          <Route path="/member" element={<MainLayout />}>
            <Route index element={<MemberDashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="orders" element={<MemberOrders />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        <Route
          path="/unauthorized"
          element={
            <ErrorPage
              code="401"
              title="Unauthorized"
              description="Role akun kamu tidak memiliki akses ke halaman ini."
            />
          }
        />
        <Route path="/orders" element={<Navigate to="/" replace />} />
        <Route path="/customers" element={<Navigate to="/" replace />} />
        <Route path="/products/*" element={<Navigate to="/" replace />} />
        <Route
          path="*"
          element={
            <ErrorPage
              code="404"
              title="Page Not Found"
              description="Halaman yang kamu cari tidak ada di menu kami."
            />
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
