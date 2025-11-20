<template>
  <div class="abs trbl0 fs14">
    <div class="abs l0 t0 b0 gf" style="width:220px;background: #1aada7;">
      <div class="pl20 pt10 pb10">菜单1</div>
      <div class="pl20 pt10 pb10">菜单2</div>
      <div class="pl20 pt10 pb10">菜单3</div>
      <div class="pl20 pt10 pb10">菜单4</div>
    </div>
    <div class="abs t0 b0 r0 bgf ovya" style="left:220px;">
      <RouterView />
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {},
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style scoped></style>