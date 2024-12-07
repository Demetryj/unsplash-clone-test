import path from 'path';

/** @type {import('next').NextConfig} */

// Sass compiler settings

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src', 'sass')],
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
