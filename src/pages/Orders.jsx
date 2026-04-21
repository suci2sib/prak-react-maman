import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaArrowUp, FaArrowDown } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Orders() {
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
            <p>Ini Halaman Orders</p>
        </div>
    );
}