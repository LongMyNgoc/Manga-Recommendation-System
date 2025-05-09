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

interface ChapterNavigationProps {
  chapters: Chapter[];
  currentChapterId: string;
  onChapterChange: (chapterId: string) => void;
}

const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  chapters,
  currentChapterId,
  onChapterChange,
}) => {
  const currentChapterIndex = chapters.findIndex((ch) => ch.id === currentChapterId);
  const prevChapter = chapters[currentChapterIndex - 1];
  const nextChapter = chapters[currentChapterIndex + 1];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
      {/* Nút Chapter trước */}
      {prevChapter ? (
        <Link href={`/chapter/${prevChapter.id}`} className="w-full md:w-auto">
          <button className="w-full md:w-auto bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
            Chapter trước
          </button>
        </Link>
      ) : (
        <div className="w-full md:w-auto" />
      )}

      {/* Dropdown chapter */}
      <select
        value={currentChapterId}
        onChange={(e) => onChapterChange(e.target.value)}
        className="w-full md:w-auto px-4 py-2 border rounded"
      >
        {chapters.map((chapter) => (
          <option key={chapter.id} value={chapter.id}>
            Chapter {chapter.chapter}: {chapter.title}
          </option>
        ))}
      </select>

      {/* Nút Chapter sau */}
      {nextChapter ? (
        <Link href={`/chapter/${nextChapter.id}`} className="w-full md:w-auto">
          <button className="w-full md:w-auto bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
            Chapter sau
          </button>
        </Link>
      ) : (
        <div className="w-full md:w-auto" />
      )}
    </div>
  );
};

export default ChapterNavigation;
