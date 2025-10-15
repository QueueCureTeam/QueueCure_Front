'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";

export default function Dispensary() {
    const { id } = useParams(); // ดึง id จาก URL เช่น /test_dispensary/1001
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    if (!id) return;
        const fetchPatientData = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/queue/patients/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("id_token")}`,
            },
            });
            setPatientData(res.data);
        } catch (err) {
            console.error(err);
            setError("ไม่สามารถโหลดข้อมูลคนไข้ได้");
        } finally {
            setLoading(false);
        }
        };
        fetchPatientData();
    }, [id]);

    if (loading) return <div className="text-center mt-20 text-gray-500">กำลังโหลดข้อมูล...</div>;
    if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
    if (!patientData) return <div className="text-center mt-20">ไม่พบข้อมูลคนไข้</div>;

    return (
    <div className="bg-white flex justify-center items-center p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
        
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Patient Data
        </h2>
        <div className="text-center text-gray-700 mb-8">
          <p className="text-lg font-semibold mb-4">Patient ID : A00{patientData.PatientID}</p>
          <div className="flex justify-center mb-4">
            <FaUserCircle size={80} className="text-gray-300" />
          </div>
          <p className="text-xl">
            ชื่อ  <span  className="mx-2 mr-4 "> {patientData.Name}</span>     
            นามสกุล <span className="mx-2 mr-4 "> {patientData.Surname}</span>
            เพศ <span  className="mx-2 mr-4 "> {patientData.Gender}</span>
            อายุ <span  className="mx-2 mr-4 "> {patientData.Age}</span>
          </p>
        </div>

        <div className="border border-gray-300 rounded-lg p-4 sm:p-6">
          <h3 className="text-center text-xl font-semibold text-gray-800 mb-6">
            รายการยา
          </h3>
          <div className="flex justify-center">
            <Link
              href={`/test_dispenser/${patientData.PatientID}`}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
            >
              <FaPlus />
              <span>เพิ่มรายการยา</span>
            </Link>
          </div>
          {/* แสดงรายการยา <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center gap-4">
            {patientData.medications.map((med, index) => (
              <div
                key={index}
                className="bg-indigo-500 text-white rounded-lg p-3 shadow-md w-full sm:w-60 flex justify-between items-center"
              >
                <span className="font-semibold">{med.name}</span>
                <span className="bg-indigo-400 text-xs font-bold px-2 py-1 rounded-full">{med.amount}</span>
              </div>
            ))}
          </div>*/}
        </div>

        <div className="text-center mt-8">
          <button
            className="bg-green-500 text-white font-bold py-3 px-12 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}