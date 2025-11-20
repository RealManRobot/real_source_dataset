import { ref } from "vue"
export default function (props, emit) {
  function spread(item){
    const list = _.searchCover(props.list, {id: item.id}, v => ({...v, isSpread: !v.isSpread}))
    emit('setList', list)
  }
  function clickItem(item){
    const list = _.searchCover(props.list, {id: item.id}, v => ({...v, isChecked: true }), v => ({...v, isChecked: false}))
    emit('setList', list)
    emit('getCurItem', item)
  }
  return {
    
    emit, spread, clickItem,
  }
}