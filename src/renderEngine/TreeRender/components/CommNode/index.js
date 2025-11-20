import { ref } from "vue"
export default function (props, emit) {
  function spreadItem(){
    const list = _.searchCover(props.list, {id: props.item.id}, v => ({...v, isSpread: !v.isSpread}))
    emit('setList', list)
  }
  function checkItem(isChecked){
    const { item } = props
    let list = _.tree2flat(props.list)
    let childIds = []
    let prevId = _.safeGet(() => list.find(v => v.id == item.id).pid, '')
    // 向右操作子元素选中
    list = list.map(v => {
      if(v.id == item.id) { // 当前元素是否选中
        v.isChecked = isChecked
        if(v.isChecked) { v.isIndeterminate = false }
      } else if(v.pid == item.id || childIds.includes(v.pid)) { // 当前元素的子元素是否选中
        v.isChecked = isChecked
        childIds.push(v.id)
        if(v.isChecked) { v.isIndeterminate = false }
      }
      return v
    })
    // 向左操作选中
    while(prevId != 0) {
      list = _.searchCover(list, {id: prevId}, v => {
        const child = list.filter(k => k.pid == prevId)
        v.isChecked = child.every(h => h.isChecked)
        v.isIndeterminate = child.some(h => h.isChecked || h.isIndeterminate) && !v.isChecked
        return v
      })
      prevId = _.safeGet(() => list.find(v => v.id == prevId).pid, 0)
    }
    emit('setList', _.flat2tree(list))
    emit('getCurItem', {...item, isChecked})
  }
  return {
    emit, spreadItem, checkItem,
  }
}