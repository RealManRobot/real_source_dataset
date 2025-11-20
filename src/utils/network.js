
import { ElMessage } from 'element-plus'
export const BaseUrl = import.meta.env.MODE == 'development' ? import.meta.env.VITE_BASE_URL : `${window.location.protocol}//${window.location.host}`
// 基础请求
function baseFetch({url = '', params = {}, options = {method: 'GET'}, timeout = 8e3, reject = () => {}} = {}) {
  url = url.startsWith('http') ? url : `${BaseUrl}${url}`
  const controller = new AbortController() // #注释
  const signal = controller.signal // #注释
  const timer = setTimeout(() => { controller.abort(); reject && reject() }, timeout) // #注释
  const fetchOpts = {
    method: options.method || 'GET', // 设置请求方法为POST
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    signal, // #注释
    mode: 'cors',
  }
  if (options.method != 'GET') {
    if (!(params instanceof FormData)) { params = JSON.stringify(params) }
    fetchOpts.body = params
  }
  return fetch(url, fetchOpts).catch(e => console.log(e)).finally(() => clearTimeout(timer)) // #注释
  // return Promise.race([fetch(url, fetchOpts), new Promise((_, reject) => setTimeout(() => reject(new Error(`${url}请求超时`)), timeout))]) // #反注释
}
// 处理返回的结果
async function processResult(type, res, url){
  res = res && res.json ? await res.json() : {}
  if(type != 'data') { return res }
  if(!_.isObject(res)) { res = {code: 0, result: res, msg:''}} // 如果格式不对，前端包装一下
  if(res.code != 0 && res.code != 200){ const msg = res.msg || `${url}报错，errmsg为空`; ElMessage.error(msg); throw new Error(msg) }
  return res.result
}
/**
 * 封装一个request请求
 * @example request('/xxx', {id:1}, {method: 'POST'})
 */
export async function request(url, params = {}, options = {method: 'GET'}, type = 'data', timeout) {
  const res = await baseFetch({url, params, options, timeout})
  return processResult(type, res, url)
}
/**
 * 封装一个GET请求
 * @example get('/xxx', {id:1})
 */
export async function get(url, params= {}, type = 'data') {
  const res = await baseFetch({url, params, options: {method: 'GET'}})
  return processResult(type, res, url)
}
/**
 * 封装一个post请求
 * @example post('/xxx', {id:1})
 */
export async function post(url, params= {}, type = 'data') {
  const res = await baseFetch({url, params, options: {method: 'POST'}})
  return processResult(type, res, url)
}
/**
 * 获取https://xxxx.txt文本内容
 * @example getFileStr('/xxx')
 */
export async function getFileStr(url) {
  const res = await baseFetch({url})
  return processResult(type, res, url)
}
/**
 * 下载二进制文件
 * @example downLoad('/xxx', {id:1})
 */
export async function downLoad(url, params) {
  const response = await baseFetch({ url, params, options:{method: 'GET'}, timeout: 9999 })
  const blob = await response.blob()
  return blob
  // _.downloadFile(`${props.modelName}.zip`, blob)
}
/**
 * 可以重复请求，连续重复的url请求，只会渲染最后一次请求返回的结果。主要用于查询操作
 * @param {String} url 请求的url地址
 * @param {Object} params 请求参数
 * @param {String} method 请求方法
 * @param {*} type 返回数据类型  1代表只返回data    0代表不做任何处理直接返回格式：{code:xx, data:xx, msg:xx}
 * @returns
 * @举例 const res = await _.endFetch('/apprepair/editRepair', {id:1, name:'zz'})
 * @举例 const res = await _.endFetch('/apprepair/editRepair', {id:1, name:'zz'}, 'POST')
 * @举例 const res = await _.endFetch('/xxx?aa=1', {}, 'GET')
 */
export const endFetch = (function () {
  const reqRecord = new Map() // 记录已发起但未返回的请求： url<---->reject方法
  let start = +new Date() // 记录第一次点击时的时间戳
  return function (url, params, method = 'GET', type = 'data') {
    let end = +new Date() // 记录第一次以后的每次点击的时间戳
    if (end - start > 30e3) { reqRecord.clear() } // 30s后将记录全部清除
    start = end
    const req = (reject) => baseFetch({url, params, options: { method }, reject})
    if (reqRecord.get(url)) { reqRecord.get(url)(`放弃上次请求的渲染${url}`) } // 放弃请求
    const promiseA = new Promise((_, rej) => reqRecord.set(url, rej))
    return Promise.race([req(Promise.reject), promiseA]).then((res) => processResult(type, res, url))
  }
})()
/**
 * 防止重复请求，N毫秒内连续请求，只会请求一次。并且，第一次接口尚未返回则第二次请求被拒绝。主要用于新增操作
 * @param {*} url 请求的url地址
 * @param {*} params 请求参数
 * @param {*} type 返回数据类型  1代表只返回data    0代表不做任何处理直接返回格式：{code:xx, data:xx, msg:xx}
 * @returns
 * @举例 const res = await _.startFetch('https://jsonplaceholder.typicode.com', {id:1, name:'zz'}, 'POST')
 */
export const startFetch = (function (wait) {
  let start = +new Date() // 记录第一次点击时的时间戳
  const reqRecord = new Map() // 记录已发起但未返回的请求： url<--->reject方法
  return function (url, params, method = 'POST', type = 'data') {
    let end = +new Date() // 记录第一次以后的每次点击的时间戳
    if(end - start < wait && reqRecord.size != 0) { start = end;return Promise.reject(`取消当前请求${url}`) } // 执行处理函数后，将结束时间设置为开始时间，重新开始记时
    if (reqRecord.get(url)) { return Promise.reject(`取消当前请求${url}`) }
    reqRecord.set(url, url)
    return baseFetch({url, params, options: { method }}).then(async res => processResult(type, res, url)).finally(() => reqRecord.delete(url))
  }
})(1500)