import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaArrowUp, FaArrowDown, FaCalendarAlt, FaChevronDown, FaDownload, FaEllipsisV } from "react-icons/fa";

export default function Dashboard() {
    const stats = [
        { id: "orders", label: "Total Orders", value: "75", icon: <FaShoppingCart />, color: "bg-emerald-500", trend: "4%", up: true },
        { id: "delivered", label: "Total Delivered", value: "357", icon: <FaTruck />, color: "bg-emerald-500", trend: "4%", up: true },
        { id: "canceled", label: "Total Canceled", value: "65", icon: <FaBan />, color: "bg-red-500", trend: "25%", up: false },
        { id: "revenue", label: "Total Revenue", value: "$128", icon: <FaDollarSign />, color: "bg-emerald-500", trend: "12%", up: false },
    ];

    return (
        <div id="dashboard-container" className="bg-[#F8F9FB] min-h-screen font-barlow p-8">
            
            {/* --- 1. HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 font-poppins">Dashboard</h1>
                    <p className="text-gray-400 mt-1">Hi, Samantha. Welcome back to Sedap Admin!</p>
                </div>
                
                {/* Filter Periode Button (Perbaikan: Button Interaktif) */}
                <button className="mt-4 md:mt-0 flex items-center bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95 group">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <FaCalendarAlt size={14} />
                    </div>
                    <div className="flex flex-col text-left mr-8">
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Filter Periode</span>
                        <span className="text-sm font-bold text-gray-700">17 April 2020 - 21 May 2020</span>
                    </div>
                    <FaChevronDown className="text-gray-300 text-xs group-hover:text-blue-500 transition-colors" />
                </button>
            </div>

            {/* --- 2. STATS CARDS GRID --- */}
            <div id="dashboard-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((item) => (
                    <div key={item.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 flex flex-col items-center text-center relative group hover:shadow-lg transition-all">
                        {/* Icon dengan Lingkaran di Belakang Angka (Sesuai Referensi) */}
                        <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mb-4 shadow-xl shadow-emerald-100`}>
                            {item.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-black text-gray-800 font-poppins">{item.value}</span>
                            <span className="text-gray-400 font-medium text-sm mb-2">{item.label}</span>
                            <div className={`flex items-center justify-center space-x-1 text-[11px] font-bold ${item.up ? 'text-emerald-500' : 'text-red-400'}`}>
                                {item.up ? <FaArrowUp size={8} /> : <FaArrowDown size={8} />}
                                <span>{item.trend} (30 days)</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- 3. CHARTS SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Pie Charts Group (5/12 width) */}
                <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-gray-800">Pie Chart</h2>
                        <FaEllipsisV className="text-gray-300 cursor-pointer" />
                    </div>
                    <div className="flex justify-around items-end h-48">
                        {/* Circle 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full border-[12px] border-emerald-500 border-l-red-100 flex items-center justify-center mb-4">
                                <span className="font-bold text-sm">81%</span>
                            </div>
                            <span className="text-xs font-bold text-gray-500">Total Order</span>
                        </div>
                        {/* Circle 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full border-[15px] border-emerald-500 border-b-emerald-100 flex items-center justify-center mb-4">
                                <span className="font-bold text-lg">22%</span>
                            </div>
                            <span className="text-xs font-bold text-gray-500">Customer Growth</span>
                        </div>
                        {/* Circle 3 */}
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full border-[12px] border-blue-400 border-t-blue-100 flex items-center justify-center mb-4">
                                <span className="font-bold text-sm">62%</span>
                            </div>
                            <span className="text-xs font-bold text-gray-500">Total Revenue</span>
                        </div>
                    </div>
                </div>

                {/* Chart Order Card (7/12 width) */}
                <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Chart Order</h2>
                            <p className="text-xs text-gray-400 mt-1">Lorem ipsum dolor sit amet, consectetur adip</p>
                        </div>
                        <button className="flex items-center space-x-2 border border-blue-500 text-blue-500 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-50 transition-all active:scale-95">
                            <FaDownload size={12} />
                            <span>Save Report</span>
                        </button>
                    </div>
                    
                    {/* Area Chart SVG */}
                    <div className="relative h-60 w-full">
                        <svg viewBox="0 0 500 150" className="w-full h-full drop-shadow-xl">
                            <defs>
                                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2"/>
                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                                </linearGradient>
                            </defs>
                            <path 
                                fill="url(#gradient)" 
                                d="M0,150 L0,120 C50,110 80,140 150,100 C220,60 280,120 350,80 C420,40 450,90 500,50 L500,150 Z" 
                            />
                            <path 
                                fill="none" 
                                stroke="#3B82F6" 
                                strokeWidth="4" 
                                strokeLinecap="round"
                                d="M0,120 C50,110 80,140 150,100 C220,60 280,120 350,80 C420,40 450,90 500,50" 
                            />
                            <circle cx="350" cy="80" r="6" fill="white" stroke="#3B82F6" strokeWidth="3" />
                        </svg>
                        <div className="flex justify-between mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest px-2">
                            <span>Sunday</span><span>Monday</span><span>Tuesday</span><span>Wednesday</span><span>Thursday</span><span>Friday</span><span>Saturday</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}