import StatusBadge from "../../common/StatusBadge";

import { FaBookmark } from "react-icons/fa";

export default function CurrentQueue() {
    return (
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 flex items-center gap-4 text-white text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700">
                <FaBookmark size={18} className="drop-shadow-lg" />
                <span className="tracking-wider">คิวปัจจุบัน</span>
            </div>
            <div className="p-6 space-y-6">
                <div className=" py-6 text-center text-5xl font-bold text-gray-700 text-shadow-md bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 tracking-wide">A015</div>
                <div className="">
                    <StatusBadge status="preparing" />
                </div>
                <div className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 tracking-wide">
                    <div className="pb-4 space-y-1.5">
                        <div className="text-sm text-gray-600">เวลาที่คาดการณ์</div>
                        <div className="text-3xl font-bold text-green-600">12:05</div>
                    </div>
                    <div className="pt-4 border-t border-blue-200 space-y-1.5">
                        <div className="text-sm text-gray-600">เหลือเวลาอีกประมาณ</div>
                        <div className="text-2xl font-bold text-orange-500">5 นาที</div>
                    </div>
                </div>
                <div className="text-center pt-4 border-t border-gray-200 space-y-1.5 tracking-wide">
                    <div className="text-sm text-gray-500">คิวถัดไป</div>
                    <div className="text-lg font-semibold text-gray-700">A016</div>
                </div>
            </div>
        </div>
    );
}