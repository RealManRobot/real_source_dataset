<template>
  <div class="f ac">
    <div v-if="item.label" class="g3 fs14 nowrap">{{item.label}}：</div>
    <el-date-picker
      v-model="searchParams[item.key]"
      type="daterange"
      range-separator="到"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      @change="changeVal"
    >
    </el-date-picker>
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