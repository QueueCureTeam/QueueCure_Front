"use client";
import { FaAngleDoubleRight } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import Link from "next/link";

export default function PatientTable({ data, loading, error }) {
  return (
    <div className="mx-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between text-white text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center gap-4">
          <FaAngleDoubleRight size={24} className="drop-shadow-lg" />
          <span className="tracking-wider">รายชื่อคนไข้ทั้งหมด</span>
        </div>
        <div className="flex gap-3 items-center">
          <LuRefreshCcw className="drop-shadow-xl drop-shadow-gray-700" />
          <span className="text-sm">อัพเดทล่าสุด: 12:00 น.</span>
        </div>
      </div>

      <table className="w-full text-center text-gray-700 border-l border-gray-200">
        <thead className="bg-blue-100 text-blue-900 font-bold tracking-wider">
          <tr>
            <th className="py-3 px-4 w-1/5">PatientID</th>
            <th className="py-3 px-4 w-1/5">ชื่อ</th>
            <th className="py-3 px-4 w-1/5">นามสกุล</th>
            <th className="py-3 px-4 w-1/5">เพศ</th>
            <th className="py-3 px-4 w-1/5"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading && (
            <tr>
              <td colSpan="5" className="py-8 text-gray-500 text-center">
                <div className="flex justify-center items-center gap-2">
                  <LuRefreshCcw className="animate-spin text-2xl" />
                  <span>กำลังโหลดข้อมูล...</span>
                </div>
              </td>
            </tr>
          )}

          {error && !loading && (
            <tr>
              <td colSpan="5" className="py-8 text-center text-red-500 font-medium">
                {error}
              </td>
            </tr>
          )}

          {!loading && !error && data?.length > 0 ? (
            data.map((patient) => (
              <tr
                key={patient.PatientID}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4">
                  <div className="px-4 py-2 inline-block bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-sm tracking-widest">
                    A00{patient.PatientID}
                  </div>
                </td>
                <td className="py-4 font-medium text-gray-800">
                  {patient.Name}
                </td>
                <td className="py-4 font-medium text-gray-800">
                  {patient.Surname}
                </td>
                <td className="py-4 text-gray-600">{patient.Gender}</td>
                <td className="py-4">
                  <Link
                    href={`/dispensary/${patient.PatientID}`}
                    className="px-4 py-2 border-2 border-blue-400 text-blue-600 hover:bg-blue-400 hover:text-white rounded-lg transition-all"
                  >
                    จ่ายยา
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            !loading && !error && (
              <tr>
                <td colSpan="5" className="py-8 text-gray-500 text-center">
                  ไม่พบข้อมูลคนไข้
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
