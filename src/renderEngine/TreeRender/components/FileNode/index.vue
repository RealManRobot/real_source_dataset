<template>
  <!--竖线+最后每一层最后一节的修补线-->
  <div :class="['pt10 pl10 rel none', depth > 0 ? (isLast ? 'bdl-fix-border' : 'bdlc') : '']">
    <div class="f ac rel">
      <div v-if="item.children && item.children.length" @click.stop="spread(item)" class="h100 f ac xc rel poi">
        <svg v-if="item.isSpread" t="1721376084055" style="transform: " class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6902" width="24" height="24"><path d="M192.19485474 252.44799805c0-33.25973511 26.9934082-60.25314331 60.25314331-60.25314331h519.1040039c33.25973511 0 60.25314331 26.9934082 60.25314331 60.25314331v519.1040039c0 33.25973511-26.9934082 60.25314331-60.25314331 60.25314331H252.44799805A60.25314331 60.25314331 0 0 1 192.19485474 771.55200195V252.44799805z m46.34857177 0v519.1040039c0 7.67532349 6.22924805 13.90457153 13.90457154 13.90457154h519.1040039a13.90457153 13.90457153 0 0 0 13.90457154-13.90457154V252.44799805A13.90457153 13.90457153 0 0 0 771.55200195 238.54342651H252.44799805A13.90457153 13.90457153 0 0 0 238.54342651 252.44799805z" fill="#222222" p-id="6903"></path><path d="M363.68457031 535.17428589a23.17428589 23.17428589 0 1 1 0-46.34857178h296.63085938a23.17428589 23.17428589 0 1 1 0 46.34857178H363.68457031z" fill="#222222" p-id="6904"></path></svg>
        <svg v-else t="1721369654064" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6721" width="24" height="24"><path d="M192.19485474 252.44799805c0-33.25973511 26.9934082-60.25314331 60.25314331-60.25314331h519.1040039c33.25973511 0 60.25314331 26.9934082 60.25314331 60.25314331v519.1040039c0 33.25973511-26.9934082 60.25314331-60.25314331 60.25314331H252.44799805A60.25314331 60.25314331 0 0 1 192.19485474 771.55200195V252.44799805z m46.34857177 0v519.1040039c0 7.67532349 6.22924805 13.90457153 13.90457154 13.90457154h519.1040039a13.90457153 13.90457153 0 0 0 13.90457154-13.90457154V252.44799805A13.90457153 13.90457153 0 0 0 771.55200195 238.54342651H252.44799805A13.90457153 13.90457153 0 0 0 238.54342651 252.44799805z" fill="#222222" p-id="6722"></path><path d="M363.68457031 535.17428589a23.17428589 23.17428589 0 1 1 0-46.34857178h296.63085938a23.17428589 23.17428589 0 1 1 0 46.34857178H363.68457031z" fill="#222222" p-id="6723"></path><path d="M488.82571411 363.68457031a23.17428589 23.17428589 0 1 1 46.34857178 0v296.63085938a23.17428589 23.17428589 0 1 1-46.34857178 0V363.68457031z" fill="#222222" p-id="6724"></path></svg>
      </div>
      <div @click="clickItem(item)" :class="['ml2 poi', item.isChecked ? 'gec6102' : '']">{{item.name}}</div>
      <!--小横线-->
      <div v-if="depth > 0" style="height:1px;width:8px;background:#999;left:-10px;top:11px;" class="abs b0 l0"></div>
    </div>
    <div v-if="item.isSpread && item.children.length"  class="ml12" >
      <FileNode v-for="(child, childIndex) in item.children" :key="child.id" :item="child" :depth="depth + 1" :isLast="childIndex == item.children.length - 1" :list="list" @setList="e => emit('setList', e)" @getCurItem="e => emit('getCurItem', e)"></FileNode>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
import { defineAsyncComponent } from "vue"
export default {
  components: {
    FileNode: defineAsyncComponent(() => import('./index.vue')),
  },
  props: {
    item: { type: Object, default: () => ({}) },
    depth: { type: Number, default: 0 },
    list: { type: Array, default: () => [] },
    isLast: { type: Boolean, default: false },
  },
  emits: ['setList', 'getCurItem'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>