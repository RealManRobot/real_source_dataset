<template>
  <div class="">
    <div v-clickoutside="() => isSpread=false" :class="['rel hover-drop-down rds4 f ac fs14 lt2 poi trans3 gf none']" :style="{height,width}">
      <div class="w100 none" @click="isSpread=!isSpread">
        <input :value="showLabel" class="fs14 f ac poi rds4 rel borderBox hoverBorder pl5 db w100 bdAndNone ivu-input" style="color:#515a6e;height:32px;" placeholder="请选择" readonly />
        <svg t="1688200718474" :class="['abs zx10 t50 ty-50 poi trans3']" :style="{right:'10px', transform: isSpread ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5782" width="14" height="14"><path d="M183.168 332.501333a42.666667 42.666667 0 0 1 57.621333-2.496l2.709334 2.496L512 600.96l268.501333-268.48a42.666667 42.666667 0 0 1 57.621334-2.496l2.709333 2.496a42.666667 42.666667 0 0 1 2.496 57.621333l-2.496 2.709334-298.666667 298.666666a42.666667 42.666667 0 0 1-57.621333 2.496l-2.709333-2.496-298.666667-298.666666a42.666667 42.666667 0 0 1 0-60.330667z" fill="#999" p-id="5783"></path></svg>
      </div>
      <div @click="isSpread = false" :class="['abs bgf g0 borderBox ovh trans1 zx10']" :style="{height: isSpread ? 'auto' : '0', color:'#666',top:'35px',width:'100%',boxShadow: isSpread ? '0px 0px 2px 2px rgb(0,0,0,.1)' : '',borderRadius:'0 0 2px 2px',}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    value: { type: [String, Number], default: '' },
    width: { type: String, default: '220px' },
    height: { type: String, default: '32px' },
  },
  emits: ['setValue'],
  setup(props, { emit, slots }) {
    return f(props, emit, slots)
  }
}
</script>
<style src="./index.css" scoped></style>