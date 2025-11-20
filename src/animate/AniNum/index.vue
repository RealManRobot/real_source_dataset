<template>
  <div class="f ac xc fs16r">
    <div :class="['f ac rel ovh', classList]" :style="{height: `${height}px`, ...styleObj}">
      <div v-for="(item, index) in list" :key="index" class="f ac h100">
        <div v-if="item == '.'">.</div>
        <div v-else-if="item == '-'">-</div>
        <div v-else-if="item == ','">,</div>
        <div v-else class="f1 f rw h100">
          <div class="" :style="{transition: 'all ease 1s', transform: `translateY(${Number(item) * -1 * (height || 40)}px)`}">
            <div class="f ac xc" :style="{height: `${height || 40}px`}" v-for="k in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="k">{{k}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    num: { type: [Number, String], default: () => 0},
    isShowSplit: { type: Boolean, default: true},
    height: { type: [Number, String], default: 40},
    classList: { type: String, default: ''},
    styleObj: { type: Object, default: () => ({})},
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style scoped></style>