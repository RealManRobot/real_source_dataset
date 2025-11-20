<template>
  <Teleport to="body">
    <!---遮罩-->
    <div v-if="modalObj.mask" :class="['fixed trbl0', modalObj.isShow ? 'op10' : 'op0 dn', modalObj.animate ? 'trans3' : '']"  :style="{background:'rgba(55,55,55,.6)', zIndex: zIndex}"></div>
    <!---弹框-->
    <div :class="['fixed bgf rds15', modalObj.isShow ? `op10 ${modalObj.animate ? 'ani-large' : ''}` : `op0 ${modalObj.animate ? 'ani-small' : ''}`, modalObj.footer && modalObj.footer.isShow ? 'pb52' : '']" :style="`transition: transform ease 0.3s;z-index:${modalObj.isShow ? zIndex + 1 : -1};${modalObj.style};padding-top: ${modalObj.header && modalObj.header.isShow ? 'clamp(45px, 0.5rem, 50px);' : ''};box-shadow: 0 4px 12px rgba(0,0,0,.15);left:${modalObj.left};top:${modalObj.top};width:${modalObj.width};`">
      <!--顶部标题-->
      <div v-if="modalObj.header && modalObj.header.isShow" v-draggable="[modalObj.draggable, 'parent']" class="f ac pl10 abs t0 l0 r0" style="height:clamp(45px, 0.5rem, 50px);background:#f5f7fa;border-radius: 15px 15px 0 0;">
        <div class="fs16 b f1 none pl20r g3" v-html="modalObj.header.title"></div>
        <div @click.stop="closeModal" v-if="modalObj.header.isShowClose" class="f ac xc poi" style="height:clamp(45px, 0.5rem, 50px);width:50px;">
          <svg t="1671764723022" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2737" width="12" height="12"><path d="M1007.603202 929.818395L592.684241 514.699473 1007.603202 99.780512c10.797891-10.797891 16.196837-24.795157 16.196837-38.992385 0-13.997266-5.398946-28.194493-16.196837-38.992384-21.595782-21.595782-56.388987-21.595782-77.984768 0L514.699473 436.914665 99.780512 21.795743C78.18473 0.199961 43.391525 0.199961 21.795743 21.795743s-21.595782 56.388987 0 77.984769l415.118922 414.918961L21.795743 929.818395c-21.595782 21.595782-21.595782 56.388987 0 77.984768s56.388987 21.595782 77.984769 0l414.918961-415.118922L929.818395 1007.603202c10.797891 10.797891 24.795157 16.196837 38.992384 16.196837 13.997266 0 28.194493-5.398946 38.992384-16.196837 21.395821-21.395821 21.395821-56.388987-0.199961-77.784807z" fill="#999999" p-id="2738"></path></svg>
        </div>
      </div>
      <!--内容-->
      <div class="rel">
        <slot></slot>
      </div>
      <!--底部按钮-->
      <div v-if="modalObj.footer && modalObj.footer.isShow" :class="['abs b0 l0 r0 f ac pt10 pl20 pr20 pb10 rds15 borderBox none',modalObj.footer.align == 'left' ? 'xs' : modalObj.footer.align == 'center'? 'xc' : 'xe',]" style="height: 52px; background: #f5f7fa; border-radius: 0 0 15px 15px">
        <template v-if="modalObj.footer.view == '2d'">
          <atomButton v-if="modalObj.footer.isShowBtn1" :type="modalObj.footer.btn1Type" className="mr20" view="2d" width="80px" height="32px" radius="30px" @click.stop="handleBtn1" :autoLoading="true" :disabled="false">{{ modalObj.footer.btn1Text }}</atomButton>
          <atomButton v-if="modalObj.footer.isShowBtn2" :type="modalObj.footer.btn2Type" className="mr20" view="2d" width="80px" height="32px" radius="30px" @click.stop="handleBtn2" :autoLoading="true" :disabled="false">{{ modalObj.footer.btn2Text }}</atomButton>
          <atomButton v-if="modalObj.footer.isShowBtn3" :type="modalObj.footer.btn3Type" className="" view="2d" width="80px" height="32px" radius="30px" @click.stop="handleBtn3" :autoLoading="true" :disabled="false">{{ modalObj.footer.btn3Text }}</atomButton>
        </template>
        <template v-else>
          <atomButton v-if="modalObj.footer.isShowBtn1" :type="modalObj.footer.btn1Type" className="mr20" view="3d" width="80px" height="32px" radius="30px" @click="handleBtn1" :autoLoading="true" :disabled="false">{{ modalObj.footer.btn1Text }}</atomButton>
          <atomButton v-if="modalObj.footer.isShowBtn2" :type="modalObj.footer.btn2Type" className="mr20" view="3d" width="80px" height="32px" radius="30px" @click="handleBtn2" :autoLoading="true" :disabled="false">{{ modalObj.footer.btn2Text }}</atomButton>
          <atomButton v-if="modalObj.footer.isShowBtn3" :type="modalObj.footer.btn3Type" className="" view="3d" width="80px" height="32px" radius="30px" @click="handleBtn3" :autoLoading="true" :disabled="false">{{ modalObj.footer.btn3Text }}</atomButton>
        </template>
      </div>
    </div>
  </Teleport>
</template>
<script>
import f from "./index.js"
import atomButton from "@/atomUI/atomButton/index.vue"
import { draggable } from '@/directives/modules/draggable.js' // 路
export default {
  components: { atomButton },
  directives: {
    draggable, // 注册为 v-draggable
  },
  inheritAttrs: false,
  props: {
    modalObj: { type: Object, default: () => ({})},
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>
