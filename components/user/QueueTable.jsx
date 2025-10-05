export default function QueueTable() {
  const queueData = [
    { id: "A001", status: "รอรับยา", time: "5 นาที" },
    { id: "A002", status: "กำลังจัดยา", time: "10 นาที" },
    { id: "A003", status: "เสร็จสิ้น", time: "เรียบร้อยแล้ว" },
  ];

  return (
    <div className="p-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-blue-900">คิวรับยาทั้งหมด</h2>
        <p className="text-lg text-gray-600">วันที่ 1 ตุลาคม 2568</p>
      </div>
      <div className="rounded-xl shadow-md overflow-hidden border border-gray-200">
        <table className="w-full text-center">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="py-4 px-4 font-medium">รายการคิว</th>
              <th className="py-4 px-4 font-medium">สถานะ</th>
              <th className="py-4 px-4 font-medium">เวลาโดยประมาณ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-blue-50 transition-colors">
              <td className="py-4 px-4">A001</td>
              <td className="py-4 px-4 text-green-700">ถึงคิวแล้ว</td>
              <td className="py-4 px-4 text-gray-700">-</td>
            </tr>
            <tr className="hover:bg-blue-50 transition-colors">
              <td className="py-4 px-4">A002</td>
              <td className="py-4 px-4 text-yellow-500">รอรับยา</td>
              <td className="py-4 px-4 text-gray-700">5 นาที</td>
            </tr>
            <tr className="hover:bg-blue-50 transition-colors">
              <td className="py-4 px-4">A003</td>
              <td className="py-4 px-4 text-red-700">เสร็จสิ้น</td>
              <td className="py-4 px-4 text-gray-700">5 นาที</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
