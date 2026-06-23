import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus, FaShoppingCart, FaTimes, FaTrash } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { formatCurrency } from "../lib/format";

const emptyProduct = { name: "", price: "", stock: "" };

export default function Products() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === "admin";
  const basePath = isAdmin ? "/admin" : "/member";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dataForm, setDataForm] = useState(emptyProduct);

  const loadProducts = async () => {
    const { data, error: productsError } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (productsError) setError(productsError.message);
    else setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setDataForm(emptyProduct);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setDataForm({ name: product.name, price: product.price, stock: product.stock });
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const payload = {
      name: dataForm.name,
      price: Number(dataForm.price),
      stock: Number(dataForm.stock),
    };
    const query = editingProduct
      ? supabase.from("products").update(payload).eq("id", editingProduct.id)
      : supabase.from("products").insert(payload);
    const { error: saveError } = await query;

    if (saveError) return setError(saveError.message);

    setShowModal(false);
    setSuccess(editingProduct ? "Produk berhasil diperbarui." : "Produk berhasil ditambahkan.");
    loadProducts();
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Hapus produk "${product.name}"?`)) return;
    const { error: deleteError } = await supabase.from("products").delete().eq("id", product.id);
    if (deleteError) setError(deleteError.message);
    else {
      setSuccess("Produk berhasil dihapus.");
      loadProducts();
    }
  };

  const handleOrder = async (product) => {
    const quantityInput = window.prompt(`Jumlah ${product.name} yang ingin dipesan:`, "1");
    if (quantityInput === null) return;

    const quantity = Number(quantityInput);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > product.stock) {
      setError("Jumlah pesanan tidak valid atau melebihi stok.");
      return;
    }

    const { error: orderError } = await supabase.rpc("create_order", {
      requested_product_id: product.id,
      requested_quantity: quantity,
    });

    if (orderError) setError(orderError.message);
    else {
      setSuccess(`Pesanan ${product.name} berhasil dibuat. Harga dan diskon dihitung aman oleh database.`);
      loadProducts();
    }
  };

  return (
    <div id="dashboard-container" className="p-6 bg-gray-50 min-h-screen">
      <PageHeader title="Products" breadcrumb="Products">
        {isAdmin && (
          <button onClick={openCreateModal}
            className="bg-hijau text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 shadow-lg hover:scale-105 transition-all">
            <FaPlus /><span>Add Product</span>
          </button>
        )}
      </PageHeader>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500"><FaTimes /></button>
            <h2 className="text-2xl font-black text-gray-800 mb-8">{editingProduct ? "Edit Product" : "New Product"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Product name" value={dataForm.name}
                onChange={(event) => setDataForm({ ...dataForm, name: event.target.value })}
                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-hijau" />
              <div className="grid grid-cols-2 gap-4">
                <input required min="0" step="0.01" type="number" placeholder="Price" value={dataForm.price}
                  onChange={(event) => setDataForm({ ...dataForm, price: event.target.value })}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-hijau" />
                <input required min="0" type="number" placeholder="Stock" value={dataForm.stock}
                  onChange={(event) => setDataForm({ ...dataForm, stock: event.target.value })}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-hijau" />
              </div>
              <button type="submit" className="w-full bg-hijau text-white font-black py-4 rounded-2xl">Save Product</button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {loading ? <LoadingSpinner text="Menyiapkan produk..." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Price</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">Stock</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500">#{item.id.slice(0, 8)}</td>
                    <td className="px-6 py-4">
                      <Link to={`${basePath}/products/${item.id}`} className="text-emerald-500 hover:text-emerald-600 font-bold">{item.name}</Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-blue-600">{formatCurrency(item.price)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${item.stock < 10 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {isAdmin ? (
                          <>
                            <button onClick={() => openEditModal(item)} className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"><FaEdit /></button>
                            <button onClick={() => handleDelete(item)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white"><FaTrash /></button>
                          </>
                        ) : (
                          <button disabled={item.stock < 1} onClick={() => handleOrder(item)}
                            className="flex items-center gap-2 px-4 py-2 bg-hijau text-white rounded-lg font-bold text-xs disabled:opacity-50">
                            <FaShoppingCart /> Order
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-gray-400">Belum ada produk.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
