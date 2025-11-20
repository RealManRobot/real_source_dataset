
/**
 * 交互动画指令。可以配置按钮hover、点击的时候对应的------->拖拽、缩放、阴影、ripple效果。
<div
  v-feedback="{ scale:1, clickScale:0.95, shadow:'0 4px 10px rgba(0,0,0,0.3)', duration:200, ripple: true }"
  class="rds5 gf none bg1890ff f ac xc fs14"
  style="width:60px;height:34px;"
>
  保存
</div>
 */
export const feedback = {
  mounted(el, binding) {
    const config = {
      hover: true,
      click: true,
      drag: false,
      scale: 1.05,
      clickScale: 0.95,
      shadow: '0 5px 15px rgba(0,0,0,0.2)',
      duration: 150,
      easing: 'ease',
      ripple: true,
      ...binding.value
    }
    let isDragging = false
    let offset = { x: 0, y: 0 }

    // 初始化样式
    el.style.transition = `transform ${config.duration}ms ${config.easing}, box-shadow ${config.duration}ms ${config.easing}`
    el.style.cursor = config.drag ? 'grab' : 'pointer'
    el.style.position = config.drag ? 'relative' : el.style.position
    /** hover */
    const onMouseEnter = () => {
      if (config.hover && !isDragging) {
        el.style.transform = `scale(${config.scale})`
        el.style.boxShadow = config.shadow
      }
    }
    const onMouseLeave = () => {
      if (config.hover && !isDragging) {
        el.style.transform = 'scale(1)'
        el.style.boxShadow = 'none'
      }
    }
    /** click + 波纹 */
    const onMouseDown = (e) => {
      if (config.click && !isDragging) {
        el.style.transform = `scale(${config.clickScale})`
      }
      if (config.ripple) createRipple(e)
    }
    const onMouseUp = () => {
      if (config.click && !isDragging) {
        el.style.transform = `scale(${config.hover ? config.scale : 1})`
      }
    }

    /** drag */
    const onDragStart = (e) => {
      if (config.drag) {
        isDragging = true
        el.style.transition = 'none'
        el.style.transform = `scale(${config.scale})`
        el.style.boxShadow = config.shadow

        offset.x = e.offsetX || 0
        offset.y = e.offsetY || 0
      }
    }
    const onDrag = (e) => {
      if (isDragging && e.clientX && e.clientY) {
        const x = e.clientX - offset.x
        const y = e.clientY - offset.y
        el.style.position = 'absolute'
        el.style.left = x + 'px'
        el.style.top = y + 'px'
      }
    }
    const onDragEnd = () => {
      if (config.drag) {
        isDragging = false
        el.style.transition = `transform ${config.duration}ms ${config.easing}, box-shadow ${config.duration}ms ${config.easing}`
        el.style.transform = 'scale(1)'
        el.style.boxShadow = 'none'
      }
    }
    /** 波纹效果 */
    function createRipple(e) {
      const circle = document.createElement('span')
      const rect = el.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      circle.style.width = circle.style.height = size + 'px'
      circle.style.left = x + 'px'
      circle.style.top = y + 'px'
      circle.style.position = 'absolute'
      circle.style.background = 'rgba(255,255,255,0.4)'
      circle.style.borderRadius = '50%'
      circle.style.pointerEvents = 'none'
      circle.style.transform = 'scale(0)'
      circle.style.transition = 'transform 0.5s ease, opacity 0.5s ease'
      el.style.position = 'relative'
      el.appendChild(circle)

      requestAnimationFrame(() => {
        circle.style.transform = 'scale(2)'
        circle.style.opacity = '0'
      })
      setTimeout(() => circle.remove(), 500)
    }
    /** 事件绑定 */
    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('dragstart', onDragStart)
    el.addEventListener('drag', onDrag)
    el.addEventListener('dragend', onDragEnd)
    el._interaction_feedback = { onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onDragStart, onDrag, onDragEnd }
  },

  unmounted(el) {
    const { onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onDragStart, onDrag, onDragEnd } = el._interaction_feedback || {}
    if (onMouseEnter) el.removeEventListener('mouseenter', onMouseEnter)
    if (onMouseLeave) el.removeEventListener('mouseleave', onMouseLeave)
    if (onMouseDown) el.removeEventListener('mousedown', onMouseDown)
    if (onMouseUp) el.removeEventListener('mouseup', onMouseUp)
    if (onDragStart) el.removeEventListener('dragstart', onDragStart)
    if (onDrag) el.removeEventListener('drag', onDrag)
    if (onDragEnd) el.removeEventListener('dragend', onDragEnd)
    delete el._interaction_feedback
  }
}
