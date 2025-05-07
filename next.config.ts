import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "u9a6wmr3as.ufs.sh" },
      { hostname: "drive.google.com" },
      { hostname: "cerg-food.s3.us-east-2.amazonaws.com" },
    ],
  },
};

export default nextConfig;
