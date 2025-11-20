<template>
  <div class="f as fs14" style="line-height: 24px;">
    <slot name="label">
      <div :class="['nowrap', labelClassName]">{{ label }}</div>
    </slot>
    <slot name="text">
      <div class="f1 rel text-container">
        <div v-if="String(text).includes('<')" :id="id" :class="['rel zx1']">{{ text }}</div>
        <div v-else :id="id" :class="['rel zx1', textClassName, nowrap == 0 ? '' : nowrap == 1 ? 'nowrap1 poi' : nowrap == 2 ? 'nowrap2 poi wrap' : nowrap == 3 ? 'nowrap3 poi wrap' : '']">{{ text || '暂无描述' }}</div>
        <!---溢出的信息增加提示-->
        <div :id="tipId" :class="['msgTip abs gf wrap zx100 pt10 pb10 rds5 tl hidden poi pl10 pr10']" :style="{'--visibility': isShowTip ? 'visiable' : 'hidden', backgroundColor: 'rgba(0,0,0, 0.7)',minWidth: '50px',bottom:`${nowrap * 25}px`, left:'-10px', right:'-10px'}">
          {{text}}
          <div class="abs l50 tx-50" style="width:0;height:0;bottom:-10px;border:6px solid rgba(0,0,0,0.7);border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid transparent;"></div>
        </div>
      </div>
    </slot>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    label: { type: [String, Number], default: '' }, // 显示的标签
    labelClassName: { type: String, default: '' }, // 传入的样式
    text: { type: [String, Number], default: '-' }, // 显示的文本
    textClassName: { type: String, default: '' }, // 传入的样式
    nowrap: {
      type: [Number, String], 
      default: 1,  
      validator(value, props) { 
        return [0, 1, 2, 3].includes(Number(value)) 
      }
    }, // 0: 正常换行显示 1: 固定一行，溢出显示省略号  2: 固定2行，溢出显示省略号  3：固定2行，溢出显示省略号
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>