const withCSS = require('@zeit/next-css');
const withPurgeCss = require('next-purgecss');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  poweredByHeader: false,
  distDir: 'dist',
}
