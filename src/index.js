import VueHighlightWords from './VueHighlightWords'

function install(Vue, options = {}) {
  Vue.component(options.name || 'VueHighlightWords', VueHighlightWords)
}

if (process.env.ROLLUP_BUILD_MODE === 'umd') {
  let GlobalVue = null
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue
  }
  if (GlobalVue) {
    GlobalVue.use({ install })
  }
}

export default VueHighlightWords
export { install, VueHighlightWords }
