"use client";
import SearchBar from "../../components/common/SearchBar";
import Header from "../../components/common/Header";
import QueueTable from "../../components/user/queue/QueueTable_link";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleDoubleRight, FaChartBar } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";
import { useRouter } from "next/navigation";
import RoleChecker from "../../components/common/RoleChecker";

function formatTime(date) {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  return date.toLocaleTimeString('th-TH', options);
}

export default function Dashboard() {
  const router = useRouter();
  const [queueData, setQueueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentTime = new Date();
  const timeString = formatTime(currentTime);

  const fetchQueueData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/queue");
      const list = res.data;
      setQueueData(list);
      setError(null);
    } catch (err) {
      console.error("Error fetching queue data:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueData();
  }, []);

  return (
    <RoleChecker
      onRoleDetected={(role) => {
        if (role !== "doctor" && role !== "pharmacist") {
          router.push("/test_queue");
        }
      }}
    >
      {(role) => (
        <div>
          {role === "doctor" || role === "pharmacist" ? (
            <>
              <Header />
              <SearchBar />
              <div className="mx-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 flex items-center justify-between text-white text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700">
                  <div className="flex items-center gap-4">
                    <FaAngleDoubleRight size={24} className="drop-shadow-lg" />
                    <span className="tracking-wider">รายการคิวทั้งหมด</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <LuRefreshCcw className="drop-shadow-xl drop-shadow-gray-700" />
                    <span className="text-sm">อัพเดทล่าสุด: {timeString} น.</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4">
                  <div className="col-span-1">
                    <div className="px-6 py-12 space-y-8">
                      <div className="flex items-center justify-center py-6 gap-4 space-y-1.5 text-left bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 tracking-wide">
                        <FaHospitalUser size={40} className="text-gray-700" />
                        <div>
                          <div className="text-sm text-gray-600">จำนวณคิวทั้งหมด</div>
                          <div className="text-5xl font-bold text-gray-700 text-shadow-md">{queueData.length}</div>
                        </div>
                      </div>
                      <button className="w-full py-4 cursor-pointer flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition-colors text-white text-xl font-bold tracking-wide rounded-2xl shadow-md"><FaChartBar /> ดูรายการสถิติ</button>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="overflow-x-auto">
                      {loading ? (
                        <div className="p-6 text-center text-gray-500">กำลังโหลดข้อมูล...</div>
                      ) : error ? (
                        <div className="p-6 text-center text-red-500">เกิดข้อผิดพลาด: {error}</div>
                      ) : (
                        <QueueTable data={queueData} showButton={true} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-gray-600">
              กำลังตรวจสอบสิทธิ์การเข้าถึง...
            </div>
          )}
        </div>
      )}
    </RoleChecker>

  );
}