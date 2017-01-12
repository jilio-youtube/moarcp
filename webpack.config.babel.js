const {
  addPlugins, createConfig, defineConstants, entryPoint, env, performance, setOutput, sourceMaps, webpack
} = require('@webpack-blocks/webpack2')

const babel = require('@webpack-blocks/babel6')
const cssModules = require('@webpack-blocks/css-modules')
const extractText = require('@webpack-blocks/extract-text2')
const plugins = require('./webpack.plugins')
const sass = require('@webpack-blocks/sass')

module.exports = createConfig([
  setOutput('./build/bundle.js'),
  () => ({ target: 'node' }),
  babel(),
  sass(/* node-sass options */),
  cssModules(),
  addPlugins(plugins.basePlugins),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV || 'production'
  }),
  env('production', [
    entryPoint('./src/index.js'),
    extractText(),
    addPlugins(plugins.productionPlugins)
  ])
])
