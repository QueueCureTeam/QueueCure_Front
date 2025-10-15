"use client";
import QueueStatus from "./QueueStatus_link";
import QueueTable from "./QueueTable_link";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";

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
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
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
            <QueueStatus data={queueData} />
            <div className="overflow-x-auto">
                {loading ? (
                <div className="p-6 text-center text-gray-500">กำลังโหลดข้อมูล...</div>
                ) : error ? (
                <div className="p-6 text-center text-red-500">เกิดข้อผิดพลาด: {error}</div>
                ) : (
                <QueueTable data={queueData} showButton={false} />
                )}
            </div>
        </div>
    );
}