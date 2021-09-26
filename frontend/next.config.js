module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    // To fix redoc issue
    if (config.resolve.fallback) {
      config.resolve.fallback.fs = false;
    }

    return config;
  }
}
