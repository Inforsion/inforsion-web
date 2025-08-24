import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Deployment-Source",
            value: "auto-fork-workflow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
