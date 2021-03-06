const { version } = require('../package.json')
const path = require('path')
module.exports = {
  input: {
    input: path.join(__dirname, '../src/index.js')
  },
  output: {
    banner: require('./banner.js')(version),
    // dir: path.join(__dirname, '../dist'),
    exports: 'named',
    file: '', // set in ./scripts/build
    format: '', // set in ./scripts/build
    name: '' // "
  }
}
