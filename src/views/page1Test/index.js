import { ref } from "vue"
import { useUserStore } from '@/stores/index.js'
export default function (props, emit) {
  const counterStore = useUserStore()
  
  return {
    counterStore,
    emit,
  }
}