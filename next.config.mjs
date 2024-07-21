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
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.weatherapi.com',
            port: '',
            pathname: '/**',
          }
        ],
      },
    reactStrictMode: false,
    typescript: {
      ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/sign-in',
          permanent: true, // This indicates a 301 permanent redirect
        },
      ];
    },
};

export default nextConfig;
