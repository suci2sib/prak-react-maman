import { useEffect, useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Table from "../components/Table";
import Alert from "../components/Alert";
import LoadingSpinner from "../components/LoadingSpinner";
import { supabase } from "../lib/supabase";
import { formatCurrency } from "../lib/format";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    orders: 0,
    completed: 0,
    cancelled: 0,
    revenue: 0,
  });

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      const { data, error: ordersError } = await supabase
        .from("orders")
        .select("*, profiles!orders_customer_id_fkey(full_name)")
        .order("created_at", { ascending: false });

      if (ordersError) {
        setError(ordersError.message);
      } else {
        const allOrders = data || [];
        setOrders(allOrders.slice(0, 5));
        setStats({
          orders: allOrders.length,
          completed: allOrders.filter((order) => order.status === "completed").length,
          cancelled: allOrders.filter((order) => order.status === "cancelled").length,
          revenue: allOrders
            .filter((order) => order.status === "completed")
            .reduce((total, order) => total + Number(order.final_price), 0),
        });
      }

      setLoading(false);
    };

    loadDashboard();
  }, []);

  const cards = [
    { label: "Total Orders", value: stats.orders, icon: <FaShoppingCart className="text-xl" />, color: "bg-green-500" },
    { label: "Total Completed", value: stats.completed, icon: <FaTruck className="text-xl" />, color: "bg-blue-500" },
    { label: "Total Cancelled", value: stats.cancelled, icon: <FaBan className="text-xl" />, color: "bg-red-500" },
    { label: "Total Revenue", value: formatCurrency(stats.revenue), icon: <FaDollarSign className="text-xl" />, color: "bg-yellow-400" },
  ];

  return (
    <div id="dashboard-container" className="pb-10">
      <PageHeader title="Dashboard" breadcrumb="Dashboard" />

      {error && <Alert type="error">{error}</Alert>}

      <div id="dashboard-grid" className="mb-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon, color }) => (
          <Card key={label}>
            <div className="flex items-center space-x-5">
              <div className={`${color} rounded-full p-4 text-white shadow-lg`}>
                {icon}
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-800">{value}</span>
                <span className="text-gray-400 text-sm font-medium">{label}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
          <Link to="/admin/orders" className="text-hijau font-semibold hover:underline text-sm">
            View All
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner text="Memuat ringkasan..." />
        ) : orders.length > 0 ? (
          <Table headers={["Order ID", "Customer", "Status", "Subtotal", "Final Price", "Action"]}>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 font-bold text-gray-700">#{order.id.slice(0, 8)}</td>
                <td className="py-4 text-gray-600">{order.profiles?.full_name || "Member"}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    order.status === "completed" ? "bg-green-100 text-green-600" :
                    order.status === "pending" ? "bg-yellow-100 text-yellow-600" :
                    order.status === "processing" ? "bg-blue-100 text-blue-600" :
                    "bg-red-100 text-red-600"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 font-bold text-gray-900">{formatCurrency(order.subtotal)}</td>
                <td className="py-4 font-bold text-hijau">{formatCurrency(order.final_price)}</td>
                <td className="py-4 text-center">
                  <Link to="/admin/orders" className="inline-block p-2 bg-gray-50 rounded-lg text-hijau hover:bg-hijau hover:text-white transition-all shadow-sm">
                    <FaEye />
                  </Link>
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <Alert type="info">Belum ada pesanan.</Alert>
        )}
      </div>
    </div>
  );
}
