<template>
  <div>
    <div v-if="listObj.isLoad && listObj.list.length == 0" class="abs l50 txy-50" style="top:40%;">
      <Empty :isShow="true" width="240" height="240"></Empty>
    </div>
    <div v-else>
      <LoadingRender v-if="!listObj.isLoad" :loadObj="loadObj" @setLoadObj="e => loadObj = e"></LoadingRender>
      <slot></slot>
      <LoadMore v-if="listObj.list.length >= listObj.size" :isEnd="listObj.list.length == listObj.total" @reachBottom="emit('getList')"></LoadMore>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
import { defineAsyncComponent } from "vue"
export default {
  components: {
    LoadMore: defineAsyncComponent(() => import('@/components/LoadMore/index.vue')),
    Empty: defineAsyncComponent(() => import('@/components/Empty/index.vue')),
  },
  props: {
    listObj: { type: Object, default: () => ({})},
  },
  emits: ['getList'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style scoped></style>