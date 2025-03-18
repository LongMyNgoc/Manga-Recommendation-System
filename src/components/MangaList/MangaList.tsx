"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import MangaCard from "../MangaCard/MangaCard";

interface Manga {
  id: string;
  title: string;
  status: string;
  tags: string[];
  coverUrl: string;
}

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

        for (let i = 0; i < 1; i++) {
          const response = await axios.get("https://api.mangadex.org/manga", {
            params: { limit: 100, offset: i * 100, includes: ["cover_art"] },
            signal,
          });

          if (signal.aborted) return;

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

        const uniqueMangas = Array.from(new Map(allMangas.map(m => [m.id, m])).values());

        setMangas(uniqueMangas);
      } catch (err: unknown) {
        if (axios.isCancel(err)) {
          console.log("Request bị hủy:", err.message);
        } else if (err instanceof Error) {
          console.error("Error fetching data:", err);
          setError("Failed to fetch mangas");
        } else {
          console.error("Unknown error:", err);
          setError("Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();

    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Manga List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {mangas.map((manga) => (
          <MangaCard key={manga.id} {...manga} />
        ))}
      </div>
    </div>
  );
};

export default MangaList;
