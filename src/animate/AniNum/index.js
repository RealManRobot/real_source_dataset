/**
  <AniNumRender :num="num" :height="40" classList="fs18r bdc" :styleObj="{color: 'rgba(4,152,255)'}" :isShowSplit="true" ></AniNumRender>
  // 读取到接口数据之后这么设置，即可触发动画效果啦~
  const num = ref('')
  num.value = '123.35'
 */
import { ref, watch } from "vue"
export default function (props, emit) {
  const list = ref([])
  watch(() => [props.num], newVal => {
    const numStr = String(newVal)
    let [left, right, dot] = ['', '', '']
    if(numStr.includes('.')) {
      ;[left, right] = numStr.split('.')
      dot = '.'
    } else {
      left = numStr
    }
    const symbol = left[0] == '-' ? '-' : '' // 支持一下负数的显示
    const leftVal = left.replace('-', '') // 无符号整数部分
    // console.log(_.chunk(leftVal.split(''), 3, 'last'))
    // console.log(`${symbol}${leftStr}${dot}${right}`)
    const leftArr = _.chunk(leftVal.split(''), 3, 'last').map(v => v.join(''))
    const leftStr =  leftArr.join(props.isShowSplit ? ',' : '')
    list.value = `${symbol}${leftStr}${dot}${right}`.split('')
  })
  return {
    list,
    emit,
  }
}