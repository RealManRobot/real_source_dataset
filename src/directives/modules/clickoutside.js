/**
 * <div v-clickoutside="() => isSpread=false">测试</div>
 */
export const clickoutside =  {
  mounted(el, binding) {
    el.__clickOutsideHandler__ = (event) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value(event) // 触发传进来的回调
      }
    }
    document.addEventListener('click', el.__clickOutsideHandler__)
  },
  unmounted(el) {
    document.removeEventListener('click', el.__clickOutsideHandler__)
    delete el.__clickOutsideHandler__
  }
}
