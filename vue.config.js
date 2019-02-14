const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/vue-highlight-words/' : '/',
  pages: {
    index: {
      entry: 'demo/main.js'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue-highlight-words': resolve('/src/index.js')
      }
    }
  }
}
