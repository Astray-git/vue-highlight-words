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
      <h4>default</h4>
      <HighlightWords
        class="wrapper"
        highlightClassName="highlight"
        highlightTag="i"
        :searchWords="keywords"
        :autoEscape="true"
        :textToHighlight="text"
      />

      <h4>custom render with slot</h4>
      <HighlightWords
        highlightClassName="highlight"
        :searchWords="keywords"
        :autoEscape="true"
        :textToHighlight="text"
        custom
        v-slot="items"
      >
        <span>
          <template v-for="{ chunk, text, attrs } in items">
            <StrongProps
              v-if="chunk.highlight"
              v-bind="attrs"
              :key="attrs.key"
              >{{ text }}</StrongProps
            >
            <template v-else>{{ text }}</template>
          </template>
        </span>
      </HighlightWords>

      <p>
        <a
          href="https://github.com/Astray-git/vue-highlight-words/blob/1.0/demo/App.vue"
          >View demo code</a
        >
      </p>
    </div>

    <a href="https://github.com/Astray-git/vue-highlight-words">
      <img
        style="position: absolute; top: 0; right: 0; border: 0"
        src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
        alt="Fork me on GitHub"
      />
    </a>
  </div>
</template>

<script>
import HighlightWords from 'vue-highlight-words'
import StrongProps from './components/StrongProps'

export default {
  name: 'app',
  components: {
    HighlightWords,
    StrongProps,
  },
  data() {
    return {
      text: 'The dog is chasing the cat. Or perhaps they are just playing?',
      words: 'and or the',
    }
  },
  computed: {
    keywords() {
      return this.words.split(' ')
    },
  },
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
