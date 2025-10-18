"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import StatusMapper from "../../common/StatusMapper";
import Link from "next/link";

export default function QueueDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [queue, setQueue] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("id_token");

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

  if (loading)
    return <div className="text-center text-gray-600 py-12">กำลังโหลดข้อมูล...</div>;
  if (error)
    return <div className="text-center text-red-600 py-12">เกิดข้อผิดพลาด: {error}</div>;
  if (!queue)
    return <div className="text-center text-gray-500 py-12">ไม่พบข้อมูลคิว</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft /> <span>กลับ</span>
        </button>

        <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center">คิวของคุณ</h2>

          <div key={queue.QueueID} className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2">
            <p><span className="font-semibold">เวลารับยาโดยประมาณ :</span> ทำไงวะ</p>
            <p><span className="font-semibold">หมายเลขคิวของคุณ :</span> {formatQueueID(queue.QueueID)} </p>
            <p><span className="font-semibold">สถานะ :</span> <StatusMapper status={queue.Status} /></p>
            <p><span className="font-semibold">ช่องรับยา :</span> {queue.PharmCounter}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-semibold mb-2">รายละเอียดยาที่ต้องได้รับ (คลิ๊กเพื่อดูรายละเอียดยา)</p>
            {prescriptions.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1 gap-4">
                {prescriptions.map((drug, i) => (
                  <li key={i}>
                    <Link href={`/test_drug/${drug.DrugID}`} className="text-blue-500 hover:text-blue-600 transition duration-200">{drug.DrugName} </Link>
                    ({drug.Quantity} ชิ้น) - {drug.Dosage}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">ไม่มีข้อมูลยา</p>
            )}
          </div>

          <div className="text-right text-sm text-gray-500">
            วันที่รับยา 17 สิงหาคม 2600
          </div>

          <div className="pt-4">
            <button
              onClick={() => alert("ยังไม่เชื่อมต่อระบบชำระเงิน")}
              className="w-full py-3 cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-md transition-colors"
            >
              ชำระเงิน
            </button>
            <button
              onClick={() => handleDelete()}
              className="w-full py-3 cursor-pointer bg-red-500 mt-4 hover:bg-red-600 text-white font-bold text-lg rounded-xl shadow-md transition-colors"
            >
              ยกเลิกคิว
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
