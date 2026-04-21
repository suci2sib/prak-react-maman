import { Link } from "react-router-dom";
import { MdRestaurant, MdArrowBack } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F9FB] p-6 font-barlow">
      <div className="max-w-md w-full text-center">
        {/* Ilustrasi Ikon */}
        <div className="relative flex justify-center mb-8">
          <div className="absolute inset-0 bg-hijau opacity-10 blur-3xl rounded-full"></div>
          <div className="relative bg-white p-8 rounded-[3rem] shadow-xl shadow-green-100/50">
            <MdRestaurant className="text-hijau text-8xl animate-bounce" />
          </div>
        </div>

        {/* Teks Error */}
        <h1 className="text-[120px] font-black text-gray-200 leading-none">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-[-20px] font-poppins">
          Duh! Meja Kosong.
        </h2>
        <p className="text-gray-500 mt-4 leading-relaxed">
          Maaf, menu atau halaman yang kamu cari tidak tersedia di dapur kami. 
          Mungkin kamu salah memasukkan alamat atau halaman telah dipindahkan.
        </p>

        {/* Tombol Aksi */}
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center space-x-3 bg-hijau text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-600 hover:scale-105 transition-all active:scale-95"
          >
            <MdArrowBack className="text-xl" />
            <span>Kembali ke Dashboard</span>
          </Link>
        </div>

        {/* Footer Brand */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <span className="font-bold text-gray-300 block text-sm italic">
            Sedap Restaurant Admin Dashboard
          </span>
        </div>
      </div>
    </div>
  );
}