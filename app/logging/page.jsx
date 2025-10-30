"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react'; 

function LoggingProcessor() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const idToken = params.get('id_token');
    const accessToken = params.get('access_token');
    
    if (idToken) {
      localStorage.setItem("id_token", idToken);
      localStorage.setItem("access_token", accessToken);
      
      router.push('/'); 
    } else {
      router.push('/login');
    }
  }, [params, router]); 

  return <p>กำลังตรวจสอบการล็อกอิน...</p>;
}

export default function LoggingPage() {
  return (
    <Suspense fallback={<p>กำลังโหลดหน้าล็อกอิน...</p>}>
      <LoggingProcessor />
    </Suspense>
  );
}