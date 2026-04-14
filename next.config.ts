import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_PAGES === 'true' ? '/Ulstein-Compliance-Calculator' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.skipsrevyen.no',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ulstein.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'f.nordiskemedier.dk',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.starcompliance.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
