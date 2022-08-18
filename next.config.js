const path = require("path");
const removeImports = require("next-remove-imports")();

/** @type {import('next').NextConfig} */
const nextConfig = removeImports({
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  optimizeFonts: false,
  reactStrictMode: true,
  sassOptions: {
    additionalData: async (content, { resourcePath }) => {
      if (resourcePath.includes("node_modules")) {
        return content;
      }

      if (resourcePath.endsWith("mq-settings.scss")) {
        return process.env.NODE_ENV === "production" ? "" : content;
      }

      return "@use 'styles/mq' as mq;" + content;
    },
    includePaths: [path.join(__dirname, "src/styles")],
  },
  swcMinify: true,
});

module.exports = nextConfig;
