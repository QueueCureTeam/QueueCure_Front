"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

   useEffect(() => {
    const id_token = searchParams.get("id_token");
    const access_token = searchParams.get("access_token");

    if (id_token && access_token) {
      localStorage.setItem("id_token", id_token);
      localStorage.setItem("access_token", access_token);
      router.replace("/"); // ไปหน้าหลักหลัง login สำเร็จ
    }
  }, [searchParams, router]);

  return <p>Logging you in...</p>;
}