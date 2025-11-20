/**
1、菜单树形式，可勾选、收起展开，点击
<TreeRender type="commonNode" :list="treeList" @setList="e => treeList = e" @getCurItem="getCurItem"></TreeRender>
2、文件树形式，可收起展开，点击
<TreeRender type="fileNode" :list="treeList" @setList="e => treeList = e" @getCurItem="getCurItem"></TreeRender>

const treeList = ref([
  {
    id: _.guID(), name: '一级菜单',  isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,
    children: [
      {id: _.guID(), name: '二级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true, children: []},
      {id: _.guID(), name: '二级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children: []},
      {id: _.guID(), name: '二级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children: []},
      {
        id: _.guID(), name: '二级菜单',isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,
        children: [
          { id: _.guID(), name: '三级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true, children:[]},
          { id: _.guID(), name: '三级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true, children:[]},
          { id: _.guID(), name: '三级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true, children:[]},
          { id: _.guID(), name: '三级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true, children:[]},
          { id: _.guID(), name: '三级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true, children:[]},
        ]
      },
      {id: _.guID(), name: '二级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children: []},
      {id: _.guID(), name: '二级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children: []},
      {id: _.guID(), name: '二级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children: []},
      {id: _.guID(), name: '二级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children: []},
      {
        id: _.guID(), name: '二级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,
        children: [
          { 
            id: _.guID(), name: '三级菜单',  isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,
            children: [
              {id: _.guID(), name: '四级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children:[{id: _.guID(), name: '五级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children:[]}]},
              {id: _.guID(), name: '四级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children:[{id: _.guID(), name: '五级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children:[]}]},
              {id: _.guID(), name: '四级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children:[{id: _.guID(), name: '五级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children:[]}]},
              {id: _.guID(), name: '四级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children:[{id: _.guID(), name: '五级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children:[]}]},
              {id: _.guID(), name: '四级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children:[{id: _.guID(), name: '五级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children:[]}]},
            ] 
          },
          {
            id: _.guID(), name: '三级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children: [] 
          },
          {
            id: _.guID(), name: '三级菜单', isSpread: true, isChecked: false, isIndeterminate: false, disabled: false, isShowCheckbox: true,children: [] 
          },
        ]
      }
    ]
  },
])
// 获取
function getCurItem(item){
  console.log(item)
}
*/
import { ref } from "vue"
export default function (props, emit) {
  return {
    emit,
  }
}