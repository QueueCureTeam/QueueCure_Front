export default function QueueStatusLink({ data }) {
  const queueList = Array.isArray(data) ? data : [];
  const totalCount = queueList.length;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white tracking-widest">
      <div className="flex flex-col sm:flex-row justify-center gap-4 p-4 text-center">
        <div className="flex-1 flex flex-col items-center px-3 py-6 border-2 border-green-300 rounded-2xl bg-green-50 space-y-1">
          <span className="text-sm text-green-700">ถึงคิวแล้ว</span>
          <span className="text-3xl font-bold text-green-800">{totalCount}</span>
        </div>

        <div className="flex-1 flex flex-col items-center px-3 py-6 border-2 border-yellow-300 rounded-2xl bg-yellow-50 space-y-1">
          <span className="text-sm text-yellow-700">กำลังจัดเตรียม</span>
          <span className="text-3xl font-bold text-yellow-800">{totalCount}</span>
        </div>

        <div className="flex-1 flex flex-col items-center px-3 py-6 border-2 border-red-300 rounded-2xl bg-red-50 space-y-1">
          <span className="text-sm text-red-700">อยู่ในคิว</span>
          <span className="text-3xl font-bold text-red-800">{totalCount}</span>
        </div>
      </div>
    </div>
  );
}
