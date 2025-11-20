
/*
<LoadingRender v-if="loadObj.isShow" :loadObj="loadObj" @setLoadObj="e => loadObj = e"></LoadingRender>
const loadObj = ref({
  isShow: true,
  type: 'second', // second：按照秒    percent: 按照百分比
  layout:'square', // square: 遮罩 + 数字进度     circle: 环形loading + 数字进度   y：纵向显示    x：横向显示
  second: 10, // 如果type为second。此字段才会生效。此字段表示：loading总耗时
  percent: 0, // 此字段表表示：当前进度
  text: '加载中...',
  range: 'area', // area：局部loading    global:全局loading
  color: '#ec6102', // 文字颜色 #409eff
  circleColor: '#ec6102', // 圆圈颜色  #409eff
  maskBackground: 'rgba(0,0,0,.3)',
  zIndex: 10000,
})
*/
import { ref, onUnmounted  } from "vue"
export default function (props, emit) {
  let timer = null
  if(props.loadObj.type == 'second') {
    timer = setInterval(() => {
      let {percent, second} = props.loadObj
      const descrase = (100 - percent) / 4 / Number(second)
      percent = Number(_.round(_.range(percent + descrase, 0 ,99), 2))
      const newLoadObj = {...props.loadObj, percent}
      emit('setLoadObj', newLoadObj)
    }, 60)
    onUnmounted(() => {
      clearInterval(timer)
    })
  } else if(props.loadObj.type == 'percent'){

  }
  return {
    emit,
  }
}