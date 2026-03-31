export default function TailwindCSS() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <FlexboxGrid />

      <header className="text-center my-8">
        <h1 className="border-b-4 border-blue-400 inline-block px-4 py-2 text-3xl font-bold text-gray-800">
          Belajar Tailwind CSS 4
        </h1>
      </header>

      <div className="flex justify-center mb-10">
        <button className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:scale-105 transform transition-all duration-300">
          Click Me
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-10">
        {/* Grid 2 kartu per baris */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Spacing />
          <BackgroundColors />
          <ShadowEffects />
          <Typography />
        </div>

        {/* Button border radius tetap di bawah */}
        <BorderRadius />
      </div>
    </div>
  );
}

// --- Components ---
function FlexboxGrid() {
  return (
    <nav className="flex justify-between items-center bg-gray-900 p-6 text-white shadow-lg sticky top-0 z-50">
      <h1 className="text-xl font-bold tracking-wide">MyWebsite</h1>
      <ul className="flex space-x-8">
        <li>
          <a href="#" className="hover:text-blue-400 transition duration-300">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-blue-400 transition duration-300">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-blue-400 transition duration-300">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Spacing() {
  return (
    <div className="bg-gray-200 shadow-lg p-6 rounded-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
      <h2 className="text-lg font-semibold mb-2">Card Title</h2>
      <p className="text-gray-700">Ini adalah contoh penggunaan padding dan margin di Tailwind.</p>
    </div>
  );
}

function Typography() {
  return (
    <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-xl hover:scale-105 transform transition-all duration-300">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">Tailwind Typography</h1>
      <p className="text-gray-600 text-lg">Belajar Tailwind sangat menyenangkan dan cepat!</p>
    </div>
  );
}

function BorderRadius() {
  return (
    <div className="flex justify-center mt-6">
      <button className="border-2 border-blue-500 text-blue-500 px-8 py-2 rounded-full hover:bg-blue-100 hover:scale-105 transform transition-all duration-300">
        Klik Saya
      </button>
    </div>
  );
}

function BackgroundColors() {
  return (
    <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white p-6 rounded-xl hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:scale-105 transform transition-all duration-300">
      <h3 className="text-xl font-bold mb-2">Tailwind Colors</h3>
      <p>Belajar Tailwind itu seru dan fleksibel!</p>
    </div>
  );
}

function ShadowEffects() {
  return (
    <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
      <h3 className="text-xl font-semibold mb-2">Hover me!</h3>
      <p className="text-pink-400">Lihat efek bayangan saat hover.</p>
    </div>
  );
}