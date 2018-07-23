# vue-highlight-words

> A simple port from [`react-highlight-words`](https://github.com/bvaughn/react-highlight-words)
>
> Vue component to highlight words within a larger body of text.

[demo](https://astray-git.github.io/vue-highlight-words/)

## Usage

To use it, just provide it with an array of search terms and a body of text to highlight.

```html
<template>
  <div id="app">
    <Highlighter highlightClassName="highlight"
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

| Property             | Type          | Required? | Description                                                                                                                                                                                                                                                                                                                                                        |
| :------------------- | :------------ | :-------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| activeClassName      | String        |           | The class name to be applied to an active match. Use along with `activeIndex`                                                                                                                                                                                                                                                                                      |
| activeIndex          | String        |           | Specify the match index that should be actively highlighted. Use along with `activeClassName`                                                                                                                                                                                                                                                                      |
| activeStyle          | Object        |           | The inline style to be applied to an active match. Use along with `activeIndex`                                                                                                                                                                                                                                                                                    |
| autoEscape           | Boolean       |           | Escape characters in `searchWords` which are meaningful in regular expressions                                                                                                                                                                                                                                                                                     |
| className            | String        |           | CSS class name applied to the outer/wrapper `<span>`                                                                                                                                                                                                                                                                                                               |
| caseSensitive        | Boolean       |           | Search should be case sensitive; defaults to `false`                                                                                                                                                                                                                                                                                                               |
| findChunks           | Function      |           | Use a custom function to search for matching chunks. This makes it possible to use arbitrary logic when looking for matches. See the default `findChunks` function in [highlight-words-core](https://github.com/bvaughn/highlight-words-core) for signature. Have a look at the [custom findChunks example](https://codesandbox.io/s/k20x3ox31o) on how to use it. |
| highlightClassName   | String        |           | CSS class name applied to highlighted text                                                                                                                                                                                                                                                                                                                         |
| highlightStyle       | Object        |           | Inline styles applied to highlighted text                                                                                                                                                                                                                                                                                                                          |
| highlightTag         | Node          |           | Type of tag to wrap around highlighted matches; defaults to `mark` but can also be a React element (class or functional)                                                                                                                                                                                                                                           |
| sanitize             | Function      |           | Process each search word and text to highlight before comparing (eg remove accents); signature `(text: string): string`                                                                                                                                                                                                                                            |
| searchWords          | Array<String> | ✓         | Array of search words. The search terms are treated as RegExps unless `autoEscape` is set.                                                                                                                                                                                                                                                                         |
| textToHighlight      | String        | ✓         | Text to highlight matches in                                                                                                                                                                                                                                                                                                                                       |
| unhighlightClassName | String        |           | CSS class name applied to unhighlighted text                                                                                                                                                                                                                                                                                                                       |
| unhighlightStyle     | Object        |           | Inline styles applied to unhighlighted text                                                                                                                                                                                                                                                                                                                        |


## Installation

```
npm i --save vue-highlight-words
```

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
