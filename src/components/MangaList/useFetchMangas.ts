import { useEffect, useState } from "react";
import axios from "axios";

interface Manga {
  id: string;
  title: string;
  status: string;
  tags: string[];
  coverUrl: string;
}

const useFetchMangas = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await axios.get("https://manga-recommendation-system-be.onrender.com/mangas"); // ❌ Không truyền limit nữa

        setMangas(response.data.mangas);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch mangas");
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();
  }, []);

  return { mangas, loading, error };
};

export default useFetchMangas;
