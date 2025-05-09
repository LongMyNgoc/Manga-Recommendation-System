// hooks/useFetchChapterImages.ts
import { useState, useEffect } from "react";

const useFetchChapterImages = (id: string) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://manga-recommendation-system-be.onrender.com/chapter/${id}/pages`
        );
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải ảnh.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [id]);

  return { images, loading, error };
};

export default useFetchChapterImages;
