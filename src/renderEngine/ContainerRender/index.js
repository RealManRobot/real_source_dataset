/*
<ContainerRender :listObj="listObj" @getList="getList">
  <div v-for="item in listObj.list" :key="item.id"></div> 
</ContainerRender>
const listObj = ref({
  list: [],
  isLoad: false, 
  page: 1,
  size: 10,
  total: 0,
})
*/
import { ref } from "vue"
export default function (props, emit) {
  const loadObj = ref({
    isShow: true,
    type: 'second', // second：按照秒    percent: 按照百分比
    layout:'y', // square: 遮罩 + 数字进度     circle: 环形loading + 数字进度   y：纵向显示    x：横向显示
    second: 5, // 如果type为second。此字段才会生效。此字段表示：loading总耗时
    percent: 0, // 此字段表表示：当前进度
    text: '加载中...',
    range: 'area', // area：局部loading    global:全局loading
    color: '#ec6102', // 文字颜色 #409eff
    circleColor: '#ec6102', // 圆圈颜色  #409eff
    // maskBackground: 'rgba(0,0,0,.3)',
  })
  return {
    loadObj,
    emit,
  }
}