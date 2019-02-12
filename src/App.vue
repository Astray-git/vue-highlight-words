<template>
  <div id="app">
    <h1>vue highlight words</h1>
    <div>
      <h3>Keywords:</h3>
      <input type="text" v-model="words" />
    </div>
    <div>
      <h3>Text:</h3>
      <textarea v-model="text" rows="5"></textarea>
    </div>
    <div class="output">
      <h3>Output:</h3>
      <h4>
        basic "&lt;i&gt;"
        <code>highlightTag</code>
      </h4>
      <HighlightWords
        class="wrapper"
        highlightClassName="highlight"
        highlightTag="i"
        :searchWords="keywords"
        :autoEscape="true"
        :textToHighlight="text"
      ></HighlightWords>
      <h4>
        component
        <code>highlightTag</code>
      </h4>
      <HighlightWords
        class="wrapper"
        highlightClassName="highlight"
        :highlightTag="strongProps"
        :searchWords="keywords"
        :autoEscape="true"
        :textToHighlight="text"
      ></HighlightWords>
      <h4>
        component
        <code>highlightTag</code> with scoped slot
      </h4>
      <HighlightWords
        class="wrapper"
        highlightClassName="highlight"
        :highlightTag="strongSlot"
        :searchWords="keywords"
        :autoEscape="true"
        :textToHighlight="text"
      >
        <span slot-scope="{ highlightIndex, children }">
          <small>[{{ highlightIndex }}]:</small>
          {{ children }}
        </span>
      </HighlightWords>
    </div>

    <a href="https://github.com/Astray-git/vue-highlight-words">
      <img
        style="position: absolute; top: 0; right: 0; border: 0;"
        src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
        alt="Fork me on GitHub"
      />
    </a>
  </div>
</template>

<script>
import HighlightWords from './components/HighlightWords'
import StrongProps from './components/StrongProps'
import StrongSlot from './components/StrongSlot'

export default {
  name: 'app',
  components: {
    HighlightWords
  },
  data() {
    return {
      text: 'The dog is chasing the cat. Or perhaps they are just playing?',
      words: 'and or the',
      strongProps: StrongProps,
      strongSlot: StrongSlot
    }
  },
  computed: {
    keywords() {
      return this.words.split(' ')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding-bottom: 60px;
}
.highlight {
  background-color: #79d2a6;
  padding: 0 2px;
}
input {
  height: 30px;
  line-height: 30px;
}
input,
textarea {
  width: 400px;
  font-size: 14px;
}
.output {
  width: 600px;
  margin: auto;
}
</style>
