import { h } from 'vue'
import { findAll } from 'highlight-words-core'

const VueHighlightWords = (props, context) => {
  const chunks = findAll({
    autoEscape: props.autoEscape,
    caseSensitive: props.caseSensitive,
    findChunks: props.findChunks,
    sanitize: props.sanitize,
    searchWords: props.searchWords,
    textToHighlight: props.textToHighlight,
  })

  if (props.custom) {
    const slots = context.slots
    const textArr = getTextChildren(props, chunks, (chunk, text, attrs) => {
      return {
        chunk,
        text,
        attrs,
      }
    })
    return slots.default && slots.default(textArr)
  }
  return h(
    'span',
    { ...context.attrs },
    getTextChildren(props, chunks, (chunk, text, attrs) => {
      if (!chunk.highlight) {
        return text
      }
      return h('mark', attrs, [text])
    })
  )
}

const EMPTY_STYLE = {}

function getTextChildren(props, chunks, callbackFn) {
  let highlightCount = -1
  let highlightClassNames = ''
  let highlightStyles = {}
  const {
    textToHighlight,
    highlightClassName,
    highlightStyle = EMPTY_STYLE,
    activeIndex,
    activeClassName,
    activeStyle = EMPTY_STYLE,
  } = props

  return chunks.map((chunk, index) => {
    const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start)
    if (!chunk.highlight) {
      return callbackFn(chunk, text)
    } else {
      highlightCount++ // start at 0

      const isActive = highlightCount === +(activeIndex || -1)

      highlightClassNames = `${highlightClassName} ${
        isActive ? activeClassName : ''
      }`
      highlightStyles =
        isActive === true && activeStyle != null
          ? { ...highlightStyle, ...activeStyle }
          : highlightStyle

      const attrs = {
        class: highlightClassNames,
        key: index,
        style: highlightStyles,
        highlightIndex: highlightCount,
      }
      return callbackFn(chunk, text, attrs)
    }
  })
}

VueHighlightWords.props = {
  activeClassName: String,
  activeIndex: Number,
  activeStyle: Object,
  autoEscape: Boolean,
  caseSensitive: {
    type: Boolean,
    defualt: false,
  },
  findChunks: Function,
  custom: {
    type: Boolean,
    default: false,
  },
  highlightClassName: String,
  highlightStyle: Object,
  sanitize: Function,
  searchWords: {
    type: Array, // Array<string>
    validator(value) {
      return value.every((word) => typeof word === 'string')
    },
    required: true,
  },
  textToHighlight: {
    type: String,
    required: true,
  },
}

export default VueHighlightWords
