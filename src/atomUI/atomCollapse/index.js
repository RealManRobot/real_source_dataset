/****
 举例1： 编写折叠面板
<atomCollapse :isSpread="isSpread" @setIsSpread="e => isSpread = e">
  <template #top>
    <div class="f ac gf pl20 pr20 bg1aada7 poi" style="height:42px;border-radius: 5px 5px 0 0">
      <div class="f1">折叠面板</div>
      <svg width="16" height="16" t="1682487153547" :class="['trans3', isSpread ? '' : 'tr180']" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6411"><path d="M506.4 275.8L82.8 710.5c-9.3 9.5-9.1 24.7 0.4 33.9 9.5 9.3 24.7 9.1 33.9-0.4l407-417.7 405.3 420.2c9.2 9.5 24.4 9.8 33.9 0.6 4.9-4.7 7.3-11 7.3-17.3 0-6-2.2-12-6.7-16.7L546.1 280c-1.6-1.7-3.4-3-5.3-4.1l-0.5-0.5c-9.5-9.3-24.7-9.1-33.9 0.4z" fill="#333" p-id="6412"></path></svg>
    </div>
  </template>
  <template #bottom>
    <div class="f pt10 pb10 ">
      <div class="tr" style="width:70px;">主诉：</div><div>患者感觉头晕</div>
    </div>
  </template>
</atomCollapse>

举例2： 下拉选择
<atomCollapse :isSpread="isSpread" @setIsSpread="e => isSpread = e">
  <template #top>
    <div class="f ac gf poi rel" style="border-radius: 5px 5px 0 0">
      <atomInput className="f1" type="input" v-id v-required="formObj.age" :value="formObj.age" @setValue="e => formObj.age=e" width="100%" placeholder="请输入选择" :clearable="true" :maxlength="9999" :disabled="false"></atomInput>
      <svg width="14" height="14" t="1682487153547" :class="['abs trans3', isSpread ? '' : 'tr180']" style="top:10px;right:10px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6411"><path d="M506.4 275.8L82.8 710.5c-9.3 9.5-9.1 24.7 0.4 33.9 9.5 9.3 24.7 9.1 33.9-0.4l407-417.7 405.3 420.2c9.2 9.5 24.4 9.8 33.9 0.6 4.9-4.7 7.3-11 7.3-17.3 0-6-2.2-12-6.7-16.7L546.1 280c-1.6-1.7-3.4-3-5.3-4.1l-0.5-0.5c-9.5-9.3-24.7-9.1-33.9 0.4z" fill="#666666" p-id="6412"></path></svg>
    </div>
  </template>
  <template #bottom>
    <div class="f pt10 pb10 pl10 poi">
      <div>主诉：</div>
      <div>患者感觉头晕</div>
    </div>
  </template>
</atomCollapse>
 */
import { ref } from "vue"

export default function (props, emit) {
  
  function toogleSpread(){
    emit('setIsSpread', !props.isSpread)
  }
  return {
    
    emit, toogleSpread,
  }
}