import { useEffect, useState } from "react";
import { FaAward, FaCoins, FaShoppingCart, FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertBox from "../components/AlertBox";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { formatCurrency } from "../lib/format";

const tierDiscounts = { bronze: 5, silver: 10, gold: 15, platinum: 20 };

export default function MemberDashboard() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      const { data, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (ordersError) setError(ordersError.message);
      else setOrders(data || []);
      setLoading(false);
    };

    loadOrders();
  }, []);

  const totalSpent = orders
    .filter((order) => order.status === "completed")
    .reduce((total, order) => total + Number(order.final_price), 0);

  const cards = [
    { label: "Current Tier", value: profile?.tier || "bronze", icon: <FaAward className="text-xl" />, color: "bg-yellow-400" },
    { label: "Your Points", value: profile?.points || 0, icon: <FaCoins className="text-xl" />, color: "bg-blue-500" },
    { label: "Total Orders", value: orders.length, icon: <FaShoppingCart className="text-xl" />, color: "bg-green-500" },
    { label: "Total Spent", value: formatCurrency(totalSpent), icon: <FaWallet className="text-xl" />, color: "bg-purple-500" },
  ];

  return (
    <div className="pb-10">
      <PageHeader title={`Hello, ${profile?.full_name || "Member"}`} breadcrumb="Member Dashboard" />
      {error && <AlertBox type="error">{error}</AlertBox>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon, color }) => (
          <Card key={label}>
            <div className="flex items-center space-x-5">
              <div className={`${color} rounded-full p-4 text-white shadow-lg`}>{icon}</div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-800 capitalize">{value}</span>
                <span className="text-gray-400 text-sm font-medium">{label}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Member Benefit</h2>
        <p className="text-gray-500 mb-6">
          Tier <span className="font-bold capitalize text-hijau">{profile?.tier}</span> memberi potongan{" "}
          <span className="font-bold">{tierDiscounts[profile?.tier] || 0}%</span> untuk setiap pesanan.
        </p>
        <div className="flex gap-3">
          <Link to="/member/products" className="bg-hijau text-white px-6 py-3 rounded-xl font-bold">Buat Pesanan</Link>
          <Link to="/member/orders" className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold">Riwayat Pesanan</Link>
        </div>
      </div>

      {loading && <LoadingSpinner text="Memuat ringkasan member..." />}
    </div>
  );
}
