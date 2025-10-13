import StatusBadge from "../../common/StatusBadge";

export default function QueueTable({ data, showButton = true }) {
  return (
    <table className="w-full text-center text-gray-700 border-l border-gray-200">
      <thead className="bg-blue-100 text-blue-900 font-bold tracking-wider">
        <tr>
          <th className="py-3 px-4 w-1/4">รายการคิว</th>
          <th className="py-3 px-4 w-1/4">สถานะ</th>
          <th className="py-3 px-4 w-1/4">เวลาโดยประมาณ</th>
          {showButton && <th className="py-3 px-4 w-1/4">รายละเอียดคิว</th>}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.id}>
            <td className="py-4 px-4">
              <div className="px-4 py-2 inline-block bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-sm tracking-wide">{item.id}</div>
            </td>
            <td className="py-4 px-4">
              <StatusBadge status={item.type} />
            </td>
            <td className="py-4 px-4 text-gray-600">{item.time}</td>
            {showButton && (
              <td className="py-4 px-4 text-center">
                <button className="px-4 py-2 border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-medium rounded-lg shadow-sm transition-all duration-200">รายละเอียด</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
