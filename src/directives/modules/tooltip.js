// v-tooltip.js
/**
 * 封装文字提示指令
<div class="dib poi" v-tooltip="{ text: '左侧提示', placement: 'top-left' }">左边来提示</div>
 */
import { addStyle } from "@/common.js"
export const tooltip =  {
  mounted(el, binding) {
    addStyle(`.v-tooltip {
      position: absolute;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.75);
      color: white;
      padding: 6px 10px;
      font-size: 12px;
      border-radius: 4px;
      white-space: nowrap;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .v-tooltip::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }
    .v-tooltip[data-placement^='top']::after {
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 6px 6px 0 6px;
      border-color: rgba(0, 0, 0, 0.75) transparent transparent transparent;
    }
    .v-tooltip[data-placement^='bottom']::after {
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 0 6px 6px 6px;
      border-color: transparent transparent rgba(0, 0, 0, 0.75) transparent;
    }
    .v-tooltip[data-placement^='left']::after {
      top: 50%;
      right: -6px;
      transform: translateY(-50%);
      border-width: 6px 0 6px 6px;
      border-color: transparent transparent transparent rgba(0, 0, 0, 0.75);
    }
    .v-tooltip[data-placement^='right']::after {
      top: 50%;
      left: -6px;
      transform: translateY(-50%);
      border-width: 6px 6px 6px 0;
      border-color: transparent rgba(0, 0, 0, 0.75) transparent transparent;
    }
    `, 'tooltipCustomCss')
    const getOptions = () => {
      if (typeof binding.value === 'string') {
        return { text: binding.value, placement: 'top-center' }
      }
      return {
        text: binding.value?.text || '',
        placement: binding.value?.placement || 'top-center'
      }
    }
    const createTooltip = () => {
      const { text, placement } = getOptions()
      const tooltip = document.createElement('div')
      tooltip.innerText = text
      tooltip.className = 'v-tooltip'
      tooltip.dataset.placement = placement
      tooltip.style.opacity = '0'
      document.body.appendChild(tooltip)
      el.__tooltipEl__ = tooltip
    }
    const showTooltip = () => {
      if (!el.__tooltipEl__) createTooltip()
      const tooltip = el.__tooltipEl__
      const { placement, text } = getOptions()
      tooltip.innerText = text
      tooltip.dataset.placement = placement
      tooltip.style.display = 'block'
      tooltip.style.opacity = '1'

      // 定位计算
      const rect = el.getBoundingClientRect()
      const scrollTop = window.scrollY
      const scrollLeft = window.scrollX
      const padding = 8
      tooltip.style.visibility = 'hidden'
      tooltip.style.left = '-9999px'
      tooltip.style.top = '-9999px'

      requestAnimationFrame(() => {
        const tW = tooltip.offsetWidth
        const tH = tooltip.offsetHeight
        const elX = rect.left + scrollLeft
        const elY = rect.top + scrollTop
        const elW = rect.width
        const elH = rect.height

        const positionMap = {
          'top-left': () => [elX, elY - tH - padding],
          'top-center': () => [elX + elW / 2 - tW / 2, elY - tH - padding],
          'top-right': () => [elX + elW - tW, elY - tH - padding],

          'bottom-left': () => [elX, elY + elH + padding],
          'bottom-center': () => [elX + elW / 2 - tW / 2, elY + elH + padding],
          'bottom-right': () => [elX + elW - tW, elY + elH + padding],

          'left-top': () => [elX - tW - padding, elY],
          'left-center': () => [elX - tW - padding, elY + elH / 2 - tH / 2],
          'left-bottom': () => [elX - tW - padding, elY + elH - tH],

          'right-top': () => [elX + elW + padding, elY],
          'right-center': () => [elX + elW + padding, elY + elH / 2 - tH / 2],
          'right-bottom': () => [elX + elW + padding, elY + elH - tH],
        }

        const [left, top] = (positionMap[placement] || positionMap['top-center'])()
        tooltip.style.left = `${left}px`
        tooltip.style.top = `${top}px`
        tooltip.style.visibility = 'visible'
      })
    }
    const hideTooltip = () => {
      const tooltip = el.__tooltipEl__
      if (tooltip) {
        tooltip.remove()
        el.__tooltipEl__ = null
      }
    }
    el.__tooltipHandlers__ = {
      mouseenter: showTooltip,
      mouseleave: hideTooltip
    }
    if(el.scrollWidth > el.clientWidth) { // 为true则代表文字超出了一行了
      el.addEventListener('mouseenter', showTooltip)
      el.addEventListener('mouseleave', hideTooltip)
    }
  },
  unmounted(el) {
    el.removeEventListener('mouseenter', el.__tooltipHandlers__.mouseenter)
    el.removeEventListener('mouseleave', el.__tooltipHandlers__.mouseleave)
    el.__tooltipEl__?.remove()
    el.__tooltipEl__ = null
  }
}
