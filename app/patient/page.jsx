"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RoleChecker from "../../components/common/RoleChecker";
import SearchBar from "../../components/common/SearchBar";
import PatientTable from "../../components/admin/PatientTable";
import { FaAngleDoubleRight } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";

function formatTime(date) {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  return date.toLocaleTimeString('th-TH', options);
}

export default function Patient() {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeString, setTimeString] = useState(formatTime(new Date()));

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    setTimeString(formatTime(new Date()));
    try {
      const response = await axios.get("http://localhost:3000/api/queue/patients", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("id_token")}`,
        },
      });
      setPatients(response.data);
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

  const filteredPatients = patients.filter((patient) => {
    const matchSearch =
      searchFilter === "" ||
      patient.Name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      patient.Surname?.toLowerCase().includes(searchFilter.toLowerCase())

    return matchSearch;
  });

  return (
    <RoleChecker
      onRoleDetected={(role) => {
        if (role !== "doctor") {
          router.push("/");
        }
      }}
    >
      {(role) => (
        <div>
          {role === "doctor" ? (
            <>
              <div className="pt-10 text-center space-y-3">
                <h2 className="text-3xl font-semibold text-blue-900 drop-shadow-sm">
                  ข้อมูลคนไข้
                </h2>
                <div className="px-4 py-1 inline-flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-100 rounded-lg">
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>วันที่ 1 ตุลาคม</span>
                  <span>•</span>
                  <span>12:00 น.</span>
                </div>
                <SearchBar showDropdown={false} onStatusChange={setStatusFilter} onSearchChange={setSearchFilter} />

              </div>
              <div className="mx-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 flex items-center justify-between text-white text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700">
                  <div className="flex items-center gap-4">
                    <FaAngleDoubleRight size={24} className="drop-shadow-lg" />
                    <span className="tracking-wider">รายชื่อคนไข้ทั้งหมด</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <button onClick={fetchPatients} className="p-2 rounded-full hover:bg-blue-500/20 transition-colors" title="รีเฟรชข้อมูล">
                      <LuRefreshCcw className="text-white" />
                    </button>
                    <span className="text-sm">อัปเดตล่าสุด: {timeString} น.</span>
                  </div>
                </div>


                <PatientTable data={filteredPatients} loading={loading} error={error} />
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-gray-600">
              กำลังตรวจสอบสิทธิ์การเข้าถึง...
            </div>
          )}
        </div>
      )}
    </RoleChecker>
  );
}
