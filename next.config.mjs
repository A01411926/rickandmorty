import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      "@lib": path.resolve(process.cwd(), "lib"),
    };

    return config;
  },
};

export default nextConfig;
