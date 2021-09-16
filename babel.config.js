module.exports = process.env.BUILD_LIB
  ? {
      presets: [['@babel/env', { modules: false, useBuiltIns: false }]],
      plugins: ['@babel/proposal-object-rest-spread'],
    }
  : {
      presets: [['@vue/app']],
    }
