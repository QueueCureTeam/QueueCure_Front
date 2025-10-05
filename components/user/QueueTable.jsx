export default function QueueTable() {
  return (
    <div className="p-6">
      <p className="text-2xl font-medium mb-6 text-center">คิวรับยาทั้งหมด</p>
      <p className="text-xl font-normal mb-6 text-center">วันที่ 1 ตุลาคม 2568</p>
      <table className="w-full rounded-xl shadow-md overflow-hidden text-center">
        <thead className="bg-blue-800/90 text-white">
          <tr>
            <th className="py-3 px-4">รายการคิว</th>
            <th className="py-3 px-4">สถานะ</th>
            <th className="py-3 px-4">เวลาโดยประมาณ</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-blue-50 transition-colors">
            <td className="py-3 px-4">A001</td>
            <td className="py-3 px-4">รอรับยา</td>
            <td className="py-3 px-4 font-medium text-blue-800">5 นาที</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
