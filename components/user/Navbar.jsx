"use client";
import { useState } from "react";
import { FaHome, FaInfoCircle, FaUserCircle, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user] = useState(true);
  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <nav className="text-gray-100 sticky top-0 z-99 shadow-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <div className="px-6 py-4 flex justify-between">
        <div className="shrink-0 items-center">
          <img src="#" className="size-8 drop-shadow-xl"></img>
        </div>
        <div className="hidden gap-3 sm:flex">
          <a href="#" className="flex items-center gap-2 text-shadow-2xs text-shadow-blue-800 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-white/10 hover:shadow-lg hover:text-shadow-none">
            <FaHome />
            <span>หน้าหลัก</span>
          </a>
          <a href="#" className="flex items-center gap-2 text-shadow-2xs text-shadow-blue-800 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-white/10 hover:shadow-lg hover:text-shadow-none">
            <FaInfoCircle />
            <span>เกี่ยวกับเรา</span>
          </a>
          {!user ? (
            <>
              <a href="#" className="flex items-center gap-2 text-shadow-2xs text-shadow-blue-800 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-white/10 hover:shadow-lg hover:text-shadow-none">
                <FaSignInAlt />
                <span>เข้าสู่ระบบ</span>
              </a>
              <a href="#" className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-white hover:text-blue-600 transition-all duration-200 bg-white/20 shadow-lg text-gray-100">
                <FaUserPlus />
                <span>สมัครสมาชิก</span>
              </a>
            </>
          ) : (
            <>
              <div className="items-center border-white/40 border-l-1 pl-4">
                <FaUserCircle size={40}/>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 sm:hidden">
          {user && (
            <>
              <div className="items-center border-white/40 border-r-1 pr-3">
                <FaUserCircle size={40}/>
              </div>
            </>
          )}
          <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:bg-white/20 hover:shadow-lg" onClick={toggleMenu}>{open ? <FaTimes /> : <FaBars />}</button>
        </div>
      </div>
      {open && (
        <div className="sm:hidden flex flex-col bg-blue-800/95 text-left">
          <a href="#" className="flex items-center gap-2 py-4 px-6 border-l-4 border-transparent hover:border-white hover:bg-white/10 transition" onClick={toggleMenu}>
            <FaHome />
            <span>หน้าหลัก</span>
          </a>
          <a href="#" className="flex items-center gap-2 py-4 px-6 border-l-4 border-transparent hover:border-white hover:bg-white/10 transition" onClick={toggleMenu}>
            <FaInfoCircle />
            <span>เกี่ยวกับเรา</span>
          </a>
          {!user && (
            <>
              <a href="#" className="flex items-center gap-2 py-4 px-6 border-l-4 border-transparent hover:border-white hover:bg-white/10 transition" onClick={toggleMenu}>
                <FaSignInAlt />
                <span>เข้าสู่ระบบ</span>
              </a>
              <a href="#" className="flex items-center gap-2 py-4 px-6 border-l-4 border-transparent hover:border-white hover:bg-white/10 transition" onClick={toggleMenu}>
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