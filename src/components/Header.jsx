import { FaBell, FaSearch, FaCommentDots, FaGift, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div id="header-container" className="flex justify-between items-center p-6 bg-[#F8F9FB]">
      <div id="search-bar" className="relative w-full max-w-md">
        <input
          id="search-input"
          type="text"
          placeholder="Search Here..."
          className="w-full bg-white border-none py-3 pl-5 pr-12 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
        />
        <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-300" />
      </div>

      <div id="icons-container" className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 mr-2">
          <div className="relative p-3 bg-blue-50 text-blue-400 rounded-xl cursor-pointer">
            <FaBell size={18} />
            <span className="absolute top-2 right-2 w-4 h-4 bg-blue-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">
              0
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-400 rounded-xl cursor-pointer"><FaCommentDots size={18} /></div>
          <div className="p-3 bg-blue-50 text-blue-400 rounded-xl cursor-pointer"><FaGift size={18} /></div>
          <div className="p-3 bg-red-50 text-red-400 rounded-xl cursor-pointer"><FaCog size={18} /></div>
          <button type="button" onClick={handleLogout} title="Logout"
            className="p-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-red-50 hover:text-red-500">
            <FaSignOutAlt size={18} />
          </button>
        </div>

        <div id="profile-container" className="flex items-center space-x-4 border-l pl-6 border-gray-200 ml-2">
          <div className="text-right flex flex-col justify-center">
            <span className="text-[11px] text-gray-400 leading-none capitalize">{profile?.role || "guest"}</span>
            <span className="text-sm font-bold text-gray-800">{profile?.full_name || "User"}</span>
          </div>
          <div className="relative">
            <img
              src="/img/fotoucii.jpeg"
              alt={profile?.full_name || "Profile"}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
              onError={(event) => {
                event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || "User")}&background=10b981&color=fff`;
              }}
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
