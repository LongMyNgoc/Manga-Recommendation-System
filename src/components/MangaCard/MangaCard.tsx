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
    <Link
  href={`/manga/${id}`}
  className="block w-[150px] cursor-pointer rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
>
  <div className="relative w-full aspect-[3/4]">
    <Image
      src={coverUrl}
      alt={title}
      fill
      className="object-cover"
      sizes="(max-width: 640px) 100px, 100px"
    />
  </div>
  <div className="p-1 bg-white">
    <h3 className="text-[10px] font-semibold truncate">{title}</h3>
    <p className="text-[9px] text-gray-600 truncate">Status: {status}</p>
    <p className="text-[9px] text-gray-500 truncate">Tags: {tags.join(", ")}</p>
  </div>
</Link>

  );
};

export default MangaCard;
