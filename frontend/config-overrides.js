/* config-overrides.js */
/* eslint-disable react-hooks/rules-of-hooks */
const { useBabelRc, override, addWebpackAlias, addWebpackResolve } = require('customize-cra');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    ['@']: path.resolve(__dirname, 'src')
  }),
  addWebpackResolve({
    fallback: {
      fs: false,
      //tls: false,
      //net: false,
      //assert: require.resolve('assert'),
      //buffer: require.resolve('buffer'),
      //console: require.resolve('console-browserify'),
      //constants: require.resolve('constants-browserify'),
      //crypto: require.resolve('crypto-browserify'),
      //domain: require.resolve('domain-browser'),
      //events: require.resolve('events'),
      //http: require.resolve('stream-http'),
      //https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      //punycode: require.resolve('punycode'),
      //process: require.resolve('process/browser'),
      //querystring: require.resolve('querystring-es3'),
      //stream: require.resolve('stream-browserify'),
      //string_decoder: require.resolve('string_decoder'),
      //sys: require.resolve('util'),
      //timers: require.resolve('timers-browserify'),
      //tty: require.resolve('tty-browserify'),
      //url: require.resolve('url'),
      //util: require.resolve('util'),
      //vm: require.resolve('vm-browserify'),
      //zlib: require.resolve('browserify-zlib'),
    }
  })
);