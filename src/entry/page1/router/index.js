import { createRouter, createWebHashHistory } from 'vue-router'
import { isArray } from "@/common.js"
// 批量读取路由
const r = import.meta.glob("./modules/*.js", {eager: true})
export const routerList = Object.keys(r).reduce((prev, item) => [...prev, ...isArray(r[item].default) ? r[item].default : [r[item].default]], []).sort((a, b) => a.meta.sort - b.meta.sort)

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: { name: '/page1', meta: {isShow: false}} },
    ...routerList
  ]
})
export const go = (options = {}) => router.push({ path: '', name: '', query: {}, params: {}, ...options }).catch(() => {})
/**
 * 返回前几页
 * @param {*} times -1则为返回前一页   -2则为返回前2页
 * @returns 
 * @举例 goBack(-1)
 */
export const goBack = (function() {
  let prevHref = '' // 上一次的路由
  return function (times = -1){
    prevHref = safeGet(() => window.location.href.split('#')[1].split('?')[0], '')
    router.go(times)
    setTimeout(() => {
      if(router.currentRoute.value.name == prevHref) {
        goBack(times)
      }
    }, 50)
  }
})()
export default router
