import { onBeforeUnmount, ref, onUnmounted, watch } from 'vue'
/**  
 * 时间监听销毁hooks
 * const { addEvent, removeEvent } = useEvent()
 * function resizeHandler(){
 *   // xxx
 * }
 * addEvent('resize', resizeHandler)
 * addEvent('scroll', scrollHandler)
 * @returns 
 */
export function useEvent() {
  // 用于存储所有注册的事件类型和对应的处理函数
  const eventObj = {}
  // 添加事件监听器
  const addEvent = (key, fn) => {
    eventObj[key] ||= [] // 如果事件类型没有处理函数列表，初始化为空数组
    const fns = eventObj[key]
    if(!fns.includes(fn)){
      window.addEventListener(key, fn)
      eventObj[key].push(fn) // 保存事件处理函数
    }
  }
  // 移除所有注册的事件监听器
  const removeEvent = () => {
    for (const key in eventObj) {
      if (eventObj[key]) { eventObj[key].forEach(fn => window.removeEventListener(key, fn)) }
    }
    Object.keys(eventObj).forEach(key => eventObj[key] = [])
  }
  // 在组件卸载时移除所有事件监听器
  onBeforeUnmount(() => removeEvent())
  return { addEvent, removeEvent }
}
/**
 * 时间间隔hooks
 * @param {*} fn 执行函数
 * @param {*} time 延迟时间
 * @param {*} immediate 是否立即触发一次
 * @returns 
 * @举例
  const intervalObj = _.useInterval(() => {
    // ...  
  }, 3000)
  @暂停 intervalObj.stop()
  @开始 intervalObj.start()
  @是否正在运行 intervalObj.isRunning.value
  @开始正在请求 intervalObj.isFetching.value
 */
export function useInterval(fn, time, immediate = true) {
  const isFetching = ref(false)
  const isRunning = ref(false)
  let timer = null
  async function loop() {
    if (!isRunning.value || isFetching.value) return
    isFetching.value = true
    timer = setTimeout(async () => {
      await _.tryCatch(
        fn,
        e => console.error("请求失败:", e),
        () => {
          isFetching.value = false
          isRunning.value && loop()
        }
      )
    }, time)
  }
  async function start() {
    if (!isRunning.value) {
      isRunning.value = true
      if (immediate) {
        await _.tryCatch(fn, e => console.error("请求失败:", e))
      }
      loop()
    }
  }
  function stop() {
    isRunning.value = false
    isFetching.value = false
    clearTimeout(timer)
  }
  start()
  onUnmounted(stop)
  return { start, stop, isRunning, isFetching }
}
/**
 * 定时器
 * @param {Function} callback - 到时间后执行的函数
 * @param {Number|Ref|null} delay - 延迟时间（ms），为 null 表示不启动
 */
export function useTimeout(fn, delay) {
  const timer = ref(null)
  function start(){
    clear()
    if (typeof delay === 'number' && delay >= 0) {
      timer.value = setTimeout(() => { fn() }, delay)
    }
  }
  function clear(){
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
  }
  // 自动启动 + 响应式 delay 支持
  watch(() => [delay], (newVal) => {
    const [delay] = newVal
    clear()
    if (typeof delay === 'number' && delay >= 0) {
      timer.value = setTimeout(() => fn(), delay)
    }
  }, {immediate: true})
  onBeforeUnmount(() => {
    clear()
  })
  return { start, clear }
}