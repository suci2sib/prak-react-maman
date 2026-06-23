import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTimes, FaTrash, FaUsers } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import { supabase } from "../lib/supabase";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const loadCustomers = async () => {
    const { data, error: customersError } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "member")
      .order("updated_at", { ascending: false });

    if (customersError) setError(customersError.message);
    else setCustomers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCustomers();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: editingCustomer.full_name,
        role: editingCustomer.role,
        tier: editingCustomer.tier,
        points: Number(editingCustomer.points),
      })
      .eq("id", editingCustomer.id);

    if (updateError) return setError(updateError.message);

    setEditingCustomer(null);
    setSuccess("Data member berhasil diperbarui.");
    loadCustomers();
  };

  const handleDelete = async (customer) => {
    if (!window.confirm(`Hapus profil ${customer.full_name}?`)) return;
    const { error: deleteError } = await supabase.from("profiles").delete().eq("id", customer.id);

    if (deleteError) {
      setError(`${deleteError.message}. Profil yang masih memiliki pesanan tidak dapat dihapus.`);
    } else {
      setSuccess("Profil member berhasil dihapus.");
      loadCustomers();
    }
  };

  const tierCount = (tier) => customers.filter((customer) => customer.tier === tier).length;

  return (
    <div id="customers-container" className="bg-[#F8F9FB] min-h-screen p-8 font-barlow relative">
      <PageHeader title="Customer List" breadcrumb="Customer" />
      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {selectedCustomer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative text-center">
            <button onClick={() => setSelectedCustomer(null)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500"><FaTimes /></button>
            <div className="w-20 h-20 bg-hijau/10 text-hijau rounded-[2rem] flex items-center justify-center text-3xl font-black mx-auto mb-4">
              {selectedCustomer.full_name.charAt(0)}
            </div>
            <h2 className="text-2xl font-black text-gray-900">{selectedCustomer.full_name}</h2>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1 mb-8">Customer Detail Profile</p>
            <div className="bg-gray-50 rounded-3xl p-6 text-left space-y-4 border border-gray-100">
              <div className="flex justify-between border-b border-gray-200 pb-3"><span className="text-[10px] font-black text-gray-400 uppercase">Tier</span><span className="font-bold capitalize">{selectedCustomer.tier}</span></div>
              <div className="flex justify-between border-b border-gray-200 pb-3"><span className="text-[10px] font-black text-gray-400 uppercase">Points</span><span className="font-bold">{selectedCustomer.points}</span></div>
              <div className="flex justify-between"><span className="text-[10px] font-black text-gray-400 uppercase">Role</span><span className="font-bold capitalize">{selectedCustomer.role}</span></div>
            </div>
          </div>
        </div>
      )}

      {editingCustomer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative">
            <button onClick={() => setEditingCustomer(null)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500"><FaTimes /></button>
            <h2 className="text-2xl font-black text-gray-800 mb-8">Edit Member</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input required value={editingCustomer.full_name}
                onChange={(event) => setEditingCustomer({ ...editingCustomer, full_name: event.target.value })}
                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-hijau" />
              <div className="grid grid-cols-3 gap-4">
                <select value={editingCustomer.role}
                  onChange={(event) => setEditingCustomer({ ...editingCustomer, role: event.target.value })}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-hijau">
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
                <select value={editingCustomer.tier}
                  onChange={(event) => setEditingCustomer({ ...editingCustomer, tier: event.target.value })}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-hijau">
                  <option value="bronze">Bronze</option><option value="silver">Silver</option>
                  <option value="gold">Gold</option><option value="platinum">Platinum</option>
                </select>
                <input required min="0" type="number" value={editingCustomer.points}
                  onChange={(event) => setEditingCustomer({ ...editingCustomer, points: event.target.value })}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-hijau" />
              </div>
              <button type="submit" className="w-full bg-hijau text-white font-black py-4 rounded-2xl">Save Member</button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-6">
        {[["Total Members", customers.length], ["Bronze", tierCount("bronze")], ["Silver", tierCount("silver")], ["Gold & Platinum", tierCount("gold") + tierCount("platinum")]].map(([label, value]) => (
          <div key={label} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 flex items-center space-x-4">
            <div className="bg-emerald-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg"><FaUsers /></div>
            <div><span className="text-2xl font-black text-gray-800 block leading-none">{value}</span><span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{label}</span></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden">
        {loading ? <LoadingSpinner text="Memuat member..." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead><tr className="text-gray-400 text-sm uppercase tracking-widest font-bold">
                <th className="pb-4 pl-4">ID</th><th className="pb-4">Name</th><th className="pb-4">Tier</th><th className="pb-4">Points</th><th className="pb-4 text-center">Action</th>
              </tr></thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4 pl-4 font-bold text-gray-500">#{customer.id.slice(0, 8)}</td>
                    <td className="py-4 font-bold text-gray-800">{customer.full_name}</td>
                    <td className="py-4 capitalize">{customer.tier}</td>
                    <td className="py-4 font-bold">{customer.points}</td>
                    <td className="py-4"><div className="flex justify-center gap-2">
                      <button onClick={() => setSelectedCustomer(customer)} className="p-2 text-hijau bg-green-50 rounded-lg"><FaEye /></button>
                      <button onClick={() => setEditingCustomer({ ...customer })} className="p-2 text-blue-500 bg-blue-50 rounded-lg"><FaEdit /></button>
                      <button onClick={() => handleDelete(customer)} className="p-2 text-red-500 bg-red-50 rounded-lg"><FaTrash /></button>
                    </div></td>
                  </tr>
                ))}
                {customers.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-gray-400">Belum ada member.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
