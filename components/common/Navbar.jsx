"use client";
import { useState } from "react";
import {FaHome, FaInfoCircle, FaUserCircle, FaSignInAlt, FaUserPlus, FaBars, FaTimes, FaUserEdit, FaSignOutAlt} from "react-icons/fa";
import Image from 'next/image';
import { useEffect } from "react";
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user,setUser] = useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);
  const logoUrl = "https://queuequres3.s3.us-east-1.amazonaws.com/public/QueueCure_logo+(2).png";

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-gray-100 shadow-xl">
      <div className="flex justify-between px-6 py-4">
        <div className="shrink-0 flex items-center">
          <Image src={logoUrl} alt="logo" width={40} height={40} priority />
        </div>
        <div className="hidden sm:flex gap-3">
          <Link href="/" className="flex items-center gap-2 rounded-xl px-3 py-2 text-shadow-xs text-shadow-blue-800 hover:bg-white/10 hover:shadow-lg transition-all duration-200">
            <FaHome />
            <span>หน้าหลัก</span>
          </Link>
          <Link href="#" className="flex items-center gap-2 rounded-xl px-3 py-2 text-shadow-xs text-shadow-blue-800 hover:bg-white/10 hover:shadow-lg transition-all duration-200">
            <FaInfoCircle />
            <span>เกี่ยวกับเรา</span>
          </Link>
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
            <div className="relative group flex items-center border-l border-white/40 pl-4 drop-shadow-xl">
              <Link href="/profile"><FaUserCircle size={40} /></Link>
              <div className="absolute top-full right-0 w-48 bg-white rounded-lg shadow-xl text-gray-800 p-2 z-10 
                            hidden group-hover:block transition-all opacity-0 group-hover:opacity-100">
                
                <Link href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-sm">
                  <FaUserEdit />
                  <span>โปรไฟล์</span>
                </Link>
                <hr className="my-1 border-gray-100" />
                <button className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50">
                  <FaSignOutAlt />
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 sm:hidden">
          {user && (
            <div className="flex items-center border-r border-white/40 pr-3 drop-shadow-xl">
              <Link href="/profile"><FaUserCircle size={32} /></Link>
            </div>
          )}
          <button onClick={toggleMenu} className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:shadow-lg transition-all duration-200">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {open && (
        <div className="flex flex-col sm:hidden bg-blue-800/95 text-left">
          <Link href="#" onClick={toggleMenu} className="flex items-center gap-2 px-6 py-4 border-l-4 border-transparent text-shadow-xs hover:border-white hover:bg-white/10 transition">
            <FaHome />
            <span>หน้าหลัก</span>
          </Link>
          <Link href="#" onClick={toggleMenu} className="flex items-center gap-2 px-6 py-4 border-l-4 border-transparent text-shadow-xs hover:border-white hover:bg-white/10 transition">
            <FaInfoCircle />
            <span>เกี่ยวกับเรา</span>
          </Link>
          {!user && (
            <>
              <a href="http://localhost:3000/auth/login" onClick={toggleMenu} className="flex items-center gap-2 px-6 py-4 border-l-4 border-transparent text-shadow-xs hover:border-white hover:bg-white/10 transition">
                <FaSignInAlt />
                <span>เข้าสู่ระบบ</span>
              </a>
              <a href="http://localhost:3000/auth/login" onClick={toggleMenu} className="flex items-center gap-2 px-6 py-4 border-l-4 border-transparent text-shadow-xs hover:border-white hover:bg-white/10 transition">
                <FaUserPlus />
                <span>สมัครสมาชิก</span>
              </a>
            </>
          )}
          {user && (
            <>
              <Link href="/profile" onClick={toggleMenu} className="flex items-center gap-2 px-6 py-4 border-l-4 border-transparent text-shadow-xs hover:border-white hover:bg-white/10 transition">
                <FaUserEdit />
                <span>โปรไฟล์</span>
              </Link>
              <a href="#" className="flex items-center gap-2 px-6 py-4 border-l-4 border-transparent text-red-300 text-shadow-xs hover:border-red-300 hover:bg-red-500/20 transition">
                <FaSignOutAlt />
                <span>ออกจากระบบ</span>
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
