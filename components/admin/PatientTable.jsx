"use client"
import { FaAngleDoubleRight } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PatientTable() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchPatients = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:3000/api/queue/patients", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("id_token")}`,
                },
            });
            setPatients(response.data);

            setLastUpdated(new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }));
        } catch (err) {
            console.error("Failed to fetch patients:", err);
            setError("ไม่สามารถโหลดข้อมูลคนไข้ได้ กรุณาลองใหม่อีกครั้ง");
            setPatients([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

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
                                <td colSpan="5" className="py-8 px-4 text-center text-gray-500">
                                    <div className="flex justify-center items-center gap-2">
                                        <LuRefreshCcw className="animate-spin text-2xl" />
                                        <span>กำลังโหลดข้อมูล...</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {error && (
                            <tr>
                                <td colSpan="5" className="py-8 px-4 text-center text-red-500 font-medium">
                                    {error}
                                </td>
                            </tr>
                        )}
                        {!loading && !error && Array.isArray(patients) && patients.map((patient) => (
                            <tr key={patient.PatientID} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="py-4 px-4 align-middle">
                                    <div className="px-4 py-2 inline-block bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-sm tracking-widest">
                                        A00{patient.PatientID} {/* แก้ตรงนี้ */}
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-gray-800 align-middle font-medium">{patient.Name}</td>
                                <td className="py-4 px-4 text-gray-800 align-middle font-medium">{patient.Surname}</td>
                                <td className="py-4 px-4 text-gray-600 align-middle">{patient.Gender}</td>
                                <td className="py-4 px-4 align-middle">
                                    <Link
                                        href={`/test_dispensary/${patient.PatientID}`}
                                        className="px-4 py-2 border-2 border-blue-400 text-blue-600 hover:bg-blue-400 hover:text-white rounded-lg transition-all"
                                        >
                                        จ่ายยา
                                    </Link>
                                </td>
                            </tr>
                        ))}
                            {!loading && !error && patients.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-8 px-4 text-center text-gray-500">
                                    ไม่พบข้อมูลคนไข้
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
}
