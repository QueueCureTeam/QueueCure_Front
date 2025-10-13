"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function RoleCheckPage() {
  const router = useRouter();
  
  // สร้าง state เพื่อเก็บค่า roles ที่อ่านได้จาก token
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('access_token');

      if (!token) {
        router.push('/login');
        return;
      }
      const decodedToken = jwtDecode(token);      
      const userRoles = decodedToken['cognito:groups'] || [];
      
      setRoles(userRoles);
      setUser(decodedToken); 

    } catch (error) {
      console.error("Invalid token:", error);
      router.push('/login');
    }
  }, []);

  if (roles.length === 0) {
    return <div>Loading user roles...</div>;
  }
  
  return (
    <div>
      <h1>Role-Based Content</h1>
      <p>Welcome, {user?.email || 'User'}!</p>
      <p>Your roles are: <strong>{roles.join(', ')}</strong></p>

      <hr />

      {/* --- นี่คือส่วนของการ Filter การแสดงผล --- */}

      {roles.includes('doctor') && (
        <div style={{ border: '1px solid green', padding: '10px', margin: '10px' }}>
          <h2>Doctor's Dashboard 🩺</h2>
          <p>This content is only visible to doctors.</p>
        </div>
      )}

      {roles.includes('pharmacist') && (
        <div style={{ border: '1px solid blue', padding: '10px', margin: '10px' }}>
          <h2>Pharmacist's Portal 💊</h2>
          <p>This content is only visible to pharmacists.</p>
        </div>
      )}

      {!roles.includes('doctor') && !roles.includes('pharmacist') && (
        <div style={{ border: '1px solid orange', padding: '10px', margin: '10px' }}>
          <h2>Patient's Area 👤</h2>
          <p>This content is only visible to patients.</p>
        </div>
      )}
    </div>
  );
}