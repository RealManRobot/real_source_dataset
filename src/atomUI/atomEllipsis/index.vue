<template>
  <span>
    <span class="dot dot-1" :style="{color: color, fontSize: fontSize}">.</span>
    <span class="dot dot-2" :style="{color: color, fontSize: fontSize}">.</span>
    <span class="dot dot-3" :style="{color: color, fontSize: fontSize}">.</span>
  </span>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    fontSize: { type: String, default: "28px" }, // 圆点大小
    color: { type: String, default: "#000" }, // 原点颜色
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>