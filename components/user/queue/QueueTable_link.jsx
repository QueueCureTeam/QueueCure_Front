import StatusBadge from "../../common/StatusBadge";
import Link from "next/link";

export default function QueueTableLink({ data, showButton = true }) {
  function formatQueueID(id) {
      return `A${id.toString().padStart(3, "0")}`;
  }
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
          let formattedTime = "-";
          let formattedTime2 = "";
          const readyBefore = data.slice(0, index).filter(q => q.Status === "ready").length;

          if (item.Status !== "ready") {
            const waitMinutes = (index - readyBefore + 1) * 5; // เพิ่มทีละ 5 นาที
            const now = new Date();
            const estimatedTime = new Date(now.getTime() + waitMinutes * 60000);
            const estimatedTime2 = new Date(now.getTime() + (waitMinutes + 5) * 60000);
              formattedTime = estimatedTime.toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
              formattedTime2 = estimatedTime2.toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
            }

            return (
                <tr key={item.QueueID}>
                <td className="py-4 px-4">
                    <div className="px-4 py-2 inline-block bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-sm tracking-wide">
                    {formatQueueID(item.QueueID)}
                    </div>
                </td>

                <td className="py-4 px-4">
                    <StatusBadge status={item.Status} />
                </td>

                {item.Status === "delivery" ? (
                  <td className="py-4 px-4 text-gray-600">2 วัน</td>
                ) : formattedTime2 !== "" ? (
                  <td className="py-4 px-4 text-gray-600">
                    {formattedTime} - {formattedTime2} น.
                  </td>
                ) : (
                  <td className="py-4 px-4 text-gray-600">{formattedTime}</td>
                )}
                
                {showButton && (
                  <td className="py-4 px-4 text-center">
                    <Link
                      href={`/test_queue_detail/${item.QueueID}`}
                      className="px-4 py-2 border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-medium rounded-lg shadow-sm transition-all duration-200">
                        รายละเอียด
                    </Link>
                  </td>

                )}
                </tr>
            );
            })}
      </tbody>
    </table>
  );
}
