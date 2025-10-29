"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import StatusBadge from "../../common/StatusBadge";
import { FaClock, FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";

function formatQueueID(id) {
  return `A${id.toString().padStart(3, "0")}`;
}

export default function PatientQueue() {
  const [queueData, setQueueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevStatus, setPrevStatus] = useState(null);
  const [calculatedTime, setCalculatedTime] = useState({ estimatedTime: "-", remainingMinutes: 0 });

  const fetchPatientQueue = async (cognitoSub) => {
    const token = localStorage.getItem("id_token");
    try {
      const res = await fetch(`http://localhost:3000/api/queue/self/${cognitoSub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
       if (res.status === 404) {
        setQueueData(null);
        setCalculatedTime({ estimatedTime: "-", remainingMinutes: 0 });
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setQueueData(null);
        setCalculatedTime({ estimatedTime: "-", remainingMinutes: 0 });
        setLoading(false);
        return;
      }
      const data = await res.json();
      setQueueData(data);
      
      if (data && data.QueueID) {
        calculatePatientTime(data);
      }
    } catch (err) {
      console.error("Error fetching patient queue:", err);
    } finally {
      setLoading(false);
    }
  };

  const getCognitoSubFromToken = () => {
    try {
      if (typeof window === "undefined") return null;
      const idToken = localStorage.getItem("id_token");
      if (!idToken) return null;
      const decodedToken = jwtDecode(idToken);
      return decodedToken.sub;
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  };

  const calculatePatientTime = (patientQueue) => {
    try {
      fetch('http://localhost:3000/api/queue')
        .then(res => res.json())
        .then(allQueues => {
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
                remainingMinutes
              });
            }
          }
        });
    } catch (error) {
      console.error("Error calculating time:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission();
    }

    const cognitoSub = getCognitoSubFromToken();
    if (cognitoSub) {
      fetchPatientQueue(cognitoSub);
    } else {
      setLoading(false);
    }

    fetchPatientQueue(cognitoSub);

    const interval = setInterval(() => {
      fetchPatientQueue(cognitoSub);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

   useEffect(() => {
    if (!queueData) return;

    if (queueData.Status === "ready" && prevStatus !== "ready") {
      if (Notification.permission === "granted") {
        new Notification("คิวของคุณพร้อมแล้ว!", {
          body: `คิว ${formatQueueID(queueData.QueueID)} พร้อมเข้ารับบริการแล้ว`,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("คิวของคุณพร้อมแล้ว!", {
              body: `คิว ${formatQueueID(queueData.QueueID)} พร้อมเข้ารับบริการแล้ว`,
            });
          }
        });
      }
    }

    setPrevStatus(queueData.Status);
  }, [queueData]);

  if (loading) {
    return (
      <div className="sticky bottom-0 left-0 right-0 mx-auto max-w-4xl px-6 py-3 bg-white border-t-2 border-blue-400 shadow-xl rounded-t-3xl">
        <div className="flex justify-center items-center py-2">
          <div className="text-gray-500">กำลังโหลดข้อมูลคิว...</div>
        </div>
      </div>
    );
  }

  if (!queueData) {
    return null;
  }

  return (
   <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-4xl px-6 py-3 bg-white border-t-2 border-blue-400 shadow-xl rounded-t-3xl">
  <div className="flex flex-wrap justify-between items-center gap-6">
    <div className="flex flex-col items-center text-center space-y-2">
      <div className="flex items-center gap-2">
        <FaRegUserCircle className="text-gray-700" />
        <span className="text-gray-600 tracking-wide">คิวของคุณ</span>
      </div>
      <div className="text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 rounded-xl shadow-md">
        {formatQueueID(queueData.QueueID)}
      </div>
    </div>

    <div className="hidden sm:flex flex-col text-center space-y-2">
      <span className="text-sm text-gray-600 tracking-wide">สถานะ</span>
      <StatusBadge status={queueData.Status} />
      <Link
        href={`/queue_detail/${queueData.QueueID}`}
        className="text-sm text-white bg-gradient-to-r from-green-500 to-green-600 mt-2 px-6 py-2 rounded-xl shadow-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-800 transition duration-200"
      >
        ดูรายละเอียด
      </Link>
    </div>

    <div className="flex flex-col items-end text-end space-y-1">
      <div className="flex items-center gap-2">
        <FaClock className="text-gray-700" />
        <span className="text-gray-600 tracking-wide">เวลาที่คาดการณ์</span>
      </div>
      <div className="text-2xl font-bold text-blue-800">
        {queueData.Status === "done"
          ? "เสร็จสิ้น"
          : queueData.Status === "delivery"
          ? "2 วัน"
          : `${calculatedTime.estimatedTime}`}
      </div>
      <div className="mt-1 text-orange-500 text-xs bg-orange-50 px-2 py-1 rounded-full">
        {queueData.Status === "done"
          ? "-"
          : queueData.Status === "ready" 
          ? "พร้อม"
          : queueData.Status === "delivery" 
          ? "อยู่ระหว่างการจัดส่ง"
          : `${calculatedTime.remainingMinutes} นาที`}
      </div>
      </div>
    </div>
  </div>

  );
}