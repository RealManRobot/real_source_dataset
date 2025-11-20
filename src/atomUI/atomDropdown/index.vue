<template>
  <div v-clickoutside="() => isSpread=false" :class="['rel hover-drop-down rds4 f ac fs14 lt2 poi trans3 gf none']" :style="{height: height,width:width,background:'#1aada7'}">
    <div @click.stop="isSpread=!isSpread" class="f1 f ac xc">
      <div>{{text}}</div>
      <svg t="1688200718474" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5782" width="18" height="18"><path d="M183.168 332.501333a42.666667 42.666667 0 0 1 57.621333-2.496l2.709334 2.496L512 600.96l268.501333-268.48a42.666667 42.666667 0 0 1 57.621334-2.496l2.709333 2.496a42.666667 42.666667 0 0 1 2.496 57.621333l-2.496 2.709334-298.666667 298.666666a42.666667 42.666667 0 0 1-57.621333 2.496l-2.709333-2.496-298.666667-298.666666a42.666667 42.666667 0 0 1 0-60.330667z" fill="#ffffff" p-id="5783"></path></svg>
    </div>
    <div @click="isSpread=false" :class="['abs bgf g0 borderBox ovh trans1 zx10']" :style="{height: isSpread ? 'auto' : '0', color:'#666',top:'32px',boxShadow: isSpread ? '0px 0px 2px 2px rgb(0,0,0,.1)' : '',borderRadius:'0 0 2px 2px',}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    text: { type: String, default: '更多' },
    width: { type: String, default: '80px' },
    height: { type: String, default: '32px' },
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>