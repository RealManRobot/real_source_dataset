import { createApp } from 'vue'
import pinia from '@/stores/index.js'
import App from './App.vue'
import router from './router/index.js'
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
app.use(pinia)  // 注意！！！！！这里可以用共享pinia数据，也可以自己定义一个pinia状态
app.use(router) // 注意！！！！！这里需要配置page1的路由，现在是写的SPA的路由。需要自己创建router1去改造
app.use(renderEngine) // 全局挂载渲染引擎
app.use(Directives) // 全局挂载渲染引擎
app.mount('#app')
