const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'picsum.photos',
      'dnkwhodfjmev10929056.cdn.ntruss.com'
    ]
  },
  experimental: {
    forceSwcTransforms: true,
  }
};

module.exports = nextConfig;
