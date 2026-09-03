/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://axentracargo.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://axentracargo.com/sitemap.xml',
  },
  changefreq: 'monthly',
  priority: 0.7,
  sitemapSize: 5000,
  trailingSlash: true,
};