/**
下拉选择。
<atomSelect :value="cusSelectVal" @setValue="e => cusSelectVal=e" width="220px" height="32px">
  <div 
    v-for="item in optionsList" :key="item.id" :class="['n hover-bgf5f7fa pt5 pb5 pl10 pr10 borderBox', item.id == cusSelectVal ? 'g1890ff b' : '']" 
    @click="cusSelectVal=item.id" 
  >
    {{item.label}}
  </div>
</atomSelect>

数据
const cusSelectVal = ref('')
const optionsList = ref([
  {id: 1, label: '选项1', value:1},
  {id: 2, label: '选项2', value:2},
  {id: 3, label: '选项3', value:3},
  {id: 4, label: '选项4', value:4},
  {id: 5, label: '选项5', value:5},
  {id: 6, label: '选项6', value:6},
])
 */
import { ref, watch } from "vue"
export default function (props, emit, slots) {
  const isSpread = ref(false)
  const showLabel = ref('')
  watch(() => [props.value], newVal => {
    const [value] = newVal
    // console.log(value)
    const slotVNodes = slots.default ? slots.default() : []
    const slotTexts = slotVNodes.map(v => v.children).flat(2)
    // console.log(slotTexts)
    showLabel.value = (slotTexts.find(v => v.props.key == value) || {}).children || ''
    // console.log(showLabel.value)
  }, {immediate: true})
  return {
    isSpread, showLabel,
    emit,
  }
}