// app/[id]/useMangaChapters.ts
import { useEffect, useState } from "react";

interface Chapter {
  id: string;
  chapter: string;
  title: string;
  volume: string;
  createdAt: string;
}

export const useMangaChapters = (mangaId: string) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mangaId) return;

    const fetchChapters = async () => {
      try {
        const res = await fetch(
          `https://manga-recommendation-system-be.onrender.com/mangas/${mangaId}/chapters`
        );
        if (!res.ok) throw new Error("Failed to fetch chapters");

        const data = await res.json();
        setChapters(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [mangaId]);

  return { chapters, error, loading };
};
