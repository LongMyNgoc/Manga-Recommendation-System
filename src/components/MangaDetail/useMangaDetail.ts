import { useState, useEffect } from "react";

interface Manga {
  title: string;
  status: string;
  tags: string[];
  coverUrl: string;
  description: string;
  author: string;
  artist: string;
  year: string;
  publicationDemographic: string;
  originalLanguage: string;
  createdAt: string;
  updatedAt: string;
  externalLinks: string[];
}

export const useMangaDetail = (id: string) => {
  const [manga, setManga] = useState<Manga | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        if (!id) return;

        const response = await fetch(`http://localhost:9000/mangas/${id}`, {
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

  return { manga, error };
};
