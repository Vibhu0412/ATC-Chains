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
    domains: ["192.168.0.61"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
