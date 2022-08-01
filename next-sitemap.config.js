/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://www.nbhyakuhati.com/",
  generateRobotsTxt: true,
};

module.exports = config;
