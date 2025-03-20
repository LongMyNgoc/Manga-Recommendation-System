"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useMangaDetail } from "./useMangaDetail";

const MangaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { manga, error } = useMangaDetail(id || "");

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
