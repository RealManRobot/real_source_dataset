import { defineStore, createPinia } from 'pinia'
import { removeSessionStorage, getSessionStorage, setSessionStorage } from "@/common.js"
/**
 * 读取 
 * @举例 
 * <template>
 *   <p>Count: {{ counterStore.count }}</p>
 *   <button @click="counterStore.increment">Increment</button>
 *   <button @click="counterStore.decrement">Decrement</button>
 * </template>
 * -------------------------------------------
 * <script setup>
 *   import { useUserStore } from '@/stores/index.js'
 *   const counterStore = useUserStore()
 * </script>
 */
export const useUserStore = defineStore('user', {  
  state: () => ({  
    count: getSessionStorage('count') || 0, // 测试数据
    userInfo: getSessionStorage('userInfo') || {}, // 用户数据
  }),
  getters: {
    doubleCount: state => state.count * 2
  },
  actions: {
    increment() {
      this.count++
      setSessionStorage('count', this.count)
    },
    decrement() {
      this.count--
      setSessionStorage('count', this.count)
    },
    setUser(userInfo){
      this.userInfo = userInfo
      setSessionStorage('userInfo', this.userInfo)
    },
    clear(){
      this.count = ''
      this.userInfo = {}
      removeSessionStorage('count')  // 清掉缓存
      removeSessionStorage('userInfo')  // 清掉缓存
    }
  },
})
// 创建pinia实例
const pinia = createPinia()
export default pinia