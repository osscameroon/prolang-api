const SITE_URL = process.env.NEXT_PUBLIC_APP_URL;

module.exports = {
  exclude: ['/login', '/dashboard', '/profile', '/settings', '/authors*', '/users*', '/languages*'],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_URL}/sitemap.xml`],
    policies: [
      {
        disallow: '/login',
        userAgent: '*'
      },
      {
        allow: '/',
        userAgent: '*'
      },
    ],
  },
  siteUrl: SITE_URL,
};
