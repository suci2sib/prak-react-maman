import { useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaPlus, FaTimes, FaEye } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { ordersData } from "../data/mockData";

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // State untuk Detail Pesanan
  const [newOrder, setNewOrder] = useState({ customerName: "", status: "Pending", totalPrice: "", date: "" });

  const stats = [
    { id: "orders", label: "Total Orders", value: "75", icon: <FaShoppingCart />, color: "bg-emerald-500" },
    { id: "delivered", label: "Total Delivered", value: "357", icon: <FaTruck />, color: "bg-emerald-500" },
    { id: "canceled", label: "Total Canceled", value: "65", icon: <FaBan />, color: "bg-red-500" },
    { id: "revenue", label: "Total Revenue", value: "$128", icon: <FaDollarSign />, color: "bg-emerald-500" },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    const dataBaru = { ...newOrder, id: (orders.length + 1).toString() };
    setOrders([dataBaru, ...orders]);
    setShowModal(false);
    setNewOrder({ customerName: "", status: "Pending", totalPrice: "", date: "" });
  };

  return (
    <div id="orders-container" className="bg-[#F8F9FB] min-h-screen p-8 font-barlow relative">
      <PageHeader title="Order List" breadcrumb="Orders">
        <button onClick={() => setShowModal(true)} className="bg-hijau text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 shadow-lg hover:scale-105 transition-all active:scale-95">
          <FaPlus /> <span>Add Orders</span>
        </button>
      </PageHeader>

      {/* 1. MODAL FORM ADD ORDER */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors">
              <FaTimes />
            </button>
            <h2 className="text-2xl font-black text-gray-800 mb-2">New Order</h2>
            <p className="text-gray-400 text-sm mb-8 font-medium">Input detail pesanan baru ke sistem.</p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest">Customer Name</label>
                <input required type="text" placeholder="Masukkan nama pelanggan" className="w-full bg-gray-50 border-none rounded-2xl p-4 mt-1 focus:ring-2 focus:ring-hijau" 
                  onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest">Price ($)</label>
                  <input required type="number" placeholder="0.00" className="w-full bg-gray-50 border-none rounded-2xl p-4 mt-1 focus:ring-2 focus:ring-hijau" 
                    onChange={(e) => setNewOrder({...newOrder, totalPrice: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest">Status</label>
                  <select className="w-full bg-gray-50 border-none rounded-2xl p-4 mt-1 focus:ring-2 focus:ring-hijau text-gray-600 font-medium" 
                    onChange={(e) => setNewOrder({...newOrder, status: e.target.value})}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest">Order Date</label>
                <input required type="date" className="w-full bg-gray-50 border-none rounded-2xl p-4 mt-1 focus:ring-2 focus:ring-hijau text-gray-600" 
                  onChange={(e) => setNewOrder({...newOrder, date: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-hijau text-white font-black py-4 rounded-2xl shadow-lg shadow-green-100 mt-4 hover:bg-green-600 transition-all">
                Save Transaction
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. MODAL DETAIL ORDER */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedOrder(null)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors">
              <FaTimes />
            </button>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-hijau text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-green-100">
                <FaShoppingCart />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">Order #{selectedOrder.id}</h2>
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Transaction Detail</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-[2rem] p-6 space-y-4 border border-gray-100">
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-[10px] font-black text-gray-400 uppercase">Customer</span>
                <span className="font-bold text-gray-800">{selectedOrder.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-[10px] font-black text-gray-400 uppercase">Status</span>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                    selectedOrder.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                    selectedOrder.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                }`}>{selectedOrder.status}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-[10px] font-black text-gray-400 uppercase">Total Amount</span>
                <span className="font-black text-hijau">${selectedOrder.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase">Date</span>
                <span className="font-bold text-gray-700">{selectedOrder.date}</span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-8 bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-gray-800 transition-all shadow-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* 3. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-6 animate-in slide-in-from-bottom duration-500">
        {stats.map((item) => (
          <div key={item.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 flex items-center space-x-4">
            <div className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}>
              {item.icon}
            </div>
            <div>
              <span className="text-2xl font-black text-gray-800 block leading-none">{item.value}</span>
              <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. TABLE DATA */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden animate-in fade-in duration-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="pb-4 pl-4">Order ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Price</th>
                <th className="pb-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="group hover:bg-gray-50 transition-all duration-300">
                  <td className="py-5 pl-4 font-black text-hijau bg-gray-50/50 rounded-l-2xl group-hover:bg-white transition-colors">
                    #{order.id}
                  </td>
                  <td className="py-5 font-bold text-gray-800 group-hover:translate-x-1 transition-transform">
                    {order.customerName}
                  </td>
                  <td className="py-5">
                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-600 shadow-sm shadow-green-50' : 
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600 shadow-sm shadow-yellow-50' : 'bg-red-100 text-red-600 shadow-sm shadow-red-50'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-5 font-black text-gray-800">
                    ${order.totalPrice}
                  </td>
                  <td className="py-5 text-center rounded-r-2xl bg-gray-50/50 group-hover:bg-white transition-colors px-4">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="bg-white text-hijau border-2 border-hijau/20 hover:border-hijau hover:bg-hijau hover:text-white px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 mx-auto"
                    >
                      <FaEye /> Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}