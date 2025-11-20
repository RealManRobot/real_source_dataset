// import { ref } from "vue"
/**
 * 多选checkbox
 * 
const checkList = ref([
  {id: _.guID(), isChecked: false,name: '选项1'},
  {id: _.guID(), isChecked: false,name: '选项2'},
  {id: _.guID(), isChecked: false,name: '选项3'},
  {id: _.guID(), isChecked: false,name: '选项4'},
  {id: _.guID(), isChecked: false,name: '选项5'},
  {id: _.guID(), isChecked: false,name: '选项6'},
])
<atomCheckBox v-for="item in checkList" :key="item.id" :value="item.isChecked" @click="checkList = $_.multipleChecked(checkList, {id: item.id})">{{item.name}}</atomCheckBox>
 */
export default function (props, emit) {
  return {
    emit,
  }
}