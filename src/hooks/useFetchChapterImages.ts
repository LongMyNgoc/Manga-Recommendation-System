import { useState, useEffect } from "react";

interface FetchResponse {
  images: string[]; // Định nghĩa rõ kiểu dữ liệu trả về
}

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
        
        // Kiểm tra xem API trả về có lỗi không
        if (!response.ok) {
          throw new Error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        }
        
        const data: FetchResponse = await response.json();
        setImages(data.images);
      } catch (err) {
        // Kiểm tra và xử lý lỗi, đảm bảo err có kiểu đúng
        const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi tải ảnh.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [id]);

  return { images, loading, error };
};

export default useFetchChapterImages;
