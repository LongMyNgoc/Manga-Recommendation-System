"use client";

import Image from 'next/image';

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

const MangaDetail: React.FC<PageProps> = async ({ params }) => {
  const { id } = params; // params không cần await

  try {
    const response = await fetch(
      `https://api.mangadex.org/manga/${id}?includes[]=cover_art`,
      {
        cache: "no-store", // Đảm bảo luôn lấy dữ liệu mới nhất
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch manga details");
    }

    const mangaData = await response.json();
    const manga: Manga = mangaData.data;

    const title = manga.attributes.title?.en || "No title available";
    const status = manga.attributes.status || "Unknown";
    const tags = manga.attributes.tags.map((tag) => tag.attributes.name.en);

    const coverRel = manga.relationships.find((rel) => rel.type === "cover_art");
    const coverUrl = coverRel
      ? `https://uploads.mangadex.org/covers/${id}/${coverRel.attributes.fileName}.256.jpg`
      : "https://via.placeholder.com/250x350";

    return (
      <div>
        <h1>{title}</h1>
        <Image src={coverUrl} alt={title} width={250} height={350} />
        <p>Status: {status}</p>
        <p>Tags: {tags.join(", ")}</p>
      </div>
    );
  } catch (error: any) { // Ép kiểu error là any
    return <p>Lỗi khi tải dữ liệu: {error.message}</p>;
  }
};

export default MangaDetail;
