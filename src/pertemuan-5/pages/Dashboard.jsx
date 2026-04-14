import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container">
            {/* 2️⃣ Memanggil Komponen PageHeader */}
            <PageHeader />

            {/* 3️⃣ Grid Container */}
            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Card 1: Total Orders */}
                <div id="dashboard-orders" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="orders-icon" className="bg-hijau rounded-full p-4 text-3xl text-white">
                        <FaShoppingCart />
                    </div>
                    <div id="orders-info" className="flex flex-col">
                        <span id="orders-count" className="text-2xl font-bold font-poppins">75</span>
                        <span id="orders-text" className="text-gray-400 font-barlow">Total Orders</span>
                    </div>
                </div>

                {/* Card 2: Total Delivered */}
                <div id="dashboard-delivered" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="delivered-icon" className="bg-hijau rounded-full p-4 text-3xl text-white">
                        <FaTruck />
                    </div>
                    <div id="delivered-info" className="flex flex-col">
                        <span id="delivered-count" className="text-2xl font-bold font-poppins">175</span>
                        <span id="delivered-text" className="text-gray-400 font-barlow">Total Delivered</span>
                    </div>
                </div>

                {/* Card 3: Total Canceled */}
                <div id="dashboard-canceled" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="canceled-icon" className="bg-red-500 rounded-full p-4 text-3xl text-white">
                        <FaBan />
                    </div>
                    <div id="canceled-info" className="flex flex-col">
                        <span id="canceled-count" className="text-2xl font-bold font-poppins">40</span>
                        <span id="canceled-text" className="text-gray-400 font-barlow">Total Canceled</span>
                    </div>
                </div>

                {/* Card 4: Total Revenue */}
                <div id="dashboard-revenue" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="revenue-icon" className="bg-blue-500 rounded-full p-4 text-3xl text-white">
                        <FaDollarSign />
                    </div>
                    <div id="revenue-info" className="flex flex-col">
                        <span id="revenue-amount" className="text-2xl font-bold font-poppins">Rp.128</span>
                        <span id="revenue-text" className="text-gray-400 font-barlow">Total Revenue</span>
                    </div>
                </div>

            </div>
        </div>
    );
}