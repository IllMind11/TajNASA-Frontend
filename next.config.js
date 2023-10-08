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
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
        port: '',
        pathname: '/apod/**',
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
