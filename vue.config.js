// vue.config.js
module.exports = {
  publicPath: './', // 关键点：使用相对路径
  assetsDir: 'static', // 可选：指定静态资源目录
  productionSourceMap: false, // 生产环境不生成source map
}