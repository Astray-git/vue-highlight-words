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
  // https://cli.vuejs.org/guide/build-targets.html#vue-vs-js-ts-entry-files
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
    resolve: {
      alias: {
        'vue-highlight-words': resolve('/src/index.js')
      }
    }
  }
}
