/**
<AniPercent :percent="percent" wrapperClass="" :wrapperStyle="{height:'12px', background:'#ebeef5'}">
  <template #default="{ val }"> 
    <div :class="['h100 rds30 f ac xe gf pr10 borderBox fs13 trans3', Number(val) > 80 ? 'red-theme' : 'blue-theme']" :style="{width:`${val}%`}"></div>
  </template>
</AniPercent>

const percent = ref(10)
 */
import { ref, computed, watch } from "vue"
export default function (props, emit) {
  const displayValue = ref(0)
  const fillWidth = ref(0)
  const wrapperStyle = computed(() => ({
    width: props.width,
    height: props.height,
    backgroundColor: '#e5e5e5',
    borderRadius: '4px',
    overflow: 'hidden',
    position: 'relative'
  }))
  const fillStyle = computed(() => ({
    width: fillWidth.value + '%',
    height: '100%',
    backgroundColor: '#409eff',
    transition: `width ${props.duration}ms ${props.easing}`,
    borderRadius: '4px',
  }))
  /** 动画逻辑 */
  watch( () => props.percent, (newVal) => {
    // 动态更新 width 和显示值
    fillWidth.value = newVal
    animateText(newVal)
  },{ immediate: true })
  function animateText(target) {
    const start = displayValue.value
    const change = target - start
    const startTime = performance.now()
    function animate(now) {
      const elapsed = now - startTime
      if (elapsed < props.duration) {
        const progress = elapsed / props.duration
        // easing: 这里简单使用线性，如果要支持多种 easing，可写函数映射
        displayValue.value = Math.round(start + change * progress)
        requestAnimationFrame(animate)
      } else {
        displayValue.value = target
      }
    }
    requestAnimationFrame(animate)
  }
  return {
    fillWidth, wrapperStyle, displayValue, fillStyle,
    emit,
  }
}