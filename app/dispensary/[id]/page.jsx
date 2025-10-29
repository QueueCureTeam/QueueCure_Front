"use client"
import Dispensary from '../../../components/user/dispenser/Dispensary';
import { useRouter } from "next/navigation";
import RoleChecker from "../../../components/common/RoleChecker";

export default function DispensaryPage() {
  const router = useRouter();

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
           <div>
            <main>
              <Dispensary /> 
            </main>
          </div>
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