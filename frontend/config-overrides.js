/* config-overrides.js */
/* eslint-disable react-hooks/rules-of-hooks */
const { useBabelRc, override, addWebpackAlias } = require('customize-cra');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    ['@']: path.resolve(__dirname, 'src')
  })
);