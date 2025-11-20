<template>
  <div>
    <el-button type="info" class="mb50">Info</el-button>
    <p>Count: {{ counterStore.count }}</p>
    <p>name: {{ counterStore.userInfo.name }}</p>
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
<style src="./index.css" scoped></style>