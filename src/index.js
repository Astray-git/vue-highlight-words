import VueHighlightWords from './VueHighlightWords'

function install(app, options = {}) {
  app.component(options.name || 'VueHighlightWords', VueHighlightWords)
}

export default VueHighlightWords
export { install, VueHighlightWords }
