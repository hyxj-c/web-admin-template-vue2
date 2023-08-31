const { defineConfig } = require('@vue/cli-service');
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 禁用eslint
  css: { // 配置浏览器显示css所在文件和所在行数
    sourceMap: true
  },
  configureWebpack: {
    // webpack5中移除了nodejs核心模块的polyfill自动引入，运行时提示需要path-browserify(实现了node.js路径模块)，这里手动引入
    resolve: {
      fallback: { path: require.resolve("path-browserify") },
    },
  },
  chainWebpack: config => {
    // 配置加载svg icon图标
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
});
