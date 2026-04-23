import { useNavigate } from "react-router-dom";

export default function ErrorPage({ code = "404", title = "Page Not Found", description }) {
  const navigate = useNavigate();

  const defaultDesc = "Maaf, menu atau halaman yang kamu cari tidak tersedia. Mungkin kabelnya sedang kami perbaiki!";

  return (
    <div className="min-h-screen bg-[#d1fad7] flex items-center justify-center p-6 font-poppins relative overflow-hidden">
      
      {/* --- BACKGROUND DECORATION (Glow & Circle) --- */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-white/40 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[5%] w-[350px] h-[350px] bg-green-300/30 rounded-full blur-[80px]"></div>
      </div>

      {/* --- ANGKA ERROR RAKSASA (Penjelasan: Sentral, Ukuran Lebih Kecil, Warna Jelas & Estetik) --- */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
        <h1 className="text-[250px] md:text-[450px] font-black text-[#1A5D1A] opacity-[0.12] leading-none tracking-tighter drop-shadow-sm animate-float-slow">
          {code}
        </h1>
      </div>

      {/* --- MAIN CONTENT (Glassmorphism Effect) --- */}
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 bg-white/10 p-12 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl shadow-green-950/5">
        
        {/* SISI KIRI: TEXT */}
        <div className="text-left md:w-1/2">
          <div className="inline-block px-5 py-2 rounded-2xl bg-white/60 text-[#1A5D1A] text-xs font-black uppercase tracking-widest mb-8 shadow-sm backdrop-blur-sm">
            Status Code: {code}
          </div>
          
          <h2 className="text-8xl md:text-[120px] font-black text-gray-900 mb-2 leading-none drop-shadow-sm">
            Ooops...
          </h2>
          
          <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">
            {title}
          </h3>
          
          <p className="text-gray-600 text-lg md:text-xl mb-12 leading-relaxed max-w-md font-medium">
            {description || defaultDesc}
          </p>
          
          <button
            onClick={() => navigate("/")}
            className="group relative bg-[#32c766] text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-[0_20px_40px_rgba(50,199,102,0.3)] hover:bg-green-600 hover:-translate-y-2 transition-all duration-300 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Back to Dashboard</span>
            {/* Efek Shine saat Hover */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
          </button>
        </div>

        {/* SISI KANAN: ILUSTRASI KABEL (Penjelasan: Detail MATA LUCU & Melayang) */}
        <div className="md:w-1/2 flex justify-center items-center">
          <div className="relative">
            {/* Glow di belakang kabel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/60 blur-[100px] rounded-full"></div>
            
            <svg width="450" height="350" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-2xl">
              {/* Kabel Atas (Melayang) */}
              <g className="animate-float">
                <path d="M80 80 C 130 80, 160 120, 180 120" stroke="#1f2937" strokeWidth="16" strokeLinecap="round"/>
                <rect x="180" y="95" width="60" height="50" rx="12" fill="#1f2937" />
                <rect x="195" y="105" width="10" height="30" rx="2" fill="#32c766" className="animate-pulse" />
                <rect x="215" y="105" width="10" height="30" rx="2" fill="#32c766" className="animate-pulse" />
                {/* Mata Lucu Kabel */}
                <circle cx="202" cy="115" r="2" fill="#1f2937" />
                <circle cx="208" cy="115" r="2" fill="#1f2937" />
              </g>

              {/* Percikan Listrik (Animated) */}
              <g className="opacity-80">
                <circle cx="235" cy="150" r="4" fill="#fbbf24" className="animate-ping" />
                <path d="M225 140L240 155M245 140L230 160" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
              </g>

              {/* Kabel Bawah (Melayang Berlawanan) */}
              <g className="animate-float-reverse">
                <path d="M320 220 C 270 220, 240 180, 220 180" stroke="#1f2937" strokeWidth="16" strokeLinecap="round"/>
                <rect x="160" y="155" width="60" height="50" rx="12" fill="#1f2937" />
                <circle cx="180" cy="180" r="5" fill="#4b5563" />
                <circle cx="200" cy="180" r="5" fill="#4b5563" />
                {/* Mata Lucu Colokan (Sedih) */}
                <circle cx="178" cy="170" r="2.5" fill="white" />
                <circle cx="192" cy="170" r="2.5" fill="white" />
              </g>
            </svg>
          </div>
        </div>

      </div>

      {/* --- CUSTOM ANIMATION --- */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(25px) rotate(-2deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(-50%) translateX(0px); }
          50% { transform: translateY(-50%) translateX(-20px); }
        }
        @keyframes shine {
          100% { left: 125%; }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 5s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-shine { animation: shine 0.8s ease-in-out; }
      `}</style>
    </div>
  );
}