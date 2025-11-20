/**
 point为0到10分的整数数据。2分代表1颗星   3代表一颗半
 readOnly  是否只读    为true则没有poi样式
<HalfStar :point="point" :size="size" :readOnly="readOnly" @setPoint="e => emit('setPoint', e)"></HalfStar>
 */
import { ref } from "vue"
export default function (props, emit) {
  const isSelectStar = ref(false)
  function mouseIn(e){
    if(!isSelectStar.value && !props.readOnly) {
      emit('setPoint', e + 1)
    }
  }
  function mouseout(e){
    if(!isSelectStar.value && !props.readOnly) {
      emit('setPoint', 0)
    }
    isSelectStar.value = false
  }
  function selectStar(e){
    if(!props.readOnly) {
      emit('setPoint', e + 1)
      isSelectStar.value = true
    }
  }
  return {
     
    emit, mouseIn, mouseout, selectStar
  }
}