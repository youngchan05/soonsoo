import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // ⛔ 빌드에서 타입 에러 무시
    ignoreBuildErrors: true,
  },
  eslint: {
    // 빌드 시 ESLint 무시
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

module.exports = nextConfig;
