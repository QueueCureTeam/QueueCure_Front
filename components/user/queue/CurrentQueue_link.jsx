"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import StatusBadge from "../../common/StatusBadge";
import { FaBookmark } from "react-icons/fa";

function formatQueueID(id) {
  return `A${id.toString().padStart(3, "0")}`;
}

export default function CurrentQueue() {
  const [queues, setQueues] = useState([]);
  const [currentQueue, setCurrentQueue] = useState(null);
  const [nextQueue, setNextQueue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/queue");
      const data = res.data;

      if (Array.isArray(data)) {
        const calculated = calculateTime(data);
        const readyQueues = calculated.filter(q => q.Status === "ready");
        const preparingQueues = calculated.filter(q => q.Status === "preparing");
        const waitingQueues = calculated.filter(q => q.Status === "waiting");

        const current = readyQueues[0] || preparingQueues[0] || null;
        const next = waitingQueues[0] || null;
        
        setQueues(calculated);
        setCurrentQueue(current);
        setNextQueue(next);
      } else {
        setQueues([]);
        setCurrentQueue(null);
        setNextQueue(null);
      }
    } catch (err) {
      console.error("Error fetching queue:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const calculateTime = (queues) => {
    const now = new Date();
    return queues.map((item, index) => {
      let formattedStart = "-";
      let formattedEnd = "-";
      let remainingMinutes = 0;

      if (item.Status !== "ready") {
        const readyBefore = queues.slice(0, index).filter(q => q.Status === "ready").length;
        const waitMinutes = (index - readyBefore + 1) * 5; // ใช้สูตรเดียวกันกับ QueueTableLink
        
        const startTime = new Date(now.getTime() + waitMinutes * 60000);
        const endTime = new Date(now.getTime() + (waitMinutes + 5) * 60000);

        formattedStart = startTime.toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        
        formattedEnd = endTime.toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        remainingMinutes = Math.max(0, Math.ceil((endTime - now) / 60000));
      }

      return { 
        ...item, 
        formattedStart, 
        formattedEnd,
        remainingMinutes 
      };
    });
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
        กำลังโหลดคิว...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 bg-white rounded-2xl border border-gray-200">
        เกิดข้อผิดพลาด: {error}
      </div>
    );
  }

  if (!currentQueue) {
    return (
      <div className="p-6 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
        ยังไม่มีคิวในขณะนี้
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 flex items-center gap-4 text-white text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700">
        <FaBookmark size={18} className="drop-shadow-lg" />
        <span className="tracking-wider">คิวปัจจุบัน</span>
      </div>

      <div className="p-6 space-y-6">
        <div className="py-6 text-center text-5xl font-bold text-gray-700 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 tracking-wide">
          {formatQueueID(currentQueue.QueueID)}
        </div>

        <div className="text-center">
          <StatusBadge status={currentQueue.Status} />
        </div>

        {/* เวลาคาดการณ์ */}
        <div className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 tracking-wide">
          <div className="pb-4 space-y-1.5">
            <div className="text-sm text-gray-600">เวลาที่คาดการณ์</div>
            <div className="text-3xl font-bold text-green-600">
              {currentQueue.formattedEnd !== "-" ? currentQueue.formattedEnd : "-"}
            </div>
          </div>
          <div className="pt-4 border-t border-blue-200 space-y-1.5">
            <div className="text-sm text-gray-600">เหลือเวลาอีกประมาณ</div>
            <div className="text-2xl font-bold text-orange-500">
              {currentQueue.remainingMinutes > 0 ? `${currentQueue.remainingMinutes} นาที` : "พร้อม"}
            </div>
          </div>
        </div>

        {/* คิวถัดไป */}
        <div className="text-center pt-4 border-t border-gray-200 space-y-1.5 tracking-wide">
          <div className="text-sm text-gray-500">คิวถัดไป</div>
          <div className="text-lg font-semibold text-gray-700">
            {nextQueue ? formatQueueID(nextQueue.QueueID) : "-"}
          </div>
        </div>
      </div>
    </div>
  );
}