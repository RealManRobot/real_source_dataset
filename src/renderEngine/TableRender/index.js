/**
 *表格渲染引擎
  <TableRender :tableObj="tableObj" @setTableObj="e => tableObj = e" @changeTable="e => getList(e)">
    <template #action="row">
      <el-button size="small" type="danger">
        删除{{row.title}}
      </el-button>
    </template>
  </TableRender>
==================数据=====================================
const tableObj = ref({
  head: [
    {title: '患者姓名',key: 'name',minWidth: 100,align:'center'},
    {title: '手机号',key: 'phone', minWidth: 140,align:'center'},
    {title: '身份证号',key: '_idNumber',minWidth: 140,align:'center'},
    {title: '短信内容',key: 'messageContent', minWidth: 100, align:'center'},
    {title: '发送时间',key: 'sendTime',minWidth: 100,align:'center'},
    {title: '发送状态',key: '_sendStatus',minWidth: 100,align:'center'},
    {title: '操作',slot: 'action',minWidth: 100,align: 'center', fixed: 'right'}
  ], // 表头
  list: [
    {name:'张三', phone: '18888179152', _idNumber:'32128114514524854',messageContent:'asdasdasd', sendTime:'2024-05-11',_sendStatus:'已发送'}
  ], // 数据
  currentPage:1, //  当前页码
  pageSize:10, // 每页多少条
  totalCount:0, // 总数
  loading: false, // 表格是否正在loading
})
*/
import { ref } from "vue"
export default function (props, emit) {
  function changePageAndSize(e){
    const tableObj = { ...props.tableObj, currentPage: e }
    emit('setTableObj', tableObj)
    emit('changeTable', {currentPage: e, pageSize: 10})
  }
  return {
    emit, changePageAndSize
  }
}