"use client"; // Bắt buộc vì đây là component phía client

import React from "react";
import Link from "next/link";
import Image from 'next/image';

interface MangaCardProps {
  id: string;
  title: string;
  status: string;
  tags: string[];
  coverUrl: string;
}

const MangaCard: React.FC<MangaCardProps> = ({ id, title, status, tags, coverUrl }) => {
  return (
    <Link href={`/manga/${id}`}>
  <div
    style={{
      width: "180px",
      cursor: "pointer",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      transition: "transform 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <Image src={coverUrl} alt={title} width="180" height="250" style={{ objectFit: "cover" }} />
    <div style={{ padding: "8px", background: "#fff" }}>
      <h3 style={{ fontSize: "14px", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {title}
      </h3>
      <p style={{ fontSize: "12px", color: "#666" }}>Status: {status}</p>
      <p style={{ fontSize: "12px", color: "#999", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        Tags: {tags.join(", ")}
      </p>
    </div>
  </div>
</Link>
  );
};

export default MangaCard;
