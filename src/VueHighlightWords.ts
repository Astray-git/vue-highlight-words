import type { Chunk, FindChunksArgs } from 'highlight-words-core'
import { findAll } from 'highlight-words-core'
import type {
  AllowedComponentProps,
  ComponentCustomProps,
  SetupContext,
  VNode,
  VNodeProps,
} from 'vue'
import { h } from 'vue'

export interface VueHighlightWordsProps {
  activeClassName?: string
  activeIndex?: number
  activeStyle?: Partial<CSSStyleDeclaration>
  autoEscape?: boolean
  caseSensitive?: boolean
  findChunks?: (args: FindChunksArgs) => Chunk[]
  custom?: boolean
  highlightClassName?: string
  highlightStyle?: Partial<CSSStyleDeclaration>
  sanitize?: (text: string) => string
  searchWords: string[]
  textToHighlight: string
}

export interface TextChunk {
  chunk: Chunk
  text: string
  attrs?: {
    class: string
    key: number
    highlightIndex: number
    style: Partial<CSSStyleDeclaration>
  }
}

const VueHighlightWordsImpl = (
  props: Readonly<VueHighlightWordsProps>,
  context: Omit<SetupContext, 'expose'>
) => {
  const chunks = findAll({
    autoEscape: props.autoEscape,
    caseSensitive: props.caseSensitive,
    findChunks: props.findChunks,
    sanitize: props.sanitize,
    searchWords: props.searchWords,
    textToHighlight: props.textToHighlight,
  })

  const children = getTextChildren(props, chunks)

  const slots = context.slots
  if (slots.default) {
    return slots.default && slots.default(children)
  }

  return h(
    'span',
    { ...context.attrs },
    children.map(({ chunk, text, attrs }) => {
      if (!chunk.highlight) {
        return text
      }
      return h('mark', attrs, [text])
    })
  )
}

const EMPTY_STYLE = {}

function getTextChildren(props: VueHighlightWordsProps, chunks: Chunk[]) {
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
      return { chunk, text }
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
      return { chunk, text, attrs }
    }
  })
}

VueHighlightWordsImpl.props = {
  activeClassName: String,
  activeIndex: Number,
  activeStyle: Object,
  autoEscape: Boolean,
  caseSensitive: {
    type: Boolean,
    default: false,
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
    type: Array, // string[]
    validator(value: string[]) {
      return value.every((word) => typeof word === 'string')
    },
    required: true,
  },
  textToHighlight: {
    type: String,
    required: true,
  },
}

export const VueHighlightWords = VueHighlightWordsImpl as unknown as {
  new (): {
    $props: AllowedComponentProps &
      ComponentCustomProps &
      VNodeProps &
      VueHighlightWordsProps

    $slots: {
      default: (arg: TextChunk[]) => VNode[]
    }
  }
}
