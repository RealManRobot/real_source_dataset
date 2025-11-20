
/**
 * 消失动画
<div
  v-fade="show"
  class="rds5 gf none bg1890ff f ac xc fs14"
  style="width:60px;height:34px;"
>
  保存
</div>
 */
export const fade = {
  mounted(el, binding) {
    el.style.transition = 'opacity 0.3s ease'
    if (binding.value) {
      el.style.opacity = 1
      el.style.display = ''
    } else {
      el.style.opacity = 0
      el.style.display = 'none'
    }
  },
  updated(el, binding) {
    if (binding.value === binding.oldValue) return
    if (binding.value) {
      // 显示元素
      el.style.display = ''
      requestAnimationFrame(() => el.style.opacity = 1)
    } else {
      // 隐藏元素（等待动画结束）
      el.style.opacity = 0
      el.addEventListener('transitionend',() => {
        if (el.style.opacity === '0') {
          el.style.display = 'none'
        }
      },{ once: true })
    }
  }
}
