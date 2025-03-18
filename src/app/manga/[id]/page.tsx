"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface PageProps {
  params: { id: string };
}

interface Manga {
  attributes: {
    title: { en: string };
    status: string;
    tags: { attributes: { name: { en: string } } }[];
  };
  relationships: { type: string; attributes: { fileName: string } }[];
}

const MangaDetail: React.FC<PageProps> = ({ params }) => {
  const { id } = params;

  const [manga, setManga] = useState<Manga | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const response = await fetch(
          `https://api.mangadex.org/manga/${id}?includes[]=cover_art`,
          {
            cache: 'no-store', // Đảm bảo luôn lấy dữ liệu mới nhất
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch manga details');
        }

        const mangaData = await response.json();
        setManga(mangaData.data);
      } catch (error: any) {
        setError('Lỗi khi tải dữ liệu');
      }
    };

    fetchMangaDetails();
  }, [id]); // fetch lại khi `id` thay đổi

  if (error) return <p>{error}</p>;

  if (!manga) return <p>Loading...</p>;

  const title = manga.attributes.title?.en || 'No title available';
  const status = manga.attributes.status || 'Unknown';
  const tags = manga.attributes.tags.map((tag) => tag.attributes.name.en);

  const coverRel = manga.relationships.find((rel) => rel.type === 'cover_art');
  const coverUrl = coverRel
    ? `https://uploads.mangadex.org/covers/${id}/${coverRel.attributes.fileName}.256.jpg`
    : 'https://via.placeholder.com/250x350';

  return (
    <div>
      <h1>{title}</h1>
      <Image src={coverUrl} alt={title} width={250} height={350} />
      <p>Status: {status}</p>
      <p>Tags: {tags.join(', ')}</p>
    </div>
  );
};

export default MangaDetail;
