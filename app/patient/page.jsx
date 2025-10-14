import SearchBar from "../../components/common/SearchBar"
import PatientTable from "../../components/admin/PatientTable"
export default function Patient() {
    return (
        <div>
            <div className="pt-10 text-center space-y-3">
                <h2 className="text-3xl font-semibold text-blue-900 drop-shadow-sm">ข้อมูลคนไข้</h2>
                <div className="px-4 py-1 inline-flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-100 rounded-lg">
                    <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span>วันที่ 1 ตุลาคม </span>
                    <span>•</span>
                    <span>12:00 น.</span>
                </div>
            </div>
            <SearchBar />
            <PatientTable />
        </div>
    )
}