import { NavLink } from "react-router-dom";
import {
  MdSpaceDashboard,
  MdListAlt,
  MdPeople,
  MdInventory,
  MdExtension,
  MdDescription,
} from "react-icons/md";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === "admin";
  const basePath = isAdmin ? "/admin" : "/member";

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 transition-all ${
      isActive
        ? "text-hijau bg-green-100 font-extrabold shadow-sm"
        : "text-gray-500 hover:text-hijau hover:bg-green-50"
    }`;

  const adminMenus = [
    { to: basePath, label: "Dashboard", icon: <MdSpaceDashboard className="text-xl" />, end: true },
    { to: `${basePath}/orders`, label: "Order", icon: <MdListAlt className="text-xl" /> },
    { to: `${basePath}/customers`, label: "Customer", icon: <MdPeople className="text-xl" /> },
    { to: `${basePath}/products`, label: "Products", icon: <MdInventory className="text-xl" /> },
    { to: `${basePath}/components`, label: "Components", icon: <MdExtension className="text-xl" /> },
    { to: `${basePath}/fitur-xyz`, label: "Fitur XYZ", icon: <MdInventory className="text-xl" /> },
    { to: `${basePath}/notes`, label: "Notes", icon: <MdDescription className="text-xl" /> },
  ];

  const memberMenus = [
    { to: basePath, label: "Dashboard", icon: <MdSpaceDashboard className="text-xl" />, end: true },
    { to: `${basePath}/products`, label: "Products", icon: <MdInventory className="text-xl" /> },
    { to: `${basePath}/orders`, label: "My Orders", icon: <MdListAlt className="text-xl" /> },
  ];

  const menus = isAdmin ? adminMenus : memberMenus;

  return (
    <div id="sidebar" className="flex min-h-screen w-80 flex-col bg-white p-8 shadow-xl z-20">
      <div id="sidebar-logo" className="flex flex-col mb-10">
        <span className="font-poppins text-[40px] text-gray-900 font-bold leading-tight">
          Sedap <b className="text-hijau">.</b>
        </span>
        <span className="font-semibold text-gray-400 text-xs font-barlow tracking-wider">
          {isAdmin ? "Modern Admin Dashboard" : "Member Dashboard"}
        </span>
      </div>

      <div id="sidebar-menu" className="flex-1 overflow-y-auto">
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4 ml-4">
          Main Menu
        </p>
        <ul className="space-y-2">
          {menus.map(({ to, label, icon, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={menuClass}>
                {icon}
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <div className="bg-hijau p-6 rounded-3xl shadow-lg text-center text-white mb-6">
          <p className="text-xs font-barlow leading-tight capitalize">
            {isAdmin
              ? "Kelola produk, member, dan pesanan dari menu di atas."
              : `${profile?.tier || "bronze"} member • ${profile?.points || 0} points`}
          </p>
        </div>
        <div className="text-center">
          <span className="font-bold text-gray-400 block text-[10px]">
            Sedap Restaurant Dashboard
          </span>
          <p className="text-gray-400 text-[9px] mt-1">&copy; 2026 All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
