'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="d-flex justify-content-center vh-100 grayBackground">
      <p className="text-white mb-2 fs-2 fw-bold">Home</p>
    </div>
  );
}
