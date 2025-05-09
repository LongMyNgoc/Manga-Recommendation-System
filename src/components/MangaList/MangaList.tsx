"use client";

import React, { useState } from "react";
import useFetchMangas from "./useFetchMangas";
import MangaCard from "../MangaCard/MangaCard";

const MangaList: React.FC = () => {
  const { mangas, loading, error } = useFetchMangas();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMangas = mangas.filter((manga) =>
    manga.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueFilteredMangas = filteredMangas.filter(
    (manga, index, self) =>
      self.findIndex((m) => m.id === manga.id) === index
  );

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
    <div className="w-full px-4 sm:px-8 py-6">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
        📚 Welcome to <span className="text-blue-500">MangaDex</span>
      </h1>

      {/* Thanh tìm kiếm */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm manga..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Danh sách Manga */}
      <div className="bg-white shadow-lg rounded-lg p-2 border border-gray-200 w-full">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 justify-items-center">
          {uniqueFilteredMangas.length > 0 ? (
            uniqueFilteredMangas.map((manga) => (
              <MangaCard key={manga.id} {...manga} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-6">
              Không tìm thấy manga phù hợp.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MangaList;
