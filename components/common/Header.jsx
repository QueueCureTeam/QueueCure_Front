"use client"
import { useState, useEffect } from 'react';

function formatDateTime(date) {
  const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
  const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };

  const dateString = date.toLocaleDateString('th-TH', optionsDate);
  const timeString = date.toLocaleTimeString('th-TH', optionsTime);

  return { dateString, timeString };
}

export default function Header() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timerId);
  }, []);

  const { dateString, timeString } = formatDateTime(currentDateTime);

  return (
    <div className="pt-10 text-center space-y-3">
      <h2 className="text-3xl font-semibold text-blue-900 drop-shadow-sm">ระบบจัดการคิวรับยา</h2>
      <div className="px-4 py-1 inline-flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-100 rounded-lg">
        <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
        <span>วันที่ {dateString}</span> 
        <span>•</span>
        <span>{timeString} น.</span>
      </div>
    </div>
  );
}