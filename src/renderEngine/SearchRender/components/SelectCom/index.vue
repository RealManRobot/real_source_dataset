<template>
  <div class="f ac">
    <div v-if="item.label" class="g3 fs14 nowrap">{{item.label}}：</div>
    <div class="tl">
      <el-select v-model="searchParams[item.key]" placeholder="请选择" :style="{width: `${item.width}px`}" @change="changeVal">
        <el-option v-for="opt in item.options" :key="opt._id" :label="opt.name" :value="opt.value" />
      </el-select> 
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    item: { type: Object,default: () => ({}) },
    searchParams: { type: Object,default: () => ({}) },
    searchList: { type: Array, default: () => [] },
  },
  emits: ['setSearchList', 'changeSearch', 'setSearchParams'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style scoped></style>