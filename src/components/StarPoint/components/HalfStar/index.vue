<template>
  <div>
    <div class="rel">
      <div class="f">
        <div v-for="(item, index) in new Array(5)">
          <svg v-if="point / 2 - index >= 1" t="1749603894030" :class="['trans3', point / 2 - index >= 1 ? 'scale-star' : '']" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3668" :width="size" :height="size"><path d="M512 181.76a42.496 42.496 0 0 1 38.272 23.765333l87.125333 176.554667 194.816 28.288a42.666667 42.666667 0 0 1 23.68 72.789333l-141.013333 137.429334 33.28 194.048a42.666667 42.666667 0 0 1-61.866667 44.970666L512 768V181.76z" fill="#F8C550" p-id="3669"></path><path d="M512 181.76V768l-174.250667 91.605333a42.666667 42.666667 0 0 1-61.909333-44.970666l33.28-194.048-141.013333-137.386667a42.666667 42.666667 0 0 1 23.68-72.832l194.816-28.288 87.125333-176.554667A42.666667 42.666667 0 0 1 512 181.717333z" fill="#F8C550" p-id="3670"></path></svg>
          <svg v-else-if="point / 2 - index >= 0.5" t="1749603885396" :class="['trans3', point / 2 - index >= 0.5 ? 'scale-star' : '']" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3509" :width="size" :height="size"><path d="M512 181.76a42.496 42.496 0 0 1 38.272 23.765333l87.125333 176.554667 194.816 28.288a42.666667 42.666667 0 0 1 23.68 72.789333l-141.013333 137.429334 33.28 194.048a42.666667 42.666667 0 0 1-61.866667 44.970666L512 768V181.76z" fill="#dddddd" p-id="3510"></path><path d="M512 181.76V768l-174.250667 91.605333a42.666667 42.666667 0 0 1-61.909333-44.970666l33.28-194.048-141.013333-137.386667a42.666667 42.666667 0 0 1 23.68-72.832l194.816-28.288 87.125333-176.554667A42.666667 42.666667 0 0 1 512 181.717333z" fill="#FFCC5A" p-id="3511"></path></svg>
          <svg v-else t="1749603904109" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3827" :width="size" :height="size"><path d="M512 181.76a42.496 42.496 0 0 1 38.272 23.765333l87.125333 176.554667 194.816 28.288a42.666667 42.666667 0 0 1 23.68 72.789333l-141.013333 137.429334 33.28 194.048a42.666667 42.666667 0 0 1-61.866667 44.970666L512 768V181.76z" fill="#dddddd" p-id="3828"></path><path d="M512 181.76V768l-174.250667 91.605333a42.666667 42.666667 0 0 1-61.909333-44.970666l33.28-194.048-141.013333-137.386667a42.666667 42.666667 0 0 1 23.68-72.832l194.816-28.288 87.125333-176.554667A42.666667 42.666667 0 0 1 512 181.717333z" fill="#dddddd" p-id="3829"></path></svg>
        </div>
      </div>
      <div :class="['abs t0 b0 l0  op5 f', readOnly ? '' : 'poi']" @mouseleave="mouseout(index)" :style="{width: `${size * 5}px` }">
        <!-- class="bdc" -->
        <div
          v-for="(item, index) in new Array(10)"
          class=""
          :style="{width: `${size / 2}px`,height:`${size}px`}"
          @mouseenter="mouseIn(index)"
          @click="selectStar(index)"
        >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    point: { type: [Number, String], default: 0 }, // 是否显示。 0到10分
    size: { type: Number, default: 36 }, // 是否显示
    readOnly: { type: Boolean, default: false }, // 是否只读
  },
  emits: ['setPoint'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" ></style>