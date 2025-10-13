import SearchBar from "../../components/common/SearchBar";
import Header from "../../components/common/Header";
import QueueTable from "../../components/user/queue/QueueTable";

import { FaAngleDoubleRight, FaChartBar } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";

const QueueData = [
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

export default function Dashboard() {
  const currentTime = new Date();
  const timeString = formatTime(currentTime);
  return (
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
                  <div className="text-5xl font-bold text-gray-700 text-shadow-md">140</div>
                </div>
              </div>
              <button className="w-full py-4 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition-colors text-white text-xl font-bold tracking-wide rounded-2xl shadow-md"><FaChartBar /> ดูรายการสถิติ</button>
            </div>
          </div>
          <div className="col-span-3">
            <QueueTable data={QueueData} showButton={true} />
          </div>
        </div>
      </div>
    </>
  );
}