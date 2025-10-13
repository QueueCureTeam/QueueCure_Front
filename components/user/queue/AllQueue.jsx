import QueueStatus from "./QueueStatus";
import QueueTable from "./QueueTable";

import { FaAngleDoubleRight } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";

const queueData = [
    { id: "A001", status: "ถึงคิวแล้ว", time: "-", type: "ready" },
    { id: "A002", status: "กำลังจัดเตรียม", time: "5 นาที", type: "preparing" },
    { id: "A003", status: "อยู่ในคิว", time: "10 นาที", type: "waiting" },
    { id: "A004", status: "ถึงคิวแล้ว", time: "-", type: "ready" },
    { id: "A005", status: "กำลังจัดเตรียม", time: "3 นาที", type: "preparing" },
    { id: "A006", status: "อยู่ในคิว", time: "8 นาที", type: "waiting" },
    { id: "A007", status: "ถึงคิวแล้ว", time: "-", type: "ready" },
    { id: "A008", status: "กำลังจัดเตรียม", time: "7 นาที", type: "preparing" },
    { id: "A009", status: "อยู่ในคิว", time: "12 นาที", type: "waiting" },
    { id: "A010", status: "กำลังจัดเตรียม", time: "2 นาที", type: "preparing" },
];

function formatTime(date) {
  const options = { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false
  };
  return date.toLocaleTimeString('th-TH', options);
}

export default function AllQueue() {
    const currentTime = new Date();
    const timeString = formatTime(currentTime);

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
            <QueueStatus />
            <div className="overflow-x-auto">
                <QueueTable data={queueData} showButton={false} />
            </div>
        </div>
    );
}