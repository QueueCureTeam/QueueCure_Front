"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";


export default function DrugDetail() {
  const { id } = useParams();
  const [drug, setDrug] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrug = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/drug/${id}`, {
          headers: {
            "ngrok-skip-browser-warning" : true,
            Authorization: `Bearer ${localStorage.getItem("id_token")}`,
          },
        });
        setDrug(res.data);
      } catch (error) {
        console.error("Error fetching drug:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrug();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-500">
        กำลังโหลดข้อมูลยา...
      </div>
    );
  }

  if (!drug) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-red-500">
        ไม่พบข้อมูลยา
      </div>
    );
  }

  return (
    <div className="flex justify-center py-10 items-center min-h-screen">
      <div className="w-[380px] sm:w-[420px] pt-12 bg-indigo-100 shadow-lg border border-indigo-300 rounded-2xl p-6 relative">
        <button
          onClick={() => window.history.back()}
          variant="ghost"
          className="absolute top-3 left-3 cursor-pointer text-indigo-500 hover:text-indigo-700 transition duration-200"
        >
          ⬅ กลับ
        </button>

        {/* รูปยา */}
        <div className="flex justify-center mb-4">
          <div className="w-64 h-60 bg-white rounded-xl shadow-inner p-4 flex items-center justify-center overflow-hidden">
            {drug.ImageURL ? (
              <img
                src={drug.ImageURL}
                alt={drug.Name}
                className="object-cover w-full h-full rounded-xl"
              />
            ) : (
              <img
                src={"https://assets.sainsburys-groceries.co.uk/gol/1132540/1/640x640.jpg"}
                className="object-contain w-full h-full"
              />
            )}
          </div>
        </div>

        {/* ชื่อยา */}
        <h1 className="text-2xl font-semibold text-center text-indigo-800 mb-4">
          {drug.Name}
        </h1>

        {/* รายละเอียด */}
        <div className="bg-white rounded-xl shadow p-4 space-y-2">
          <p className="text-sm text-gray-600">💊 <strong>รหัสยา:</strong> {drug.DrugID}</p>
          <p className="text-sm text-gray-600">📦 <strong>วันที่หมดอายุ:</strong> {drug.Expiry_date}</p>
          <p className="text-sm text-gray-600">🕒 <strong>ราคา:</strong> {drug.Price}</p>
          {drug.Details && (
            <p className="text-sm text-gray-600">🧾 <strong>รายละเอียดของยา:</strong> {drug.Details}</p>
          )}
        </div>
      </div>
    </div>
  );
}
