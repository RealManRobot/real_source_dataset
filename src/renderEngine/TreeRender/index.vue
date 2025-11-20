<template>
  <div>
    <div v-for="(item, index) in list" :key="item.id" class="">
      <CommNode v-if="type == 'commonNode'" :item="item" :list="list" @setList="e => emit('setList', e)" @getCurItem="e => emit('getCurItem', e)"></CommNode>
      <FileNode v-else-if="type == 'fileNode'" :item="item" :list="list" :isLast="index == list.length - 1" @setList="e => emit('setList', e)" @getCurItem="e => emit('getCurItem', e)"></FileNode>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
import { defineAsyncComponent } from "vue"
export default {
  components: {
    CommNode: defineAsyncComponent(() => import('./components/CommNode/index.vue')),
    FileNode: defineAsyncComponent(() => import('./components/FileNode/index.vue')),
  },
  props: {
    type: { type: String, default: 'commonNode' },
    list: { type: Array, default: () => [] },
  },
  emits: ['setList', 'getCurItem'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style scoped></style>