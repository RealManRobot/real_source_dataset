import { ref } from "vue"
export default function (props, emit) {
  const changeVal = function (e) {
    // console.log(e)
    // if(!e) {return }
    e = e || ''
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