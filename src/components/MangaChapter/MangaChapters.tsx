"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Chapter {
  id: string;
  chapter: string;
  title: string;
  volume: string;
  createdAt: string;
}

interface MangaChaptersProps {
  chapters: Chapter[];
  loading: boolean;
  error: string | null;
}

const MangaChapters: React.FC<MangaChaptersProps> = ({ chapters, loading, error }) => {
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE = 5; // Số lượng chapter hiển thị ban đầu

  const handleChapterClick = (chapters: Chapter[]) => {
    localStorage.setItem("chaptersList", JSON.stringify(chapters));
  };

  const visibleChapters = showAll ? chapters : chapters.slice(0, MAX_VISIBLE);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Danh sách Chapters</h2>

      {loading ? (
        <p>Loading chapters...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : chapters.length === 0 ? (
        <p className="text-gray-500">Không có chương nào được tìm thấy.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {visibleChapters.map((chapter) => (
              <li key={chapter.id} className="border-b pb-2">
                <Link
                  href={`/chapter/${chapter.id}`}
                  onClick={() => handleChapterClick(chapters)}
                  className="flex justify-between items-center hover:text-blue-600 transition"
                >
                  <div>
                    <span className="font-semibold">Chapter {chapter.chapter}:</span>{" "}
                    {chapter.title}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(chapter.createdAt).toLocaleDateString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Nút Xem thêm / Ẩn bớt */}
          {chapters.length > MAX_VISIBLE && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-blue-600 hover:underline font-medium"
              >
                {showAll ? "Ẩn bớt" : "Xem thêm"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MangaChapters;
