/**
<div class="pt100">
  <div class="f">
    <Column :column="column1"></Column>
    <Column :column="column2">
      <template #item="{ item, index }"> 
        <div v-if="index == 0">{{item.value}}{{ index }}-</div>  <!--自定义当前列第1行元素--->
        <div v-if="index == 1">{{item.value}}{{ index }}+</div>  <!--自定义当前列第2行元素--->
        <div v-if="index == 2">{{item.value}}{{ index }}[]</div> <!--自定义当前列第3行元素--->
        <div v-if="index == 3">{{item.value}}{{ index }}]</div>  <!--自定义当前列第4行元素--->
        <div v-if="index == 4">{{item.value}}{{ index }}1</div>  <!--自定义当前列第5行元素--->
        <div v-if="index == 5" class="g1890ff">{{item.value}}{{ index }}</div>  <!--自定义当前列第6行元素--->
      </template>
    </Column>
    <Column :column="column3"></Column>
    <Column :column="column4"></Column>
    <Column :column="column5"></Column>
    <Column :column="column6"></Column>
    <Column :column="column7"></Column>
    <Column :column="column8"></Column>
  </div>
</div>

const column1 = ref([
  {id: _.guID(), value: '个人情况', class:'f ac xc bdrc', style: 'width:100px;height:100%' },
])
const column2 = ref([
  {id: _.guID(), value: '姓名（中文）', class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '性别', class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '政治面貌', class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '民族', class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '健康状况', class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '体重', class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
])
const column3 = ref([
  {id: _.guID(), value: '张三阿萨德', class:'f ac xs nowrap', style: 'width:50px;height:35px;' },
  {id: _.guID(), value: '男', class:'f ac xs bdrc', style: 'width:50px;height:35px;' },
  {id: _.guID(), value: '', class:'f ac xs bdrc', style: 'width:50px;height:35px;' },
  {id: _.guID(), value: '', class:'f ac xs bdrc', style: 'width:50px;height:35px;' },
  {id: _.guID(), value: '', class:'f ac xs bdrc', style: 'width:50px;height:35px;' },
  {id: _.guID(), value: '',  class:'f ac xs bdrc', style: 'width:50px;height:35px;' },
])
const column4 = ref([
  {id: _.guID(), value: '',  class:'f ac xc bdrc', style: 'width:50px;height:35px;' },
  {id: _.guID(), value: '户籍',  class:'f ac xc bdrc', style: 'width:50px;height:35px;' },
  {id: _.guID(), value: '籍贯',  class:'f ac xc bdrc', style: 'width:50px;height:35px;' },
  {id: _.guID(), value: '婚否',  class:'f ac xc bdrc', style: 'width:50px;height:35px;' },
  {id: _.guID(), value: '身高',  class:'f ac xc bdrc', style: 'width:50px;height:35px;' },
  {id: _.guID(), value: '血型',  class:'f ac xc bdrc', style: 'width:50px;height:35px;' },
])
const column5 = ref([
  {id: _.guID(), value: '姓名（英文）',  class:'f ac xc ', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '',  class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '',  class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '',  class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '',  class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '',  class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
])
const column6 = ref([
  {id: _.guID(), value: '', class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '出生年月', class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '身份证号', class:'f ac xc bdrc', style: 'width:100px;height:70px;' },
  // {id: _.guID(), value: '毕业院校', class:'bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '目前学历', class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '专业',  class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
])
const column7 = ref([
  {id: _.guID(), value: '填表日期', class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '', class:'f ac xc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '', class:'f ac xc', style: 'width:100px;height:70px;' },
  // {id: _.guID(), value: '', class:'', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '', class:'f ac xc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '',  class:'f ac xc', style: 'width:100px;height:35px;' },
])
const column8 = ref([
  {id: _.guID(), value: '年  月  日', class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '', class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '', class:'f ac xc bdrc', style: 'width:100px;height:70px;' },
  // {id: _.guID(), value: '', class:'bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '', class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
  {id: _.guID(), value: '',  class:'f ac xc bdrc', style: 'width:100px;height:35px;' },
])
*/

import { ref } from "vue"
export default function (props, emit) {
  
  return {
    
    emit,
  }
}