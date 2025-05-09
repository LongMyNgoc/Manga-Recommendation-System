// components/SimilarMangaList.tsx
"use client";

import React from "react";
import MangaCard from "@/components/MangaCard/MangaCard";

interface SimilarManga {
  id: string;
  title: string;
  status: string;
  tags: string[];
  coverUrl: string;
}

interface SimilarMangaListProps {
  similar: SimilarManga[];
}

const SimilarMangaList: React.FC<SimilarMangaListProps> = ({ similar }) => {
  if (similar.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
        Manga Tương Đồng
      </h2>

      <div className="bg-white shadow-lg rounded-lg p-2 border border-gray-200 w-full">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 justify-items-center">
          {similar.map((manga) => (
            <MangaCard
              key={manga.id}
              id={manga.id}
              title={manga.title}
              status={manga.status}
              tags={manga.tags}
              coverUrl={manga.coverUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarMangaList;
