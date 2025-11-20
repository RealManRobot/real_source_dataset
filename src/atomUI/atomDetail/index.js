/**
 * 详情页显示功能
例子1：直接传递标题 + 描述文本
  <atomDetail label="模型描述：" labelClassName="" :text="item.description" textClassName="" nowrap="0"></atomDetail>
例子2：传递html字符串，支持手动调整样式等等
  <atomDetail>
    <template #label>
      <span class="nowrap">姓名：</span>
    </template>
    <template #text>
      <span class="nowrap1">张三</span>
    </template>
  </atomDetail>
  <atomDetail label="<div class='gred fs18 f ac xc'>描述</div>" text="这里是描述！这里是描述！这里是描述！这里是描述！这里是描述！" nowrap="1"></atomDetail>
*/
import { onMounted, ref } from "vue"
export default function (props, emit) {
  const id = _.guID()
  const tipId = _.guID()
  const isShowTip = ref(true)
  onMounted(() => {
    try {
      const el = _.getViewPos(id)
      const tipEl = _.getViewPos(tipId)
      if(el && tipEl) {
        isShowTip.value = tipEl.height - 25 > el.height
      }
    } catch(e) {
      // console.log(e)
    }
  })
  return {
    id, tipId, isShowTip,
    emit,
  }
}