module.exports = {
  baseUrl:
    process.env.NODE_ENV === 'production' ? '/vue-highlight-words/' : '/',
  // https://cli.vuejs.org/guide/build-targets.html#vue-vs-js-ts-entry-files
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}
