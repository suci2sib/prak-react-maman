import frameworkData from "./framework.json";

export default function FrameworkList() {
  // Array warna untuk variasi kartu agar lebih hidup
  const colors = [
    "from-blue-500/10 to-indigo-500/10 border-blue-200",
    "from-emerald-500/10 to-teal-500/10 border-emerald-200",
    "from-purple-500/10 to-pink-500/10 border-purple-200",
    "from-orange-500/10 to-amber-500/10 border-orange-200",
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Frameworks</span>
          </h1>
          <p className="text-slate-500 font-medium">Eksplorasi teknologi terbaik untuk masa depan web.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {frameworkData.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden bg-gradient-to-br ${colors[index % colors.length]} 
                         border-2 p-8 rounded-[2rem] transition-all duration-500 
                         hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-200/50 bg-white`}
            >
              {/* Dekorasi lingkaran warna di belakang (Aksen Modern) */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/40 rounded-full blur-2xl group-hover:bg-white/60 transition-all"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1 block">
                      {item.details.releaseYear} Framework
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-800 group-hover:text-indigo-700 transition-colors">
                      {item.name}
                    </h2>
                  </div>
                  <div className="h-12 w-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-white/50">
                     <span className="text-xl">🚀</span>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-white/80 backdrop-blur-md text-slate-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-slate-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
                  <span className="text-sm font-bold text-slate-500">
                    By {item.details.developer}
                  </span>
                  <a
                    href={item.details.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-600 hover:scale-105 transition-all active:scale-95 shadow-lg shadow-slate-200"
                  >
                    Explore 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}