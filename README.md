# vue-highlight-words

:information_source: This is the branch for vue-highlight-words 2 (For Vue 3). If you are looking for Vue 2.0 support, [please check out `1.0` branch](https://github.com/Astray-git/vue-highlight-words/tree/1.0)

> A simple port from [`react-highlight-words`](https://github.com/bvaughn/react-highlight-words)
>
> Vue component to highlight words within a larger body of text.

[demo](https://astray-git.github.io/vue-highlight-words/)

## Why?

It uses `render` to handle the highlighted text instead of using `v-html` or `el.innerHtml`.

## Installation

```
npm i --save vue-highlight-words
```

## Usage

To use it, just provide it with an array of search terms and a body of text to highlight.

```html
<template>
  <div id="app">
    // attrs on component are applied to the wrapper `<span>`
    <Highlighter class="my-highlight" :style="{ color: 'red' }"
      highlightClassName="highlight"
      :searchWords="keywords"
      :autoEscape="true"
      :textToHighlight="text"/>
  </div>
</template>

<script>
import Highlighter from 'vue-highlight-words'

export default {
  name: 'app',
  components: {
    Highlighter
  },
  data() {
    return {
      text: 'The dog is chasing the cat. Or perhaps they\'re just playing?',
      words: 'and or the'
    }
  },
  computed: {
    keywords() {
      return this.words.split(' ')
    }
  }
}
</script>
```

And the `Highlighter` will mark all occurrences of search terms within the text:

<img width="368" alt="screen shot 2015-12-19 at 8 23 43 am" src="https://cloud.githubusercontent.com/assets/29597/11914033/e3c319f6-a629-11e5-896d-1a5ce22c9ea2.png">

## Props

| Property             | Type                | Required? | Description                                                                                                                                                                                                                                                                                                                                                        |
| :------------------- | :------------------ | :-------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| activeClassName      | String              |           | The class name to be applied to an active match. Use along with `activeIndex`                                                                                                                                                                                                                                                                                      |
| activeIndex          | Number              |           | Specify the match index that should be actively highlighted. Use along with `activeClassName`                                                                                                                                                                                                                                                                      |
| activeStyle          | Object              |           | The inline style to be applied to an active match. Use along with `activeIndex`                                                                                                                                                                                                                                                                                    |
| autoEscape           | Boolean             |           | Escape characters in `searchWords` which are meaningful in regular expressions                                                                                                                                                                                                                                                                                     |
| caseSensitive        | Boolean             |           | Search should be case sensitive; defaults to `false`                                                                                                                                                                                                                                                                                                               |
| findChunks           | Function            |           | Use a custom function to search for matching chunks. This makes it possible to use arbitrary logic when looking for matches. See the default `findChunks` function in [highlight-words-core](https://github.com/bvaughn/highlight-words-core) for signature. Have a look at the [custom findChunks example](https://codesandbox.io/s/k20x3ox31o) on how to use it. |
| highlightClassName   | String              |           | CSS class name applied to highlighted text                                                                                                                                                                                                                                                                                                                         |
| highlightStyle       | Object              |           | Inline styles applied to highlighted text                                                                                                                                                                                                                                                                                                                          |
| sanitize             | Function            |           | Process each search word and text to highlight before comparing (eg remove accents); signature `(text: string): string`                                                                                                                                                                                                                                            |
| searchWords          | Array<String>       |     ✓     | Array of search words. The search terms are treated as RegExps unless `autoEscape` is set.                                                                                                                                                                                                                                                                         |
| textToHighlight      | String              |     ✓     | Text to highlight matches in                                                                                                                                                                                                                                                                                                                                       |

## Custom render with v-slot

Use a default slot with `v-slot` props

```ts
type SlotProps = HighlighterItem[]

type HighlighterItem = {
  text: string // chunk of text to render
  attrs: HighlightAttrs
  chunk: Chunk
}

type HighlightAttrs = {
  class: string // class for highlight tag: highlightClassNames
  key: number // index of the chunk
  style: Partial<CSSStyleDeclaration> // highlightStyles
  highlightIndex: number // index of highlight tag
}

type Chunk = {
  start: number
  end: number
  highlight: boolean
}
```

<details>
<summary>For example: </summary>

```diff
  <template>
    <div id="app">
      // attrs on component are applied to the wrapper `<span>`
      <Highlighter class="my-highlight" :style="{ color: 'red' }"
        highlightClassName="highlight"
        :searchWords="keywords"
        :autoEscape="true"
-       :textToHighlight="text"/>
+       :textToHighlight="text"
+       v-slot="items">
+       <div>
+         <span v-for="{chunk, text, attrs} in items" :key="attrs.key"
+           :class="{chunk.highlight: 'highlight' : ''}"
+         >{{text}}</span>
+       </div>
+     </Highlighter>
    </div>
  </template>

  <script>
  import Highlighter from 'vue-highlight-words'

  export default {
    name: 'app',
    components: {
      Highlighter
    },
    data() {
      return {
        text: 'The dog is chasing the cat. Or perhaps they\'re just playing?',
        words: 'and or the'，
      }
    },
    computed: {
      keywords() {
        return this.words.split(' ')
      }
    }
  }
  </script>
```

</details>

## Project setup

```
pnpm install
```

### Compiles and hot-reloads for development

```
pnpm dev
```

### Compiles and minifies for production

```
pnpm build
```

### Lints and fixes files

```
pnpm lint
```

## License
MIT License - fork, modify and use however you want.
