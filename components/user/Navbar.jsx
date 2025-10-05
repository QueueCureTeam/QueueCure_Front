export default function Navbar() {
  return (
    <nav className="text-gray-100 font-semibold sticky shadow-xl bg-gradient-to-b from-blue-600/90 to-blue-800/95">
      <div className="px-6 py-4 flex justify-between">
        <div className="shrink-0 items-center">
          <img src="#" className="size-8 drop-shadow-xl"></img>
        </div>
        <div className="hidden gap-3 sm:flex">
          <a href="#" className="text-shadow-2xs text-shadow-blue-800 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/70 hover:text-blue-950 hover:shadow-md hover:text-shadow-none">Home</a>
          <a href="#" className="text-shadow-2xs text-shadow-blue-800 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/70 hover:text-blue-950 hover:shadow-md hover:text-shadow-none">About Us</a>
          <a href="#" className="text-shadow-2xs text-shadow-blue-800 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/70 hover:text-blue-950 hover:shadow-md hover:text-shadow-none">Login</a>
          <a href="#" className="text-shadow-2xs text-shadow-blue-800 rounded-lg px-3 py-2 bg-blue-400 transition-all duration-200 hover:bg-white/70 hover:text-blue-950 hover:shadow-md hover:text-shadow-none">Register</a>
        </div>
      </div>
    </nav>
  );
}