import { FaAngleDoubleRight } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";

export default function PatientTable() {
    return (
        <div className="mx-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between text-white text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="flex items-center gap-4">
                    <FaAngleDoubleRight size={24} className="drop-shadow-lg" />
                    <span className="tracking-wider">รายชื่อคนไข้ทั้งหมด</span>
                </div>
                <div className="flex gap-3 items-center">
                    <LuRefreshCcw className="drop-shadow-xl drop-shadow-gray-700" />
                    <span className="text-sm">อัพเดทล่าสุด: 12:00 น.</span>
                </div>
            </div>
            <table className="w-full text-center text-gray-700 border-l border-gray-200">
                <thead className="bg-blue-100 text-blue-900 font-bold tracking-wider">
                    <tr>
                        <th className="py-3 px-4 w-1/5">PatientID</th>
                        <th className="py-3 px-4 w-1/5">ชื่อ</th>
                        <th className="py-3 px-4 w-1/5">นามสกุล</th>
                        <th className="py-3 px-4 w-1/5">เพศ</th>
                        <th className="py-3 px-4 w-1/5"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <tr>
                        <th className="py-4 px-4">
                            <div className="px-4 py-2 inline-block bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-sm tracking-widest">110456</div>
                        </th>
                        <th className="py-4 px-4 text-gray-600">John</th>
                        <th className="py-4 px-4 text-gray-600">Doe</th>
                        <th className="py-4 px-4 text-gray-600">Male</th>
                        <th className="py-4 px-4">
                            <button className="px-4 py-2 border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-medium rounded-lg shadow-sm transition-all duration-200">จ่ายยา</button>
                        </th>
                    </tr>
                    <tr>
                        <th className="py-4 px-4">
                            <div className="px-4 py-2 inline-block bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-sm tracking-widest">110456</div>
                        </th>
                        <th className="py-4 px-4 text-gray-600">John</th>
                        <th className="py-4 px-4 text-gray-600">Doe</th>
                        <th className="py-4 px-4 text-gray-600">Male</th>
                        <th className="py-4 px-4">
                            <button className="px-4 py-2 border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-medium rounded-lg shadow-sm transition-all duration-200">จ่ายยา</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
