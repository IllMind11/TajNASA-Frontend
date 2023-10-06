/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'projecthub.arasd.com',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },

  experimental: {
    logging: {
      level: 'verbose',
    },
  },
};

module.exports = nextConfig;
