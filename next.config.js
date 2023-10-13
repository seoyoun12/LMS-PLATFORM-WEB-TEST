const path = require('path');
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'picsum.photos',
      'dnkwhodfjmev10929056.cdn.ntruss.com',
      'cn-lms-storage.cdn.gov-ntruss.com',
      'kr.object.gov-ncloudstorage.com',
      'img.youtube.com',
      'www.youtube.com'
    ],
  },
  experimental: {
    forceSwcTransforms: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  generateEtags: false,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = withTM(nextConfig);
