/* 
下拉按钮
<atomDropdown text="更多操作" width="100px" height="32px">
  <div class="n hover1890ff pt5 pb5 pl10 pr10 borderBox" style="width:100px;">操作1</div>
  <div class="n hover1890ff pt5 pb5 pl10 pr10 borderBox" style="width:100px;">操作2</div>
  <div class="n hover1890ff pt5 pb5 pl10 pr10 borderBox" style="width:100px;">操作3</div>
  <div class="n hover1890ff pt5 pb5 pl10 pr10 borderBox" style="width:100px;">操作4</div>
</atomDropdown> 
*/
import { ref } from "vue"
export default function (props, emit) {
  const isSpread = ref(false)
  
  return {
    isSpread,
    emit,
  }
}