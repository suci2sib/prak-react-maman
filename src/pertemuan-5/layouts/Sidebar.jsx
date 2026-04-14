import { useState } from "react"; // 1. Import useState
import { MdDashboard, MdListAlt, MdPeople, MdRestaurant, MdInsertChart, MdChat, MdCalendarToday, MdCloudUpload } from "react-icons/md";

export default function Sidebar() {
    // 2. State untuk menyimpan foto yang diupload
    const [profileImage, setProfileImage] = useState("https://avatar.iran.liara.run/public/28");

    // 3. Fungsi handle upload
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
            {/* Logo Section */}
            <div id="sidebar-logo" className="flex flex-col">
                <span id="logo-title" className="font-poppins text-[48px] text-gray-900 font-bold">
                    Sedap <b id="logo-dot" className="text-hijau">.</b>
                </span>
                <span id="logo-subtitle" className="font-semibold text-gray-400 font-barlow">
                    Modern Admin Dashboard
                </span>
            </div>

            {/* List Menu Section */}
            <div id="sidebar-menu" className="mt-10">
                <ul id="menu-list" className="space-y-3">
                    <li className="flex items-center p-4 rounded-xl cursor-pointer text-gray-600 hover:bg-green-100 hover:text-hijau transition-all font-barlow font-medium">
                        <MdDashboard className="mr-4 text-xl" /> Dashboard
                    </li>
                    <li className="flex items-center p-4 rounded-xl cursor-pointer text-gray-600 hover:bg-green-100 hover:text-hijau transition-all font-barlow font-medium">
                        <MdListAlt className="mr-4 text-xl" /> Order List
                    </li>
                    <li className="flex items-center p-4 rounded-xl cursor-pointer text-gray-600 hover:bg-green-100 hover:text-hijau transition-all font-barlow font-medium">
                        <MdPeople className="mr-4 text-xl" /> Customer
                    </li>
                </ul>
            </div>

            {/* Footer Section */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-hijau p-6 rounded-3xl shadow-lg flex flex-col items-center text-center relative overflow-hidden text-white">
                    <p className="text-sm font-barlow mb-4 z-10">Please organize your menus through button below!</p>
                    
                    {/* 4. Tombol Upload Foto */}
                    <label className="bg-white text-gray-800 px-6 py-2 rounded-xl font-bold text-sm z-10 shadow-md cursor-pointer hover:bg-gray-100 flex items-center space-x-2">
                        <MdCloudUpload className="text-lg" />
                        <span>Upload Photo</span>
                        <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
                    </label>

                    {/* 5. Tampilan Foto (Berubah saat diupload) */}
                    <img 
                        id="footer-avatar" 
                        src={profileImage} 
                        className="absolute -right-2 -bottom-2 w-20 h-20 rounded-full object-cover opacity-40 border-2 border-white" 
                        alt="avatar" 
                    />
                </div>

                <div className="mt-6 text-center">
                    <span id="footer-brand" className="font-bold text-gray-400 block text-xs">Sedap Restaurant Admin Dashboard</span>
                    <p id="footer-copyright" className="text-gray-400 text-[10px] mt-1">&copy; 2025 All Right Reserved</p>
                </div>
            </div>
        </div>
    );
}