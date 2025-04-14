"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useMangaDetail } from "./useMangaDetail";
import MangaCard from "../MangaCard/MangaCard"; // Nhập MangaCard

const MangaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { manga, error } = useMangaDetail(id || "");

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!manga) return <p className="text-center">Loading...</p>;

  return (
    <div className="w-full min-h-screen p-6 space-y-8 bg-gray-100">
      {/* Tiêu đề + Ảnh bìa + Tags */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow-md w-full">
        <Image
          src={manga.coverUrl}
          alt={manga.title}
          width={280}
          height={400}
          className="rounded-lg shadow-lg"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900">{manga.title}</h1>
          <p className="text-gray-700 mt-2">{manga.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {manga.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Thông tin Manga (Chia 4 cột) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {[ 
          { label: "Status", value: manga.status },
          { label: "Year", value: manga.year },
          { label: "Author", value: manga.author },
          { label: "Artist", value: manga.artist },
          { label: "Publication Demographic", value: manga.publicationDemographic },
          { label: "Original Language", value: manga.originalLanguage },
          { label: "Created At", value: manga.createdAt },
          { label: "Updated At", value: manga.updatedAt },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-100 to-gray-50 p-4 rounded-lg shadow-md border-l-4 border-blue-500 w-full"
          >
            <h3 className="text-gray-700 font-semibold text-lg">{item.label}:</h3>
            <p className="text-gray-600 mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* External Links */}
      {manga.externalLinks.length > 0 && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
          <h3 className="text-gray-700 font-semibold">External Links:</h3>
          <ul className="space-y-2 mt-2">
            {manga.externalLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Manga Tương Đồng */}
      {manga.similar.length > 0 && (
        <div className="w-full px-6 py-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Manga Tương Đồng
          </h2>

          {/* Container cho Manga Tương Đồng */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 justify-items-center">
              {manga.similar.map((similarManga) => (
                <MangaCard
                  key={similarManga.id}
                  id={similarManga.id}
                  title={similarManga.title}
                  status={similarManga.status}
                  tags={similarManga.tags}
                  coverUrl={similarManga.coverUrl}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaDetail;
