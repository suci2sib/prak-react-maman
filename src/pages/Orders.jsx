import { useEffect, useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaTimes, FaEye } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import { supabase } from "../lib/supabase";
import { formatCurrency } from "../lib/format";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadOrders = async () => {
    const { data, error: ordersError } = await supabase
      .from("orders")
      .select("*, profiles!orders_customer_id_fkey(full_name, tier)")
      .order("created_at", { ascending: false });

    if (ordersError) setError(ordersError.message);
    else setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    const { error: updateError } = await supabase.from("orders").update({ status }).eq("id", orderId);
    if (updateError) setError(updateError.message);
    else {
      setSuccess("Status pesanan berhasil diperbarui.");
      setSelectedOrder(null);
      loadOrders();
    }
  };

  const revenue = orders.filter((order) => order.status === "completed")
    .reduce((total, order) => total + Number(order.final_price), 0);
  const stats = [
    { label: "Total Orders", value: orders.length, icon: <FaShoppingCart />, color: "bg-emerald-500" },
    { label: "Completed", value: orders.filter((order) => order.status === "completed").length, icon: <FaTruck />, color: "bg-emerald-500" },
    { label: "Cancelled", value: orders.filter((order) => order.status === "cancelled").length, icon: <FaBan />, color: "bg-red-500" },
    { label: "Revenue", value: formatCurrency(revenue), icon: <FaDollarSign />, color: "bg-emerald-500" },
  ];

  return (
    <div id="orders-container" className="bg-[#F8F9FB] min-h-screen p-8 font-barlow relative">
      <PageHeader title="Order List" breadcrumb="Orders" />
      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {selectedOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative">
            <button onClick={() => setSelectedOrder(null)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500"><FaTimes /></button>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-hijau text-white rounded-2xl flex items-center justify-center text-xl shadow-lg"><FaShoppingCart /></div>
              <div><h2 className="text-xl font-black text-gray-900">Order #{selectedOrder.id.slice(0, 8)}</h2><p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Transaction Detail</p></div>
            </div>
            <div className="bg-gray-50 rounded-[2rem] p-6 space-y-4 border border-gray-100">
              <div className="flex justify-between border-b border-gray-200 pb-3"><span className="text-[10px] font-black text-gray-400 uppercase">Customer</span><span className="font-bold text-gray-800">{selectedOrder.profiles?.full_name}</span></div>
              <div className="flex justify-between border-b border-gray-200 pb-3"><span className="text-[10px] font-black text-gray-400 uppercase">Tier</span><span className="font-bold capitalize">{selectedOrder.profiles?.tier}</span></div>
              <div className="flex justify-between border-b border-gray-200 pb-3"><span className="text-[10px] font-black text-gray-400 uppercase">Subtotal</span><span className="font-bold">{formatCurrency(selectedOrder.subtotal)}</span></div>
              <div className="flex justify-between border-b border-gray-200 pb-3"><span className="text-[10px] font-black text-gray-400 uppercase">Discount</span><span className="font-bold">{Number(selectedOrder.discount_rate) * 100}%</span></div>
              <div className="flex justify-between"><span className="text-[10px] font-black text-gray-400 uppercase">Final Price</span><span className="font-black text-hijau">{formatCurrency(selectedOrder.final_price)}</span></div>
            </div>
            <select value={selectedOrder.status} onChange={(event) => setSelectedOrder({ ...selectedOrder, status: event.target.value })}
              className="w-full mt-6 bg-gray-50 rounded-2xl p-4">
              <option value="pending">Pending</option><option value="processing">Processing</option>
              <option value="completed">Completed</option><option value="cancelled">Cancelled</option>
            </select>
            <button onClick={() => updateStatus(selectedOrder.id, selectedOrder.status)}
              className="w-full mt-4 bg-gray-900 text-white font-black py-4 rounded-2xl">Update Status</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-6">
        {stats.map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 flex items-center space-x-4">
            <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}>{icon}</div>
            <div><span className="text-2xl font-black text-gray-800 block leading-none">{value}</span><span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{label}</span></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden">
        {loading ? <LoadingSpinner text="Memuat pesanan..." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead><tr className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="pb-4 pl-4">Order ID</th><th className="pb-4">Customer</th><th className="pb-4">Status</th><th className="pb-4">Final Price</th><th className="pb-4 text-center">Action</th>
              </tr></thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="group hover:bg-gray-50 transition-all">
                    <td className="py-5 pl-4 font-black text-hijau">#{order.id.slice(0, 8)}</td>
                    <td className="py-5 font-bold text-gray-800">{order.profiles?.full_name || "Member"}</td>
                    <td className="py-5 capitalize">{order.status}</td>
                    <td className="py-5 font-black text-gray-800">{formatCurrency(order.final_price)}</td>
                    <td className="py-5 text-center"><button onClick={() => setSelectedOrder(order)}
                      className="bg-white text-hijau border-2 border-hijau/20 hover:bg-hijau hover:text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 mx-auto">
                      <FaEye /> Detail
                    </button></td>
                  </tr>
                ))}
                {orders.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-gray-400">Belum ada pesanan.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
