<template>
  <div>
    <div class="f ac fs14 mb8" :style="{paddingLeft: `${depth * 30}px`}">
      <svg v-if="item.children.length" @click="spreadItem" t="1744881089341" :class="['pr2 poi trans3', item.isSpread ? '' : 'rotate90']" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5391" width="14" height="14"><path d="M311.325 892.881l442.44-333.271c30.745-23.159 30.745-73.365 0-96.528l-442.44-333.266c-28.506-21.467-64.149 5.387-64.149 48.329V844.61c0 42.884 35.643 69.747 64.149 48.271z" fill="#777777" p-id="5392"></path></svg>
      <div @click="checkItem(!item.isChecked)" class="f poi">
        <div v-if="item.isShowCheckbox" :class="['rds2 rel trans3 f ac xc mr5 ovh borderBox', item.disabled ? 'disabled' : '']" :style="{width:'17px',height:'17px',background: item.isChecked || item.isIndeterminate ? '#1aada7' : '#fff', border: item.isChecked || item.isIndeterminate ? 'none' : '1px solid #dcdee2'}">
          <div v-show="item.isIndeterminate || item.isChecked" :class="['trans3', item.isIndeterminate ? 'rowLine' : item.isChecked ? 'currect' : '']"></div>
        </div>
        <div class="dib">{{ item.name }}</div>
      </div>
    </div>
    <div v-if="item.isSpread && item.children?.length">
      <CommNode v-for="child in item.children" :key="child.id" :item="child" :depth="depth + 1" :list="list" @setList="e => emit('setList', e)" @getCurItem="e => emit('getCurItem', e)"></CommNode>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
import { defineAsyncComponent } from "vue"
export default {
  components: {
    CommNode: defineAsyncComponent(() => import('./index.vue')),
  },
  props: {
    item: { type: Object, default: () => ({}) },
    depth: { type: Number, default: 0 },
    list: { type: Array, default: () => [] },
  },
  emits: ['setList', 'getCurItem'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>