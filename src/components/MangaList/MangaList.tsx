"use client";

import React from "react";
import useFetchMangas from "./useFetchMangas"; // Import hook
import MangaCard from "../MangaCard/MangaCard";

const MangaList: React.FC = () => {
  const { mangas, loading, error } = useFetchMangas();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Manga List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {mangas.map((manga) => (
          <MangaCard key={manga.id} {...manga} />
        ))}
      </div>
    </div>
  );
};

export default MangaList;
