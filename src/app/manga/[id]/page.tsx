interface PageProps {
  params: { id: string };
}

const MangaDetail: React.FC<PageProps> = async ({ params }) => {
  const { id } = await params;

  try {
    const response = await fetch(`https://api.mangadex.org/manga/${id}?includes[]=cover_art`, {
      cache: "no-store", // Đảm bảo luôn lấy dữ liệu mới nhất
    });

    if (!response.ok) {
      throw new Error("Failed to fetch manga details");
    }

    const mangaData = await response.json();
    const manga = mangaData.data;

    const title = manga.attributes.title?.en || "No title available";
    const status = manga.attributes.status || "Unknown";
    const tags = manga.attributes.tags.map((tag: any) => tag.attributes.name.en);

    const coverRel = manga.relationships.find((rel: any) => rel.type === "cover_art");
    const coverUrl = coverRel
      ? `https://uploads.mangadex.org/covers/${id}/${coverRel.attributes.fileName}.256.jpg`
      : "https://via.placeholder.com/250x350";

    return (
      <div>
        <h1>{title}</h1>
        <img src={coverUrl} alt={title} width="250" height="350" />
        <p>Status: {status}</p>
        <p>Tags: {tags.join(", ")}</p>
      </div>
    );
  } catch (error) {
    return <p>Lỗi khi tải dữ liệu:</p>;
  }
};

export default MangaDetail;
