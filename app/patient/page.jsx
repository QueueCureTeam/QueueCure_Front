"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RoleChecker from "../../components/common/RoleChecker";
import SearchBar from "../../components/common/SearchBar";
import PatientTable from "../../components/admin/PatientTable";

export default function Patient() {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");

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
              </div>

              <SearchBar showDropdown={false} onStatusChange={setStatusFilter} onSearchChange={setSearchFilter}/>

              <PatientTable data={filteredPatients} loading={loading} error={error}/>
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
