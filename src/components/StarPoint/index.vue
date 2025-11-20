<template>
  <div>
    <HalfStar v-if="type == 'halfStar'" :point="point" :size="size" :readOnly="readOnly" @setPoint="e => emit('setPoint', e)"></HalfStar>
    <AllStar v-else-if="type == 'allStar'" :point="point" :size="size" :readOnly="readOnly" @setPoint="e => emit('setPoint', e)"></AllStar>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    type: { type: String, default: 'halfStar', validator: value => ['halfStar', 'allStar'].includes(value) }, // 允许选半个、整个
    point: { type: [Number, String], default: 0 }, // 是否显示。 0到10分
    size: { type: Number, default: 36 }, // 是否显示
    readOnly: { type: Boolean, default: false }, // 是否只读
  },
  emits: ['setPoint'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" ></style>