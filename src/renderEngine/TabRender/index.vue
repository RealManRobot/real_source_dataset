<template>
  <div>
    <!---组件库形式-->
    <div v-if="type == 'paneTab'" class="f fs14 tc rel bdbe">
      <div
        @click="changeTab(item)"
        v-for="(item) in list" :key="item.id"
        :class="['mr15 poi pb10', item.isChecked ? 'b gec6102' : '']"
        :style="{ width: maxWidth + 'px' }"
        v-disabled="item.disabled"
      >
        {{item.name}}<span v-if="item.count!=='' && item.count!=undefined && item.count!=null">({{item.count}})</span>
      </div>
      <div class="abs b0 trans3 bgec6102 rds5" :style="{ width: maxWidth + 'px', height: '2px', transform: `translateX(${(maxWidth + 15 ) * tabIndex}px)` }"></div>
    </div>
    <!---圆形切换-->
    <div v-if="type == 'roundTab'" class="f">
      <div
        v-for="(item, index) in list"
        :key="item.id"
        @click="changeTab(item)"
        :class="['f ac xc pl10 pr10 pt7 pb7 fs14 poi trans3 none', item.isChecked ? 'bgec6102 gf' : 'bgf g7', index == 0 && index == list.length - 1 ? 'rdsl2 rdsr2 bdtc bdbc bdlc bdrc' : index == 0 ? 'rdsl2 bdtc bdbc bdlc bdrc' : index == list.length - 1 ? 'rdsr2 bdtc bdbc bdrc' : 'bdtc bdbc bdrc']"
        v-disabled="item.disabled"
      >
        {{ item.name }}<span v-if="item.count!=='' && item.count!=undefined && item.count!=null">({{item.count}})</span>
      </div>
    </div>
    <!---3d质感按钮-->
    <div v-if="type == '3dTab'" class="f">
      <div
        v-for="(item, index) in list"
        :key="item.id"
        @click.stop="changeTab(item)"
        :class="['base-3d mr1 pl10 pr10', item.isChecked ? 'btn-3d-checked' :'btn-3d-not-checked', index == 0 ? 'rdsl2' : index == list.length - 1  ? 'rdsr2' : '']"
        v-disabled="item.disabled"
      >
         {{ item.name }}<span v-if="item.count!=='' && item.count!=undefined && item.count!=null">({{item.count}})</span>
      </div>
    </div>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    type: { type: String, default: 'paneTab' },
    list: { type: Object, default: () => ({}) },
  },
  emits: ['setList', 'changeTab'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>