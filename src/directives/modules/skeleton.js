/**
 * 骨架屏：skeleton.js
  <div v-skeleton:18="loading" style="height:500px;" class="bdc">
    <p v-if="!loading">真实数据123123</p>
  </div>
  const loading = ref(true)
 */
export const skeleton = {
  mounted(el, binding) {
    _.addStyle(`.v-skeleton-wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .v-skeleton-bar {
      height: 16px;
      border-radius: 4px;
      background: linear-gradient(90deg, #eee 25%, #ddd 37%, #eee 63%);
      background-size: 400% 100%;
      animation: v-skeleton-loading 1.4s ease infinite;
    }
    @keyframes v-skeleton-loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    `, 'skeletonId')
    createSkeleton(el, binding)
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      createSkeleton(el, binding)
    }
  },
  unmounted(el) {
    if (el._skeletonWrapper) {
      el.removeChild(el._skeletonWrapper)
      el._skeletonWrapper = null
    }
  }
}
function createSkeleton(el, binding) {
  const loading = binding.value

  // 移除旧的骨架
  if (el._skeletonWrapper) {
    el.removeChild(el._skeletonWrapper)
    el._skeletonWrapper = null
  }

  if (!loading) return

  // 创建骨架容器
  const wrapper = document.createElement('div')
  wrapper.className = 'v-skeleton-wrapper'

  // 默认显示 3 行长条
  const rows = binding.arg ? Number(binding.arg) : 3
  for (let i = 0; i < rows; i++) {
    const bar = document.createElement('div')
    bar.className = 'v-skeleton-bar'
    if(i == 0) {
      bar.style.width = '33%'
    } else if(i == rows - 1) {
      bar.style.width = '70%'
    }
    wrapper.appendChild(bar)
  }

  el.style.position = 'relative'
  el.style.minHeight = `${rows * 20}px`
  el.appendChild(wrapper)
  el._skeletonWrapper = wrapper
}
