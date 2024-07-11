/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'fastly.4sqi.net',
            port: '',
            pathname: '/**',
          },
        ],
      },
    reactStrictMode: false,
};

export default nextConfig;
