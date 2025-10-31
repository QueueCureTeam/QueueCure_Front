"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

export default function PatientDispenseTable() {
  const { id } = useParams();
  const [drugs, setDrugs] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [dispenseInputs, setDispenseInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const patientData = id;

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/drug/getAllDrug`, {
          headers: {
            "ngrok-skip-browser-warning" : true,
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

  const handleInputChange = (drugId, field, value) => {
    setDispenseInputs((prev) => ({
      ...prev,
      [drugId]: {
        ...prev[drugId],
        [field]: value,
      },
    }));
  };

  
  const handleDispense = (drugId) => {
  const dispenseData = dispenseInputs[drugId];
  const drug = drugs.find((d) => d.DrugID === drugId);
  if (!drug) return;

  const existingData = JSON.parse(sessionStorage.getItem("prescriptions") || "[]");

  const newPrescription = {
    drugId: drug.DrugID,
    name: drug.Name,
    quantity: Number(dispenseData.quantity),
    dosage: dispenseData.dosage,
  };

  const updatedData = [...existingData, newPrescription];
  sessionStorage.setItem("prescriptions", JSON.stringify(updatedData));

  alert(`✅ เพิ่ม ${drug.Name} (${dispenseData.quantity}) เข้าใบจ่ายยาเรียบร้อย`);
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
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
                    <td className="py-3 px-4 font-medium">
                    <Link
                      href={`/drug/${drug.DrugID}`}
                      className="text-blue-600 hover:text-blue-700 transform hover:scale-105"
                    >{drug.Name}
                    </Link>
                    </td>
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
