import { onMounted, ref, reactive } from 'vue'
export default function (props, emit) {
  const list = ref([
    { id: _.guID(), name: '张三', age: 18, score: 95 },
    { id: _.guID(), name: '李四', age: 20, score: 12 },
    { id: _.guID(), name: '王五', age: 20, score: 34 },
    { id: _.guID(), name: '张晓明', age: 20, score: 58 },
    { id: _.guID(), name: '王博', age: 20, score: 56 },
  ])
  const headerList = ref([
    { id: _.guID(), value:'姓名', props:'name', isChecked: true, class:' f ac xc bdlc', style: 'width:100px;height:35px' },
    { id: _.guID(), value:'年龄', props:'age',  isChecked: true, class:' f ac xc bdlc', style: 'width:100px;height:35px'},
    { id: _.guID(), value:'分数', props:'score', isChecked: true, class:' f ac xc bdlc bdrc', style: 'width:100px;height:35px'},
    // { id: _.guID(), value:'id', props:'id', isChecked: true, class:' f ac xc bdlc bdrc', style: 'width:300px;height:35px'},
  ])
  const tableList = ref([]) // 用headerList + list生成tableList
  function handleList(){
    const validHeaderList = headerList.value.filter(v => v.isChecked)
    tableList.value = validHeaderList.map((item, index) => [item, ...list.value.map((v, i) => ({...item, id:v.id, value: v[item.props] }))])
  }
  function selectItem(item){
    headerList.value = _.searchCover(headerList.value, {id: item.id}, v => ({...v, isChecked: !v.isChecked}))
    handleList()
  }
  function handleChange(list){
    headerList.value = list
    handleList()
  }
  onMounted(() => {
    handleList()
  })
  return {
    list, headerList, tableList,
    emit, handleChange, selectItem
  }
}