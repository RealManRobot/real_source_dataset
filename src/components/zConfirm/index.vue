<template>
  <ModalRender
    :modalObj="modalObj"
    @setModalObj="e => modalObj = e"
    @close="closeModal"
    @btn1Fn="handleBtn1"
    @btn2Fn="handleBtn2"
    @btn3Fn="handleBtn3"
  >
    <div class="pl30 pt30 pb20 pr30 fs16">
      <div v-html="content"></div>
      <div v-if="name" class="g329cff fs16 mb10 b tc">{{ name }}</div>
      <div v-if="isShowTip" class="g6 fs12 mt8 mb20 f ac xc">删除后将不可恢复！</div>
      <div class="f ac xc fs14">
        <atomButton v-if="btn1IsShow" @click="handleBtn1" :type="btn1Type" className="mr20" view="3d" width="80px" height="32px" radius="30px" :autoLoading="true" :disabled="false">{{ btn1Text }}</atomButton>
        <atomButton v-if="btn2IsShow" @click="handleBtn2" :type="btn2Type" className="mr20" view="3d" width="80px" height="32px" radius="30px" :autoLoading="true" :disabled="false">{{ btn2Text }}</atomButton>
        <atomButton v-if="btn3IsShow" @click="handleBtn3" :type="btn3Type" className="" view="3d" width="80px" height="32px" radius="30px" :autoLoading="true" :disabled="false">{{ btn3Text }}</atomButton>
      </div>
    </div>
  </ModalRender>
</template>
<script>
import f from "./index.js"
import ModalRender from "@/renderEngine/ModalRender/index.vue"
import atomButton from "@/atomUI/atomButton/index.vue"
export default {
  components: {
    ModalRender,
    atomButton
  },
  inheritAttrs: false,
  props: {
    width: { type: [String, Number], default: 350 },
    name: { type: [String, Number], default: '' },
    content: { type: String, default: '' },
    isShowTip:{ type: Boolean, default: true },
    // btn1
    btn1IsShow:{ type: Boolean, default: true },
    btn1Type:{ type: String, default: 'default' },
    btn1Text:{ type: String, default: '关闭' },
    // btn2
    btn2IsShow:{ type: Boolean, default: true },
    btn2Type:{ type: String, default: 'default' },
    btn2Text:{ type: String, default: '取消' },
    // btn3
    btn3IsShow:{ type: Boolean, default: true },
    btn3Type:{ type: String, default: 'default' },
    btn3Text:{ type: String, default: '确定' },
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style scoped></style>