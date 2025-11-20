<template>
  <div>
    <div v-if="!isEnd" v-reachBottom="reachBottom" class="rel f xc ac mt10 mb10">
      <div class="loading"></div>
      <div class="ml10">加载中...</div>
    </div>
    <div v-else class="tc pt10 pb10 g9 fs12">没有更多了</div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    isEnd: { type: Boolean, default: false },
  },
  emits: ['reachBottom'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>