<template>
  <div @touchstart.capture="e => touchStart(e)" @touchend.capture="e => touchEnd(e)" @click="clickItem" class="ovh">
    <div :class="['rel trans3', item.slideType == -1 ? 'tx-60' : item.slideType == 1 ? 'tx30' : '']">
      <!---左侧-->
      <slot name="leftSlot">
        <div style="width:30px;left:-30px;background:#1890ff" class="abs t0 b0 f ac xc gf">
          左侧
        </div>
      </slot>
      <!-- 相当于<slot name="default"></slot>-->
      <slot></slot>  
      <!---右侧-->
      <slot name="rightSlot">
        <div style="width:60px;background:red;right:-60px;" class="abs t0 b0 gf f ac xc fs14" @click="del">删除</div>
      </slot>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
    },
    item: {
      type: Object,
      default: () => {}
    },
    type: {
      type: Array,
      default: () => ['left']
    }
  },
  emits: ['setList', 'leftFn'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>