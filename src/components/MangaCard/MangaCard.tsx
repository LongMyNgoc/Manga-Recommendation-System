"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface MangaCardProps {
  id: string;
  title: string;
  status: string;
  tags: string[];
  coverUrl: string;
}

const MangaCard: React.FC<MangaCardProps> = ({ id, title, status, tags, coverUrl }) => {
  return (
    <Link href={`/manga/${id}`} className="block w-44 cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <Image src={coverUrl} alt={title} width="180" height="250" className="w-full h-64 object-cover" />
      <div className="p-2 bg-white">
        <h3 className="text-sm font-bold truncate">{title}</h3>
        <p className="text-xs text-gray-600">Status: {status}</p>
        <p className="text-xs text-gray-500 truncate">Tags: {tags.join(", ")}</p>
      </div>
    </Link>
  );
};

export default MangaCard;
