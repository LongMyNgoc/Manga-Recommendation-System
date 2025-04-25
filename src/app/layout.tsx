import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manga Recommendation System",
  description: "Khám phá thế giới manga thú vị với Manga Recommendation System! Hệ thống sử dụng Content-Based Filtering để gợi ý manga từ MangaDex dựa trên nội dung bạn quan tâm.",
  keywords: ["Manga", "Gợi ý manga", "MangaDex", "Manga Recommender", "Anime", "Truyện tranh", "Tìm kiếm manga"],
  icons: {
    icon: [
      { url: "/favicon-v2.png", sizes: "32x32", type: "image/png" },
    ],
  },
  metadataBase: new URL("https://your-domain.com"), // Thay bằng domain thật khi deploy
  authors: [{ name: "Nguyễn Phi Long", url: "https://github.com/LongMyNgoc" }],
  creator: "Nguyễn Phi Long",
  openGraph: {
    title: "Manga Recommendation System",
    description: "Khám phá thế giới manga thú vị với hệ thống gợi ý dựa trên nội dung từ MangaDex.",
    url: "https://manga-recommendation-system.vercel.app/", // cập nhật domain thật
    siteName: "Manga Recommendation System",
    images: [
      {
        url: "/favicon-v2.png", // ảnh preview khi share (1200x630 là tốt nhất)
        width: 1200,
        height: 630,
        alt: "Manga Recommendation System Preview",
      },
    ],
    locale: "en",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
