<template>
  <div>
    <el-table v-loading="tableObj.loading" :data="tableObj.list" style="width: 100%">
      <el-table-column
        v-for="item in tableObj.head.filter(v => !v.slot)" :key="item.key"
        :prop="item.key" :label="item.title" :align="item.align" :min-width="item.minWidth" :fixed="item.fixed" 
        show-overflow-tooltip
      />
      <el-table-column
        v-for="item in tableObj.head.filter(v => v.slot)" :key="item.key"
        :label="item.title" :width="item.minWidth" :align="item.center" :fixed="item.fixed"
        show-overflow-tooltip
      >
        <slot :name="item.slot" v-bind="item"></slot>
      </el-table-column>
      <slot></slot>
    </el-table>
    <div class="f ac xe pt15">
      <el-pagination 
        :hide-on-single-page="false"
        background layout="prev, pager, next"
        v-model:current-page="tableObj.currentPage"
        :page-size="tableObj.pageSize" 
        :total="tableObj.totalCount" 
        @change="changePageAndSize"
      />
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    tableObj: {type: Object, default: () => ({}) },
  },
  emits: ['setTableObj', 'changeTable'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style scoped></style>