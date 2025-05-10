// pages/chapter/[id].tsx

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useFetchChapterImages from "@/hooks/useFetchChapterImages";
import ChapterNavigation from "@/components/MangaChapter/ChapterNavigation";
import BackButton from "@/components/common/BackButton";
import { Loading } from "@/components/common/Loading";

interface Chapter {
    id: string;
    chapter: string;
    title: string;
    volume: string;
    createdAt: string;
}

const ChapterPage = () => {
    const { id } = useParams<{ id: string }>();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const { images, loading, error } = useFetchChapterImages(id);
    const [selectedChapter, setSelectedChapter] = useState(id);
    const [selectedMangaId, setSelectedMangaId] = useState<string | null>(null);
    const router = useRouter();  // Hook điều hướng

    useEffect(() => {
        const savedChapters = localStorage.getItem("chaptersList");
        const savedMangaId = localStorage.getItem("selectedMangaId");
        if (savedChapters) {
            setChapters(JSON.parse(savedChapters));
        }
        if (savedMangaId) {
            setSelectedMangaId(savedMangaId);
        }
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Hàm xử lý thay đổi chapter từ dropdown và điều hướng
    const handleChapterChange = (newChapterId: string) => {
        setSelectedChapter(newChapterId);
        // Cập nhật URL và điều hướng đến chapter mới
        router.push(`/chapter/${newChapterId}`);
    };

    return (
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
            {selectedMangaId && (
                <div className="mb-4">
                    <BackButton to={`/manga/${selectedMangaId}`} label="Quay lại trang Manga" />
                </div>
            )}


            <ChapterNavigation
                chapters={chapters}
                currentChapterId={selectedChapter}
                onChapterChange={handleChapterChange}
            />
            {/* Hiển thị các ảnh của chapter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {images.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                        <img
                            src={image}
                            alt={`Chapter ${id} - Page ${index + 1}`}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Sử dụng component ChapterNavigation */}
            <ChapterNavigation
                chapters={chapters}
                currentChapterId={selectedChapter}
                onChapterChange={handleChapterChange}
            />
        </div>
    );
};

export default ChapterPage;
