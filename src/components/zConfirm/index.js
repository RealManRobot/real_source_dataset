import { ref, useAttrs } from "vue"

export default function (props, emit) {
  const attrs = useAttrs()
  const { btn1Fn, btn2Fn, btn3Fn } = attrs
  const modalObj = ref({
    isShow: true, // *必要参数modal弹框是否显示
    style:'', // 弹框盒子的样式
    zIndex: 1000, // 层级
    animate: true, // 需要动画吗？
    customEmit: false, // true：完全自定义点击事件，关闭、取消、确定。代码不做默认处理
    mask: true, // 需要遮罩吗？
    draggable: false, // 需要可拖拽吗？
    width: `${props.width}px`, // 弹框宽度
    top: '15vh', // 弹框距离顶部的高度
    left: `calc(50% - ${props.width / 2}px)`, // 视口宽度50% - 弹框宽度的一半
    // 顶部模块 // 是否显示顶部  // 标题// 是否显示顶部右侧叉号
    header: { isShow: true, title: '温馨提示', isShowClose: true },
    footer: { // 底部模块
      isShow: false, // 是否显示底部
      align: 'center', // right:按钮靠右显示  left: 按钮靠左显示    center: 按钮居中显示
      view: '3d', // 2d: 平面按钮    3d:3d按钮
      isShowBtn1: props.btn1IsShow, btn1Type: props.btn1Type, btn1Text: props.btn1Text,  // 显示btn1按钮  // 默认样式  // 文案 
      isShowBtn2: props.btn2IsShow, btn2Type: props.btn2Type, btn2Text: props.btn2Text,  // 显示btn2按钮  // 默认样式  // 文案
      isShowBtn3: props.btn3IsShow, btn3Type: props.btn3Type, btn3Text: props.btn3Text,  // 显示btn3按钮  // 确认样式  // 文案         
    },
  })
  function closeModal(){
    modalObj.value.isShow = false
  }
  async function handleBtn1(){
    await btn1Fn()
    closeModal()
  }
  async function handleBtn2(){
    await btn2Fn()
    closeModal()
  }
  async function handleBtn3(){
    await btn3Fn()
    closeModal()
  }
  return {
    modalObj,
    emit, handleBtn1, handleBtn2, handleBtn3, closeModal,
  }
}