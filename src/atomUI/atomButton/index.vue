<template>
  <!---2d按钮-->
  <template v-if="view == '2d'">
    <div @click="handleClick" v-disabled="disabled || innerLoading" :class="[two_d_class, 'rds4 f ac xc lt2 poi trans3 none trans3 w100 h100', className]" :style="{height:`${height || '32px'}`, width:`${width || '60px'}`,borderRadius: `${radius || '20px'}`}">
      <slot></slot>
      <div v-if="innerLoading" class="loading"></div>
    </div>
  </template>
  <!---3d按钮-->
  <template v-else-if="view == '3d'">
    <div @click="handleClick" v-disabled="disabled || innerLoading" :class="[three_d_class, 'basebtn trans3 w100 h100 ', className]" :style="{height:`${height || '32px'}`, width:`${width || '60px'}`,borderRadius: `${radius || '8px'}`}">
      <slot></slot>
      <div v-if="innerLoading" class="loading"></div>
    </div>
  </template>
  <!---标签-->
  <template v-else-if="view == 'tag'">
    <div @click="handleClick" v-disabled="disabled || innerLoading" :class="[tag_class, 'rds2 fs12 none f ac xc lh1', className]" :style="{height:`${height || '32px'}`, width:`${width || '60px'}`}">
      <slot></slot>
      <div v-if="innerLoading" class="loading"></div>
    </div>
  </template>
  <!--下划线形式按钮-->
  <template v-else-if="view == 'underline'">
    <div @click="handleClick" v-disabled="disabled || innerLoading" :class="[underline_class, 'hoverText rds2 fs14 none f ac xc lh1 poi rel wfc', className]">
      <div class="abs w95 l50 tx-50" style="height:1px;background-color: currentColor;bottom: -4px;"></div>
      <slot></slot>
      <div v-if="innerLoading" class="loading"></div>
    </div>
  </template>
</template>
<script>
import f from "./index.js"
import { disabled } from '@/directives/modules/disabled.js' // 路
export default {
  components: { },
  directives: { disabled }, // 注册为 v-disabled
  inheritAttrs: false,
  props: {
    type: { 
      type: String,
      default: 'default', 
      validator(value, props) { 
        return ['default', 'primary', 'error', 'warning', 'success'].includes(value) 
      }
    },
    view: { type: String, default: '2d'}, // 2d: 平面按钮    3d:3d按钮     tag: 标签
    width: { type: [String, Number], default: ''}, // 调整按钮宽度  60px   100%   30vw
    height: { type: [String, Number], default: ''}, // 调整按钮高度 32px   100%  5vh
    radius: { type: [String, Number], default: ''},
    autoLoading: { type: Boolean, default: false }, // 是否自动loading
    disabled: { type: Boolean, default: false }, // 是否禁用
    className: { type: String, default: ''}, // 用户可以自己传入类名，从而进行样式的新增
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" >
</style>
