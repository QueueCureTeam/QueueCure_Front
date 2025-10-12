import QueueStatus from "./QueueStatus";
import StatusBadge from "../../common/StatusBadge";

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

export default function AllQueue() {
    return (
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between text-white text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="flex items-center gap-4">
                    <FaAngleDoubleRight size={24} className="drop-shadow-lg" />
                    <span className="tracking-wider">รายการคิวทั้งหมด</span>
                </div>
                <LuRefreshCcw className="drop-shadow-lg drop-shadow-gray-700" />

            </div>
            <QueueStatus />

            <div className="overflow-x-auto">
                <table className="w-full text-center text-gray-700">
                    <thead className="bg-blue-100 text-blue-900 font-bold tracking-wider">
                        <tr>
                            <th className="py-3 px-4 w-1/3">รายการคิว</th>
                            <th className="py-3 px-4 w-1/3">สถานะ</th>
                            <th className="py-3 px-4 w-1/3">เวลาโดยประมาณ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {queueData.map((item) => (
                            <tr>
                                <td className="py-4 px-4">
                                    <div className="px-4 py-2 inline-block bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-sm tracking-wide">{item.id}</div>
                                </td>
                                <td className="py-4 px-4">
                                    <StatusBadge status={item.type} />
                                </td>
                                <td className="py-4 px-4 text-gray-600">{item.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}