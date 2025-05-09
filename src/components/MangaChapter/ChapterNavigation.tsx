// components/ChapterNavigation.tsx

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
    <div className="flex justify-between mt-6 items-center">
      {prevChapter && (
        <Link href={`/chapter/${prevChapter.id}`}>
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
            Chapter trước
          </button>
        </Link>
      )}

      {/* Dropdown để chọn chapter */}
      <select
        value={currentChapterId}
        onChange={(e) => onChapterChange(e.target.value)}
        className="px-4 py-2 border rounded"
      >
        {chapters.map((chapter) => (
          <option key={chapter.id} value={chapter.id}>
            Chapter {chapter.chapter}: {chapter.title}
          </option>
        ))}
      </select>

      {nextChapter && (
        <Link href={`/chapter/${nextChapter.id}`}>
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
            Chapter sau
          </button>
        </Link>
      )}
    </div>
  );
};

export default ChapterNavigation;
