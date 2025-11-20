/**
const radioList = ref([
  {id: _.guID(), isChecked: false,name: '选项1'},
  {id: _.guID(), isChecked: false,name: '选项1'},
  {id: _.guID(), isChecked: false,name: '选项1'},
  {id: _.guID(), isChecked: false,name: '选项1'},
  {id: _.guID(), isChecked: false,name: '选项1'},
])
<atomRadio v-for="item in radioList" :key="item.id" :value="item.isChecked" @click="radioList = $_.radioChecked(radioList, {id: item.id})">{{item.name}}</atomRadio>
 */
import { ref } from "vue"
export default function (props, emit) {
  
  return {
    
    emit,
  }
}