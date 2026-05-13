import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nova-digital-tech",
  assetPrefix: "/nova-digital-tech/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
