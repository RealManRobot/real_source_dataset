<template>
  <div>
    <!--布局1:遮罩 + 数字进度-->
    <div v-if="loadObj.isShow && loadObj.layout == 'square'" :class="['trbl0 f ac xc', loadObj.range == 'global'? 'fixed' : 'abs']" :style="{ background: loadObj.maskBackground, zIndex: loadObj.zIndex || 100 }">
      <div class="rds10 f ac xc" :style="{background:'rgba(10,6,0,.6)',maxWidth:'192px',maxHeight:'155px',width: '192px', aspectRatio: '123/100'}">
        <div>
          <div class="f ac xc">
            <div class="fs40 gec6102">{{ ~~(Number(loadObj.percent) > 100 ? 100 : Number(loadObj.percent)) }}<span class="fs14 pl2" style="transform:translateY(10px);">%</span></div>
          </div>
          <div class="gf tc">{{ loadObj.text }}</div>
        </div>
      </div>
    </div>
    <!--布局2：环形loading + 数字进度-->
    <div v-if="loadObj.isShow && loadObj.layout == 'circle'" :class="['trbl0 f ac xc', loadObj.range == 'global'? 'fixed' : 'abs']" :style="{ background: loadObj.maskBackground, zIndex: loadObj.zIndex || 100  }">
      <div class="renderloading" :style="{border: `2px solid ${loadObj.circleColor ? loadObj.circleColor : '#ec6102'}`}"></div>
      <div class="abs l50 t50 txy-50" style="margin-left:2px;">
        <div class="fs26 tc gec6102 lh1 pb5">{{ ~~(Number(loadObj.percent) > 100 ? 100 : Number(loadObj.percent)) }}<span class="fs12 pl2" style="transform:translateY(10px);">%</span></div>
        <div class="gf tc fs10 lh1">
          {{ loadObj.text }}
        </div>
      </div>
    </div>
    <!---布局3：（无进度显示）纵向显示loading-->
    <div v-if="loadObj.isShow && loadObj.layout == 'y'" :class="['trbl0 f ac xc', loadObj.range == 'global'? 'fixed' : 'abs']" :style="{ background: loadObj.maskBackground, zIndex: loadObj.zIndex || 100  }">
      <div class="">
        <div class="f ac xc mb5">
          <div class="yLoading" :style="{border: `2px solid ${loadObj.circleColor ? loadObj.circleColor : '#ec6102'}`, filter: 'brightness(1.2)'}"></div>
        </div>
        <div class="pl5 gec6102 none" :style="{color: loadObj.color ? loadObj.color : '#ec6102', filter: 'brightness(1.2)'}">{{ loadObj.text }}</div>
      </div>
    </div>
    <!---布局4：（无进度显示）横向显示loading-->
    <div v-if="loadObj.isShow && loadObj.layout == 'x'" :class="['w100 f ac xc pt10 pb20']" :style="{ zIndex: loadObj.zIndex || 100 }">
      <div class="xLoading" :style="{border: `2px solid ${loadObj.circleColor ? loadObj.circleColor : '#ec6102'}`, filter: 'brightness(1.2)'}"></div>
      <div class="pl5 gec6102 none lh1" :style="{color: loadObj.color ? loadObj.color : '#ec6102', filter: 'brightness(1.2)'}">{{ loadObj.text }}</div>
    </div>
  </div> 
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    loadObj: { type: Object, default: () => ({})},
  },
  emits: ['setLoadObj'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>