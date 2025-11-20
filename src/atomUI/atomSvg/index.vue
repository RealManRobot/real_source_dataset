<template>
  <div>
    <div v-html="svgContent" :style="{ width: width + 'px', height: height + 'px', color }"></div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    type: { type: String, default: "add" },
    width: { type: String, default: "24" },
    height: { type: String, default: "24" },
    color: { type: String, default: "#1890ff" }
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>