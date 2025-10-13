"use client";
import { useState } from "react";

import { FaSearch, FaChevronDown } from 'react-icons/fa';

const statusOptions = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'ready', label: 'ถึงคิวแล้ว' },
  { value: 'preparing', label: 'กำลังจัดเตรียม' },
  { value: 'waiting', label: 'อยู่ในคิว' }
];

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const toggleDropDown = () => setOpen((prev) => !prev);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <div className="flex w-full rounded-xl shadow-md border border-blue-200 bg-white relative">
        <div className="relative z-10">
          <button type="button" onClick={toggleDropDown} className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-blue-700 bg-blue-50 border-r border-blue-200 transition-all duration-200 min-w-[120px] justify-between rounded-l-xl">
            ทั้งหมด
            <FaChevronDown size={12} className="text-blue-600" />
          </button>
          {open && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-300 rounded-lg shadow-xl py-1 z-20">
              {statusOptions.map((option) => (
                <button key={option.value} type="button" className="block w-full text-left px-4 py-2 text-sm text-gray-700">{option.label}</button>
              ))}
            </div>
          )}
        </div>
        <input type="text" placeholder="ใส่หมายเลขคิว (เช่น A101)" className="flex-1 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none border-none focus:ring-0" />
        <button type="button" className="px-6 py-3 bg-blue-500 text-white flex items-center justify-center rounded-r-xl">
          <FaSearch size={16} />
        </button>
      </div>
    </div>
  );
}