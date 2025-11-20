<template>
  <div class="f ac">
    <div :class="['f1 rel rds30 ovh none mr10', wrapperClass]" :style="wrapperStyle">
      <slot name="default" :val="percent">
        <div :class="['h100 rds30 f ac xe gf pr10 borderBox fs13 trans3 zx10', percent > 80 ? 'red-theme' : 'blue-theme']" :style="{width:`${percent}%`}"></div>
      </slot>
    </div>
    <div :class="['b tl', percent > 80 ? 'gcc0000' : 'g1565c0']" style="width:32px;">{{ percent }}%</div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
   /** 目标百分比 */
    percent: { type: Number, required: true, default: 0 },
    /** 外层 样式 */
    wrapperClass: { type: String, default: '' },
    wrapperStyle: { type: Object, default: () => ({height:'12px', background:'#ebeef5'}) },
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css"></style>