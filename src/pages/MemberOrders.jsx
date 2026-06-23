import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import { supabase } from "../lib/supabase";
import { formatCurrency } from "../lib/format";

export default function MemberOrders() {
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

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-8">
      <PageHeader title="My Orders" breadcrumb="Order History" />
      {error && <AlertBox type="error">{error}</AlertBox>}

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden">
        {loading ? <LoadingSpinner text="Memuat riwayat pesanan..." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="pb-4 pl-4">Order ID</th><th className="pb-4">Date</th>
                  <th className="pb-4">Subtotal</th><th className="pb-4">Discount</th>
                  <th className="pb-4">Final Price</th><th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-5 pl-4 font-black text-hijau">#{order.id.slice(0, 8)}</td>
                    <td className="py-5 text-gray-600">{new Date(order.created_at).toLocaleDateString("id-ID")}</td>
                    <td className="py-5 font-bold">{formatCurrency(order.subtotal)}</td>
                    <td className="py-5 font-bold">{Number(order.discount_rate) * 100}%</td>
                    <td className="py-5 font-black text-hijau">{formatCurrency(order.final_price)}</td>
                    <td className="py-5 capitalize">{order.status}</td>
                  </tr>
                ))}
                {orders.length === 0 && <tr><td colSpan="6" className="p-8 text-center text-gray-400">Belum ada riwayat pesanan.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
