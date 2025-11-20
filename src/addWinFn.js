import * as Z from "./common.js"
import hooks from "@/hooks/index.js"
import { go, goBack } from "@/router/index.js"
import { ElMessage } from 'element-plus'
import { post, get, request, getFileStr, downLoad, endFetch, startFetch } from "./utils/network.js"
import { $zConfirm } from "@/components/index.js"
// 全局写入dpr到样式表中，用于适配移动端
document.documentElement.style.setProperty('--dpr', window.devicePixelRatio || 2)
// 全局注册公共函数
window._ = { 
  // 公共函数函数
  ...Z,
  ...hooks,
  // 网络请求
  post, get, request, getFileStr, downLoad, endFetch, startFetch,
  // 路由跳转
  go, goBack,
  // 打印信息
  message: {
    success:  (val, duration = 3000) => ElMessage({ message: val, grouping: true, type: 'success', duration}),
    warning:  (val, duration = 3000) => ElMessage({ message: val, grouping: true, type: 'warning', duration}),
    error:  (val, duration = 3000) => ElMessage({ message: val, grouping: true, type: 'error', duration}),
  },
  // 二次确认组件，命令式调用
  $zConfirm,
}