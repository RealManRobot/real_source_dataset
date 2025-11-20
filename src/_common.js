/******************************************************************************************** */
/************************这收录的是不常用，待废弃函数************************************************** */
/******************************************************************************************** */
/**
 * 交换数组中两个数据
 * @param {*} arr 原始数组
 * @param {*} index1 下标1
 * @param {*} index2 下标2
 * @returns 
 * @举例 swapArr([1,2,3,4,5], 0, 4) -------> [5,2,3,4,1]
 */
export function swapArr(arr, i, j) {
  if (!isArray(arr) || [i, j].some(k => k < 0 || k >= arr.length) || i === j) return arr
  const res = deepCopy(arr)
  ;[res[i], res[j]] = [res[j], res[i]]
  return res
}
/**
 * 缓存函数计算结果
 * @param {Function} fn 需要做缓存处理的函数
 * @returns {Function} 新的有缓存效果的函数
 * @举例 const cachedComputed = cached(function(val){ return val + 'ZZZ' })
 * @测试 cachedComputed('abc') ---> 'absZZZ' 第二次调用就不需要计算了直接取值 cachedComputed('abc') ---> 'absZZZ'
 */
export function cached(fn) {
  const cache = Object.create(null)
  return str => (!cache[str] && (cache[str] = fn(str)), cache[str])
}
/**
 * 扩展对象
 * @param {Object} to 需要扩展的目标对象
 * @param {Object} _from 从这个对象扩展
 * @returns 扩展之后的对象
 * @举例 extend({}, {name:1}) ----> {name: 1}
 */
export function extend(to, _from) {
  for(var key in _from) { to[key] = _from[key] }
  return to
}
/**
 * splitStr分割字符串
 * @param {*} str 字符串
 * @param {*} index 分割位置
 * @returns 
 * @举例子 splitStr('123456', 3) ------>  ['123', '456']
 */
export const splitStr = (str, index) => [str.slice(0, index), str.slice(index)]
// 完美的统计字符串长度，能正确统计占四个字节的Unicode字符。举例：length('x\uD83D\uDE80y') ----> 3
export const length = str => [...str].length
// 字符串字节数
export const charLen = value => [...(value || '')].reduce((prev, item) => prev + (item.charCodeAt() > 255 ? 2 : 1), 0)
/**
 * 一次性函数。每次第一次加载的时候只执行一次。后面再调用,没有任何函数代码执行
 * 示例：const aa = once(function (a, b){console.log(a + b)})
 * aa(1,2) ===> 3   ------>  aa(3, 4) ===> undefined
 */
export function once(fn) {
  var called = false
  return function () {
    if(!called) { called = true;fn.apply(this, arguments) }
  }
}
/**
 * 大数相加
 * @param {String | Number} num1 
 * @param {String | Number} num2 
 * @returns 相加后的大数
 * @举例 largeNumAdd('123000000000000000000000000010', '123000000000000000000000000009') ----> '246000000000000000000000000019'
 */
export const largeNumAdd = function (num1, num2){
  ;[num1, num2] = [String(num1), String(num2)]
  let maxLen = Math.max(num1.length, num2.length)
  const toggleNum = n => addZero(n, maxLen).split('').map(v => parseInt(v))
  ;[num1, num2] = [toggleNum(num1), toggleNum(num2)]
  const res = num1.reduceRight((prev, item, index) => {
    const figure = item + num2[index] + prev.carry
    return { sum: String(figure % 10) + prev.sum, carry: Math.floor(figure / 10) }
  }, {sum:'', carry: 0})
  return res.sum
}
/**
 * 组合函数
 * @param  {...Function} funcs
 * @举例 传入多个函数参数
 * @举例 const newFunc = compose(trim, upperCase) // 先去除空格，在转大写（从左往右执行）。
 * @举例 newFunc(' asfd d ')
 * @returns 组合后的函数 
 */
export const compose = (fns) => params => fns.reduce((prev, fn) => fn(prev), params) // 如果想反向可以reduceRight,反向遍历
/**
 * https://juejin.cn/post/6844903490771222542#heading-1
 * 柯里化函数
 * @param  {...Function} funcs 传入一个需要柯里化的函数
 * @举例1 var fn = curry(function(a, b, c) { console.log([a, b, c]) })
 *       var fn1 = fn('a') // 进行柯里化，传入的一个参数作为固定参数，返回新函数
 *       fn1('2', '3') // ['a', '2', '3']
 *       fn1('b', 'c') // ['a', 'b', 'c']
 * @举例2 var fn = curry(function(a, b, c) { console.log([a, b, c]);}, ['a']) // 也就是构建柯里化的时候也能顺便传入参数
 *       fn1('2', '3') // ['a', '2', '3']
 *       fn1('b', 'c') // ['a', 'b', 'c']
 * @returns 返回如果参数全了就返回计算后结果，否则产生柯里化之后的函数
 */
export function curry(fn, args = []) {
  return function() {
    var newArgs = [...args, ...arguments]
    return newArgs.length < fn.length ? curry.call(this, fn, newArgs) : fn.apply(this, newArgs)
  }
}
/**
 * 函数重载生成器
 * 描述：适用重载能有效地把本来在函数内部的内省判断，分割开来。单独去实现。同时函数名能保持一致性。
 * @returns 
 * @举例子 
 * const getUser = createOverLoad()
 * getUser.addFunc('Number,Number', (page, pageSize) => {console.log('根据页码和分页参数去查找')})
 * getUser.addFunc('Number', (page) => {console.log('根据页码和分页参数去查找')})
 * getUser.addFunc('String', (name) => {console.log('根据姓名去查找')})
 * getUser.addFunc('String,String', (name, gender) => {console.log('根据姓名和性别去查找')})
 * getUser(1,2)-------> '根据页码和分页参数去查找'
 * getUser('张三', '1')-----> '根据姓名和性别去查找'
 */
export function createOverLoad() {
  const callMap = new Map()
  function overLoad(...args){
    const fn = callMap.get(args.map(v => proto2String.call(v).slice(8, -1)).join(','))
    assert(isFunction(fn), '未找到对应的方法')
    return fn.apply(this, args)
  }
  overLoad.addFunc = (...args) => {
    const fn = args.pop()
    isFunction(fn) ? callMap.set(args.join(','), fn) : ''
  }
  return overLoad
}
/**
 * 使用 PerformanceObserver 监听 fcp。计算白屏时间
 */
export function getFcpTime(){
  if (!!PerformanceObserver){
    try {
      const type = 'paint'
      if ((PerformanceObserver.supportedEntryTypes || []).includes(type)) {
        const observer = new PerformanceObserver((entryList)=>{
          for(const entry of entryList.getEntriesByName('first-contentful-paint')){
            const { startTime } = entry
            console.log(`首屏加载时间：${startTime}ms`)
          }
        })
        observer.observe({ entryTypes: [type] })
      }
    } catch (e) {
      console.warn('[assets-load-monitor] PerformanceObserver error:', (e || {}).message ? e.message : e)
    }
  }
}