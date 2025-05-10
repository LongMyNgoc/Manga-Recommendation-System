"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  to: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to, label = "Quay lại" }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(to)}
      className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-200 hover:shadow transition duration-200"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      {label}
    </button>
  );
};

export default BackButton;
