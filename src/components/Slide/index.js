/**
 * 左滑、右滑功能
 * 使用方法
 * @参数说明
 * @item 必填 数据数组的当前条目item  ----->  {id:'1', age: 18}
 * @list 必填 数据数组 ------> [{id:'1', age: 18},{id:'1', age: 18},{id:'1', age: 18},]
 * @type 选填 滑动类型 ------>   仅支持左滑['left']、仅支持右滑['right']、同时支持左滑和右滑['left', 'right']
 * @setList "v => list = v" 对list进行设置
    <div v-for="item in list" :key="item.id" class="mb10">
      <Slide :item="item" :list="list" @setList="v => list = v" :type="['left', 'right']">
        <div>我是内容</div>
      </Slide>
    </div>
 */
import { ref } from "vue"
export default function (props, emit) {
  function clickItem () {
    const list = _.searchCover(props.list, {id: props.item.id}, v => {
      if(v.slideType) { v.slideType = 0 }
      return v
    })
    emit('setList', list)
  }
  //滑动开始
  function touchStart(e) {
    // 记录初始位置
    const list = _.searchCover(props.list, {id: props.item.id}, v => ({...v, startX: e.touches[0].clientX, startY: e.touches[0].clientY}))
    emit('setList', list)
  }
  //滑动结束
  function touchEnd(e) {
    const { clientX: endX, clientY: endY } = e.changedTouches[0]
    const list = _.searchCover(props.list, {id: props.item.id}, v => {
      if(Math.abs(endY - v.startY) < 40) { // 上下滚动距离小于30
        let slideType = v.slideType || 0
        if(endX - v.startX > 30) { // 向右滑动距离超过30px， 判定为右滑
          slideType++
        } else if(endX - v.startX < -30){ // 向左滑动距离超过30px， 判定为左滑
          slideType--
        }
        const min = props.type.includes('left') ? -1 : 0
        const max = props.type.includes('right') ? 1 : 0
        v.slideType = _.range(slideType, min, max)
      }
      return v
    })
    emit('setList', list)
  }
  // 删除
  function del() {
    emit('leftFn', props.item)
  }
  return {
    clickItem, touchStart, touchEnd, del,
    emit,
  }
}