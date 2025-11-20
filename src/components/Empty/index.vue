<template>
  <div v-if="isShow" class="f ac xc rel">
    <div>
      <div class="my-image db auto" :style="{width: `${width}px`, height: `${height}px` }"></div>
      <div class="tc b fs14" style="bottom:10px;" v-html="text"></div>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    isShow: { type: Boolean, default: false },
    width: {type: [String, Number], default: 300 },
    height: {type: [String, Number], default: 300 },
    text: {type: String, default: '暂无可操作文件' },
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style scoped>
.my-image{
  width:300px;
  height:300px;
  display: block;
  z-index: 10;
  background-image: url("@/assets/empty.png");
  background-repeat:no-repeat;
  background-size: 100%;
  background-position:center;
  background-origin:content-box;
}
</style>