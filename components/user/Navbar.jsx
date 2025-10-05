"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="text-gray-100 sticky shadow-xl bg-gradient-to-b from-blue-700/90 to-blue-800/95">
      <div className="px-6 py-4 flex justify-between">
        <div className="shrink-0 items-center">
          <img src="#" className="size-8 drop-shadow-xl"></img>
        </div>
        <div className="hidden gap-3 sm:flex">
          <a href="#" className="text-shadow-2xs text-shadow-blue-800 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/10 hover:shadow-md hover:text-shadow-none">Home</a>
          <a href="#" className="text-shadow-2xs text-shadow-blue-800 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/10 hover:shadow-md hover:text-shadow-none">About Us</a>
          <a href="#" className="text-shadow-2xs text-shadow-blue-800 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/10 hover:shadow-md hover:text-shadow-none">Login</a>
          <a href="#" className="text-shadow-2xs text-shadow-blue-800 rounded-lg px-3 py-2 bg-blue-400 transition-all duration-200 hover:bg-white/10 hover:shadow-md hover:text-shadow-none">Register</a>
        </div>
        <button className="sm:hidden px-3 py-2 border border-white/70 rounded-md hover:bg-white/10" onClick={() => setOpen(!open)}>{open ? "✖" : "☰"}</button>
      </div>
      {open && (
        <div className="sm:hidden flex flex-col bg-blue-800/95 border-t border-blue-600">
          <a href="#" className="py-3 text-center hover:bg-white/10 transition">Home</a>
          <a href="#" className="py-3 text-center hover:bg-white/10 transition">About Us</a>
          <a href="#" className="py-3 text-center hover:bg-white/10 transition">Login</a>
          <a href="#" className="py-3 text-center hover:bg-white/10 transition">Register</a>
        </div>
      )}
    </nav>
  );
}