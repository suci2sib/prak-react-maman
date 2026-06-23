import { useState } from "react";
import { Link } from "react-router-dom";
import AlertBox from "../../components/AlertBox";
import { supabase } from "../../lib/supabase";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (resetError) setError(resetError.message);
    else setSuccess("Link reset password sudah dikirim. Silakan periksa email.");
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">Forgot Your Password?</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input required type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="you@example.com" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-60">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      <p className="text-center mt-5 text-sm"><Link to="/login" className="text-green-600 hover:underline">Back to login</Link></p>
    </div>
  );
}
