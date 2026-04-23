import { useState } from "react";
import { NavLink } from "react-router-dom"; 
import {
  MdSpaceDashboard,
  MdListAlt,
  MdPeople,
  MdAdd,
  MdErrorOutline, // Untuk Error 400
  MdLockOutline,  // Untuk Error 401
  MdBlock,        // Untuk Error 403
} from "react-icons/md";

export default function Sidebar() {
  const [profileImage] = useState("https://avatar.iran.liara.run/public/28");

  // Implementasi menuClass untuk Active State
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 transition-all
    ${isActive ? 
        "text-hijau bg-green-100 font-extrabold shadow-sm" : 
        "text-gray-500 hover:text-hijau hover:bg-green-50"
    }`;

  const handleAddMenus = () => {
    alert("Navigasi ke halaman Tambah Menu!");
  };

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-80 flex-col bg-white p-8 shadow-xl z-20"
    >
      {/* Logo Section */}
      <div id="sidebar-logo" className="flex flex-col mb-10">
        <span
          id="logo-title"
          className="font-poppins text-[40px] text-gray-900 font-bold leading-tight"
        >
          Sedap <b id="logo-dot" className="text-hijau">.</b>
        </span>
        <span
          id="logo-subtitle"
          className="font-semibold text-gray-400 text-xs font-barlow tracking-wider"
        >
          Modern Admin Dashboard
        </span>
      </div>

      {/* List Menu Section */}
      <div id="sidebar-menu" className="flex-1 overflow-y-auto">
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4 ml-4">Main Menu</p>
        <ul id="menu-list" className="space-y-2">
          
          <li>
            <NavLink id="menu-1" to="/" className={menuClass}>
              <MdSpaceDashboard className="text-xl" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink id="menu-2" to="/orders" className={menuClass}>
              <MdListAlt className="text-xl" />
              <span>Order</span>
            </NavLink>
          </li>

          <li>
            <NavLink id="menu-3" to="/customers" className={menuClass}>
              <MdPeople className="text-xl" />
              <span>Customer</span>
            </NavLink>
          </li>

          {/* --- SECTION ERROR PAGES (LATIHAN) --- */}
          <div className="pt-6 mt-6 border-t border-gray-100">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4 ml-4">Error Tests</p>
            
            <li>
              <NavLink id="menu-error-400" to="/error-400" className={menuClass}>
                <MdErrorOutline className="text-xl" />
                <span>Error 400</span>
              </NavLink>
            </li>

            <li>
              <NavLink id="menu-error-401" to="/error-401" className={menuClass}>
                <MdLockOutline className="text-xl" />
                <span>Error 401</span>
              </NavLink>
            </li>

            <li>
              <NavLink id="menu-error-403" to="/error-403" className={menuClass}>
                <MdBlock className="text-xl" />
                <span>Error 403</span>
              </NavLink>
            </li>
          </div>
        </ul>
      </div>

      {/* Footer Section */}
      <div id="sidebar-footer" className="mt-8">
        <div
          id="footer-card"
          className="bg-hijau p-6 rounded-3xl shadow-lg flex flex-col items-center text-center relative overflow-hidden text-white mb-6"
        >
          <p className="text-xs font-barlow mb-4 z-10 leading-tight">
            Please organize your menus through button below!
          </p>

          <button
            onClick={handleAddMenus}
            className="bg-white text-gray-800 px-6 py-2 rounded-xl font-bold text-xs z-10 shadow-md cursor-pointer hover:bg-gray-100 flex items-center space-x-2 transition-all active:scale-95"
          >
            <MdAdd className="text-lg" />
            <span>Add Menus</span>
          </button>
        </div>

        <div className="text-center">
          <span id="footer-brand" className="font-bold text-gray-400 block text-[10px]">
            Sedap Restaurant Admin Dashboard
          </span>
          <p id="footer-copyright" className="text-gray-400 text-[9px] mt-1">
            &copy; 2026 All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}