<template>
  <div class="f ac">
    <div v-if="item.label" class="g3 fs14 nowrap">{{item.label}}：</div>
    <el-input v-model="searchParams[item.key]" :style="{width: `${item.width}px`}" :placeholder="item.placeholder" @input="changeVal" :clearable="item.clearable" :maxlength="item.maxlength || 99999" :show-word-limit="item.showWordLimit" />
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    item: { type: Object,default: () => ({}) },
    searchParams: { type: Object,default: () => ({}) },
    searchList: { type: Array,default: () => [] },
  },
  emits: ['setSearchList', 'changeSearch', 'setSearchParams'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style scoped></style>