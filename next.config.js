/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['three'],
  images: {
    domains: ['i.imgur.com', 'play-lh.googleusercontent.com'],
},
}

module.exports = nextConfig
