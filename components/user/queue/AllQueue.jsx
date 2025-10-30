"use client";
import QueueTable from "./QueueTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import RoleChecker from "../../common/RoleChecker";


function formatTime(date) {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  return date.toLocaleTimeString('th-TH', options);
}

export default function AllQueue_Link() {
  const [queueData, setQueueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeString, setTimeString] = useState(formatTime(new Date()));

  const fetchQueueData = async () => {
    try {
      setTimeString(formatTime(new Date()));
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/queue`);
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

  const waitingCount = queueData.filter(q => q.Status === "waiting").length;
  const preparingCount = queueData.filter(q => q.Status === "preparing").length;
  const readyCount = queueData.filter(q => q.Status === "ready").length;
  const deliveryCount = queueData.filter(q => q.Status === "delivery").length;

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between text-white text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center gap-4">
          <FaAngleDoubleRight size={24} className="drop-shadow-lg" />
          <span className="tracking-wider">รายการคิวทั้งหมด</span>
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={fetchQueueData} className="p-2 rounded-full hover:bg-blue-500/20 transition-colors" title="รีเฟรชข้อมูล">
            <LuRefreshCcw className="text-white" />
          </button>
          <span className="text-sm">อัปเดตล่าสุด: {timeString} น.</span>
        </div>
      </div>
      <div className="bg-gradient-to-b from-blue-50 to-white tracking-widest">
        <div className="flex flex-col sm:flex-row justify-center gap-4 p-4 text-center">
          <div className="flex-1 flex flex-col items-center px-3 py-6 border-2 border-green-300 rounded-2xl bg-green-50 space-y-1">
            <span className="text-sm text-green-700">ถึงคิวแล้ว</span>
            <span className="text-3xl font-bold text-green-800">
              {readyCount}
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center px-3 py-6 border-2 border-yellow-300 rounded-2xl bg-yellow-50 space-y-1">
            <span className="text-sm text-yellow-700">กำลังจัดเตรียม</span>
            <span className="text-3xl font-bold text-yellow-800">
              {preparingCount}
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center px-3 py-6 border-2 border-red-300 rounded-2xl bg-red-50 space-y-1">
            <span className="text-sm text-red-700">อยู่ในคิว</span>
            <span className="text-3xl font-bold text-red-800">
              {waitingCount}
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center px-3 py-6 border-2 border-blue-300 rounded-2xl bg-blue-50 space-y-1">
            <span className="text-sm text-blue-500">จัดส่ง</span>
            <span className="text-3xl font-bold text-blue-600">
              {deliveryCount}
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">กำลังโหลดข้อมูล...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">เกิดข้อผิดพลาด: {error}</div>
        ) : (
          <RoleChecker>
            {(userGroup) => {
              const filteredData =
                userGroup === "doctor" || userGroup === "pharmacist"
                  ? queueData
                  : queueData.filter(q => q.Status !== "done");
              return <QueueTable data={filteredData} showButton={false} />;
            }}
          </RoleChecker>
        )}
      </div>
    </div>
  );
}