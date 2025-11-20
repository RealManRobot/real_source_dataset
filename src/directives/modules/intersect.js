/**
 * 
 * @举例 
 * 出现在视口50%的时候触发
    <div
      v-intersect="{
        handler: onVisible,
        options: {
          root: null,
          threshold: 0.5
        },
        once: false ------->是否只触发一次
      }"
    >
      当我至少 50% 出现在视口时触发一次！
    </div>
 */
export const intersect = {
  mounted(el, binding) {
    const { handler, options = {}, once = false } = binding.value || {}
    if (typeof handler !== 'function') {
      console.warn('[v-intersect] handler must be a function')
      return
    }
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          handler(entry) // 调用回调函数

          if (once) {
            observerInstance.unobserve(el) // 只触发一次
          }
        }
      })
    }, options)
    el.__intersectObserver__ = observer
    observer.observe(el)
  },
  unmounted(el) {
    const observer = el.__intersectObserver__
    if (observer) {
      observer.disconnect()
    }
  }
}
