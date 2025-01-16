import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.churchofjesuschrist.org',
        port: '',
        pathname: '/imgs/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
