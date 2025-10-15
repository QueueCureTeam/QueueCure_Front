"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export default function PatientDispenseTable() {
  const { id } = useParams();
  const [drugs, setDrugs] = useState([]); // ข้อมูลยาทั้งหมดจาก backend
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [dispenseInputs, setDispenseInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const patientData = id;

  // 🧠 โหลดข้อมูลยาจาก backend
  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/drug/getAllDrug`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("id_token")}`,
          },
        });

        const data = res.data || [];
        setDrugs(data);
        setFilteredDrugs(data);

        // ตั้งค่าเริ่มต้นสำหรับ input ของแต่ละยา
        const initialInputs = {};
        data.forEach((drug) => {
          initialInputs[drug.DrugID] = {
            quantity: 1,
            dosage: drug.Dosage || "",
          };
        });
        setDispenseInputs(initialInputs);
      } catch (err) {
        console.error("Error fetching drugs:", err);
        setError("โหลดข้อมูลยาไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      } finally {
        setLoading(false);
      }
    };

    fetchDrugs();
  }, []);

  // 🔍 ฟิลเตอร์ค้นหายา
  useEffect(() => {
    if (!searchTerm) {
      setFilteredDrugs(drugs);
    } else {
      const results = drugs.filter((drug) =>
        drug.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDrugs(results);
    }
  }, [searchTerm, drugs]);

  // ✏️ handle input change
  const handleInputChange = (drugId, field, value) => {
    setDispenseInputs((prev) => ({
      ...prev,
      [drugId]: {
        ...prev[drugId],
        [field]: value,
      },
    }));
  };

  // 💊 ปุ่ม “จ่ายยา” (สามารถเปลี่ยนเป็น POST ไป backend ได้)
  const handleDispense = async (drugId) => {
    const dispenseData = dispenseInputs[drugId];
    const drug = drugs.find((d) => d.DrugID === drugId);

    if (!drug) return;

    // ส่งข้อมูลไป backend (ตัวอย่าง)
    try {
      const res = await axios.post(`http://localhost:3000/api/dispense`, {
        patientId: patientData.id,
        drugId,
        quantity: dispenseData.quantity,
        dosage: dispenseData.dosage,
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("id_token")}`,
          "Content-Type": "application/json",
        },
      });

      alert(`✅ จ่ายยา ${drug.Name} จำนวน ${dispenseData.quantity} สำเร็จ`);
      console.log("Response:", res.data);
    } catch (err) {
      console.error("Dispense error:", err);
      alert("❌ จ่ายยาไม่สำเร็จ กรุณาลองใหม่");
    }
  };

  const headers = [
    "Name",
    "Details",
    "Price",
    "Expiry Date",
    "Stock",
    "Quantity",
    "Dosage",
    "จ่ายยา",
  ];

  // 🧩 UI
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="text-gray-500 hover:text-gray-800"
            >
              <IoArrowBack size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Patient Data</h1>
              <p className="text-md text-gray-500">Patient ID: {patientData}</p>
            </div>
          </div>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search drug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Table Section */}
        {loading ? (
          <div className="text-center text-gray-500 py-10">กำลังโหลดข้อมูลยา...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-700">
              <thead className="bg-gray-100 text-sm font-semibold text-gray-600 uppercase">
                <tr>
                  {headers.map((header) => (
                    <th key={header} className="py-3 px-4">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDrugs.map((drug) => (
                  <tr key={drug.DrugID} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{drug.Name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{drug.Details}</td>
                    <td className="py-3 px-4">{drug.Price}</td>
                    <td className="py-3 px-4">{drug.Expiry_date}</td>
                    <td className="py-3 px-4">{drug.StockQuantity}</td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        value={dispenseInputs[drug.DrugID]?.quantity || 1}
                        onChange={(e) =>
                          handleInputChange(drug.DrugID, "quantity", e.target.value)
                        }
                        min="1"
                        max={drug.Stock}
                        className="w-20 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <input
                        type="text"
                        value={dispenseInputs[drug.DrugID]?.dosage || ""}
                        onChange={(e) =>
                          handleInputChange(drug.DrugID, "dosage", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDispense(drug.DrugID)}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
                      >
                        จ่ายยา
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
