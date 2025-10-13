"use client";
import { useState } from "react";
import {FaHome, FaInfoCircle, FaUserCircle, FaSignInAlt, FaUserPlus, FaBars, FaTimes} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user] = useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-gray-100 shadow-xl">
      <div className="flex justify-between px-6 py-4">
        <div className="shrink-0 flex items-center">
          <img src="#" alt="logo" className="size-8 drop-shadow-xl" />
        </div>
        <div className="hidden sm:flex gap-3">
          <a href="#" className="flex items-center gap-2 rounded-xl px-3 py-2 text-shadow-xs text-shadow-blue-800 hover:bg-white/10 hover:shadow-lg transition-all duration-200">
            <FaHome />
            <span>หน้าหลัก</span>
          </a>
          <a href="#" className="flex items-center gap-2 rounded-xl px-3 py-2 text-shadow-xs text-shadow-blue-800 hover:bg-white/10 hover:shadow-lg transition-all duration-200">
            <FaInfoCircle />
            <span>เกี่ยวกับเรา</span>
          </a>
          {!user ? (
            <>
              <a href="http://localhost:3000/auth/login" className="flex items-center gap-2 rounded-xl px-3 py-2 text-shadow-xs text-shadow-blue-800 hover:bg-white/10 hover:shadow-lg transition-all duration-200">
                <FaSignInAlt />
                <span>เข้าสู่ระบบ</span>
              </a>
              <a href="http://localhost:3000/auth/login" className="flex items-center gap-2 rounded-xl px-3 py-2 bg-white/20 text-gray-100 shadow-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
                <FaUserPlus />
                <span>สมัครสมาชิก</span>
              </a>
            </>
          ) : (
            <div className="flex items-center border-l border-white/40 pl-4 drop-shadow-xl">
              <FaUserCircle size={40} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 sm:hidden">
          {user && (
            <div className="flex items-center border-r border-white/40 pr-3 drop-shadow-xl">
              <FaUserCircle size={32} />
            </div>
          )}
          <button onClick={toggleMenu} className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:shadow-lg transition-all duration-200">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {open && (
        <div className="flex flex-col sm:hidden bg-blue-800/95 text-left">
          <a href="#" onClick={toggleMenu} className="flex items-center gap-2 px-6 py-4 border-l-4 border-transparent text-shadow-xs hover:border-white hover:bg-white/10 transition">
            <FaHome />
            <span>หน้าหลัก</span>
          </a>
          <a href="#" onClick={toggleMenu} className="flex items-center gap-2 px-6 py-4 border-l-4 border-transparent text-shadow-xs hover:border-white hover:bg-white/10 transition">
            <FaInfoCircle />
            <span>เกี่ยวกับเรา</span>
          </a>
          {!user && (
            <>
              <a href="#" onClick={toggleMenu} className="flex items-center gap-2 px-6 py-4 border-l-4 border-transparent text-shadow-xs hover:border-white hover:bg-white/10 transition">
                <FaSignInAlt />
                <span>เข้าสู่ระบบ</span>
              </a>
              <a href="#" onClick={toggleMenu} className="flex items-center gap-2 px-6 py-4 border-l-4 border-transparent text-shadow-xs hover:border-white hover:bg-white/10 transition">
                <FaUserPlus />
                <span>สมัครสมาชิก</span>
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
