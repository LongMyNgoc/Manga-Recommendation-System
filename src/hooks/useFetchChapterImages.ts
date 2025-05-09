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
        
        // Kiểm tra xem response có thành công không
        if (!response.ok) {
          throw new Error(`Lỗi ${response.status}: Không thể tải ảnh.`);
        }

        const data = await response.json();
        setImages(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          // Xử lý lỗi nếu err là instance của Error
          setError(`Có lỗi xảy ra khi tải ảnh: ${err.message}`);
        } else {
          // Xử lý lỗi chung nếu không phải là Error
          setError("Có lỗi không xác định xảy ra khi tải ảnh.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [id]);

  return { images, loading, error };
};

export default useFetchChapterImages;
