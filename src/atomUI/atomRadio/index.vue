<template>
  <div>
    <div @click="selectItem" :class="['f ac mr30 poi rel pl20 trans5', value ? 'checkedRaido' : 'radioBorder']">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    value: { type: Boolean, default: false }
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>