export default function QueueTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center text-gray-700">
        <thead className="bg-blue-100 text-blue-900 uppercase text-sm">
          <tr>
            <th className="py-3 px-4 font-semibold w-1/3">รายการคิว</th>
            <th className="py-3 px-4 font-semibold w-1/3">สถานะ</th>
            <th className="py-3 px-4 font-semibold w-1/3">เวลาโดยประมาณ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-base">
          <tr className="hover:bg-blue-50 transition-all duration-200">
            <td className="py-4 px-4 font-medium">A001</td>
            <td className="py-4 px-4">
              <span className="inline-flex items-center gap-2 text-green-700 font-medium">
                <span className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse shadow-sm"></span>
                ถึงคิวแล้ว
              </span>
            </td>
            <td className="py-4 px-4 text-gray-600">-</td>
          </tr>
          <tr className="hover:bg-blue-50 transition-all duration-200">
            <td className="py-4 px-4 font-medium">A002</td>
            <td className="py-4 px-4">
              <span className="inline-flex items-center gap-2 text-yellow-600 font-medium">
                <span className="h-2.5 w-2.5 bg-yellow-400 rounded-full animate-pulse shadow-sm"></span>
                กำลังจัดเตรียม
              </span>
            </td>
            <td className="py-4 px-4 text-gray-600">5 นาที</td>
          </tr>
          <tr className="hover:bg-blue-50 transition-all duration-200">
            <td className="py-4 px-4 font-medium">A003</td>
            <td className="py-4 px-4">
              <span className="inline-flex items-center gap-2 text-red-700 font-medium">
                <span className="h-2.5 w-2.5 bg-red-500 rounded-full shadow-sm"></span>
                อยู่ในคิว
              </span>
            </td>
            <td className="py-4 px-4 text-gray-600">5 นาที</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}