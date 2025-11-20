<template>
  <div>
    <div
      v-for="(item, index) in column" :key="item.id"
      :class="[item.class, 'borderBox bdbc rel', index == 0 ? 'bdtc' : '', ]" 
      :style="item.style"
    >
      <slot name="item" :item="item" :index="index">
        {{ item.value }}
      </slot>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    column: { type: Array, default: () => [] },
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>