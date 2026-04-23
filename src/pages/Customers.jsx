import { useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaUserPlus, FaTimes, FaEye } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { customersData } from "../data/mockData";

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State untuk Detail
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "", loyalty: "Bronze" });

  const stats = [
    { id: "orders", label: "New Customers", value: "75", icon: <FaShoppingCart />, color: "bg-emerald-500" },
    { id: "delivered", label: "Active Members", value: "357", icon: <FaTruck />, color: "bg-emerald-500" },
    { id: "canceled", label: "Churn Rate", value: "2.4%", icon: <FaBan />, color: "bg-red-500" },
    { id: "revenue", label: "Avg Spend", value: "$128", icon: <FaDollarSign />, color: "bg-emerald-500" },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    const dataBaru = { ...newCustomer, id: (customers.length + 1).toString() };
    setCustomers([dataBaru, ...customers]);
    setShowModal(false);
    setNewCustomer({ name: "", email: "", phone: "", loyalty: "Bronze" });
  };

  return (
    <div id="customers-container" className="bg-[#F8F9FB] min-h-screen p-8 font-barlow relative">
      <PageHeader title="Customer List" breadcrumb="Customer">
        <button 
          onClick={() => setShowModal(true)}
          className="bg-hijau text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 shadow-lg hover:scale-105 transition-all"
        >
          <FaUserPlus />
          <span>Add Customer</span>
        </button>
      </PageHeader>

      {/* 1. MODAL FORM TAMBAH CUSTOMER */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500">
              <FaTimes />
            </button>
            
            <h2 className="text-2xl font-black text-gray-800 mb-2">New Customer</h2>
            <p className="text-gray-400 text-sm mb-8 font-medium">Lengkapi data untuk menambahkan member baru.</p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest">Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full bg-gray-50 border-none rounded-2xl p-4 mt-1 focus:ring-2 focus:ring-hijau" 
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest">Email Address</label>
                <input required type="email" placeholder="john@example.com" className="w-full bg-gray-50 border-none rounded-2xl p-4 mt-1 focus:ring-2 focus:ring-hijau" 
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest">Phone</label>
                  <input required type="text" placeholder="0812..." className="w-full bg-gray-50 border-none rounded-2xl p-4 mt-1 focus:ring-2 focus:ring-hijau" 
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest">Loyalty</label>
                  <select className="w-full bg-gray-50 border-none rounded-2xl p-4 mt-1 focus:ring-2 focus:ring-hijau" 
                    onChange={(e) => setNewCustomer({...newCustomer, loyalty: e.target.value})}>
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-hijau text-white font-black py-4 rounded-2xl shadow-lg shadow-green-100 mt-4 hover:bg-green-600 transition-all">
                Save Member
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. MODAL DETAIL CUSTOMER */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300 text-center">
            <button onClick={() => setSelectedCustomer(null)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500">
              <FaTimes />
            </button>
            
            <div className="w-20 h-20 bg-hijau/10 text-hijau rounded-[2rem] flex items-center justify-center text-3xl font-black mx-auto mb-4">
              {selectedCustomer.name.charAt(0)}
            </div>
            
            <h2 className="text-2xl font-black text-gray-900 leading-tight">{selectedCustomer.name}</h2>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1 mb-8">Customer Detail Profile</p>

            <div className="bg-gray-50 rounded-3xl p-6 text-left space-y-4 border border-gray-100">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="text-[10px] font-black text-gray-400 uppercase">Status</span>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                    selectedCustomer.loyalty === 'Gold' ? 'bg-orange-100 text-orange-600' : 
                    selectedCustomer.loyalty === 'Silver' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
                }`}>{selectedCustomer.loyalty}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</span>
                <span className="font-bold text-gray-700 text-sm">{selectedCustomer.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</span>
                <span className="font-bold text-gray-700 text-sm">{selectedCustomer.phone}</span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedCustomer(null)}
              className="w-full mt-8 bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-gray-800 transition-all"
            >
              Close Detail
            </button>
          </div>
        </div>
      )}

      {/* 3. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-6">
        {stats.map((item) => (
          <div key={item.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 flex items-center space-x-4">
            <div className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}>{item.icon}</div>
            <div>
              <span className="text-2xl font-black text-gray-800 block leading-none">{item.value}</span>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. TABLE DATA */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-400 text-sm uppercase tracking-widest font-bold">
                <th className="pb-4 pl-4">ID</th>
                <th className="pb-4">Name</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Phone</th>
                <th className="pb-4">Loyalty</th>
                <th className="pb-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((user) => (
                <tr key={user.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-4 pl-4 font-bold text-gray-500 bg-gray-50/50 rounded-l-2xl group-hover:bg-white">#{user.id}</td>
                  <td className="py-4 font-bold text-gray-800">{user.name}</td>
                  <td className="py-4 text-gray-500">{user.email}</td>
                  <td className="py-4 text-gray-500 font-medium">{user.phone}</td>
                  <td className="py-4">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      user.loyalty === 'Gold' ? 'bg-orange-100 text-orange-600' : 
                      user.loyalty === 'Silver' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>{user.loyalty}</span>
                  </td>
                  <td className="py-4 text-center rounded-r-2xl bg-gray-50/50 group-hover:bg-white">
                    <button 
                      onClick={() => setSelectedCustomer(user)}
                      className="text-hijau font-bold text-sm hover:underline flex items-center justify-center w-full gap-1"
                    >
                      <FaEye className="text-xs" /> Detail
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