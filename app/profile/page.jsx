"use client";

import { FaUserCircle, FaEdit, FaRegEdit  } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    Name: "",
    Surname: "",
    NationalID: "",
    PhoneNumber: "",
    Address: "",
    Age: "",
    Gender: "",
    ProfileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const idToken = typeof window !== "undefined" ? localStorage.getItem("id_token") : null;

  useEffect(() => {
  if (!idToken) return;

    axios
      .get("http://localhost:3000/api/patient/getProfile", {
        headers: { Authorization: `Bearer ${idToken}` },
      })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProfile({
          Name: "",
          Surname: "",
          NationalID: "",
          PhoneNumber: "",
          Address: "",
          Age: "",
          Gender: "",
          ProfileImage: "",
        });
        setLoading(false);
      });
  }, [idToken]);

  if (loading) return <div>Loading...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!idToken) {
      alert("Not authorized");
      return;
    }

    axios
      .put("http://localhost:3000/api/patient/editProfile", profile, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
      .then((res) => {
        alert(res.data.message || "Profile updated!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update profile");
      });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-100">
          {/* avatar */}
          <div className="flex flex-col items-center">
            <FaUserCircle size={80} className="text-gray-400" />
            <button className="cursor-pointer mt-4 text-sm bg-gray-200 pl-3 pr-2 py-1 rounded-md flex items-center gap-2">
              Edit <FaEdit size={12} />
            </button>
          </div>

          {/* profile info */}
          <div className="space-y-3 mt-6">
            {[
              { label: "ชื่อ", key: "Name" },
              { label: "นามสกุล", key: "Surname" },
              { label: "เลขบัตรประชาชน", key: "NationalID" },
              { label: "เบอร์โทรศัพท์", key: "PhoneNumber" },
              { label: "ที่อยู่", key: "Address" },
              { label: "อายุ", key: "Age", type: "number"},
            ].map((field) => (
              <div key={field.key} className="flex justify-between items-center">
                <span className="font-medium">{field.label}</span>
                <div className="relative w-56">
                  <input
                    type={field.type || "text"}                    
                    name={field.key}
                    value={profile[field.key] || ""}
                    className="w-56 px-3 ml-2 py-1 pr-8 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={handleChange}
                  />
                  <FaRegEdit className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center">
              <span className="font-medium">เพศ</span>
              <div className="relative w-56">
                <select
                  name="Gender"
                  value={profile.Gender || ""}
                  onChange={handleChange}
                  className="w-56 px-3 ml-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">เลือกเพศ</option>
                  <option value="ชาย">ชาย</option>
                  <option value="หญิง">หญิง</option>
                </select>
              </div>
            </div>
          </div>

          {/* submit button */}
          <button
            onClick={handleSubmit}
            className="cursor-pointer mt-6 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}