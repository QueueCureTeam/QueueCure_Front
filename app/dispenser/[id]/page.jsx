import PatientDispenseTable from '../../../components/user/dispenser/Dispenser'; 
import { useRouter } from "next/navigation";
import RoleChecker from "../../../components/common/RoleChecker";

export default function PatientPage() {
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
              <PatientDispenseTable />
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