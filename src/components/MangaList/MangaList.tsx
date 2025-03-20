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

const MangaList: React.FC = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/mangas", {
          params: { limit: 100, offset: 0 }, // Giới hạn 10 manga, có thể tăng lên
        });

        setMangas(response.data.mangas); // Lấy dữ liệu từ key "mangas" của API
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch mangas");
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();
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
