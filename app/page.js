'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/check-login', { method: 'GET' });
        const data = await response.json();

        if (data.loggedIn) {
          router.push('/home');
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        router.push('/login');
      }
    };

    checkLoginStatus();
  }, [router]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 grayBackground">
      <p className="text-white mb-2 fs-2 fw-bold">Loading...</p>
    </div>
  );
}
