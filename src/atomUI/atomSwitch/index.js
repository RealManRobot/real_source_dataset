/**
<atomSwitch label="是否禁用：" :value="isStart" @setValue="e => isStart = e" background="#1aada7" trueText="是" falseText="否"></atomSwitch>
*/
import { ref } from "vue"
export default function (props, emit) {
  
  return {
    
    emit,
  }
}