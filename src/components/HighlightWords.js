import { findAll } from 'highlight-words-core'

export default {
  functional: true,
  props: {
    activeClassName: String,
    activeIndex: Number,
    activeStyle: Object,
    autoEscape: Boolean,
    findChunks: Function,
    highlightClassName: String,
    highlightStyle: Object,
    highlightTag: [Node, Function, String],
    sanitize: Function,
    searchWords: {
      type: Array, // Array<string>
      validator(value) {
        return value.every(word => typeof word === 'string')
      },
      required: true
    },
    textToHighlight: {
      type: String,
      required: true
    },
    unhighlightClassName: String,
    unhighlightStyle: Object
  },
  render(h, context) {
    const {
      activeClassName = '',
      activeIndex = -1,
      activeStyle,
      autoEscape,
      caseSensitive = false,
      findChunks,
      highlightClassName = '',
      highlightStyle = {},
      highlightTag = 'mark',
      sanitize,
      searchWords,
      textToHighlight,
      unhighlightClassName = '',
      unhighlightStyle
    } = context.props

    const contextData = context.data

    const chunks = findAll({
      autoEscape,
      caseSensitive,
      findChunks,
      sanitize,
      searchWords,
      textToHighlight
    })

    const HighlightTag = highlightTag
    let highlightCount = -1
    let highlightClassNames = ''
    let highlightStyles

    return (
      <span {...contextData}>
        {chunks.map((chunk, index) => {
          const text = textToHighlight.substr(
            chunk.start,
            chunk.end - chunk.start
          )

          if (chunk.highlight) {
            highlightCount++

            const isActive = highlightCount === +activeIndex

            highlightClassNames = `${highlightClassName} ${
              isActive ? activeClassName : ''
            }`
            highlightStyles =
              isActive === true && activeStyle != null
                ? Object.assign({}, highlightStyle, activeStyle)
                : highlightStyle

            return (
              <HighlightTag
                class={highlightClassNames}
                key={index}
                style={highlightStyles}
              >
                {text}
              </HighlightTag>
            )
          } else {
            return (
              <span
                class={unhighlightClassName}
                key={index}
                style={unhighlightStyle}
              >
                {text}
              </span>
            )
          }
        })}
      </span>
    )
  }
}
