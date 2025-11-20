import { ref } from "vue"

export default function (props, emit) {
  function reachBottom() {
    emit('reachBottom')
  }
  return {
    emit,reachBottom
  }
}