"use client"
import Panelgraph from '../../components/admin/Panelgraph';
import { useRouter } from "next/navigation";
import RoleChecker from "../../components/common/RoleChecker";

export default function PanelgraphPage() {
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
          {role === "pharmacist" || role === "doctor" ? (
              <Panelgraph />
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