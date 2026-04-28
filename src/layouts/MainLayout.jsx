import { Outlet } from "react-router-dom";
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

export default function MainLayout() {
    return (
        <div id="app-container" className="bg-[#F8F9FB] min-h-screen flex">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Main Content Area */}
      <div id="main-content" className="flex-1 flex flex-col min-w-0">
        {/* Header di bagian atas */}
        <Header />

       
       <Outlet/>
      </div>
    </div>
    )

}
