<template>
  <div>
    page2Test
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {},
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>