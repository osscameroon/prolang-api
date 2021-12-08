const pkg = require('./package.json');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // put the rest of config here
  reactStrictMode: true,
  webpack: (config, options) => {
    // To fix redoc issue
    if (config.resolve.fallback) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  // avoid random BUILD_ID
  generateBuildId: () => pkg.version,
});

/*module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    // To fix redoc issue
    if (config.resolve.fallback) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  // avoid random BUILD_ID
  generateBuildId: () => pkg.version,
}*/
