import StatusBadge from "../../common/StatusBadge";
import { FaClock, FaRegUserCircle } from "react-icons/fa";

export default function PatientQueue() {
  return (
    <div className="sticky bottom-0 left-0 right-0 mx-auto max-w-4xl px-6 py-3 bg-white border-t-2 border-blue-400 shadow-xl rounded-t-3xl">
      <div className="flex flex-wrap justify-between items-center gap-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center gap-2">
            <FaRegUserCircle className="text-gray-700"/>
            <span className="text-gray-600 tracking-wide">คิวของคุณ</span>
          </div>
          <div className="text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 rounded-xl shadow-md">A015</div>
        </div>
        <div className="hidden sm:flex flex-col text-center space-y-2">
          <span className="text-sm text-gray-600 tracking-wide">สถานะ</span>
          <StatusBadge status="preparing" />
        </div>
        <div className="flex flex-col items-end text-end space-y-1">
          <div className="flex items-center gap-2">
            <FaClock className="text-gray-700" />
            <span className="text-gray-600 tracking-wide">เวลาที่คาดการณ์</span>
          </div>
          <div className="text-2xl font-bold text-blue-800">12:05</div>
          <div className="mt-1 text-orange-500 text-xs bg-orange-50 px-2 py-1 rounded-full">5 นาที</div>
        </div>

      </div>
    </div>
  );
}