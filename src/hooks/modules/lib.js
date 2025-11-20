// // useEcharts.js
// import * as echarts from 'echarts'
// import { onMounted, onBeforeUnmount } from 'vue'
// import { isDom, getDom } from "@/common.js"
// /**
//  * 初始化echarts
//  * @param {*} e dom的id或者dom本身
//  * @returns 
//  */
// export function useEcharts(e) {
//   let chartInstance = null
//   // 初始化
//   const initChart = () => {
//     const el = getDom(e)
//     if (!el) return
//     chartInstance = echarts.init(el)
//     window.addEventListener('resize', resizeChart)
//   }
//   // 设置图表配置项
//   const setOptions = (option, clear = false) => {
//     if (!chartInstance) return
//     if (clear) chartInstance.clear()
//     chartInstance.setOption(option)
//   }
//   // resize 处理
//   const resizeChart = () => {
//     if (chartInstance) {
//       chartInstance.resize()
//     }
//   }
//   // 销毁图表
//   const destroyChart = () => {
//     if (chartInstance) {
//       window.removeEventListener('resize', resizeChart)
//       chartInstance.dispose()
//       chartInstance = null
//     }
//   }
//   onMounted(() => {
//     initChart()
//   })
//   onBeforeUnmount(() => {
//     destroyChart()
//   })
//   return {setOptions, resizeChart, getEcharts: () => chartInstance}
// }
