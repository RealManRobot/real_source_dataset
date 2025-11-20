/** 
 import PreviewImgs from "@/components/PreviewImgs.vue"
  <PreviewImgs
    :isShow="isShow" // 是否显示预览组价
    @setIsShow="e => isShow = e" // 固定写法，用来关闭预览组件的方法
    curImg="https://file.iviewui.com/images/image-demo-1.jpg" // 当前点击预览的图片链接，应该是一个变量，点击某一张图片的话，就赋值过去
    @setCurImg="e => curImg = e" // 用于设置当前选择的图片
    :imgArr="['https://file.iviewui.com/images/image-demo-1.jpg', 'https://health.gagctv.com/wechat/jjzs/static/ecg.png']" // 这里传入所有需要预览的图片链接。 如果不传就只预览一张
    :index="-1" // 默认预览的初始下标，>=0才会生效，否则按照curImg去定位位置
    @setIndex="e => index=e" // 固定写法，用于设置下标
  >
  </PreviewImgs>
*/
import { wait, range, downloadFile } from "@/common.js"
import { ref, watch } from 'vue'
export default function (props, emit) {
  let scale = ref(1) // 缩放系数
  let screenType = ref(0) // 是否全屏
  let rotate = ref(0) // 旋转角度
  watch(() => [props.isShow], async newVal => {
    const [isShow] = newVal
    if(isShow) {
      _.addEvent('keydown', handleKeyDown) // 绑定键盘事件
      if(props.imgArr.length === 0) {
        // console.error('预览数组不能为空')
      }
    } else {
      _.removeEvent('keydown', handleKeyDown) // 解绑键盘事件
      await wait(500)
      scale.value = 1 // 缩放系数
      screenType.value = 0 // 是否全屏
      rotate.value = 0 // 旋转角度
    }
  })
  /*************************************** */
  /**************function***************** */
  /*************************************** */
  async function handleKeyDown(e){
    e = e || window.event
    // console.log(e) // 此处可以打印查看按键key值
    const key = e.key.replace(/\s+/g, '') || e.code
    if(['ArrowDown', 'ArrowRight'].includes(key)) {
      next()
    } else if(['ArrowUp', 'ArrowLeft'].includes(key)) {
      prev()
    }
  }
  // 上一张
  function prev() {
    let newIndex = 0
    const calcPrevIndex = val => {
      const total = props.imgArr.length
      let index = (val - 1) % total
      if(index < 0) { index += total }
      return index
    }
    if(props.index >= 0) {
      newIndex = calcPrevIndex(props.index)
      emit('setIndex', newIndex)
    } else {
      newIndex = calcPrevIndex(props.imgArr.findIndex(v => v == props.curImg))
    }
    emit('setCurImg', props.imgArr[newIndex])
  }
  // 下一张
 function next() {
    const calcNextIndex = val => (val + 1) % props.imgArr.length
    let newIndex = 0
    if(props.index >= 0) {
      newIndex = calcNextIndex(props.index)
      emit('setIndex', newIndex)
    } else {
      newIndex = calcNextIndex(props.imgArr.findIndex(v => v == props.curImg))
    }
    emit('setCurImg', props.imgArr[newIndex])
  }
  // 鼠标滚动
  function mousewheel(e) {
    const { wheelDelta } = e
    if(wheelDelta >= 10) {
      scale.value = range(scale.value * 1.1 , 0.1, 4)
    } else if (wheelDelta <= -10){
      scale.value = range(scale.value * 0.9 , 0.1, 4)
    }
  }
  // 放大
  function large() {
    scale.value = range(scale.value * 1.1 , 0.1, 4)
  }
  // 放大
  function small() {
    scale.value = range(scale.value * 0.9 , 0.1, 4)
  }
  // 是否全屏
  function changeFullScreen() {
    scale.value = 1
    screenType.value = screenType.value == 0 ? 1 : 0
  }
  // 下载图片
  function downImg() {
    downloadFile(props.curImg, props.curImg)
  }
  return {
    scale, screenType, rotate, 
    emit, handleKeyDown, prev, next, mousewheel, large, small, changeFullScreen, downImg
  }
}
