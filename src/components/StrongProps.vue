<template>
  <strong>
    <small>[{{ highlightIndex }}]:</small>
    <slot></slot>
  </strong>
</template>

<script>
export default {
  props: ['highlightIndex']
}
</script>
