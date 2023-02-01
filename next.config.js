/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["Poppins"] } },
    ],
  },
  appDir: false,
  images: {
    domains: ["43.205.80.109"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
