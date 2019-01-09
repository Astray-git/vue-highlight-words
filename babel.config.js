module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: process.env['BUILD_LIB'] ? false : 'usage'
      }
    ]
  ]
}
