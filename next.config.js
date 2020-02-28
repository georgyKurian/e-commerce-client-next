const withCSS = require('@zeit/next-css');
const withPurgeCss = require('next-purgecss');

const isProd = process.env.NODE_ENV === 'production';

module.exports = withCSS(
  withPurgeCss({
    // Only enable PurgeCSS for client-side production builds
    purgeCssEnabled: ({ dev, isServer }) => !dev && !isServer,
    purgeCssPaths: [
      'src/**/*',
    ],
    purgeCss: {
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      whitelistPatternsChildren: [/carousel/, /html/],
    },
    poweredByHeader: false,
    distDir: 'dist',
    env: {
      isProd,
      REACT_APP_API_URL: isProd ? 'https://e-commerce-serve.herokuapp.com' : 'http://localhost:8085',
    },
  }),
);
