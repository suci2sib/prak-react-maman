import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaArrowUp, FaArrowDown } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    const stats = [
        { id: "orders", label: "Total Orders", value: "75", icon: <FaShoppingCart />, color: "bg-emerald-500", trend: "+4%", up: true },
        { id: "delivered", label: "Total Delivered", value: "357", icon: <FaTruck />, color: "bg-emerald-500", trend: "+4%", up: true },
        { id: "canceled", label: "Total Canceled", value: "65", icon: <FaBan />, color: "bg-red-500", trend: "-25%", up: false },
        { id: "revenue", label: "Total Revenue", value: "$128", icon: <FaDollarSign />, color: "bg-emerald-500", trend: "-12%", up: false },
    ];

    return (
        <div id="dashboard-container" className="bg-[#F8F9FB] min-h-screen">
            {/* Page Header */}
            <PageHeader />

            <div className="p-6">
                {/* Welcome Message */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 font-poppins">Dashboard</h1>
                    <p className="text-gray-400 font-barlow">Hi, Samantha. Welcome back to Sedap Admin!</p>
                </div>

                {/* Grid Cards */}
                <div id="dashboard-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((item) => (
                        <div 
                            key={item.id} 
                            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-emerald-100 flex items-center justify-between cursor-pointer"
                        >
                            <div className="flex items-center space-x-4">
                                {/* Icon Container with Glow Effect */}
                                <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-${item.color}/20 group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                
                                <div>
                                    <h3 className="text-3xl font-extrabold text-gray-800 font-poppins tracking-tight">
                                        {item.value}
                                    </h3>
                                    <p className="text-gray-400 font-medium font-barlow text-sm">
                                        {item.label}
                                    </p>
                                </div>
                            </div>

                            {/* Trend Indicator (Kecil di pojok) */}
                            <div className={`flex items-center space-x-1 text-xs font-bold ${item.up ? 'text-emerald-500' : 'text-red-400'}`}>
                                {item.up ? <FaArrowUp /> : <FaArrowDown />}
                                <span>{item.trend} (30 days)</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Placeholder untuk Chart (Meniru Gambar) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm h-64 flex items-center justify-center border border-gray-100">
                        <p className="text-gray-300 italic">Pie Chart Placeholder</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm h-64 flex items-center justify-center border border-gray-100">
                        <p className="text-gray-300 italic">Chart Order Placeholder</p>
                    </div>
                </div>
            </div>
        </div>
    );
}