<template>
  <Transition :name="transitionName" :mode="mode" :appear="appear">
    <slot></slot>
  </Transition>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    type: { type: String, default: 'fade' }, // fade、slide-up、slide-down、slide-left、slide-right、zoom
    mode: { type: String, default: "out-in" }, // 可选：in-out、out-in、default
    appear: { type: Boolean, default: true }, /** 出现时是否播放动画 */
    duration: { type: Number, default: 300 }, /** 动画持续时间（毫秒） */
    easing: { type: String, default: "ease" }  /** 缓动函数 可选：linear、ease、ease-in、ease-out、ease-in-out */
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>