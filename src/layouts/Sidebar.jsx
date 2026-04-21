import { useState } from "react";
import { NavLink } from "react-router-dom"; 
import {
  MdSpaceDashboard,
  MdListAlt,
  MdPeople,
  MdAdd,
} from "react-icons/md";

export default function Sidebar() {
  const [profileImage] = useState("https://avatar.iran.liara.run/public/28");

  // Implementasi menuClass untuk Active State sesuai instruksi
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 transition-all
    ${isActive ? 
        "text-hijau bg-green-200 font-extrabold" : 
        "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`;

  const handleAddMenus = () => {
    alert("Navigasi ke halaman Tambah Menu atau buka Modal!");
  };

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg"
    >
      {/* Logo Section */}
      <div id="sidebar-logo" className="flex flex-col">
        <span
          id="logo-title"
          className="font-poppins text-[48px] text-gray-900 font-bold"
        >
          Sedap <b id="logo-dot" className="text-hijau">.</b>
        </span>
        <span
          id="logo-subtitle"
          className="font-semibold text-gray-400 font-barlow"
        >
          Modern Admin Dashboard
        </span>
      </div>

      {/* List Menu Section */}
      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3">
          
          {/* Dashboard */}
          <li>
            <NavLink id="menu-1" to="/" className={menuClass}>
              <MdSpaceDashboard className="text-xl" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* Orders */}
          <li>
            <NavLink id="menu-2" to="/orders" className={menuClass}>
              <MdListAlt className="text-xl" />
              <span>Order</span>
            </NavLink>
          </li>

          {/* Customers */}
          <li>
            <NavLink id="menu-3" to="/customers" className={menuClass}>
              <MdPeople className="text-xl" />
              <span>Customer</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer Section */}
      <div id="sidebar-footer" className="mt-auto">
        <div
          id="footer-card"
          className="bg-hijau p-6 rounded-3xl shadow-lg flex flex-col items-center text-center relative overflow-hidden text-white"
        >
          <p className="text-sm font-barlow mb-4 z-10 leading-tight">
            Please organize your menus through button below!
          </p>

          <button
            onClick={handleAddMenus}
            className="bg-white text-gray-800 px-6 py-2 rounded-xl font-bold text-sm z-10 shadow-md cursor-pointer hover:bg-gray-100 flex items-center space-x-2 transition-all active:scale-95"
          >
            <MdAdd className="text-lg" />
            <span>Add Menus</span>
          </button>

          <img
            id="footer-avatar"
            src={profileImage}
            className="absolute -right-2 -bottom-2 w-20 h-20 rounded-full object-cover opacity-40 border-2 border-white"
            alt="avatar"
          />
        </div>

        <div className="mt-6 text-center">
          <span id="footer-brand" className="font-bold text-gray-400 block text-xs">
            Sedap Restaurant Admin Dashboard
          </span>
          <p id="footer-copyright" className="text-gray-400 text-[10px] mt-1">
            &copy; 2025 All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}