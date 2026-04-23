export default function PageHeader({ title, breadcrumb, children }) {
  return (
    <div 
      id="pageheader-container" 
      className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-transparent gap-4"
    >
      {/* SISI KIRI: Judul & Navigasi Kecil */}
      <div id="pageheader-left" className="flex flex-col">
        <h1 
          id="page-title" 
          className="text-4xl font-black font-poppins text-gray-900 tracking-tight leading-none"
        >
          {title}
        </h1>
        
        <div 
          id="breadcrumb-links" 
          className="flex items-center space-x-2 mt-3 text-xs uppercase tracking-[0.15em] font-bold"
        >
          <span className="text-gray-400 font-barlow">Dashboard</span>
          <span className="text-gray-300">/</span>
          <span className="text-hijau font-barlow">
            {breadcrumb}
          </span>
        </div>
      </div>

      {/* SISI KANAN: Slot untuk Button Add (via children) */}
      <div 
        id="action-button" 
        className="flex items-center animate-in fade-in slide-in-from-right duration-500"
      >
        {children}
      </div>
    </div>
  );
}