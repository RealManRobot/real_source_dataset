import { ref } from "vue"
export default function (props, emit) {
   // 调整
   function changeVal(e) {
    // if(!e) {return }
    let value = _.isString(e) || _.isNumber(e) ? e : e.target.value
    const searchList = _.searchCover(props.searchList, {id: props.item.id}, v => ({...v, value}))
    emit('setSearchList', searchList)
    const getParams = searchList.reduce((prev, item) => (prev[item.key] = item.value, prev), {})
    emit('changeSearch', {page: 1, ...getParams })
  }
  return {
    emit, changeVal,
  }
}