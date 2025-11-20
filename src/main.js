import { createApp } from 'vue'
import pinia from '@/stores/index.js'
import App from './App.vue'
import router from '@/router'
import renderEngine from '@/renderEngine/index.js'
import Directives from "@/directives/index.js"
import '@/common.css' // 通用样式
import "@/custom.css" // 客户自定义样式
import "@/addWinFn.js" // 注册事件
import '@/utils/px2rem.js' // 如果有移动端
import '@/utils/checkUpdate.js' // 监听检查版本更新
import * as Z from "@/common.js"
// import { t } from "@/i18n/index.js" // i18n 国际化

export const app = createApp(App)
app.config.globalProperties.$_ = Z // 全局挂载函数，让vue模板可用
// app.config.globalProperties.$t = t // 挂载到全局，组件中这么用。 1.翻译功能演示：<div>{{ $t('confirm') }}</div>    2.替换功能演示：<div>{{ $t('hello', { name: '张三' }) }}</div>
app.use(pinia)
app.use(router)
app.use(renderEngine) // 全局挂载渲染引擎
app.use(Directives) // 全局挂载渲染引擎
app.mount('#app')
