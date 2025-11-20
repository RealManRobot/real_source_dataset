import { ref, onMounted, onUnmounted } from 'vue'
import { addEvent, removeEvent } from "@/common.js"
/**
 * 获取鼠标坐标位置
 * @returns 
 * @举例
 * const {x, y} = _.useMouse()
 * 那么就能在网页上直接拿到鼠标数据了
 */
export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  const updateMouse = event => { x.value = event.clientX;y.value = event.clientY }
  onMounted(() => { addEvent('mousemove',updateMouse) })
  onUnmounted(() => { removeEvent('mousemove', updateMouse) })
  return { x, y }
}
/**
 * 监听鼠标按下状态
 * @returns 
 * const { isPressed } = _.useMousePressed()
 * isPressed 就能随时描述鼠标是否按下了
 */
export function useMousePressed() {
  const isPressed = ref(false)
  const onMouseDown = () => isPressed.value = true
  const onMouseUp = () => isPressed.value = false
  onMounted(() => {
    addEvent('mousedown', onMouseDown);
    addEvent('mouseup', onMouseUp);
  })
  onUnmounted(() => {
    removeEvent('mousedown', onMouseDown);
    removeEvent('mouseup', onMouseUp);
  })
  return { isPressed }
}

/**
 * 监听网页语言变化
 * @returns 
 * @举例
 * const { language } = useNavigatorLanguage()
 * language可以实时的拿到当前网站的语言
 */
export function useNavigatorLanguage() {
  const language = ref(navigator.language || 'en')
  function updateLanguage() {
    language.value = navigator.language || 'en'
  }
  onMounted(() => addEvent('languagechange', updateLanguage))
  onUnmounted(() => removeEvent('languagechange', updateLanguage))
  return { language }
}
/**
 * 获取网络状态
 * @returns 
 * @举例 
 * const { isOnline, type, effectiveType, downlink, rtt } = useNetwork()
 * 可以拿到网络是否在线、连接类型、有效网络类型、下载速度、网络延迟
 */
export function useNetwork() {
  const isOnline = ref(navigator.onLine)
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  const type = ref(connection?.type || 'unknown')
  const effectiveType = ref(connection?.effectiveType || 'unknown')
  const downlink = ref(connection?.downlink || 0) // 估计的下载速度（Mbps）
  const rtt = ref(connection?.rtt || 0); // 估计的往返时延（ms）
  const updateNetworkStatus = () => isOnline.value = navigator.onLine
  function updateConnectionInfo() {
    if (connection) {
      type.value = connection.type
      effectiveType.value = connection.effectiveType
      downlink.value = connection.downlink
      rtt.value = connection.rtt
    }
  }
  onMounted(() => {
    addEvent('online', updateNetworkStatus)
    addEvent('offline', updateNetworkStatus)
    connection && connection.addEventListener('change', updateConnectionInfo)
  })
  onUnmounted(() => {
    removeEvent('online', updateNetworkStatus)
    removeEvent('offline', updateNetworkStatus)
    connection && connection.removeEventListener('change', updateConnectionInfo)
  })
  return { isOnline, type, effectiveType, downlink, rtt }
}
