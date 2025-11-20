<template>
  <div class="f">
    <div class="" style="width:80px;">
      <AniDrag :list="headerList" @setList="e => headerList = e" @change="handleChange" className="" :styleObj="{gap: '20px'}"  itemClassName="" :itemStyleObj="{}">
        <template #item="{ item, index }"> 
          <div @click="selectItem(item)" :class="['f ac poi rel pl20 trans3 mt10 mb10', item.isChecked ? 'checkedBox' : 'squareCheckBox']">{{item.value}}</div>
        </template>
      </AniDrag>
    </div>
    <Column v-for="item in tableList" :column="item">
      <template #item="{ item, index }"> 
        <div v-if="index == 0" class="abs trbl0 f ac xc b bgf5">{{item.value}}</div>  <!--自定义当前列第1行元素--->
      </template>
    </Column>
  </div>
</template>
<script>
import f from "./index.js"
import Column from "@/components/Column/index.vue"
import AniDrag from "@/animate/AniDrag/index.vue"
export default {
  components: {
    Column,
    AniDrag
  },
  props: {
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css">
</style>