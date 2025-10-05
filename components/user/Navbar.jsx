export default function Navbar() {
  return (
    <nav className="bg-blue-800/95 text-gray-100 font-medium sticky shadow-xl">
      <div className="px-6 py-5 flex justify-between">
        <div className="shrink-0 items-center">
          <img src="#" className="size-8"></img>
        </div>
        <div className="flex gap-3">
          <a href="#" className="rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/70 hover:text-blue-950 hover:shadow-md">Home</a>
          <a href="#" className="rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/70 hover:text-blue-950 hover:shadow-md">About Us</a>
          <a href="#" className="rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/70 hover:text-blue-950 hover:shadow-md">Login</a>
          <a href="#" className="rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/70 hover:text-blue-950 hover:shadow-md">Register</a>
        </div>
      </div>
    </nav>
  );
}