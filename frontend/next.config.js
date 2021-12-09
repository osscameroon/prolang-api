const pkg = require('./package.json');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  webpack: (config, options) => {
    // Fix redoc issue
    if (config.resolve.fallback) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  experimental: { esmExternals: false },
  // Prevent random BUILD_ID
  generateBuildId: () => pkg.version,
});
