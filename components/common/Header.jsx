export default function Header() {
  return (
    <div className="pt-10 text-center space-y-3">
      <h2 className="text-3xl font-semibold text-blue-900 drop-shadow-sm">ระบบจัดการคิวรับยา</h2>
      <div className="px-4 py-1 inline-flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-100 rounded-lg">
        <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
        <span>วันที่ 1 ตุลาคม 2568</span>
        <span>•</span>
        <span>12:00 น.</span>
      </div>
    </div>
  );
}
