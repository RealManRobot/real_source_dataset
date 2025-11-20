/**
 * textarea高度自动调节指令
 * <textarea v-autoResize placeholder="输入内容自动扩展高度..." style="border:1px solid #ccc;max-height:300px;outline:none;width:300px;" class="rds5"></textarea>
 */
export const autoResize = {
  mounted(el) {
    if (el.tagName !== 'TEXTAREA') {
      console.warn('v-auto-resize 只能用在 <textarea> 元素上')
      return
    }
    const resize = () => {
      el.style.height = 'auto' // 先重置高度，避免撑不起来
      el.style.height = el.scrollHeight + 'px' // 设置为内容的高度
    }
    // 初始高度
    resize()
    // 监听输入事件
    el.__autoResizeHandler__ = resize
    el.addEventListener('input', resize)
  },
  unmounted(el) {
    el.removeEventListener('input', el.__autoResizeHandler__)
    delete el.__autoResizeHandler__
  }
}
