# vue-highlight-words

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
| activeIndex          | String              |           | Specify the match index that should be actively highlighted. Use along with `activeClassName`                                                                                                                                                                                                                                                                      |
| activeStyle          | Object              |           | The inline style to be applied to an active match. Use along with `activeIndex`                                                                                                                                                                                                                                                                                    |
| autoEscape           | Boolean             |           | Escape characters in `searchWords` which are meaningful in regular expressions                                                                                                                                                                                                                                                                                     |
| caseSensitive        | Boolean             |           | Search should be case sensitive; defaults to `false`                                                                                                                                                                                                                                                                                                               |
| findChunks           | Function            |           | Use a custom function to search for matching chunks. This makes it possible to use arbitrary logic when looking for matches. See the default `findChunks` function in [highlight-words-core](https://github.com/bvaughn/highlight-words-core) for signature. Have a look at the [custom findChunks example](https://codesandbox.io/s/k20x3ox31o) on how to use it. |
| highlightClassName   | String              |           | CSS class name applied to highlighted text                                                                                                                                                                                                                                                                                                                         |
| highlightStyle       | Object              |           | Inline styles applied to highlighted text                                                                                                                                                                                                                                                                                                                          |
| highlightTag         | String \| Component |           | Type of tag to wrap around highlighted matches; defaults to `mark` but can also be a component                                                                                                                                                                                                                                                                     |
| sanitize             | Function            |           | Process each search word and text to highlight before comparing (eg remove accents); signature `(text: string): string`                                                                                                                                                                                                                                            |
| searchWords          | Array<String>       |     ✓     | Array of search words. The search terms are treated as RegExps unless `autoEscape` is set.                                                                                                                                                                                                                                                                         |
| textToHighlight      | String              |     ✓     | Text to highlight matches in                                                                                                                                                                                                                                                                                                                                       |
| unhighlightClassName | String              |           | CSS class name applied to unhighlighted text                                                                                                                                                                                                                                                                                                                       |
| unhighlightStyle     | Object              |           | Inline styles applied to unhighlighted text                                                                                                                                                                                                                                                                                                                        |

## Custom highlight tag

You can custom the highlight tag by providing a compoent to the `highlightTag` prop. The component should have a `<slot>` for children, then either accept props:

| Props          | Type   | Description           |
| :------------- | :----- | :-------------------- |
| highlightIndex | Number | Index of matched text |

<details>
<summary>For example: </summary>

```diff
  <template>
    <div id="app">
      // attrs on component are applied to the wrapper `<span>`
      <Highlighter class="my-highlight" :style="{ color: 'red' }"
        highlightClassName="highlight"
+       :highlightTag="tag"
        :searchWords="keywords"
        :autoEscape="true"
        :textToHighlight="text"/>
    </div>
  </template>

  <script>
  import Highlighter from 'vue-highlight-words'

+ const Highlight = {
+   template: '<strong><slot></slot> ({{highlightIndex}}) </strong>',
+   props: ['highlightIndex']
+ }

  export default {
    name: 'app',
    components: {
      Highlighter
    },
    data() {
      return {
        text: 'The dog is chasing the cat. Or perhaps they\'re just playing?',
        words: 'and or the'，
+       tag: Highlight
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

or use scoped slot:

| Name    | Description                                    | DefaultContent |
| :------ | :--------------------------------------------- | :------------- |
| default | slot with prop `highlightIndex` and `children` | Matched text   |

<details>
<summary>Scoped slot example: </summary>

```diff
  <template>
    <div id="app">
      // attrs on component are applied to the wrapper `<span>`
      <Highlighter class="my-highlight" :style="{ color: 'red' }"
        highlightClassName="highlight"
+       :highlightTag="tag"
        :searchWords="keywords"
        :autoEscape="true"
-       :textToHighlight="text"/>
+       :textToHighlight="text">
+        <span slot-scope="{highlightIndex, children}">
+         {{children}} ({{highlightIndex}})
+       </span>
+     </Highlighter>
    </div>
  </template>

  <script>
  import Highlighter from 'vue-highlight-words'

+ const Highlight = {
+   template: '<strong><slot></slot></strong>',
+ }

  export default {
    name: 'app',
    components: {
      Highlighter
    },
    data() {
      return {
        text: 'The dog is chasing the cat. Or perhaps they\'re just playing?',
        words: 'and or the'，
+       tag: Highlight
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
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## License
MIT License - fork, modify and use however you want.
