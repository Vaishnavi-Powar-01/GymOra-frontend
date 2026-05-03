/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gymora-backend.onrender.com',
        port: '5000',
        pathname: '/api/uploads/**',
      },
      // Add this when you deploy to production
      // {
      //   protocol: 'https',
      //   hostname: 'your-production-domain.com',
      //   pathname: '/api/uploads/**',
      // },
    ],
  },
};

export default nextConfig;