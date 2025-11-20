<template>
  <div class="f ac">
    <div class="mr">{{label}}</div>
    <div @click="emit('setValue', !value)" :class="['switch-box rds22 trans3 bgc trans3 f ac mr30 rel poi']" :style="{width:'44px',height:'22px',background: value ? background : '#ccc', boxShadow: '0 0 6px rgba(0,0,0,0.15)'}">
      <div :class="['bgf rds22 abs t50 ty-50 trans3 zx2', value ? 'open-switch' : 'not-open-switch']" :style="{width:'18px',height:'18px'}"></div>
      <div :class="['abs f ac fs12 zx1', value ? 'gf' : 'g3']" :style="{left: value ? '8px' : '25px', top: '2px'}">{{ value ? trueText : falseText }}</div>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    label: { type: String, default: '' },
    value: { type: Boolean, default: false },
    background: { type: String, default: '#1aada7' },
    trueText:{ type: String, default: '是' },
    falseText:{ type: String, default: '否' }
  },
  emits: ['setValue'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>