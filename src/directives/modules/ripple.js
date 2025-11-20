
/**
 * 水波指令
 * 使用默认背景色： <div v-ripple>导入工程</div>
 * 使用自定义背景色： <div v-ripple="'rgba(0, 0, 0, 0.2)'">导入工程</div>
 */
export const ripple = {
  mounted(el, binding) {
    el.style.position = el.style.position || 'relative'
    el.style.overflow = 'hidden'
    el.addEventListener('click', (e) => {
      const rect = el.getBoundingClientRect()
      const ripple = document.createElement('span')
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      ripple.style.position = 'absolute'
      ripple.style.borderRadius = '50%'
      ripple.style.pointerEvents = 'none'
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      ripple.style.backgroundColor = binding.value || 'rgba(255, 255, 255, .5)'
      ripple.style.transform = 'scale(0)'
      ripple.style.opacity = '0.75'
      ripple.style.transition = 'transform 0.6s ease-out, opacity 0.4s ease-out'
      ripple.className = 'v-ripple-effect'
      el.appendChild(ripple)
      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(2.5)'
        ripple.style.opacity = '0'
      })
      setTimeout(() => { ripple.remove() }, 600)
    })
  },
}
