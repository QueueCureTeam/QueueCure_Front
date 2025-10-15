import StatusBadge from "../../common/StatusBadge";

export default function QueueTableLink({ data, showButton = true }) {
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
        {data.map((item, index) => {
            const waitMinutes = (index + 1) * 5;
            const now = new Date();
            const estimatedTime = new Date(now.getTime() + waitMinutes * 60000); // แปลงนาทีเป็นมิลลิวินาที
            const formattedTime = estimatedTime.toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
            });

            return (
                <tr key={item.QueueID}>
                <td className="py-4 px-4">
                    <div className="px-4 py-2 inline-block bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-sm tracking-wide">
                    A00{item.QueueID}
                    </div>
                </td>

                <td className="py-4 px-4">
                    <StatusBadge status={item.Status} />
                </td>

                <td className="py-4 px-4 text-gray-600">
                    {waitMinutes} นาที
                </td>

                {showButton && (
                    <td className="py-4 px-4 text-center">
                    <button className="px-4 py-2 border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-medium rounded-lg shadow-sm transition-all duration-200">
                        รายละเอียด
                    </button>
                    </td>
                )}
                </tr>
            );
            })}
      </tbody>
    </table>
  );
}
