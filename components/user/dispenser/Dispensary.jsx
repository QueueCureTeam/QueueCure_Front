'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";

export default function Dispensary() {
    const { id } = useParams(); // ดึง id จาก URL เช่น /test_dispensary/1001
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [prescriptions, setPrescriptions] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const token = localStorage.getItem("id_token");

    useEffect(() => {
      const storedData = sessionStorage.getItem("prescriptions");
      if (storedData) {
        setPrescriptions(JSON.parse(storedData));
      }
    }, []);

    useEffect(() => {
    if (!id) return;
        const fetchPatientData = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/queue/patients/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
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

    const handleSubmitting = async () => {
      if (!patientData || prescriptions.length == 0) {
        alert("กรุณาเพิ่มรายการยาอย่างน้อย 1 รายการก่อนยืนยัน");
        return;
      }

      setSubmitting(true);
      try {
        const prescriptionId = `RX${Date.now()}`;
        const prescriptionsRes = await axios.post(
          "http://localhost:3000/api/prescription/addPrescription",
          {
            PrescriptionID: prescriptionId,
            prescriptions: prescriptions.map((item) => ({
              DrugID: item.drugId,
              Quantity: item.quantity,
              Dosage: item.dosage,
            })),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const queueRes = await axios.post(
          "http://localhost:3000/api/queue/addQueue",
          {
            PatientID: patientData.PatientID,
            PharmCounter: "-",
            PrescriptionID: prescriptionId
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Prescription response:", prescriptionsRes.data);
        console.log("Queue response:", queueRes.data);

        alert("บันทึกข้อมูลสำเร็จ!");
        sessionStorage.removeItem("prescriptions");
        setPrescriptions([]);

      } catch (err) {
        console.error("Error during confirm:", err);
        alert("เกิดข้อผิดพลาดระหว่างการบันทึกข้อมูล");
      } finally {
        setSubmitting(false);
      }
    };
    if (loading) return <div className="text-center mt-20 text-gray-500">กำลังโหลดข้อมูล...</div>;
    if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
    if (!patientData) return <div className="text-center mt-20">ไม่พบข้อมูลคนไข้</div>;

    return (
    <div className="bg-white flex justify-center items-center p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-gray-800 cursor-pointer flex items-center gap-2"
          >
            <IoArrowBack size={24} />
            กลับ
          </button>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Patient Data
        </h2>
        <div className=" text-gray-700 mb-8">
          <p className="text-lg text-center font-semibold mb-4">Patient ID : A00{patientData.PatientID}</p>
          <div className="flex justify-center mb-4">
            <FaUserCircle size={80} className="text-gray-300" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-lg border-t border-gray-200 pt-6">
            <div><span className="font-semibold text-gray-500">ชื่อ:</span> {patientData.Name}</div>
            <div><span className="font-semibold text-gray-500">นามสกุล:</span> {patientData.Surname}</div>
            <div><span className="font-semibold text-gray-500">เพศ:</span> {patientData.Gender}</div>
            <div><span className="font-semibold text-gray-500">อายุ:</span> {patientData.Age}</div>
            <div className="md:col-span-2"><span className="font-semibold text-gray-500">เลขประจำตัวประชาชน:</span> {patientData.NationalID}</div>
            <div className="md:col-span-2"><span className="font-semibold text-gray-500">เบอร์โทรติดต่อ:</span> {patientData.PhoneNumber}</div>
            <div className="md:col-span-2"><span className="font-semibold text-gray-500">ที่อยู่:</span> {patientData.Address}</div>
          </div>
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
          <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center gap-4">
            {prescriptions.length > 0 ? (
              prescriptions.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-blue-500 text-white rounded-lg p-4 shadow-md w-full sm:w-60 mt-4"
                >
                  <button
                    onClick={() => {
                      const updated = prescriptions.filter((_, i) => i !== index);
                      setPrescriptions(updated);
                      sessionStorage.setItem("prescriptions", JSON.stringify(updated));
                    }}
                    className="absolute top-2 right-2 text-white hover:text-red-400 cursor-pointer transition transform hover:scale-105"
                  >
                    <FaXmark size={18} />
                  </button>
                  <p className="text-lg font-semibold mb-2">
                    <Link
                        href={`/test_drug/${item.drugId}`}
                         className="relative inline-block text-white after:content-[''] hover:after:rounded-full after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                      >{item.name}
                    </Link>
                  </p>
                  <ul className="text-sm space-y-1 bg-blue-400 p-2 rounded-md">
                    <li>- จำนวน {item.quantity}</li>
                    <li>- {item.dosage}</li>
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-4">ยังไม่มีรายการยา</p>
            )}
          </div>


        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleSubmitting}
            disabled={submitting}
            className={`${
              submitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            } text-white font-bold py-3 cursor-pointer px-12 rounded-lg shadow-md transition-transform transform hover:scale-105`}
          >
            {submitting ? "กำลังบันทึก..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}