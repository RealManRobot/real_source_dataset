<template>
  <TransitionGroup name="list" tag="div" :class="[className]" :style="styleObj">
    <div
      v-for="(item, i) in innerList"
      :key="item.id"
      :class="itemClassName"
      :style="itemStyleObj"
      draggable="true"
      @dragstart="dragstart($event, i)"
      @dragenter="dragenter($event, i)"
      @dragend="dragend"
      @dragover="dragover"
    >
      <!-- 支持外部自定义渲染 -->
      <slot name="item" :item="item" :index="i">
        <!-- 默认插槽内容 -->
        <div class="f ac xc bg5993bb gf fs18 rds5 " style="width:200px;height:40px;">{{ item.name }}</div>
      </slot>
    </div>
  </TransitionGroup>
</template>

<script>
import f from "./index.js"
export default {
  props: {
    list: { type: Array, required: true },  /** 拖拽列表数据 */
    className: { type: String, default: 'f rw rel' },  /** 可选：外层盒子自定义类名 */
    styleObj: { type: Object, default: () => ({gap: '20px'}) },
    itemClassName: { type: String, default: '' },  /** 可选：条目自定义类名 */
    itemStyleObj: { type: Object, default: () => ({}) },
  },
  emits: ["setList", "change"],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>

<style src="./index.css"></style>
