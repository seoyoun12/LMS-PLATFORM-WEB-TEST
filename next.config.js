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
    domains: ['picsum.photos', 'dnkwhodfjmev10929056.cdn.ntruss.com'],
  },
  experimental: {
    forceSwcTransforms: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
            {
              loader: 'babel-loader',
            },
        ],
        // Exclude the untransformed packages from the exclude rule here
        exclude: /node_modules\/(\@[a-ln-z0-9][a-z0-9\-._]+|[a-z0-9\-._]+)/,
        // exclude: /node_modules/,
      },
    ],
  }
};

module.exports = withTM(nextConfig);
