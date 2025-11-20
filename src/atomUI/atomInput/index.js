/**
举例：直接传入值，和修改值的方法
  <atomInput :value="formObj.name" @setValue="e => formObj.name=e" width="100%" placeholder="请输入姓名" 
    v-id v-label="'姓名：'"v-required="formObj.name" v-int 
    :isShowSearchIcon="false" :isShowCloseIcon="true" :clearable="true" :maxlength="9999" :disabled="false" :readonly="false"
  >
  </atomInput>
*/
import { nextTick, ref } from "vue"
export default function (props, emit) {
  const inputId = _.guID()
  // 清空数据
  function clearVal(){
    emit('setValue', '')
    nextTick(() => _.getDom(inputId).dispatchEvent(new Event('input')))
  }
  return {
    inputId,
    emit, clearVal,
  }
}