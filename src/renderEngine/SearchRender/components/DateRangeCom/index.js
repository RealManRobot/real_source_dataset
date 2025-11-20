import { ref } from "vue"
import { dateFormat } from "@/common.js"
export default function (props, emit) {
  function changeVal (e) {
    if(!e) {return }
    const [startDate, endDate] = e
    const value = [dateFormat('YYYY-MM-DD', startDate), dateFormat('YYYY-MM-DD', endDate)]
    const searchList = _.searchCover(props.searchList, {id: props.item.id}, v => ({...v, value}))
    emit('setSearchList', searchList)
    const getParams = searchList.reduce((prev, item) => (prev[item.key] = item.value, prev), {})
    emit('changeSearch', {page: 1, ...getParams })
  }
  return {
    emit, changeVal,
  }
}