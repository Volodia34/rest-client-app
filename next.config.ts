import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/restClient/:path*',
        destination: '/restClient',
      },
    ];
  },
};

export default nextConfig;
