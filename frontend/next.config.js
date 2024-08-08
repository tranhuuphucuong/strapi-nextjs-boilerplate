/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './image-loader.ts',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

module.exports = nextConfig;
