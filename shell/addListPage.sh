#!/bin/bash
# 使用方法： ./_addPage.sh doctor
# 使用方法： ./_addPage.sh AddUser components
# 1. 获取组件名
name=$1
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
cd ../src
if [ -z "$name" ]; then
  echo "❌ 请输入组件名"
  exit 1
fi
# 2. 生成路径，默认的话，是在src/views/目录下
dir=${2:-"./views"}/$name
# 3. 判断目录是否已存在，避免覆盖
if [ -d "$dir" ]; then
  echo "⚠️ 目录 $dir 已存在，操作已取消。"
  exit 1
fi
# 4. 创建目录
mkdir -p "$dir"
if [ $? -ne 0 ]; then
  echo "❌ 目录创建失败，请检查权限或磁盘空间。"
  exit 1
fi

# 5. 创建 index.vue 并填入模板内容
cat > "$dir/index.vue" <<EOF
<template>
  <div class="pl30 pr30 pt30">
    <!--上方的搜索-->
    <div class="mb20">
      <SearchRender
        :searchParams="searchParams"
        @setSearchParams="e => searchParams=e"
        :searchList="searchList"
        @setSearchList="e => searchList = e"
        @changeSearch="e => getList(e)"
        :isShowSearch="true"
      >
      </SearchRender>
    </div>
    <!--下方的列表-->
    <TableRender :tableObj="tableObj" @setTableObj="e => tableObj = e" @changeTable="e => getList(e)">
      <template #action="row">
        <el-button size="small" type="danger">
          删除{{row.title}}
        </el-button>
      </template>
    </TableRender>
  </div>
</template>
<script>
import f from "./index.js"
export default {
  components: {
  },
  props: {
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped>
</style>
EOF
if [ $? -ne 0 ]; then
  echo "❌ 创建 index.vue 文件失败。"
  exit 1
fi
# 6. 创建 index.js，并填入模板内容
cat > "$dir/index.js" <<EOF
import { onMounted, ref } from 'vue'
export default function (props, emit) {
  // 搜索参数
  const searchParams = ref({
    field1:'',
    field2:'',
    field3:'',
  })
  const searchList = ref([
    {type:'dateRange', label: '日期', key:'field1', placeholder:'请选择', isShow: true, id: _.guID(), },
    {type:'select', label: '状态', key:'field2', placeholder:'请选择', isShow: true, options: [{name:'选项1', value:'0'}, {name:'选项2', value:'1'}, {name:'选项3', value:'2'}], id: _.guID()},
    {type:'input', label: '输入框', key:'field3', placeholder:'请输入', isShow: true, id: _.guID(), },
  ])
  // 列表参数
  const tableObj = ref({
    head: [
      {title: '字段1', key: 'field1', minWidth: 100, align:'center'},
      {title: '字段2', key: 'field2', minWidth: 140, align:'center'},
      {title: '字段3', key: 'field3', minWidth: 140, align:'center'},
      {title: '字段4', key: 'field4', minWidth: 100, align:'center'},
      {title: '字段5', key: 'field5', minWidth: 100, align:'center'},
      {title: '操作', slot: 'action', minWidth: 100, align: 'center', fixed: 'right'}
    ], // 表头
    list: [], // 数据
    currentPage:1, //  当前页码
    pageSize:10, // 每页多少条
    totalCount:0, // 总数
    loading: false, // 表格是否正在loading
  })
  // 获取列表数据
  async function getList(){
    tableObj.value.loading = true
    const res = await _.endFetch('https://jsonplaceholder.typicode.com/posts')
    tableObj.value.loading = false
    tableObj.value.list = res.slice(0, 10)
  }
  onMounted(() => {
    getList()
  })
  return {
    searchParams, searchList, tableObj, 
    emit, getList,
  }
}
EOF
if [ $? -ne 0 ]; then
  echo "❌ 创建 index.js 文件失败。"
  exit 1
fi
# 7. 创建空的 index.css 文件
touch "$dir/index.css"
if [ $? -ne 0 ]; then
  echo "❌ 创建 index.css 文件失败。"
  exit 1
fi
# 8. 如果需要，可以创建 .gitkeep 文件（以便保持空目录）
# touch "$dir/.gitkeep"
# 9. 提示用户创建成功
echo -e "✅ 页面组件 '\033[1;32m$name\033[0m' 已创建完成于 \033[1;34m$dir\033[0m"
