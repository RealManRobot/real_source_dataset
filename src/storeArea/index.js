import { ref, watch } from 'vue'
/**1. 初始化key值 */
const STORAGE_KEY = 'userInfo'
const INIT_VALUE = { count: 0, text: '' }

const userInfo = ref(_.getSessionStorage(STORAGE_KEY) || { ...INIT_VALUE })
/**2. 自动监听变化 → 存储到 sessionStorage */
watch(() => [userInfo], newVal => {
  const [userInfo] = newVal
  _.setSessionStorage(STORAGE_KEY, userInfo)
}, { deep: true })
/**3. 修改方法 */
function setUserInfo(value) {
  // ✅ 部分更新，避免覆盖掉没传的字段
  userInfo.value = { ...userInfo.value, ...value }
}
/**4. 重置方法 */
function reset() {
  userInfo.value = { ...INIT_VALUE }
  _.removeSessionStorage(STORAGE_KEY)
}
export default {
  userInfo,
  setUserInfo,
  reset
}
