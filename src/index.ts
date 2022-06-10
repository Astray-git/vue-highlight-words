import type { App } from 'vue'
import { VueHighlightWords } from './VueHighlightWords'
import type { VueHighlightWordsProps, TextChunk } from './VueHighlightWords'

function install(app: App, options = { name: '' }) {
  app.component(options.name || 'VueHighlightWords', VueHighlightWords)
}

export default VueHighlightWords
export { install, VueHighlightWords, VueHighlightWordsProps, TextChunk }
