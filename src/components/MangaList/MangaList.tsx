"use client";

import React from "react";
import useFetchMangas from "./useFetchMangas"; // Import hook
import MangaCard from "../MangaCard/MangaCard";

const MangaList: React.FC = () => {
  const { mangas, loading, error } = useFetchMangas();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
        📚 Welcome to <span className="text-blue-500">MangaDex</span>
      </h1>

      {/* Khung bao ngoài */}
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full">
        {/* Lưới hiển thị manga, căn giữa các item trong grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 justify-items-center">
          {mangas.map((manga) => (
            <MangaCard key={manga.id} {...manga} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MangaList;
