'use client';
// import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Dispensary() {
    
    const patientData = {
    id: "110567",
    firstName: "สมชาย",
    lastName: "ใจดี",
    gender: "ชาย",
    age: "45",
    medications: [
      { name: "พารา", amount: "10 เม็ด" },
      { name: "ไอบูโพรเฟน", amount: "10 เม็ด" },
      { name: "วิตามินซี", amount: "10 เม็ด" },
      { name: "แอสไพริน", amount: "10 เม็ด" },
      { name: "อะม็อกซี่", amount: "10 เม็ด" },
        { name: "ลอราทาดีน", amount: "10 เม็ด" },
        { name: "พารา", amount: "10 เม็ด" },
      { name: "ไอบูโพรเฟน", amount: "10 เม็ด" },
      { name: "วิตามินซี", amount: "10 เม็ด" },
      { name: "แอสไพริน", amount: "10 เม็ด" },
      { name: "อะม็อกซี่", amount: "10 เม็ด" },
        { name: "ลอราทาดีน", amount: "10 เม็ด" },
        { name: "พารา", amount: "10 เม็ด" },
      { name: "ไอบูโพรเฟน", amount: "10 เม็ด" },
      { name: "วิตามินซี", amount: "10 เม็ด" },
      { name: "แอสไพริน", amount: "10 เม็ด" },
      { name: "อะม็อกซี่", amount: "10 เม็ด" },
        { name: "ลอราทาดีน", amount: "10 เม็ด" },
    ],
  };

    return (
    <div className="bg-white flex justify-center items-center p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
        
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Patient Data
        </h2>
        <div className="text-center text-gray-700 mb-8">
          <p className="text-lg font-semibold mb-4">Patient ID : {patientData.id}</p>
          <div className="flex justify-center mb-4">
            <FaUserCircle size={80} className="text-gray-300" />
          </div>
          <p className="text-xl">
            ชื่อ {patientData.firstName} นามสกุล {patientData.lastName} เพศ {patientData.gender} อายุ {patientData.age}
          </p>
        </div>

        <div className="border border-gray-300 rounded-lg p-4 sm:p-6">
          <h3 className="text-center text-xl font-semibold text-gray-800 mb-6">
            รายการยา
          </h3>
          <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center gap-4">
            {patientData.medications.map((med, index) => (
              <div
                key={index}
                className="bg-indigo-500 text-white rounded-lg p-3 shadow-md w-full sm:w-60 flex justify-between items-center"
              >
                <span className="font-semibold">{med.name}</span>
                <span className="bg-indigo-400 text-xs font-bold px-2 py-1 rounded-full">{med.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            className="bg-green-500 text-white font-bold py-3 px-12 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}