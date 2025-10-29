"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import StatusMapper from "../../common/StatusMapper";
import Link from "next/link";
import Image from "next/image";
import RoleChecker from "../../common/RoleChecker"; // ตรวจสอบ path ให้ถูกต้อง

export default function QueueDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [queue, setQueue] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [queueOption, setQueueOption] = useState("self_pickup");
  const [pharmCounter, setPharmCounter] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [calculatedTime, setCalculatedTime] = useState({
    estimatedTime: "-",
    remainingMinutes: 0,
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("id_token") : null;
  const qrCodeUrl = "https://queuequres3.s3.us-east-1.amazonaws.com/public/Qrcode_payment.png";

  function formatQueueID(id) {
    return `A${id.toString().padStart(3, '0')}`;
  }

  useEffect(() => {
    const fetchQueueDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/api/queue/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const queueData = res.data;
        setQueue(queueData);
        if (queueData && queueData.QueueID) {
          calculatePatientTime(queueData);
        }
        setQueueOption(res.data.DeliveryOption || "");
        setStatus(res.data.Status || "");
        setPharmCounter(res.data.PharmCounter || "");

        if (queueData && queueData.PrescriptionID) {
          const presRes = await axios.get(
            `http://localhost:3000/api/prescription/${queueData.PrescriptionID}`,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
              },
            }
          );
          setPrescriptions(presRes.data);
        } else {
          setPrescriptions([]);
        }
      } catch (err) {
        console.error("Error fetching queue detail:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchQueueDetail();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/queue/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      alert("คิวถูกลบเรียบร้อยแล้ว");
      router.push("/test_dashboard");
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการลบคิว");
      console.error("Error deleting queue:", err);
      setError(err.response?.data?.message || err.message);
    }
  };
  const openDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setShowDeleteConfirm(false);
  };
  const handleSelfEdit = async () => {
    try {
      const newStatus = queueOption === "delivery" ? "delivery" : "waiting";

      await axios.put(`http://localhost:3000/api/queue/self/${id}`, 
        {
          DeliveryOption: queueOption,
          Status: newStatus
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      alert("เลือกบริการจัดส่งเรียบร้อย!");
      setIsEditing(false);
      setQueue((prev) => ({ ...prev, DeliveryOption: queueOption, Status: newStatus }));
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการแก้ไขคิว");
      console.error("Error deleting queue:", err);
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/api/queue/${id}`, 
        {
          Status: status,
          PharmCounter: pharmCounter,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      alert("แก้ไขคิวเรียบร้อยแล้ว");
      setIsEditing(false);
      setQueue((prev) => ({ ...prev, Status: status, PharmCounter: pharmCounter }));
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการแก้ไขคิว");
      console.error("Error deleting queue:", err);
      setError(err.response?.data?.message || err.message);
    }
  };

  const calculatePatientTime = async (patientQueue) => {
  try {
    const res = await fetch("http://localhost:3000/api/queue", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const allQueues = await res.json();
    if (Array.isArray(allQueues)) {
      const patientIndex = allQueues.findIndex(q => q.QueueID === patientQueue.QueueID);
      if (patientIndex !== -1) {
        const readyBefore = allQueues.slice(0, patientIndex).filter(q => q.Status === "ready").length;
        const waitMinutes = (patientIndex - readyBefore + 1) * 5;

        const now = new Date();
        const estimatedTime = new Date(now.getTime() + (waitMinutes + 5) * 60000);
        const remainingMinutes = Math.max(0, Math.ceil((estimatedTime - now) / 60000));

        setCalculatedTime({
          estimatedTime: estimatedTime.toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          remainingMinutes,
        });
      }
    }
    } catch (error) {
      console.error("Error calculating time:", error);
    }
  };


  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  useEffect(() => {
    if (queue?.DeliveryOption) {
      setQueueOption(queue.DeliveryOption);
    } else if (queue?.Status === "delivery") {
      setQueueOption("delivery");
    } else {
      setQueueOption("self_pickup");
    }
  }, [queue]);

  if (loading) return <div className="text-center text-gray-600 py-12">กำลังโหลดข้อมูล...</div>;
  if (error) return <div className="text-center text-red-600 py-12">เกิดข้อผิดพลาด: {error}</div>;
  if (!queue) return <div className="text-center text-gray-500 py-12">ไม่พบข้อมูลคิว</div>;

  const statusOptions = [
    { value: "waiting", label: "อยู่ในคิว" },
    { value: "preparing", label: "กำลังจัดเตรียม" },
    { value: "ready", label: "ถึงคิวแล้ว" },
    { value: "delivery", label: "บริการจัดส่ง" },
    { value: "done", label: "เสร็จสิ้น" }
  ];

  const patientCanChangeOption = queue.Status === "waiting" || !queue.Status;


  return (
    <RoleChecker onRoleDetected={setUserRole}>
      {(role) => (
        <div className="min-h-screen bg-gray-50 py-10">
          <div className="max-w-2xl mx-auto px-4">
            <button 
              onClick={() => router.back()} 
              className="flex cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
            >
              <FaArrowLeft />
              <span>กลับ</span>
            </button>

            <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                คิวหมายเลข : {formatQueueID(queue.QueueID)}
              </h2>

              <div key={queue.QueueID} className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2">
                <p>
                  <span className="font-semibold">เวลารับยาโดยประมาณ :</span>{" "}
                  {queue.Status === "done"
                    ? "เสร็จสิ้น"
                    : queue.Status === "delivery"
                    ? "ประมาณ 2 วัน"
                    : `${calculatedTime.estimatedTime} (${calculatedTime.remainingMinutes} นาที)`}
                </p>
                <p><span className="font-semibold">หมายเลขคิว :</span> {formatQueueID(queue.QueueID)} </p>
                
                <p>
                  <span className="font-semibold">สถานะ :</span>{" "}
                  {isEditing ? (
                    <select 
                      className="border rounded-md px-2 py-1 text-gray-700"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <StatusMapper status={queue.Status} />
                  )}
                </p>

                <p>
                  <span className="font-semibold">ช่องรับยา :</span>{" "}
                  {isEditing ? (
                    <input 
                      type="text"
                      className="border rounded-md px-2 py-1 w-32"
                      value={pharmCounter}
                      onChange={(e) => setPharmCounter(e.target.value)}
                    />
                  ) : (
                    queue.PharmCounter || "-"
                  )}
                </p>
                <p><span className="font-semibold">แพทย์ผู้รับผิดชอบ :</span> {queue.DoctorName} {queue.DoctorSurname}</p>
              </div>

              {(role === 'pharmacist' || role === 'doctor') && (
                <div className="flex justify-end gap-3">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={handleEdit}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 cursor-pointer transition duration-200 shadow-md text-white rounded-lg font-bold"
                      >
                        บันทึก
                      </button>
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-400 hover:bg-gray-500 cursor-pointer transition duration-200 shadow-md text-white rounded-lg font-bold"
                      >
                        ยกเลิก
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 cursor-pointer transition duration-200 shadow-md text-white rounded-lg font-bold"
                    >
                      แก้ไข
                    </button>
                  )}
                </div>
              )}
              {(role === 'pharmacist' || role === 'doctor') && (
               <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <p className="font-semibold text-center text-lg mb-4">ข้อมูลผู้ป่วย</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <div className="space-y-3">
                    <p>
                        <span className="font-semibold text-gray-700">ชื่อ:</span> 
                        <span className="ml-2">{queue.PatientName || '-'}</span>
                    </p>
                    <p>
                        <span className="font-semibold text-gray-700">นามสกุล:</span> 
                        <span className="ml-2">{queue.PatientSurname || '-'}</span>
                    </p>
                    <p>
                        <span className="font-semibold text-gray-700">เพศ:</span> 
                        <span className="ml-2">{queue.PatientGender || '-'}</span>
                    </p>
                    <p>
                        <span className="font-semibold text-gray-700">อายุ:</span> 
                        <span className="ml-2">{queue.PatientAge || '-'}</span>
                    </p>
                    </div>
                    <div className="space-y-3">
                    <p>
                        <span className="font-semibold text-gray-700">เบอร์โทร:</span> 
                        <span className="ml-2">{queue.PatientPhone || '-'}</span>
                    </p>
                    <p>
                        <span className="font-semibold text-gray-700">เลขบัตรประชาชน:</span> 
                        <span className="ml-2">{queue.PatientNationalID || '-'}</span>
                    </p>
                    <p className="md:col-span-2">
                        <span className="font-semibold text-gray-700">ที่อยู่:</span> 
                        <span className="ml-2 block mt-1">{queue.PatientAddress || '-'}</span>
                    </p>
                    </div>
                </div>
                </div>
                )}

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-semibold mb-2">รายละเอียดยาที่ต้องได้รับ (คลิ๊กเพื่อดูรายละเอียดยา)</p>
                {prescriptions.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 gap-4">
                    {prescriptions.map((drug, i) => (
                      <li key={i}>
                        <Link 
                          href={`/drug/${drug.DrugID}`}
                          className="text-blue-500 hover:text-blue-600 transition duration-200"
                        >
                          {drug.DrugName}
                        </Link>
                        ({drug.Quantity} ชิ้น) - {drug.Dosage}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">ไม่มีข้อมูลยา</p>
                )}
              </div>

              <div className="pt-4 space-y-4">
                 {(role !== 'pharmacist' && role !== 'doctor') && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="font-semibold mb-2 text-center text-gray-700">เลือกรูปแบบการรับยา</p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                      <select
                        value={queueOption}
                        onChange={(e) => setQueueOption(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                        disabled={!patientCanChangeOption}
                      >
                        <option value="self_pickup">รับยาที่โรงพยาบาล</option>
                        <option value="delivery">จัดส่งยาถึงบ้าน</option>
                      </select>

                      <button
                        onClick={handleSelfEdit}
                        disabled={!patientCanChangeOption || !queueOption}
                        className={`px-4 py-2 rounded-lg font-bold shadow-md transition-colors duration-200 w-full md:w-auto ${
                          patientCanChangeOption && queueOption
                            ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        ยืนยันการเลือกบริการ
                      </button>
                    </div>

                    {!patientCanChangeOption && (
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        ไม่สามารถเปลี่ยนรูปแบบการรับยาได้เนื่องจากคิวถูกดำเนินการแล้ว (สถานะ: {queue.Status})
                      </p>
                    )}

                    {/* แสดงค่า DeliveryOption ปัจจุบัน */}
                    <p className="text-sm text-gray-600 mt-3 text-center">
                      รูปแบบการรับยาปัจจุบัน:{" "}
                      <span className="font-medium">
                        {queue.DeliveryOption === "delivery" ? "รับยาที่โรงพยาบาล" : "จัดส่งถึงบ้าน"}
                      </span>
                    </p>
                  </div>
                )}


                {(role !== 'pharmacist' && role !== 'doctor') && (
                  <button 
                    onClick={handlePayment}
                    className="w-full py-3 cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-md transition-colors"
                  >
                    ชำระเงิน
                  </button>
                )}


                {role === 'doctor' && (
                  <button 
                    onClick={openDeleteConfirm}
                    className="w-full py-3 cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold text-lg rounded-xl shadow-md transition-colors"
                  >
                    ลบคิว
                  </button>
                )}

                {(role !== 'pharmacist' && role !== 'doctor') && (
                  <button 
                    onClick={openDeleteConfirm}
                    className="w-full py-3 cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold text-lg rounded-xl shadow-md transition-colors"
                  >
                    ยกเลิกคิว
                  </button>
                )}
              </div>
              {showDeleteConfirm && (
                <div className="fixed inset-0  bg-black/20 backdrop-blur-sm  flex items-center justify-center z-0 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                        ยืนยันการลบคิว
                        </h3>
                        <p className="text-gray-600 mb-6">
                        คุณแน่ใจหรือไม่ว่าต้องการลบคิวหมายเลข <span className="font-bold text-red-600">{formatQueueID(queue.QueueID)}</span>? 
                        การกระทำนี้ไม่สามารถย้อนกลับได้
                        </p>
                        {/* Buttons */}
                        <div className="flex gap-3 justify-center">
                        <button
                            onClick={closeDeleteConfirm}
                            className="px-6 py-2 bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition duration-200"
                        >
                            ยกเลิก
                        </button>
                        <button
                            onClick={() => {
                            closeDeleteConfirm();
                            handleDelete();
                            }}
                            className="px-6 py-2 bg-red-600 cursor-pointer hover:bg-red-700 text-white font-medium rounded-lg transition duration-200"
                        >
                            ลบคิว
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
              )}

              {/* แสดง qrcode ชำระเงิน */}
              {showPaymentModal && (
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                  <div className="text-center">
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      สแกน QR Code เพื่อชำระเงิน
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      ชื่อบัญชี นายยอดรัก สลักใจ
                    </p>

                    <p className="text-gray-600 mb-4">
                      {/* ดึงยอดชำระมาใส่ที่ xxx */}
                      ยอดชำระ: <span className="font-bold text-blue-600">400.00 บาท</span>
                    </p>

                    <div className="relative w-64 h-64 mx-auto border-4 border-gray-300 rounded-lg overflow-hidden">
                      <Image
                        src={qrCodeUrl}
                        alt="Payment QR Code"
                        layout="fill"
                        objectFit="contain"
                        priority
                      />
                    </div>

                    {/* ปุ่มปิด */}
                    <div className="flex gap-3 justify-center mt-6">
                      <button
                        onClick={closePaymentModal}
                        className="px-6 py-2 bg-blue-600 cursor-pointer hover:bg-blue-300 text-white font-medium rounded-lg transition duration-200"
                      >
                        ปิด
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </RoleChecker>
  );
}