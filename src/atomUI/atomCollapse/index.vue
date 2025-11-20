<template>
  <div>
    <div class="none">
      <div @click="toogleSpread(item)">
        <slot name="top">
          <div class="f ac gf pl20 pr20 bg1aada7 poi" style="height:42px;border-radius: 5px 5px 0 0">
            <div class="f1">折叠面板</div>
            <svg width="16" height="16" t="1682487153547" :class="['trans3', isSpread ? '' : 'tr180']" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6411"><path d="M506.4 275.8L82.8 710.5c-9.3 9.5-9.1 24.7 0.4 33.9 9.5 9.3 24.7 9.1 33.9-0.4l407-417.7 405.3 420.2c9.2 9.5 24.4 9.8 33.9 0.6 4.9-4.7 7.3-11 7.3-17.3 0-6-2.2-12-6.7-16.7L546.1 280c-1.6-1.7-3.4-3-5.3-4.1l-0.5-0.5c-9.5-9.3-24.7-9.1-33.9 0.4z" fill="#ffffff" p-id="6412"></path></svg>
          </div>
        </slot>
      </div>
      <div :class="['ovh trans1 rds20', isSpread ? 'bdc' : '']" :style="{height: isSpread ? 'auto' : '0', borderRadius: ' 0 0 5px 5px'}">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    isSpread: { type: Boolean, default: false }
  },
  emits: ['setIsSpread'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>