const path = require('path');
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
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
      'dnkwhodfjmev10929056.cdn.ntruss.com'
    ]
  },
  experimental: {
    forceSwcTransforms: true,
  }
};

module.exports = withTM(nextConfig)
