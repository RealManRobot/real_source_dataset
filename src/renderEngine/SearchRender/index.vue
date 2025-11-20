<template>
  <div class="f ac tr rw" style="gap:10px;">
    <div v-for="item in searchList" :key="item.id">
      <div v-if="item.isShow">
        <InputCom v-if="item.type == 'input'" :item="item" :searchParams="searchParams" @setSearchParams="e=>emit('setSearchParams', e)" :searchList="searchList" @setSearchList="e=>emit('setSearchList', e)" @changeSearch="e => emit('changeSearch', e)"></InputCom>
        <SelectCom v-if="item.type == 'select'" :item="item" :searchParams="searchParams" @setSearchParams="e=>emit('setSearchParams', e)" :searchList="searchList" @setSearchList="e=>emit('setSearchList', e)" @changeSearch="e => emit('changeSearch', e)"></SelectCom>
        <DateRangeCom v-if="item.type == 'dateRange'" :item="item" :searchParams="searchParams" @setSearchParams="e=>emit('setSearchParams', e)" :searchList="searchList" @setSearchList="e=>emit('setSearchList', e)" @changeSearch="e => emit('changeSearch', e)"></DateRangeCom>
      </div>
    </div>
    <div class="f ac">
      <div v-if="isShowSearch" class="pt5 pb5 pl20 pr20 rds40 f ac xc gf mr10 poi" style="background:#ec6102" @click="search">查询</div>
      <div v-if="isShowReset" class="pt5 pb5 pl20 pr20 rds40 f ac xc poi" style="border:1px solid #ccc;" @click="reset">重置</div>
      <div v-if="isShowSpread" class="poi f ac g1aada7 ml10 none" @click="toogleSpread">
        <div>{{isSpread ? '收起' : '展开' }}</div>
        <div :class="['trans3 f ac ml5', isSpread ? 'tr180' : '']" style="transform-origin:center center;">
          <div class="" style="width:6px;height:6px;border-left:1px solid #666;border-bottom:1px solid #666;transform:translateY(-2px) rotate(-45deg)"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
import { defineAsyncComponent } from "vue"
export default {
  components: {
    InputCom: defineAsyncComponent(() => import('./components/InputCom/index.vue')),
    SelectCom: defineAsyncComponent(() => import('./components/SelectCom/index.vue')),
    DateRangeCom: defineAsyncComponent(() => import('./components/DateRangeCom/index.vue')),
  },
  props: {
    searchParams: { type: Object, default: () => ({}) },
    searchList: { type: Array, default: () => [] },
    isShowSpread: { type: Boolean, default: false },
    isShowSearch: { type: Boolean, default: false },
    isShowReset: { type: Boolean, default: true },
  },
  emits: ['setSearchList', 'changeSearch', 'setSearchParams'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style scoped></style>