/**
 * 弹框渲染器
  @模板
    <ModalRender
      :modalObj="modalObj"
      @setModalObj="e => modalObj = e"
      @close="emit('setIsShow', false)"
      @btn1Fn="emit('setIsShow', false)"
      @btn2Fn="emit('setIsShow', false)"
      @btn3Fn="emit('setIsShow', false)"
    >
      <div class="" style="background:skyblue;">顶部</div>
      <div style="width:1000px;">我是内容</div>
      <div class="" style="background:pink;height:100px">底部</div>
    </ModalRender>
  @js
    const modalObj = ref({
      isShow: true, // *必要参数modal弹框是否显示
      style:'', // 弹框盒子的样式
      zIndex: 1, // 层级
      animate: true, // 需要动画吗？
      customEmit: false, // true：完全自定义点击事件，关闭、取消、确定。代码不做默认处理
      mask: true, // 需要遮罩吗？
      draggable: false, // 需要可拖拽吗？
      width: '500px', // 弹框宽度
      top: '10%', // 弹框距离顶部的高度
      left: `calc(50% - ${500 / 2}px)`, // 视口宽度50% - 弹框宽度的一半
      // 顶部模块 // 是否显示顶部  // 标题// 是否显示顶部右侧叉号
      header: { isShow: true, title: '温馨提示', isShowClose: true },
      footer: { // 底部模块
        isShow: true, // 是否显示底部
        align: 'right', // right:按钮靠右显示  left: 按钮靠左显示    center: 按钮居中显示
        view: '3d', // 2d: 平面按钮    3d:3d按钮
        isShowBtn1: true, btn1Type: 'default', btn1Text: '关闭', // 显示btn1按钮  // 默认样式  // 文案 
        isShowBtn2: true, btn2Type: 'default', btn2Text: '取消', // 显示btn2按钮  // 默认样式  // 文案
        isShowBtn3: true, btn3Type: 'warning', btn3Text: '确定', // 显示btn3按钮  // 确认样式  // 文案         
      },
    })
*/
import { ref, watch, useAttrs } from 'vue'
export default function (props, emit) {
  const attrs = useAttrs()
  const { onClose, onBtn1Fn, onBtn2Fn, onBtn3Fn, onSetModalObj } = attrs
  let zIndex = ref(1000)
  // 接收事件
  watch(() => props.modalObj.isShow, newVal => {
    if(newVal) {
      zIndex.value = (props.modalObj.zIndex || 1) + 100 || new Date().getTime().slice(-7, -3)
    }
  }, {immediate: true})
  // async function close(){
  //   await onSetModalObj({ ...props.modalObj, isShow: false })
  // }
  // 关闭弹框
  function closeModal() {
    onClose()
  }
  // 按钮1
  async function handleBtn1() {
    await onBtn1Fn()
    if(!props.modalObj.customEmit) { // 客户如果不需要自定义，则默认关闭弹框
      onClose() // 默认关闭modal弹框
    }
  }
  // 按钮2
  async function handleBtn2() {
    await onBtn2Fn()
    if(!props.modalObj.customEmit) { // 客户如果不需要自定义，则默认关闭弹框
      onClose() // 默认关闭modal弹框
    }
  }
  // 按钮3
  async function handleBtn3() {
    await onBtn3Fn()
  }
  return {
    emit, zIndex, closeModal, handleBtn1, handleBtn2, handleBtn3
  }
}
