import { useState } from "react";
import { Link } from "react-router-dom";
import AlertBox from "../../components/AlertBox";
import { supabase } from "../../lib/supabase";

const getErrorMessage = (error) => {
  if (!error) return "Registrasi gagal. Silakan coba lagi.";
  if (typeof error === "string") return error;

  return (
    error.message ||
    error.error_description ||
    error.error ||
    "Registrasi gagal. Periksa konfigurasi Supabase dan coba lagi."
  );
};

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);
    const { data, error: registerError } = await supabase.auth.signUp({
      email: dataForm.email.trim(),
      password: dataForm.password,
      options: { data: { full_name: dataForm.fullName.trim() } },
    });

    if (registerError) {
      setError(getErrorMessage(registerError));
    } else if (data.session) {
      setSuccess("Registrasi berhasil. Kamu sudah masuk sebagai member Bronze.");
    } else {
      setSuccess("Registrasi berhasil. Silakan periksa email untuk konfirmasi akun.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Create Your Account ✨
      </h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input required type="text" id="fullName" name="fullName" value={dataForm.fullName} onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400" placeholder="Your full name" />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input required type="email" id="email" name="email" value={dataForm.email} onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400" placeholder="you@example.com" />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input required minLength="6" type="password" id="password" name="password" value={dataForm.password} onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400" placeholder="********" />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input required minLength="6" type="password" id="confirmPassword" name="confirmPassword" value={dataForm.confirmPassword} onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400" placeholder="********" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-60">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center text-sm mt-5 text-gray-500">
        Already registered? <Link to="/login" className="text-green-600 hover:underline">Login</Link>
      </p>
    </div>
  );
}
