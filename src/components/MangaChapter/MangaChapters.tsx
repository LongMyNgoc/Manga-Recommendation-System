"use client";

import React from "react";
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
  const handleChapterClick = (chapters: Chapter[]) => {
    // Lưu danh sách chapters vào localStorage
    localStorage.setItem("chaptersList", JSON.stringify(chapters));
  };

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
        <ul className="space-y-2">
          {chapters.map((chapter) => (
            <li key={chapter.id} className="border-b pb-2">
              <Link
                href={`/chapter/${chapter.id}`} // Điều hướng tới trang chapter chi tiết
                onClick={() => handleChapterClick(chapters)} // Lưu chapters vào localStorage khi click
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
      )}
    </div>
  );
};

export default MangaChapters;
