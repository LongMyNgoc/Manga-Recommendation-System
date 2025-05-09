import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploads.mangadex.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.mangadex.network', // chấp nhận subdomain như cmdxd98sb0x3yprd.mangadex.network
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
