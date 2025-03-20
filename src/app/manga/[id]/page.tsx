"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Manga {
  title: string;
  status: string;
  tags: string[];
  coverUrl: string;
}

const MangaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [manga, setManga] = useState<Manga | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        if (!id) return;

        const response = await fetch(`http://localhost:8000/mangas/${id}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch manga details");
        }

        const mangaData = await response.json();
        setManga(mangaData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Lỗi không xác định");
        }
      }
    };

    fetchMangaDetails();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!manga) return <p>Loading...</p>;

  return (
    <div>
      <h1>{manga.title}</h1>
      <Image src={manga.coverUrl} alt={manga.title} width={250} height={350} />
      <p>Status: {manga.status}</p>
      <p>Tags: {manga.tags.join(", ")}</p>
    </div>
  );
};

export default MangaDetail;
