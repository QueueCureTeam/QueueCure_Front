"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaChevronDown, FaArrowLeft } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2000', value: 10 },
  { year: '2001', value: 20 },
  { year: '2002', value: 28 },
  { year: '2003', value: 34 },
  { year: '2004', value: 25 },
  { year: '2005', value: 15 },
  { year: '2006', value: 31 },
];

export default function Graph() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('รายวัน');
  const filterOptions = ['รายวัน', 'รายเดือน', 'รายปี'];

  const handleFilterSelect = (option) => {
    setSelectedFilter(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white min-h-screen p-4 mt-10 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            ดูภาพรวมสถิติ
          </h2>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              className="flex items-center gap-2 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-full hover:bg-gray-300 transition"
            >
              <span>กรองตาม{selectedFilter}</span>
              <FaChevronDown size={12} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-200">
                <ul className="py-1">
                  {filterOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => handleFilterSelect(option)}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-5xl mt-6">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-700 font-semibold transition">
          <FaArrowLeft />
          <span>back</span>
        </Link>
      </div>
    </div>
  );
}