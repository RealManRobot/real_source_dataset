/*
<SearchRender
  :searchParams="searchParams"
  @setSearchParams="e => searchParams=e"
  :searchList="searchList"
  @setSearchList="e => searchList = e"
  @changeSearch="e => getList(e)"
  :isShowSearch="true"
>
</SearchRender>
// js数据
const searchParams = ref({
  field1:'',
  field2:'',
  field3:'',
})
const searchList = ref([
  {type:'dateRange', label: '日期', key:'field1', width: 200, placeholder:'请选择', isShow: true, id: _.guID(), },
  {type:'select', label: '状态', key:'field2', width: 200, placeholder:'请选择', isShow: true, options: [{name:'选项1', value:'0'}, {name:'选项2', value:'1'}, {name:'选项3', value:'2'}], id: _.guID()},
  {type:'input', label: '输入框', key:'field3', width: 200, placeholder:'请输入', isShow: true, clearable: true, maxlength: 99999, showWordLimit: false, id: _.guID(), },
])
*/
import { ref, onMounted } from "vue"
export default function (props, emit) {
  let isSpread = ref(false)
  const _searchParams = ref({})
  // 搜索
  function search() {
    emit('changeSearch', { currentPage: 1 })
  }
  // 重置
  function reset() {
    emit('setSearchParams', _.deepCopy(_searchParams.value))
    emit('changeSearch', { currentPage: 1 })
  }
  // 切换是否展开
  function toogleSpread() {
    isSpread.value = !isSpread.value
    const searchList = props.searchList.map(v => ({...v, isShow: isSpread.value ? true : v._isShow }))
    emit('setSearchList', searchList)
  }
  onMounted(() => {
    _searchParams.value = _.deepCopy(props.searchParams)
  })
  return {
    isSpread,
    emit, search, reset, toogleSpread,
  }
}