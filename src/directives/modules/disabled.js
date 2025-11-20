/**
 * 是否禁用
 * @param {Function}
 * 禁用： <div v-disabled="true">导入工程</div>
 * 不禁用： <div v-disabled="false">导入工程</div>
 */
export const disabled = {
  mounted(el, { value }) {
    el.disableFn = e => { e.stopPropagation(); e.preventDefault() }
    el.handler = val => {
      if (val === undefined) val = true
      if (['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {
        el.disabled = val
      }
      // el.targetElement = el.children && el.children.length === 1 ? el.children[0] : el
      if (val) {
        el.classList.add('disabled')
        el.addEventListener('click', el.disableFn, true)
      } else {
        el.classList.remove('disabled')
        el.removeEventListener('click', el.disableFn, true)
      }
    }
    el.handler(value)
  },
  updated(el, binding) {
    if (binding.oldValue !== binding.value) {
      el.handler(binding.value)
    }
  },
  unmounted(el) {
    el.classList.remove('disabled')
    el.removeEventListener('click', el.disableFn, true)
  }
}
