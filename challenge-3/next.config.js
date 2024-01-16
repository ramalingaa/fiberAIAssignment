/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Replace child_process with an empty module on the client
      config.resolve.fallback = { ...config.resolve.fallback, child_process: false };
    }
    return config;
  },
};