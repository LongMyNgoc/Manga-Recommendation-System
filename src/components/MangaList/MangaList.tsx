"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import MangaCard from "../MangaCard/MangaCard";

// Định nghĩa kiểu dữ liệu cho Manga
interface Manga {
  id: string;
  title: string;
  status: string;
  tags: string[];
  coverUrl: string;
}

// Định nghĩa kiểu dữ liệu cho response từ API
interface MangaResponse {
  attributes: {
    title: { en: string };
    status: string;
    tags: { attributes: { name: { en: string } } }[];
  };
  relationships: { type: string; attributes: { fileName: string } }[];
  id: string;
}

const MangaList: React.FC = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMangas = async () => {
      try {
        const allMangas: Manga[] = [];

        // Lặp qua các trang dữ liệu
        for (let i = 0; i < 5; i++) {
          const response = await axios.get("https://api.mangadex.org/manga", {
            params: { limit: 100, offset: i * 100, includes: ["cover_art"] },
            signal,
          });

          if (signal.aborted) return;

          // Xử lý dữ liệu API và map lại thành đối tượng Manga
          const fetchedMangas = response.data.data.map((manga: MangaResponse) => {
            const title = manga.attributes.title?.en || "No title available";
            const status = manga.attributes.status || "Unknown";
            const tags = manga.attributes.tags.map((tag) => tag.attributes.name.en);

            const coverRel = manga.relationships.find((rel) => rel.type === "cover_art");
            const coverUrl = coverRel
              ? `https://uploads.mangadex.org/covers/${manga.id}/${coverRel.attributes.fileName}.256.jpg`
              : "https://via.placeholder.com/100x150";

            return { id: manga.id, title, status, tags, coverUrl };
          });

          allMangas.push(...fetchedMangas);
        }

        // Lọc Manga trùng lặp theo `id` bằng Set hoặc Map
        const uniqueMangas = Array.from(new Map(allMangas.map(m => [m.id, m])).values());

        // Đảm bảo rằng các manga không bị trùng lặp nữa
        setMangas(uniqueMangas);
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log("Request bị hủy:", err.message);
        } else {
          console.error("Error fetching data:", err);
          setError("Failed to fetch mangas");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();

    // Hủy yêu cầu khi component bị unmount hoặc hiệu ứng bị thay đổi
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Manga List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {mangas.map((manga) => (
          // Đảm bảo key là duy nhất, sử dụng `id`
          <MangaCard key={manga.id} {...manga} />
        ))}
      </div>
    </div>
  );
};

export default MangaList;
