/*
**********************************************************************************************
******************************************公共方法*********************************************
**********************************************************************************************
*/
export const proto2String = Object.prototype.toString
export const typeStr = val => proto2String.call(val).slice(8, -1) // 获取类型
export const checkType = type => val => type === typeStr(val) // 科里化----->生成类型判断函数
export const isArray = checkType('Array') // 判断是否为数组类型
export const isObject = checkType('Object') // 判断是否是对象类型
export const hasObjKey = val => isObject(val) && !!Reflect.ownKeys(val).length // 是否是空对象
export const isReference = val => isArray(val) || isObject(val) // 判断是否是引用类型
export const isNull = checkType('Null') // 判断是否是null
export const isUndefined = checkType('Undefined') // 判断是否是undefined
export const isFunction = e => typeof e == 'function' // 判断是否是一个函数类型
export const isRegExp = checkType('RegExp') // 判断是否是正则表达式类型
export const isString = checkType('String') // 判断是否是字符串类型
export const isNumber = checkType('Number') // 判断是否是数字类型
export const isBoolean = checkType('Boolean') // 判断是否是布尔类型
export const isEmpty = val => (isArray(val) && val.length===0) || (isObject(val) && Object.keys(val).length === 0) || isNull(val) || isUndefined(val) || val === '' || ((isMap(val) || isSet(val)) && val.size === 0)
export const isMap = checkType('Map') // 判断是否是Map类型
export const isSet = checkType('Set') // 判断是否是Set类型
export const isSymbol = checkType('Symbol') // 判断是否是Symbol类型
export const isDate = checkType('Date') // 判断是否是Date类型
export const isError = checkType('Error') // 判断是否是Error类型
export const isBlob = checkType('Blob') // 判断是否是Blob类型
export const isGt0 = val => !isNaN(Number(val)) && Number(val) > 0 // 是否是大于0的整数
export const isGtEq0 = val => !isNaN(Number(val)) && Number(val) >= 0 // 是否是大于等于0的整数
export const inBrowser = typeof window !== 'undefined' // 是否是在浏览器环境
export const isWeChat = () => /MicroMessenger/i.test(navigator.userAgent) // 是否为微信环境
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA) // 是否在IE环境
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0 // 是否是IE9
export const isEdge = UA && UA.indexOf('edge/') > 0 // 是否是Edge浏览器
export const isAndroid = () => /Android|Adr/i.test(navigator.userAgent) // 是否为安卓环境
export const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent) // 是否为ios环境
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge // 是否是谷歌浏览器
export const isPhantomJS = UA && /phantomjs/.test(UA)
export const isFirefox = UA && UA.match(/firefox\/(\d+)/) // 是否是火狐浏览器
export const isPhone = val => /^1[3456789]\d{9}$/.test(val) // 检测是否是手机号码
export const isIdentity = val => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val) // 身份证 321281155121152489
export const isEmail = val => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val) // 判断是否是正确的邮箱
export const isInVsCode = () => !!window.acquireVsCodeApi
export const isDom = val => val instanceof Element // 判断是否是dom元素
export const isHTML = val => /<\/?[a-z][\s\S]*>/i.test(val)
export const isIpv4 = ip => /^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})$/.test(ip)
export const isValidId = id => id !== null && id !== undefined && id !== '' && !isBoolean(id) // 判断是否是正确的id
/**
 * 获取设备类型：'mobile' | 'tablet' | 'pc'
 */
export const detectDevice = () => {
  if (typeof navigator === 'undefined') return 'pc' // SSR 安全
  const ua = navigator.userAgent
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const width = window.innerWidth
  if (/Android.+Mobile|iPhone|iPod|Windows Phone|Phone/i.test(ua)) return 'mobile'
  if (/iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua)) || (isTouch && width >= 768 && width < 1024)) return 'tablet'
  return 'pc'
}
export const isMobile = () => detectDevice() === 'mobile'
export const isTablet = () => detectDevice() === 'tablet'
export const isPC = () => detectDevice() === 'pc'
/**
 * 获取操作系统类型
 * @returns 
 * @举例 getOS()   获取操作系统类型
 */
export function getOS() {
  const userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || ''
  const appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || ''
  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios'
  if (/android/i.test(userAgent)) return 'android'
  if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
  if (/mac/i.test(appVersion)) return 'MacOSX'
  if (/win/i.test(appVersion)) return 'windows'
  if (/linux/i.test(appVersion)) return 'linux'
}
/**正则校验返回true || false
 * @param {String} val 需要正则校验的值
 * @param {reg} reg 正则表达式
 * @returns {Boolean}
 * @举例 regTest('123', /\d+/)
 */
export const regTest = (val, reg) => new RegExp(reg).test(val)
// 优化参数必填
function required(v){
  throw new Error(`${v || ''}参数必填`)
}
/**
 * 创建一个全局唯一ID, 用于vue的key值绑定
 * @param {number} 值越大，重复概率越低。20位已经接近0概率了
 *  长度14----> 创建1万条/ms时，重复概率0.064%
 *  长度15----> 创建1万条/ms时，重复概率0.0018%
 *  长度16----> 创建1万条/ms时，重复概率0.00005%
 *  长度17----> 创建1万条/ms时，重复概率0.00000137%
 *  长度18----> 创建1万条/ms时，重复概率0.000000038%
 *  长度19----> 创建1万条/ms时，重复概率0.000000001%
 *  长度20----> 创建1万条/ms时，重复概率 0.00000000000045% ≈ 0
 * @returns {Function} 返回一个生成全局唯一 ID 的函数
 * @example
 * console.log(guID()) // 输出一个全局唯一 ID
 */
export const guID = (function () {
  let counter = 0n
  return function(len = 20) {
    const t = Date.now().toString(36) // 毫秒时间戳，36 进制
    const remaining = Math.max(2, len - t.length) // 剩余长度给随机数和 counter
    const randomLen = Math.floor(remaining / 2)
    const counterLen = remaining - randomLen
    const r = Math.floor(Math.random() * 36**randomLen).toString(36) // 随机数
    const c = (counter++).toString(36)
    return (t + addZero(r, randomLen) + addZero(c, counterLen)).slice(0, len)
  }
})()
/*
**********************************************************************************************
******************************************字符串操作*******************************************
**********************************************************************************************
*/
/**
 * 固定裁剪几个字符之后显示省略号
 * @param {String} str 需要进行裁剪的字符串
 * @param {Number} num 要裁剪几位数字
 * @returns {String} 返回处理后的字符串
 * @举例 sliceStr('张三李四王五', 2) ----> "张三..."
 */
export const sliceStr = (str, num) => String(str).length > num ? String(str).slice(0, num) + '...' : String(str).slice(0, num)
/**
 * 数组转字符串
 * @param {*} val 需要转成字符串的值
 * @returns 
 * @举例 toString([{name:'zzz', age:18}]) ---> '[\n  {\n    "name": "asd",\n    "ae": "as"\n  }\n]'
 */
export const toString = val => val == null ? '' : isReference(val) ? JSON.stringify(val, null, 2) : String(val)
/** 返回是否以某个字符串开头
 * @param {String} str 目标字符串
 * @param {String} startWords 需要搜索的开头的字符串
 * @returns {Boolean} 返回布尔值，是否验证通过
 * @举例 startWith('name', 'na') ---> true
 */
export const startWith = (str, startWords) => str.slice(0, startWords.length) === startWords
/** 返回是否以某个字符串结尾
 * @param {String} str 目标字符串
 * @param {String} endWords 需要搜索的结尾的字符串
 * @returns {Boolean} 返回布尔值，是否验证通过
 * @举例 endWith('name', 'me') ---> true
 */
export const endWith = (str, endWords) => str.slice(0, endWords.length) === endWords
/**
 * 去除字符串中的空格
 * @param {String} str 需要去除空格的字符串
 * @param {Number} type 去除空格的类型 ----> 'headTail': 去除首尾空格   'all'：去除全部空格  'head'：去除头部空格  'tail'：去除尾部空格
 * @returns {String} 返回处理后的字符串
 * @举例 trim(' ab c  ')  ---> 'ab c' // 'headTail':去除首尾空格
 * @举例 trim(' ab c  ', 'all')  ---> 'abc' // 'all':去除全部空格
 * @举例 trim(' ab c  ', 'head')  ---> 'ab c  ' // 'head'：去除头部空格
 * @举例 trim(' ab c  ', 'tail')  ---> ' ab c' // 'tail'：去除尾部空格
 */
export function trim(str = '', type = 'headTail') {
  const mapReg = { 'headTail': new RegExp(/(^\s*)|(\s*$)/g),'all': new RegExp(/\s+/g),'head': new RegExp(/(^\s*)/g),'tail': new RegExp(/(\s*$)/g) }
  return str.replace(mapReg[type] || '', '')
}
/**
 * 字符串前置补0
 * @param {String} str 
 * @param {Number} num 
 * @returns 
 * @举例 addZero('1', 2) ----> '01'
 */
export const addZero = (str = '', num = 2) => (Array(num+1).join('0') + String(str)).slice(-num)
/**
 * 字符串复制
 * @param {String} e 需要复制的文本
 * @举例 copyLink('10086')  ----> ctrl + v 就能粘贴出10086
 */
export function copyLink(e){
  // if(!e) { return this.$Message.error('链接地址为空') }
  var input = document.createElement("input") // js创建一个input输入框
  input.value = e // 将需要复制的文本赋值到创建的input输入框中
  document.body.appendChild(input) // 将输入框暂时创建到实例里面
  input.select() // 选中输入框中的内容
  document.execCommand("Copy") // 执行复制操作
  document.body.removeChild(input) // 最后删除实例中临时创建的input输入框，完成复制操作
  // return this.$Message.success('复制成功')
}
/**
 * 字符串首字母大写
 * @param {String} str 
 * @returns 经过转换后的首字母为大写的字符串
 * @举例 capitalize('abcd')  ---->  'Abcd'
 */
export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
/*
**********************************************************************************************
******************************************数组方法*********************************************
**********************************************************************************************
*/
/**
 * 洗牌算法
 * @param {Array} arr 原始数组
 * @returns {Array} 打乱顺序后的数组
 * @举例 shuffle([1,2,3,4])  ---> 可能的结果：[2,4,1,3]
 */
export function shuffle(arr){
  if(!isArray(arr)) { arr = [arr] }
  for(let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
  }
  return arr
}
/**
 * 断言函数，用于做函数类型判断
 * @param {Boolean} err  判断出现异常 
 * @param {String} message 
 * @举例 assert(!isArray(arr) || arr.some(v => !isObject(v)), 'arr必须为对象数组')
 */
export function assert(err, message) { 
  if(!err){ throw new Error(message) }
}
/**
 * 是否匹配当前条目
 * @param {*} item 当前条目
 * @param {*} search 搜素条件，可以是对象也可以是函数
 * @param {*} index 当前判断的下标，用于数组遍历的时候判断，传入index，可以不传
 * @returns 
 * @举例子 isCurItem({name: 'zaz', age: 18}, v => v.name == 'zaz') -----> true
 * @举例子 isCurItem({name: 'zaz', age: 18}, v => v.name == 'ss') -----> false
 * @举例子 isCurItem({name: 'zaz', age: 18}, { name: 'zaz' }) -----> true
 * @举例子 isCurItem({name: 'zaz', age: 18}, { name: 'ss' }) -----> false
 */
export function isCurItem(item, search, index) {
  if (isObject(search)) return Object.keys(search).every(key => search[key] == item[key])
  if (isFunction(search)) return search(item, index)
  return false
}
/**
 * 匹配目标对象进行字段调整，支持递归修改
 * @param {Array<Object>} arr 需要操作的数据
 * @param {Object|Function} search 需要查询的json对象 | 也可以传入校验函数
 * @param {Function} success 成功匹配的处理函数--->接受一个item，返回一个新的item
 * @param {Function} fail 失败匹配的处理函数---->接受一个item，返回一个新的item
 * @param {String} field 需要递归处理的字段，默认递归处理children字段
 * @param {String} deep 是否需要深拷贝
 * @举例1 
  searchCover(
    [{id:1, type: 'aa', age:17}, {id:2, type: 'bb', age:20}, {id:3, type: 'cc', age:21}],
    v => v.age < 18, // 代表匹配age <= 18的数据
    v => ({ ...v, type: '未成年' }),  // 匹配成功执行这个函数
    v => ({ ...v, type: '成年' })  // 匹配失败的执行这个函数
  )
  得到如下结果-----------> 
  [{id: 1, type: '未成年', age: 17}, {id: 2, type: '成年', age: 20}, {id: 3, type: '成年', age: 21}]
 * @举例2 支持递归改值
  searchCover(
    [
      { id:1,isChecked: false, children: [{id:11,isChecked: true}] },
      { id:1, isChecked: false}
    ],
    v => v.id == 11,
    v => ({...v, isChecked: true }),
    v => ({...v, isChecked: false }),
  )
  得到如下结果-------------->
  [
    { id: 1, isChecked: false, children: [{ id: 11, isChecked: true }] },
    { id: 1, isChecked: false }
  ]
 */
export function searchCover(arr, search = (v, i) => false, success = v => v, fail = v => v, field = 'children', deep = true) {
  assert(isArray(arr) && arr.length, 'arr必须是非空数组')
  return arr.map(item => {
    const itemClone = deep ? deepCopy(item) : item
    const newItem = isCurItem(item, search) ? success(itemClone) : fail(itemClone) // 拷贝，避免修改原始值
    if (itemClone[field] && isArray(itemClone[field])) {
      newItem[field] = searchCover(itemClone[field], search, success, fail, field, deep)
    }
    return newItem
  })
}
/**
 * 对象处理函数
 * @param {*} obj 待处理的对象
 * @param {*} search 匹配参数
 * @param {*} success 匹配成功执行什么函数
 * @param {*} fail 匹配实拍的执行什么函数
 * @param {*} field 递归字段
 * @returns 
 *@举例
  // 将对象中属性为k 并且 数值>=90 以上的值变为0
  searchCoverObj(
    {a: 85, b: 90, c: 80, children: {a: 85, k: 90, c: 80}},
    (key, val) => key == 'k' && val >= 90,
    v => v * 0,
    v => v,
  )
  ----->
  { a: 85, b: 90, c: 80, children: { a: 85, k: 0, c: 80 } }
 */
export const searchCoverObj = function (obj, search, success = v => v, fail = v => v, field = 'children') {
  if (!isObject(obj)) { return obj }
  const result = {}
  for (const [key, val] of Object.entries(obj)) {
    result[key] = key === field && isObject(val) ? searchCoverObj(val, search, success, fail, field) :
                                search(key, val) ? success(val) : fail(val)
  }
  return result
}
/**
 * 规则映射函数
 * @param {any | Array} val 需要被处理的值
 * @param {Function} rules 映射规则。search搜索匹配这个值，然后cover覆盖这个值
 * @param {Function} fail 默认值，如果没有匹配到任何值时，执行这个函数
 * @param {String} mode 处理模式  first: 只执行第一个匹配的rule | last: 只执行最后一个匹配的rule | chain: 链式调用处理数据 | all: 匹配到的rule全部执行并返回数据放到数组中 
 * @param {Function} combine 对结果进行处理
 * @returns 映射之后的值
 * @举例1 传入普通数据
  const rules = [
    { search: v => v >= 90, cover: () => 90 },
    { search: v => v >= 50, cover: () => 50 },
    { search: v => v >= 10, cover: () => 10 },
    { search: 5, cover: () => 10 },
    { search: 2, cover: 2 }
  ]
  1、单值输入: ruleMap(12, rules) ------> 10
  2、数组输入: ruleMap([4, 0, 82, 2, 15], rules) ----> [10, 0, 50, 2, 10]
  3、mode='last': ruleMap(12, rules, v => v, 'last') ----> 10
  3、mode='chain':
      const chainRules = [
        { search: v => v > 0, cover: v => v + 1 },
        { search: v => v > 0, cover: v => v * 2 }
      ]
      ruleMap(5, chainRules, v => v, 'chain') ----> 12
  4、mode='all': 
    const combine = v => v.reduce((prev, item) => prev + item, 0)
    ruleMap(5, chainRules, v => v, 'all', combine)
 */
export function ruleMap(val, rules, fail = v => v, mode='first', combine = v => v) {
  assert(isArray(rules) && rules.length, 'rules 必须是非空数组')
  assert(rules.every(v => v && v.search != null), 'rules中每个search必须存在')
  assert(rules.every(v => v && v.cover != null), 'rules中每个cover必须存在')
  const judgeMatch = (search, v) => isFunction(search) ? search(v) : v === search
  const getVal = (cover, v) => isFunction(cover) ? cover(v) : cover
  const processVal = v => {
    const matched = rules.filter(k => judgeMatch(k.search, v))
    if (!matched.length) { return getVal(fail, v) }
    const mapMode = {
      first: () => getVal(matched[0].cover, v),
      last: () => getVal(matched.at(-1).cover, v),
      chain: () => matched.reduce((acc, r) => getVal(r.cover, acc), v),
      all: () => getVal(combine, matched.map(r => getVal(r.cover, v)), v)
    }
    return mapMode[mode] ? mapMode[mode]() : getVal(fail, v)
  }
  return isArray(val) ? val.map(processVal) : processVal(val)
}
/**
 * 寻找N步后的元素，N可以为负数
 * @param {*} arr 待检索的数组
 * @param {*} search 搜索条件
 * @param {*} step 前进还是后退
 * @returns 
 * @j举例 findNStepItem([1,2,3,4,5], v => v >= 3, 2)  ------> 5
 */
export function findNStepItem(arr, search, step = 1){
  const newIndex = arr.findIndex((item, index) => isCurItem(item, search, index))
  return arr[newIndex + step] || ''
}
/**
 * 单选
 * @param {Array} arr 
 * @param {Function} search 
 * @returns 
 * @举例 radioChecked([{name:'zz', id:1, isChecked:false}, {name:'zs', id:2, isChecked:true}], {id: 1})
 * ----> [{name:'zz', id:1, isChecked:true}, {name:'zs', id:2, isChecked:false}]
 */
export const radioChecked = (arr, search = v => v, field = 'isChecked') => searchCover(arr, search, v => ({...v, [field]:true}), v => ({...v, [field]:false}))
/**
 * 单选允许取消勾选
 * @param {Array} arr 
 * @param {Function} search 
 * @returns 
 * @举例 radioToggle([{name:'zz', id:1, isChecked:false}, {name:'zs', id:2, isChecked:true}], {id: 1})
 * ----> [{name:'zz', id:1, isChecked:true}, {name:'zs', id:2, isChecked:false}]
 * @举例 radioToggle([{name:'zz', id:1, isChecked:true}, {name:'zs', id:2, isChecked:false}], {id: 1})
 * ----> [{name:'zz', id:1, isChecked:false}, {name:'zs', id:2, isChecked:false}]
 */
export const radioToggle = (arr, search = v => v, field = 'isChecked') => searchCover(arr, search, v => ({...v, [field]:!v[field]}), v => ({...v, [field]:false}))
/**
 * 多选逻辑
 * @param {Array} arr 
 * @param {Function} search 
 * @returns 
 * @举例 
 * multipleChecked([{name:'zz', id:1, isChecked:false}, {name:'zs', id:2, isChecked:true}], {id: 1})
 * ----->
 * [{name:'zz', id:1, isChecked:true}, {name:'zs', id:2, isChecked:true}]
 */
export const multipleChecked = (arr, search = v => v, field = 'isChecked') => searchCover(arr, search, v => ({...v, [field]:!v[field]}))
/**
 * 去重函数
 * @param {Array} arr 需要去重的数组
 * @returns 去重后的数组
 */
export function unique(arr) {
  return [...new Set(arr)]
}
/**
 * 对象数组去重(根据对象中某个字段)
 * @param {Object<Array>} arr 需要去重的对象数组
 * @param {*} field 字段名称
 * @param {String} type  'first': 有重复的对象则取遍历到的第一个 | 'last'有重复的则取遍历到的最后一个
 * @param {String} equal  是否严格校验 strict: 严格校验===   loose：宽松校验，忽略大小写==
 * @returns 去重后的对象数组
 * @举例 根据对象中id字段进行去重操作
 * @举例 uniqueObj([{id:1, age:11}, {id:2, age:22}, {id:1, age: 33}], 'id')  ---->  [{"id": 1,"age": 11,"_sort": 0},{"id": 2,"age": 22,"_sort": 1}]
 * @举例 uniqueObj([{id:1, age:11}, {id:2, age:22}, {id:1, age: 33}], 'id', 'last') ----> [{"id": 1,"age": 33,"_sort": 0},{"id": 2,"age": 22,"_sort": 1}]
 * @举例 uniqueObj([{id:1, age:11}, {id:2, age:22}, {id:1, age: 33}, {id:'1', age:44}], 'id', 'first', 'strict') ---->  [{"id": 1,"age": 11,"_sort": 0},{"id": 2,"age": 22,"_sort": 1},{"id": "1","age": 44,"_sort": 3}]
 */
export function uniqueObj(arr, field = required('field'), type = 'last', equal = 'loose') {
  assert(isArray(arr) && arr.every(v => isObject(v)), 'arr必须为对象数组')
  const obj = arr.reduce((prev, item, index) => {
    let key = item[field]
    if(equal == 'strict' && isNumber(key)) { key = `_${key}`}
    const [existItem, curItem] = [prev[key], { ...item, _sort: index }]
    prev[key] = type == 'first' ? (existItem || curItem) : existItem ? { ...item, _sort: existItem._sort } : curItem
    return prev
  }, {})
  return Object.values(obj).sort((a, b) => a._sort - b._sort)
}
/**
 * 扁平数组转对象tree树形结构
 * https://juejin.cn/post/6983904373508145189#heading-8
 * @param {Array} arr 需要转换的数组
 * @param {String} field 子元素数组的字段值
 * @returns {Array} 转换之后的数组
 * @注意 pid为0为一级目录
 * @举例 
 * let arr = [
 *   {id: 1, name: '部门1', pid: 0},{id: 2, name: '部门2', pid: 1},{id: 3, name: '部门3', pid: 1},
 *   {id: 4, name: '部门4', pid: 3},{id: 5, name: '部门5', pid: 4},{id: 9, name: '部门6', pid: 0},
 * ]
 * flat2tree(arr)
 * -----> 
 * [
 *   {
 *     "id": 1,
 *     "name": "部门1",
 *     "pid": 0,
 *     "children": [ { "id": 2, "name": "部门2", "pid": 1, "children": [] }, { "id": 3, "name": "部门3", "pid": 1, "children": [{...},{...}] } ]
 *   }
 *   {
 *     "id": 6,
 *     "name": "部门6",
 *     "pid": 0,
 *     "children": []
 *    }
 * ]
 */
export function flat2tree(arr, field = 'children', key = 'id', pidKey = 'pid') {
  const itemMap = new Map()
  const tree = []
  for (const item of arr) {
    const { [key]: id, [pidKey]: pid } = item
    if (!itemMap.has(id)) itemMap.set(id, { ...item, [field]: [] }) // 初始化节点
    const curItem = itemMap.get(id)
    if (pid === 0) {
      tree.push(curItem) // 根节点
    } else {
      !itemMap.has(pid) && itemMap.set(pid, { [field]: [] })// 确保父节点存在
      itemMap.get(pid)[field].push(curItem) // 添加到父节点
    }
  }
  return tree
}
/**
 * 对象数组递归扁平化，算法性能O(n)
 * @param {Array} arr 需要平铺的数组
 * @param {String} field 递归子字段名称（默认 'children'）
 * @param {String} key 唯一标识字段（默认 'id'）
 * @param {Number|String} pid 父级 ID（默认 0）
 * @returns {Array} 扁平化后的数组
 * @举例
 * const arr = [
 *  { id:1, name: 'a', children: [ { id:11,name: 'b', children: [{ id:111,name: 'c', children: [] }]}] },
 *  { id:2, name: 'd', children: [ { id:22,name: 'e', children: [{ id:222,name: 'f', children: [] }]}] }
 * ]
 * tree2flat(arr, 'children')
 * ---->
  [
    {"id": 1,"name": "a","children": [],"pid": 0},{"id": 11,"name": "b","children": [],"pid": 1},{"id": 111,"name": "c","children": [],"pid": 11},
    {"id": 2,"name": "d","children": [],"pid": 0},{"id": 22,"name": "e","children": [],"pid": 2},{"id": 222,"name": "f","children": [],"pid": 22}
  ]
// 拓展：O(n2)写法，但是更简洁
// export function tree2flat(arr, field = 'children', key = 'id', pid = 0) {
//   return arr.reduce((prev, item) => [...prev, {...item, pid, [field]: []}, ...tree2flat(item[field] || [], field, key, item[key])], [])
// }
 */
export function tree2flat(arr, field = 'children', key = 'id', pid = 0) {
  const result = []
  function flatten(nodes, parentId) {
    for (const item of nodes) {
      const {[field]: myField, [key]:myKey, ...rest} = item
      result.push({...rest, pid: parentId, [key]:myKey }) // result.push({...rest, pid: parentId, [key]:myKey,[field]:[] })
      Array.isArray(myField) && flatten(myField, myKey) // 递归处理子节点
    }
  }
  flatten(arr, pid)
  return result
}
/**
 * 删除数组中某一个元素
 * @param {Array} arr 需要操作的数组
 * @param {*} item 要删除的条目
 * @param {String} type 删除类型  'first': 代表只删除查到的第一个, 'all'：代表删除查到的全部， 'last'：代表删除查到的最后一个
 * @returns 删除后的新数组
 * @举例 remove([1,2,3,4,5,4], 4, 'all') ----> [1,2,3,5]
 * @举例 remove([1,2,3,4,5,4], 4, 'first') ----> [1,2,3,5,4]
 * @举例 remove([1,2,3,4,5,4], 4, 'last') ----> [1,2,3,4,5]
 */
export function remove(arr, item, type = 'all') {
  const mapType = {
    'last': () => arr.splice(arr.lastIndexOf(item), 1),
    'first': () => arr.splice(arr.indexOf(item), 1),
    'all': () => arr = arr.filter(v => v !== item),
  }
  return (mapType[type] && mapType[type]()) || arr
}
/**
 * 数组、字符串元素复制N次 
 * @param {Object|Array} obj 
 * @param {Number} times 
 * @returns 复制之后的数据
 * @举例 重复生成数组元素：repeat([{age:1}], 2) ====>[{age:1, _id: '123'}, {age:1, _id: '123123c'}]  // 备注增加_id是为了for循环的key值不重复
 * @举例 重复生成字符串：repeat('123', 2) ====>  '123123'
 * @举例 字符串复制实现：Array(3).join(0) ====> '00'    "0".repeat(2) ===> '00'
 * @举例 引用类型复制实现：Array(2).fill([{name: '张三'}]) ====> [[{name: '张三'}], [{name: '张三'}]]
 */
export function repeat(obj = '', times = 1) {
  const count = range(times, 1)
  let res = isArray(obj) ? [] : ''
  if(isArray(obj)) {
    for(let i=0; i<count; i++) { res = isObject(obj[0]) ? [...res, ...deepCopy(obj).map(v => ({ ...v, _id: guID() }))] : [...res, ...obj] }
  } else {
    for(let j=0; j<count; j++) { res += obj }
  }
  return res
}
/**
 * 获取特定条件的对象数组中，满足条件的对象的字段值，返回数组形式
 * @param {Array} arr 需要处理的数组
 * @param {String} field 需要获得的字段
 * @param {Function|Object} search 过滤函数|过滤对象，如果不传则返回全部数组中的字段值     如果传了函数，则先按照函数过滤一遍 
 * @returns 得到的字段组装的数组
 * @举例 getFieldArr([{id:1, age: 15}, {id: 2, age: 18}, {id:3, age: 20}], 'id', v => v.age > 16) --->  [2, 3]
 * @举例 getFieldArr([{id:1, age: 15}, {id: 2, age: 18}, {id:3, age: 20}], 'id', {age:18}) --->  [2]
 */
export function getFieldArr(arr, field, search = v => v) {
  return arr.reduce((prev, item) => isCurItem(item, search) ? [...prev, item[field]] : prev, [])
}
/**
 * 对数组进行排序。根据数组中对象的字段。按照传入数组的顺序进行排序
 * @param {Array<Object>} arr 当前需要排序的数组
 * @param {String} key 排序字段
 * @param {Array<String>} sortArr 排序数组
 * @param {String} type 类型 'keep': 保留不在sortArr的数据    'drop':舍弃不在sortArr中的字段
 * @举例子
 * sortByCusField([{"key": "name"}, {"key": "age"}, {"key": "james"}], 'key', ['age', 'name', 'james'])
 * ----->
 * [{"key": "age"}, {"key": "name"}, {"key": "james"}]
 */
export function sortByCusField(arr, key, sortArr, type = 'keep') {
  const mapSort = sortArr.reduce((prev, item, index) =>(prev[item] = index + 1, prev), {})
  const [inSortArr, outSortArr] = filterArr(arr, v => mapSort[v[key]] > 0)
  const newSortArr = inSortArr.sort(({[key]: left}, {[key]: right}) => mapSort[left] - mapSort[right])
  return type == 'keep' ? [...newSortArr, ...outSortArr] : newSortArr
}
/**
 * 对象数组按照某个字段进行排序
 * @param {Array<Object>} arr 需要排序的对象数组
 * @param {String} prop 根据这个字段的值进行排序
 * @param {Number | String} type 排序方式、递增还是递减 'increase': 递增   'decrease'递减
 * @returns {Array} 排序后的数组
 * @举例 sortByKey([{name:'ss', age:30}, {name:'dd', age:14}], 'age') ----> [{name:'dd', age:14}, {name:'ss', age:30}]
 */
export function sortByKey(arr, key, type = 'increase') {
  return arr.sort(({[key]: left},  {[key]: right}) => type == 'increase' ? left - right : right - left)
}
/**
 * 按照传入的删选条件过滤数组，符合条件的在左边，不符合的在右边
 * @param {Array} arr 需要处理的数据
 * @param {Function} fn 筛选函数
 * @returns {[[], []]} 返回数组两个元素分别为符合条件和不符合条件的
 * @举例 filterArr([23, 5, 7, 29, 9], v => v <= 10) ----> [[5, 7, 9],[23, 29]]
 * @举例 filterArr([23, 5, 7, 29, 9], (v, i) => i < 3) ----> [[23, 5, 7],[29, 9]]
 */
export function filterArr(arr, fn) {
  return arr.reduce((prev, item, index) => (isCurItem(item, fn, index) ? prev[0].push(item) : prev[1].push(item), prev), [[], []])
}
/**
 * 按照条件分割大数组为多个小数组的集合
 * @param {*} arr 被分割的数组
 * @param {*} fn 分割函数，可以传入对象
 * @returns 
 * @举例子 splitArr([1,2,3,4,5,3,7], v => v == 2) ------->  [[1],[3,4,5,3,7]]
 * @举例子 splitArr([1,2,3,4,5,3,7], v => v == 3) ------->  [[1,2],[4,5],[7]]
 * @举例子 splitArr([1,2,3,4,5,3,7], v => v == 1) ------->  [[2,3,4,5,3,7]]
 * @举例子 splitArr([1,2,3,4,5,3,7], v => v == 99) ------->  [[1, 2, 3, 4, 5, 3, 7]]
 */
export function splitArr(arr, fn) {
  return arr.reduce((prev, item, index) => (isCurItem(item, fn, index) ? prev.push([]) : prev.at(-1).push(item), prev), [[]])
}
/**
 * 数组分块
 * @param {Array} arr 需要分块的数组
 * @param {Number} size 每一块几个元素
 * @param {String} type first:从左向右开始分块    last:从右向左开始分块
 * @returns 分块之后的数组
 * @举例 chunk([1,2,3,4,5], 2) ====>   [[1,2], [3, 4], [5]]
 * @举例 _.chunk([1,2,3,4,5], 2, 'last') ====>   [[1], [2,3], [4,5]]
 */
export function chunk(arr, size = 0, type = 'first') {
  assert(isArray(arr), 'arr必须是数组类型')
  size = Number(size)
  assert(isGt0(size), 'size必须为大于0的整数')
  var targetArr = []
  if(type == 'first') {
    for(var i = 0; i < arr.length; i += size) { targetArr.push(arr.slice(i, i + size)) }
  } else {
    for(var i = arr.length; i > 0; i -= size) { targetArr.unshift(arr.slice(i - size < 0 ? 0 : i - size, i)) }
  }
  return targetArr
}
/**
 * 抽帧函数
 * @param {*} arr 需要被抽帧的数组
 * @param {*} num 每num帧抽取一帧，保留首尾针
 * @举例
 * pickFrame([1,2,3,4,5,6,7,8,9, 0], 5)
 * ----> [1, 6, 0]
 */
export function pickFrame(arr, num){
  if(num <= 1) { return arr }
  const chunkedArr = chunk(arr, num).map(v => v[0])
  return num > 2 ? [...chunkedArr, arr.pop()] : chunkedArr
}
/**
 * 将数组中的数据进行分类，分类成JSON。键名为类别名称，键值为数组，存放数据集合
 * @param {Array} arr 需要分类的数组
 * @param {Function|String} fn_field 分类函数 | 字段名
 * @举例1 简单根据某个字段分类
 * const arr = [{name: '小明', age: 17}, {name: '小张', age: 17}, {name: '小强', age: 22}]
 * groupBy(arr, 'age')   |   groupBy(arr, item => item.age)
 * -----> 根据年龄分类好的结果
 * {17: [{name: '小明', age: 17},{name: '小张', age: 17}], 22: [{name: '小强', age: 22}]}
 * @举例2 根据某个字段进行处理，用处理后的结果分类
 * const arr = [{name: 'asd', score: 100}, {name: '3dd', score: 60}, {name: 'dfg', score: 80}, {name: 'zrr', score: 90}]
 * groupBy(arr, item => {
 *   const { score } = item
 *   return score < 65 ? 'E' :
 *          score < 70 ? 'D' :
 *          score < 80 ? 'C' :  
 *          score < 90 ? 'B' : 'A';
 *   })
 * -------> 根据分类函数分类好的结果：
 * {A: [{...},{...}], B: [{...}], C: [{...}], D: [{...}]}
 */
export function groupBy(arr, fn_field){
  return arr.reduce((prev, item) => {
    const key = isFunction(fn_field) ? fn_field(item) : item[fn_field]
    return (prev[key] || (prev[key] = [])).push({...item, _classifyKey: key}), prev
  }, {})
}
/**
 * 匹配距离最近的值
 * @param {*} val 传入值
 * @param {*} rangeArr 刻度值
 * @returns 
 * @举例 nearMap(22, [10, 20, 30, 40, 50]) -----> 20
 */
export function nearMap(val, rangeArr=[10, 20, 30, 40, 50]){
  const res = rangeArr.reduce((prev, item, index) => {
    const gap = Math.abs(val - item)
    if(gap < prev.gap) {
      prev.gap = gap
      prev.target = item
    }
    return prev
  }, {gap: 9999, target: ''})
  return res.target
}
/**
 * 取两个数组元素的交集
 * @param {*} arr1 数组1
 * @param {*} arr2 数组2
 * @returns 取交集之后的结果
 * @举例 intersect([1,2,3], [1,2]) ----> [1, 2]
 * @举例 intersect([1,2,3], [1,2], [1]) ----> [1, 2]
 * @举例 intersect('1,2,3', '1,2', '1') ----> [1, 2]
 */
export const intersect = (...arrays) => {
  if (!arrays.length) return []
  arrays = arrays.map(arr => Array.isArray(arr) ? arr : ('' + arr).split(',').map(x => x.trim())) // 转换为数组
  const sets = arrays.slice(1).map(arr => new Set(arr)) // 后续数组转为 Set 提升查找效率
  return arrays[0].filter(x => sets.every(s => s.has(x)))
}
/**
 * 数组（a 相对于 b 的）差集:  a数组中的数据，在b数组中没找到的数据
 * @param {Array|String} v1 数据1
 * @param {Array|String} v2 数据2
 * @param {String} equal 类型  strict 为严格匹配   默认是loose不区分数字和字符串这样的
 * @param {String} split 分割符号，默认是空字符串。当且仅当v1、v2为字符串时，才需要设置此参数
 * @returns 
 * @举例子 difference([1,2,3], [1,2,7]) ====> [3]
 * @举例子 difference('1,2,3', '2', 'loose', ',') ====> ['1', '3']
 * @举例子 difference(['1',2,3], [1], 'loose) ====> [2, 3]
 * @举例子 difference([1,2,3], ['1'], 'strict') ====> [1, 2, 3]
 */
export function difference(v1, v2, equal = 'loose', split = '') {
  const toArr = v => isString(v) ? v.split(split) : v
  const getKey = v => equal == 'strict' ? v : String(v)
  ;[v1, v2] = [toArr(v1), toArr(v2)]
  const map = new Map()
  for (const v of v2) {
    const key = getKey(v)
    map.set(key, (map.get(key) || 0) + 1)
  }
  return v1.reduce((prev, item) => {
    const key = getKey(item)
    const curVal = map.get(key) || 0
    return curVal > 0 ? (map.set(key, curVal - 1), prev) : [...prev, item]
  }, [])
}
/**
 * 数据1---是否包含---数据2--的数据。type：1部分包含，type：2全部包含
 * @param {Array|String} v1 
 * @param {Array|String} v2 
 * @param {Number} type  'some':则为部分包含  |  'every':全部包含
 * @param {Boolean} equal 是否严格校验 strict: 严格校验===   loose：宽松校验，忽略大小写==
 * @param {String} split 分隔符 默认为逗号
 * @return {Boolean} 返回校验结果
 * @举例子 isContain('1,2,3', '2,3') ====> true
 * @举例子 isContain('1,2,3', '2,3,4') ====> true
 * @举例子 isContain('1,2,3', '2,3,4', 'every') ====> false
 */
export function isContain(v1, v2, type = 'some', equal = 'loose', split = ',') {
  const lowerCase = v => v.map(k => String(k).toLowerCase())
  const toArr = v => isString(v) ? v.split(split) : v
  ;[v1, v2] = [toArr(v1), toArr(v2)]
  if(equal == 'loose') { [v1, v2] = [lowerCase(v1), lowerCase(v2)] }
  return type == 'some' ? v2.some(v => v1.some(k => equal ? k == v : k === v)) : v2.every(v => v1.some(k => equal == 'loose' ? k == v : k === v))
}
/**
 * 数组（a 和 b 的）并集
 * @param {*} arr1 数组1
 * @param {*} arr2 数组2
 * @returns 
 * @举例子 union([1,2,3], [1,2,7], [1,3,7,8]) ====> [1, 2, 3, 7, 8]
 */
export const union = (...arrays) => unique(arrays.flat(2))
/*
**********************************************************************************************
******************************************JSON操作*********************************************
**********************************************************************************************
*/
/**
 * JSON转url（这个函数将数据进行了编码。将来再解码使用。可以规避一些特殊字符产生的bug）
 * 函数还兼容传入 {info: {name:'zz', age:18}, school: 'Tsinghua'} 这种复杂的数据。之后通过url2JSON可以完美解析
 * @param {String} url 跳转地址的域名。在小程序中那就是路径
 * @param {Object} params 跳转地址中药传递的参数的json格式
 * @param {String} type  'nocode'不需要编码  |  'encode': 需要编码(默认值)
 * @returns {String} 返回拼接好的带有参数的链接地址
 * @举例子 JSON2url('../advise/index', { from: 'index', id_str:'1243' }) -----> '../advise/index?from=index&id_str=1243'
 */
export function JSON2url(url = '', params = {}, type = 'nocode'){
  return Object.entries(formatJSON(params)).reduce((prev, item) => {
    let [key, val] = item
    val = type === 'nocode' ? val : encodeURIComponent(val) // 为了适配更多的场景，开发了自定义是否编码
    const symbol = url ? (prev.includes('?') ? '&' : '?') : (prev ? '&' : '')
    return prev + symbol + `${key}=${val}`
  }, url) || ''
}
/**
 * url转JSON(函数内与解码操作，与JSON2url相对应)
 * @param {String} url 传入带有参数的url链接地址
 * @param {String} type 'nocode'不需要编码  |  'encode': 需要编码(默认值)
 * @returns {Object} 返回参数拼接的json对象
 * @举例 url2JSON('http://www.baidu.com?name=asd&age=12') ----> {name: "asd", age: "12"}
 * @举例 url2JSON('name=asd&age=12') ----> {name: "asd", age: "12"}
 */
export function url2JSON(url = '', type = 'nocode') {
  // url = url || window.location.href // 如果没传参，就使用浏览器当前url。暂时注释，因为这个不兼容小程序
  let paramsStr = url.includes('?') ? (url.split('?')[1] || '') : url
  paramsStr = paramsStr.split('#')[0] || '' // 防止一些url中混入#号放在?号之后，此处做一个适配
  return paramsStr.split('&').reduce((prev, item) => {
    let [key, val] = item.split('=')
    val = type == 'nocode' ? val : decodeURIComponent(val)  // 为了适配更多的场景，开发了自定义是否解码（如果传入的url是编码过的，那么必须解码，否则报错）
    return { ...prev, [key]: val } // 此处需要转码，否则中文和一些特殊字符就无法支持了
  }, {})
}
/**
 * 跨域文件下载
 * 跨域文件设置download会不生效。如果要保证设置的文件名起效果的话，请调用这个函数
 * 详情请看：https://blog.csdn.net/qq_41801059/article/details/125679903
 * @param {String} fileName 文件名
 * @param {String} url 请求地址
 * @举例子 crossOriginDownload('文件.xlsx', "http://192.168.10.11:48079/admin-api/infra/file/4/get/4c71bd392f26b860420330100f6f2471d3f281c6acae74d16e0b5ec60297d92f.xlsx")
 */
export async function crossOriginDownload(fileName, url) {
  // const res = await request({ method: "GET", url: url, responseType: 'blob' }, 0) // 如果采用axios请求的话
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)  // url 文件的完整地址 http:XXX
  xhr.responseType = 'blob'
  xhr.onload = function () {
    if (xhr.status === 200) {
      const res = xhr.response;
      const link = document.createElement('a')
      link.style.display = 'none'
      const url = window.URL.createObjectURL(res)
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    }
  }
  xhr.send()
}
/**
 * 二进制流文件下载：支持blob对象和url地址
 * @举例1 downloadFile('123123.png', 'https://xxxxxxx.png')
 * @举例2 downloadFile('123123.png', 'http://192.168.10.36:18049/open/file/download?data=M80/CELarJJQA1OgRtank6oq+/1xrY/rnMLA86dc1AAGXROW5FENy3V4MWWkNfGo')
 * @举例3 downloadFile('123123.png', Blob二进制对象) // 第二个参数是二进制流，后端返回的
 */
export async function downloadFile(fileName, pathOrBlob){
  const url = isString(pathOrBlob) ? pathOrBlob : window.URL.createObjectURL(new Blob([pathOrBlob]))
  if(isString(pathOrBlob)) { return crossOriginDownload(fileName, pathOrBlob) }
  const link = window.document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  !isString(pathOrBlob) && window.URL.revokeObjectURL(url)
  document.body.removeChild(link)
}
/**
 * 处理图片路径，兼容相对路径和base64格式
 * @param {string} baseUrl - 基础URL，用于拼接相对路径
 * @param {string} imagePath - 图片路径，可以是相对路径或base64字符串
 * @param {*} isUrl 判断是否是url地址
 * @returns 
 */
export function convertImg(imagePath, baseUrl = '', isUrl = str => ['png', 'jpg', 'jpeg'].includes(str.split('.')[1]), ) {
  if(isUrl(imagePath)) {
    baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
    imagePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
    return `${baseUrl}/${imagePath}`
  } else {
    return `data:image/jpeg;base64,${imagePath}`
  }
}
/**
 * 用户在个人中心上传头像，很多人选择高清原图导致，上传慢，服务器压力大，加载影响性能。可以通过此函数进行压缩生成新的二进制数据
 * @param {*} file 
 * @param {*} quality 
 * @returns 
 * @举例 
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const compressedBlob = await compressImage(file, 0.7)
      const compressedFile = new File([compressedBlob], file.name, { type: 'image/jpeg' })
      uploadToServer(compressedFile) // 上传到服务器
    }
  }
 */
export function compressImage(file, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height)
        canvas.toBlob(blob => resolve(blob), 'image/jpeg', quality)
      }
    }
    reader.onerror = reject
  })
}
// 打开全屏
export function toFullScreen(){
  let el = document.documentElement
  let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
  if(rfs) {
    rfs.call(el)
  } else if (typeof window.ActiveXObject !== "undefined") {
    //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
    let wScript = new ActiveXObject("WScript.Shell")
    if (wScript != null) { wScript.SendKeys("{F11}") }
  } else {
    alert("浏览器不支持全屏")
  }
}
// 退出全屏
export function exitFullscreen(){
  let el = parent.document
  let cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen
  if (cfs) {
    cfs.call(el)
  } else if (typeof window.ActiveXObject !== "undefined") {
    //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
    let wScript = new ActiveXObject("WScript.Shell")
    if (wScript != null) { wScript.SendKeys("{F11}") }
  } else {
    alert("切换失败,可尝试Esc退出")
  }
}
/**
 * 返回一个lower - upper之间的随机数
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @param {String} decimal 四舍五入保留几位小数
 * @param {String} type 小数点末尾为0是否保留。keep:保留     drop:放弃
 * @returns {Number}
 * @范围 [lower, upper)  // 请注意：左闭右开
 * @举例 random(0, 0.5) ==> 0.3567039135734613
 * @举例 random(1, 2) ===> 1.6718418553475423
 * @举例 random(-2, -1) ==> -1.4474325452361945
 * @举例 random(1, 8) ==> 6
 * 原生参考代码:  a = new Date % 100; // 两位整数随机数
 * a = new Date % 1000 // 三位整数随机数
 * a = new Date % 10000 // 四位整数随机数...依次类推
 */
export function random(lower, upper, decimal = 0, type = 'keep') {
  lower = Number(lower) || 0
  upper = Number(upper) || 0
  let res = Math.random() * (upper - lower) + lower
  return round(res, decimal, type)
}
/**
 * 获取随机颜色
 * @returns 
 */
export function randomColor(){
  const [r, g, b] = [addZero(random(0, 255,'int').toString(16), 2), addZero(random(0, 255,'int').toString(16), 2), addZero(random(0, 255,'int').toString(16), 2)]
  return `#${r}${g}${b}`
}
// 禁止复制
export const noCopy = () => ['contextmenu', 'selectstart', 'copy'].forEach(ev => document.addEventListener(ev, event => (event.returnValue = false)))
/**
 * 保证json格式数据的可靠获取
 * @param {Function} run 需要执行的函数
 * @param {*} defaultVal 默认值
 * @举例
  const obj = { 
    province: { 
      city: { 
        area: { 
          name: '新北区'
        },
        name:'常州市'
      },
      name: '江苏省' 
    } 
  }
 * @举例 safeGet(() => obj.province.city.area.name, '') ---> ''
 * @举例 避免了这种写法： obj.province && obj.province.city && obj.province.city.area ? obj.province.city.area.name : ''
 */
export function safeGet(run, defaultVal = '') {
  try {
    const res = run()
    return isEmpty(res) ? defaultVal : res
  } catch(e) {
    return defaultVal 
  } 
}
/*
**********************************************************************************************
******************************************金额、数字操作*********************************************
**********************************************************************************************
*/
/**
 * 将一个值转数字，如果失败就返回原始值
 * @param {Number|String} val 需要转数字的值
 * @returns 
 * @举例 toNumber('12') ----> 12
 */
export const toNumber = val => isNaN(parseFloat(val)) ? val : parseFloat(val)
/**
 * 0、1转换--------'0'、'1'转换
 * @param {Number|String} val 
 * @returns 
 * @举例子 toggle01(0) ---> 1  、  toggle01(1) ---> 0
 * @举例子 toggle01('0') ---> '1'  、  toggle01('1') ---> '0'
 */
export const toggle01 = val => isNumber(val) ? val ^ 1 : String(Number(val) ^ 1)
/**
 * 数据范围
 * @param {Number|String} num 需要限制的数字
 * @param {Number|String} min 限制最小值
 * @param {Number|String} max 限制最大值
 * @举例 range(12.23, 7, 10)  ===> 10 // 上限为10 因此返回10
 * @举例 range(12.23, 14, 20)  ===> 14 // 下限为14 因此返回14
 */
export function range(num, min = null, max = null) {
  if(min !== null) { num = Math.max(Number(num), Number(min)) }
  if(max !== null) { num = Math.min(Number(num), Number(max)) }
  return num
}
/**
 * 四舍五入返回N位有效数字（常用于金额计算）
 * @param {Number|String} num 需要处理的的数字、支持传入字符串
 * @param {Number} decimal 保留的小数位数
 * @param {String} type 'keep': 小数末尾0要保留   'drop'：小数末尾0不需要保留
 * @举例 round(12.35) ==> 12  // 12.35 保留0位小数四舍五入得到 12
 * @举例 round(12.35, 1) ==> 12.4 // 12.35 保留1位小数四舍五入得到 12.4
 * @举例 round(12.5, 2) ==> 12.50 // 12.5 保留2位小数四舍五入得到 12.50
 * @举例 round(12.5, 2, 'drop') ==> 12.5 // 12.5 保留2位小数四舍五入得到 12.50---->末尾0要省去--->12.5
 */
export function round(num, decimal = 0, type = 'keep') {
  decimal = range(decimal, 0)
  const k = Math.pow(10, decimal)
  const [left = '', right = ''] = String(Math.round(Number(num) * k) / k).split('.')
  const newDecimal = type == 'keep' ? right + new Array(decimal + 1).join('0') : right
  const decimalRight = `${newDecimal > 0 ? '.' + decimal.slice(0, newDecimal) : ''}`
  return `${left}${newDecimal.length > 0 ? decimalRight : ''}`
}
/**
 * 金额处理（常用于金额计算）
 * @param {Number|String} num 要格式化的数字
 * @param {String} type float->小数形式。  intFloat->当整数的时候不需要带两个小数0，带小数时，保留几位小数   int只要整数
 * @param {Number} decimal 保留几位小数
 * @param {String} sep 千分位符号
 * @举例 formatMoney(12322.1223, 'float') ====> "12,322.12" // 保留0位小数四舍五入得到 12
 * @举例 formatMoney(12322.1223, 'float', 1) ------> "12,322.1"  固定显示1位小数
 * @举例 formatMoney(12322, 'intFloat') ------> "12322"  当没有小数点就显示整数，否则显示整数
 */
export function formatMoney(num = 0, type = 'float', decimal = 2, dec = '.', sep = ',') {
  num = String(num).replace(/[^0-9+-Ee.]/g, '') || '0'
  decimal = Number(decimal)
  let [intStr = '', floatStr = ''] = String(round(num, decimal)).split(dec) // 分割出整数和小数部分
  let re = /(-?\d+)(\d{3})/ // 匹配整数部分每个三位数
  while (re.test(intStr)) { intStr = intStr.replace(re, "$1" + sep + "$2") } // 整数部分三位数添加分隔符如','
  if((type === 'intFloat' && !num.includes('.')) || num === '0' || type == 'int') { return intStr }
  floatStr += new Array(decimal + 1).join('0')
  return `${intStr}${dec}${floatStr.slice(0, decimal)}`
}
/*
**********************************************************************************************
******************************************日期时间操作*********************************************
**********************************************************************************************
*/
/**
 * 处理时间
 * @param {*} t 时间 
 * @returns 
 * @举例 processDate() ---->  默认返回当前时间
 * @举例 processDate('2022-10-01') ----> '2022/10/01'
 */
export function processDate(t) {
  if(!isDate(t) && isString(t) && !t.includes('T') && t.length > 0) { t = t.replace(/[-]/g, "/") }
  if(!t) { t = new Date() }
  if(isString(t) && t.replace(/[-/.]/g, '') == t && t.length == 8) {
    t = `${t.slice(0, 4)}/${t.slice(4, 6)}/${t.slice(-2)}`
  }
  return t
}
/**
 * 提取传入日期年、月、日、时、分、秒
 * @param {String|Date|Number} t 
 * @returns 
 * @举例 extract() ---->   注意：不传值默认显示当天数据，比如当前时间如 ['2022', '11', '14', '16', '46', '16']
 * @举例 extract('2022-10-01') ---->  ['2022', '10', '01', '00', '00', '00']
 * @举例 extract('2022-10-01 12:12:14') ---->  ['2022', '10', '01', '12', '12', '14']
 */
export function extract(t = new Date()){
  t = processDate(t)
  const d = new Date(new Date(t).getTime() + 8*3600*1000)
  const [year, month, day, hour, minutes, second] = new Date(d).toISOString().split(/[^0-9]/).slice(0, -1)
  return [year, month, day, hour, minutes, second]
}
/**
 * 生成格式化时间字符串
 * @param {String} format 时间格式
 * @param {*} t 传入的时间
 * @returns 处理之后的时间数据
 * @举例 dateFormat('YYYY-MM-DD hh:mm', new Date()) ==> 2019-06-26 18:30
 * @举例 dateFormat('YYYYMMDD-hh:mm:ss', '2020-08-12 09:13:54') ==> 20200812-09:13:54
 */
export function dateFormat(format = 'YYYY-MM-DD hh:mm:ss', t){
  if(!t) {return t}
  t = processDate(t)
  const [Y, M, D, h, m, s] = extract(t)
  return format.replace(/YYYY|yyyy/g, Y).replace(/YY|yy/g, Y.slice(2, 4)).replace(/MM/g, M).replace(/DD/g, D).replace(/hh/g, h).replace(/mm/g, m).replace(/ss/g, s)
}
/**
 * 将传入的时间转化为基于当前时间，具象化多久之前的文字描述
 * @param {*} time 
 * @returns 
 * timeAgoStr('2025-09-25 16:05:05')  ------->  42分钟前
 * timeAgoStr('2025-09-20 16:05:05')  ------->  5天前
 */
export function timeAgoStr(time) {
  const [date, now] = [new Date(time), Date.now()]
  const diff = Math.floor((now - date.getTime()) / 1000) // 秒差
  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
  if (diff < 172800) return '昨天'
  if (diff < 2592000) return `${Math.floor(diff / 86400)}天前`
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}个月前`
  return `${Math.floor(diff / 31536000)}年前`
}
/**得到当前时间之后N秒的时间
 * @param {Number} after 多少秒之后的时间
 * @result 返回的是毫秒数
 * @举例 addSeconds(20)  // 20s之后的时间
 */
export function addSeconds(after = 60) {
  const dt = new Date().getTime() + after * 1000
  return new Date(dt)
}
/**
 * 获取N天后日期字符串
 * @param {Number} num 初始日期 + num天后的日期， 默认是今天 + 0天，仍然是今天
 * @param {String} split 日期分割符
 * @param t 初始日期，默认今天
 * @计算 console.log(addDays('2025-08-29', 26 * 1, '-'))
 * @计算 console.log(addDays('2025-08-29', 26 * 2, '-'))
 * @举例 addDays(new Date(), 0) ---> 20200904    addDays(1) ---> 20200905
 * @举例 分割：addDays(new Date(), 1, '-')--->2020-09-05
 */
export function addDays(date = new Date(), days = 0, split = '-') {
  if(!date) {return date}
  date = processDate(date)
  const dt = new Date(date)
  dt.setDate(dt.getDate() + Number(days)) // 获取num天后的日期
  return `0000${dt.getFullYear()}`.slice(-4) + split + `00${(dt.getMonth() + 1)}`.slice(-2) + split + `00${dt.getDate()}`.slice(-2)
}
/**
 * 获取N个月之后的日期
 * @param {String|Date} startTime  开始日期
 * @param {Number} num   N个月之后的日期
 * @returns 
 */
export function afterNMonthDate(startTime, num){
  startTime = processDate(startTime)
  var dt = new Date(startTime)
  dt.setMonth(dt.getMonth() + Number(num))
  return dateFormat('YYYY-MM-DD', dt)
}
/**
 * 计算两个日期之间间隔多少年,多少月,多少天,多少小时，多少分钟，多少秒
 * @param {String|Date} start 开始时间
 * @param {String|Date} end 结束时间
 * @returns 返回两个日期间隔多少年,多少天,多少月
 * @举例 diffTimes('2024-01-22', '2024-05-17') ----->  { "diffDay": "116", "diffYear": "0.33", "diffMonth": 4 }
 * @举例 diffTimes('2024-01', '2024-05') ----->  {"diffDay": "121","diffYear": "0.33","diffMonth": 4}
*/
export function diffTimes(start = new Date(), end = new Date()){
  ;[start, end] = [processDate(start), processDate(end)]
  const diffDay = round((new Date(end) - new Date(start)) / 1000 / 60 /60 / 24, 2)
  const [startStr, endStr] = [dateFormat('YYYYMM', start), dateFormat('YYYYMM', end)]
  const [year1, mon1, year2, mon2] = [Number(startStr.slice(0, 4)), Number(startStr.slice(-2)), Number(endStr.slice(0, 4)), Number(endStr.slice(-2))]
  const diffYear = round(((year2 - year1) * 12 + mon2 - mon1) / 12, 2)
  const diffMonth = (year2 - year1) * 12 + mon2 - mon1
  const diffSecond = new Date(end).getTime() - new Date(start).getTime()
  const diffMin = round(diffSecond / 60, 2)
  const diffHour = round(diffSecond / 60 / 60, 2)
  return { diffYear, diffMonth, diffDay, diffHour, diffMin, diffSecond }
}
/**
 * 获取时间段，业务
 * @returns 
 * 昨天起止时间、今天的起止时间、上周的起止时间、当前周的起止时间、当前是星期几 ---->  带有时分秒的截止时间
 * @举例
 * socketTime()
 * ----->
 * {
 *   curWeek: ['2022-07-25', '2022-07-31'], // 本周
 *   lastWeek: ['2022-07-18', '2022-07-24'], // 上周
 *   nextWeek：['2022-08-01', '2022-08-07'], // 下一周
 *   today: "2022-07-30", // 今天
 *   week: 6, // 周几
 *   weekDay: "星期六", // 周几中文
 *   yesterday: "2022-07-30", // 昨天
 *   _curWeek: ['2022-07-25 00:00:00', '2022-07-31 23:59:59'], // 本周
 *   _lastWeek:  ['2022-07-18 00:00:00', '2022-07-24 23:59:59'], // 上周
 *   _nextWeek：['', '']
 *   _today: ['2022-07-30 00:00:00', '2022-07-30 23:59:59'], // 今天
 *   _yesterday: ['2022-07-30 00:00:00', '2022-07-30 23:59:59'], // 昨天
 * }
 */
export function socketTime(t = new Date()) {
  t = processDate(t)
  const [year, month, day, hour, minutes, seconds] = extract(t)
  const dt = new Date(t)
  const curSecond = dt.getTime()
  const [_month, _day] = [String(dt.getMonth() + 1), String(dt.getDate())]
  const [week, daySeconds] = [dt.getDay(), 1000 * 60 * 60 * 24]
  const minusDay = week !== 0 ? week - 1 : 6
  const weekDay = `星期${"日一二三四五六"[week]}`
  const [dateStr, startStr, endStr, yesterDayStart] = ['YYYY-MM-DD', 'YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59', curSecond - daySeconds]
  const [yesterday, _yesterday] = [dateFormat(dateStr, yesterDayStart), [dateFormat(startStr, yesterDayStart), dateFormat(endStr, yesterDayStart)]] // 昨天
  const [today, _today] = [dateFormat(dateStr, dt), [dateFormat(startStr, dt), dateFormat(endStr, dt)]] // 今天
  // 上周
  const [lastWeekStart, lastWeekEnd] = [curSecond - (minusDay + 7) * daySeconds, curSecond - (minusDay + 1) * daySeconds]
  const [lastWeek, _lastWeek] = [[dateFormat(dateStr, lastWeekStart), dateFormat(dateStr, lastWeekEnd)], [dateFormat(startStr, lastWeekStart), dateFormat(endStr, lastWeekEnd)]]
  // 本周
  const [curWeekStart, curWeekEnd] = [curSecond - minusDay * daySeconds, curSecond + (6 - minusDay) * daySeconds]
  const [curWeek, _curWeek] = [[dateFormat(dateStr, curWeekStart), dateFormat(dateStr, curWeekEnd)], [dateFormat(startStr, curWeekStart), dateFormat(endStr, curWeekEnd)]]
  // 下周
  const nextWeekStart = curSecond + (8 - week) * daySeconds
  const nextWeekEnd = nextWeekStart + 6 * daySeconds
  const [nextWeek, _nextWeek] = [[dateFormat(dateStr, nextWeekStart), dateFormat(dateStr, nextWeekEnd)], [dateFormat(startStr, nextWeekStart), dateFormat(endStr, nextWeekEnd)]]
  return { year, _month, month, day, _day, hour, minutes, seconds, yesterday, _yesterday, today, _today, lastWeek, _lastWeek, curWeek, _curWeek, week, weekDay, nextWeek, _nextWeek }
}
/**
 * 将毫秒数转换成天、时、分、秒、毫秒
 * @param {String} format 时间格式
 * @param {Number} leftMs 剩余的时间，毫秒数
 * @param {Number} strType  ellipsis: 当出现 “0天1小时” 显示为 “1小时”
 * @returns 
 * @举例
 * ms2Dhs('dd天hh小时mm分钟ss秒', 62e3)
 * --->
 * {formateStr: '01分钟02秒', d: 0, h: '00', m: '01', s: '02', ms: '500'}
 */
export function ms2Dhs(format = 'dd天hh小时mm分钟ss秒', leftMs, strType = 'ellipsis') {
  const minute = leftMs / 1000 / 60
  let [d, h, m, s, ms] = [Math.floor(minute / 60 / 24), Math.floor(minute / 60 % 24), Math.floor(minute % 60), Math.floor(leftMs / 1000 % 60), Math.floor(leftMs % 1000)]
  if(strType == 'ellipsis') {
    let regStr = d > 0 ? 'dd' : h > 0 ? 'hh' : m > 0 ? 'mm' : s > 0 ? 'ss' : ms > 0 ? 'ms' : ''
    format = format.slice(format.indexOf(regStr))
  }
  ;[h, m, s, ms] = [addZero(h, 2), addZero(m, 2), addZero(s, 2), addZero(ms, 3)]
  return format.replace(/dd/g, d).replace(/hh/g, h).replace(/mm/g, m).replace(/ss/g, s).replace(/ms/g, ms)
}
/**
 * 根据年和月，得出该年月有多少天。（原理：计算出他的下个月， 用它的下个月生成毫秒数-当前月毫秒数再除以一天的毫秒数===天数）
 * @param {String} year 
 * @param {String} month 
 * @returns 
 * @举例子 getDays(2021, 11) ---> 30
 */
export function getDays(year, month) {
  let nextMoth = Number(month) + 1 == 13 ? 1 : Number(month) + 1
  let nextYear = Number(month) + 1 == 13 ? Number(year) + 1 : Number(year)
  let milliseconds = new Date(`${nextYear}-${nextMoth}-1`).getTime() - new Date(`${year}-${month}-1`).getTime()
  let dayMilliseconds = 3600 * 24 * 1000
  return milliseconds / dayMilliseconds
}
/**
 * 查出日期位于一年中的第多少天
 * @param {Date || String || Number} date 传入日期
 * @returns 传入的日期是一年中的第多少天
 * @举例 dayOfYear(new Date()) ----> 307
 */
export const dayOfYear = date => Math.floor((date - new Date(date.slice(0, 4), 0, 0)) / 1000 / 60 / 60 / 24)
/*
**********************************************************************************************
******************************************业务函数*********************************************
**********************************************************************************************
*/
/**
 * 设置接口字段默认值
 * @param {*} res 接口返回的数据
 * @param {*} defaultObj 默认值对象，可以选填一些关键字段。
 * @returns 
 * @举例
 * const res = setDef({ list: null, detail: {}, name: 'tom' }, {list: [], detail: { arr: []}}) // 这样就对原始数据进行了默认值处理
  {
    "list": [],
    "detail": {
      "arr": []
    },
    "name": "tom"
  }
 */
export function setDef(res = {}, defaultObj = {}) {
  return Object.entries(defaultObj).reduce((prev, [key, val]) => {
    if(typeStr(prev[key]) !== typeStr(val) || isEmpty(val)) {
      console.warn(`默认值兼容处理:${key}-${JSON.stringify(prev[key])}`)
      prev[key] = val
    }
    return prev
  }, res)
}
/**
 * 字段平铺，将某一些类型的字段进行平铺
 * @param {Object} obj 需要处理的数据
 * @param {String} fn () => true 这代表全部解析。  k => ['school', 'teacher'].includes(k) 代表只平铺school、teacher字段
 * @param {*} split 平铺后，每个字段的分隔符
 * @returns 
 * @举例
  flatKey({
    age: 18, 
    name: '', 
    school: {
      address: '江苏省常州市武进区', 
      name:'石桥小学'
    },
    teacher: ['王老师', '李老师'],
  })
  ------>
  {
    "age": 18,
    "name": "",
    "school__address": "江苏省常州市武进区",
    "school__name": "石桥小学",
    "teacher__0": "王老师",
    "teacher__1": "李老师"
  }
 */
export function flatKey(obj, fn = () => true, split = '__') {
  const flatten = (obj, fn, result, prevKey, split) => {
    const getKey = val => val.filter(v => v !== undefined && v !== null && v !== '').join(split)
    for (const [key, val] of Object.entries(obj)) {
      const fullKey = getKey([prevKey, key])
      // 如果需要展开
      if (isFunction(fn) && fn(key, val) && (isObject(val) || isArray(val))) {
        if (isObject(val)) {
          flatKey(val, fn, result, fullKey, split)
        } else {
          val.forEach((v, i) => {
            const subKey = getKey([fullKey, i])
            isObject(v) ? flatKey(v, fn, result, subKey, split) : result[subKey] = v
          })
        }
      } else {
        result[fullKey] = val // 普通值直接赋值
      }
    }
    return result
  }
  return flatten(obj, fn, {}, '', split)
}
/**
 * 将平铺的字段，收起来
 * @param {*} obj 
 * @returns 
 * @举例
  unFlatKey({
    "age": 18,
    "name": "",
    "school__address": "江苏省常州市武进区",
    "school__name": "石桥小学",
    "teacher__0": "王老师",
    "teacher__1": "李老师"
  })
  ----------->
  {
    "age": 18,
    "name": "",
    "school": {
      "address": "江苏省常州市武进区",
      "name": "石桥小学"
    },
    "teacher": ["王老师","李老师"]
  }
 */
export function unFlatKey(flatObj, split = '__') {
  const result = {}
  Object.entries(flatObj).forEach(([flatKey, value]) => {
    const keys = flatKey.split(split)
    let current = result
    keys.forEach((k, idx) => {
      const [isLast, keyOrIndex] = [idx === keys.length - 1, isArray(current) ? Number(k) : k]
      if (isLast) { return current[keyOrIndex] = value }
      const nextType = /^\d+$/.test(keys[idx + 1]) ? [] : {}
      current = (current[keyOrIndex] ||= nextType)
    })
  })
  return result
}
/**
 * 获取平铺后的全部图片url地址
 * @param {Object} obj 
 * @returns 
 */
export function getImgs(obj) {
  const allField = flatKey(obj, () => true)
  const allImgUrls = Object.keys(allField).map(v => allField[v]).filter(v => isString(v) && v.includes('http') && (v.includes('.png') || v.includes('.jpg') || v.includes('.jepg') || v.includes('.bmp') || v.includes('.tiff') || v.includes('data:image/')))
  return [...new Set(allImgUrls)]
}
/**
 * 应用于当前DOM元素，将DOM滚动到指定位置
 * 整个页面之间，平滑滚动
 * --->取代锚点。将传入的DOM，滚动到指定位置
 * @param {DOM} dom 传入的DOM元素
 * @param {Number} position 滚动到什么位置  'top'：滚动到视口的顶部   'center'：滚到到视口中央  'bottom'：滚动到视口底部  'noscroll'：不滚动
 * @param {Number} type 滚动类型：'smooth'：平滑滚动   'instant'：迅速滚动
 * @举例子 domScroll(this.$refs.testRef, 'bottom', 'smooth') // 执行完这个函数，那么会找到页面上ref为testRef的DOM，然后平滑滚动到页面顶部
 */
// export const domScroll = function (dom, position = 'top', type = 'smooth') {
//   const mapPosition = ['start', 'center', 'end', 'auto']
//   dom.scrollIntoView({ behavior: type, block: mapPosition[position] })
// }
/**
 * 滚动的盒子中的某个位置。可以是任意一个盒子
 * 只要盒子是 超出滚动的，拿到他的dom，然后，传入滚动距离必然可以滚动
 * 注意，如果想让这个盒子能滚动到某个位置。首先这个盒子必须是可滚动的，也就是高度得固定的
 * @param {String|dom} 盒子的id 或者这个盒子的dom
 * @param {Number} offsetHeight 需要滚动的距离
 * @param {String} type 滚动类型 'smooth'：平滑滚动   'instant'：迅速滚动
 * @param {String} direction 滚动方向 'y'：垂直滚动   'x'：水平滚动
 * @returns
 * @举例子 boxScroll('domId', 300)
 */
export function boxScroll(e, offsetHeight = 0, type = 'smooth', direction = "y") {
  const params = direction == 'y' ? { behavior: type, top: offsetHeight } : { behavior: type, left: offsetHeight }
  const dom = getDom(e)
  dom && dom.scrollTo(params) // 平滑滚动 | 迅速滚动
}
// 获取视口总高度
export const get100vh = () => window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight
// 获取视口总宽度
export const get100vw = () => window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth
// 获取当前滚动距离顶部的距离
export const getScrollTop = () => (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
/**
 * 获取元素当前所在位置
 * 距离视窗的距离。一般现在通过 IntersectionObserver API实现了，请看https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
 * @param {Dom} e id 或者是直接传入dom
 * @returns 
 * @举例 getViewPos(this.$refs.xxx)   ----> { "top": 60, "bottom": 60, "left": 0, "right": 1477, "width": 200, "height": 50 }
 * @举例 getViewPos('id')   ----> { "top": 60, "bottom": 60, "left": 0, "right": 1477, "width": 200, "height": 50 }
 * @举例 getViewPos(_.getDom('id'))   ----> { "top": 60, "bottom": 60, "left": 0, "right": 1477, "width": 200, "height": 50 }
 */
export function getViewPos(e, equal = false) {
  const dom = getDom(e)
  if(equal) { // 无误差情况
    const styles = window.getComputedStyle(dom)
    const {top, bottom, left, right, width, height } = styles
    const getNum = str => safeGet(() => Number(str.match(/(\d+)/)[1]), str)
    return { top: getNum(top), bottom: getNum(bottom), left: getNum(left), right: getNum(right), width: e.offsetWidth, height: e.offsetHeight, styles }
  } else { // 在有translate动画的时候，e.getBoundingClientRect()计算会存在误差的。
    let {top, bottom, left, right, width, height } = dom.getBoundingClientRect()
    const { clientTop = 0, clientLeft = 0 } = window.document.documentElement // html元素对象的上边框的上边距和左边距
    ;[top, bottom, left, right] = [top - clientTop, bottom - clientTop, left - clientLeft, right - clientLeft]
    const {scrollTop = 0, scrollHeight = 0} = dom
    // height: dom盒子高度   scrollTop滚动的距离       scrollHeight：如果没有滚动的话，全部展开多高。（height + 最大scrollTop === scrollHeight）
    return { top, bottom, left, right, width, height, scrollTop, scrollHeight } // 是否触底允许有2px的误差，提高用户体验
  }
}
/**
 * 浏览器下一帧渲染之前执行此函数
 * @param {Function} fn 需要在下一次事件循环执行的函数
 * @举例 nextTick(() => {console.log('123')})
 */
export const nextTick = fn => window.requestAnimationFrame(fn)
/**
 * 轻提示
 * @param {String} str 提示的字符串内容
 * @param {Number} time 提示显示的时间
 * @param {Number} type 显示的样式类型
 * @举例 showToast('请输入手机号码')  // 弹出“请输入手机号码”这个提示，并且1500ms后自动消失
 */
export function showToast(str, time = 1500, type = 0) {
  var pObj = document.createElement("div") // 创建，写内容
  const innerHTML = {
    0: `<div class="nowrap1" style="position:fixed;z-index:9999;top:45%;left:50%;transform: translateX(-50%);font-size:0.30rem;padding:0.2rem 0.5rem;background:#4A4A4A;color:#fff;border-radius:0.15rem;min-width:3.8rem;text-align:center;">${str}</div>`,
    1: `<div class="nowrap1" style="position:fixed;z-index:9999;top:45%;left:50%;transform: translateX(-50%);font-size:0.30rem;padding:0.2rem 0.5rem;background:#fff;color:#000;border-radius:0.15rem;min-width:3.8rem;text-align:center;">${str}</div>`,
  }
  pObj.innerHTML = innerHTML[type] //添加内容
  document.body.appendChild(pObj)
  setTimeout(() => document.body.removeChild(pObj), time)
}
/**
 * 删除类名
 * @param {Dom} el dom节点 | id
 * @param {String} cls 样式类名
 * @returns 
 * @举例  _.removeClass(_.getDom('#test'), 'b') ---->  为id为test的盒子，移除b这个样式
 */
export function removeClass(el, cls) {
  if (!cls || !(cls = cls.trim())) { return }
  el = getDom(el)
  if (el.classList) {
    cls.indexOf(' ') > -1 ? cls.split(/\s+/).forEach(c => el.classList.remove(c)) : el.classList.remove(cls)
    !el.classList.length && el.removeAttribute('class')
  } else {
    var cur = " ".concat(el.getAttribute('class') || '', " ")
    var tar = ' ' + cls + ' '
    while (cur.indexOf(tar) >= 0) { cur = cur.replace(tar, ' ')}
    cur = cur.trim()
    cur ? el.setAttribute('class', cur) : el.removeAttribute('class')
  }
}
/**
 * 添加类名
 * @param {Dom} el dom对象 | id
 * @param {String} cls 样式类名样式类名
 * @returns 
 * @举例 _.addClass(_.getDom('#test'), 'fs26 b') ----> 为id为test的盒子，添加fs26 b这两个样式
 */
export function addClass(el, cls) {
  if (!cls || !(cls = cls.trim())) { return }
  el = getDom(el)
  if (el.classList) { return cls.indexOf(' ') > -1 ? cls.split(/\s+/).forEach(c => el.classList.add(c)) : el.classList.add(cls) }
  var cur = " ".concat(el.getAttribute('class') || '', " ")
  cur.indexOf(' ' + cls + ' ') < 0 && el.setAttribute('class', (cur + cls).trim())
}
/**
 * 删除style节点
 * @param {String|dom} e 需要删除的结点的id或者dom
 * @举例 removeStyle('z-loading-style')  // 删除id为z-loading-style的css结点
 */
export function removeStyle(e) {
  const selectDom = getDom(e)
  if(selectDom){ document.getElementsByTagName('head').item(0).removeChild(selectDom) } // 清除样式
}
/**
 * 往网页头部动态追加style
 * @param {String} css 可以手动传入需要载入的样式
 * @param {String} id 这个css的id，方便以后进行删除操作
 * @举例 addStyle('@keyframes moveY {0%{transform: translateY(0%);}100%{transform: translateY(-100%);}}', 'z-loading-style')  // 载入移动动画样式
 */
export function addStyle(css = '', id = ""){
  removeStyle(id) // 删除上次添加的这个id的CSS
  var styleObj = document.createElement('style')
  styleObj.id = id
  styleObj.innerHTML= css
  document.getElementsByTagName('head').item(0).appendChild(styleObj) // 添加样式到头部
  // document.head.append(styleObj)
}
/**
 * 删除DOM结点
 * @param {String|dom} id 需要删除的结点的id或者dom
 * @举例 removeDom('z-loading')  // 删除id为z-loading的dom
 */
export function removeDom(e) {
  const selectDom = getDom(e)
  if(selectDom){ document.body.removeChild(selectDom) } // 清除DOM
}
/**
 * 往网页头部动态追加Dom
 * @param {Dom} dom 可以手动传入需要载入的Dom
 * @param {String} id 这个css的id，方便以后进行删除操作
 * @举例 addDom('<div>234324</div>', 'z-loading')  // 载入的dom
 */
export function addDom(el = '', id = ""){
  el = isDom(el) ? el : getDom(el)
  removeDom(id) // 删除上次添加的这个id的DOM
  var divObj = document.createElement("div")
  divObj.id = id
  divObj.innerHTML = el
  document.body.appendChild(divObj) // 添加Dom节点到body中
  return divObj
}
/**
 * 创建节点
 * @param {*} tagName 标签名称
 * @returns
 * @举例  createElement('div')
 */
export const createElement = tagName => document.createElement(tagName)
/**
 * 从父节点移除子节点
 * @param {Dom} parent 父dom
 * @param {Dom} child 子dom
 * @举例  removeChild(_.getDom('#test'), _.getDom('#child'))
 */
export const removeChild = (el, child) => {
  el = getDom(el)
  el.removeChild(child)
} 
/**
 * 给指定dom添加子节点
 * @param {Dom} parent 父dom
 * @param {Dom} child 子dom
 * @举例  appendChild(_.getDom('#test'), createElement('div'))
 */
export const appendChild = (el, child) => {
  el = getDom(el)
  el.appendChild(child)
}
/**
 * 窗口调整
 * @param {Function} fn 
 */
export const resize = fn => window.onresize = () => { fn() }
/**
 * 设置标题
 * @param {String} title 网页标题
 * @举例 setTitle('订餐管理系统')  // 设置首页标题为“订餐管理系统”
 */
export const setTitle = title => document.title = title
 /**
  * 跳转
  * @param {String} href 链接地址
  * @举例 goUrl('https://www.baidu.com')  // 跳转到百度
  */
export const goUrl = href => window.location.href = href
/**
 * 密码强度检测。备注：这个函数要依据不同的项目的密码强度规则，做对应的改造
 * @param {String} str 密码
 * @returns {Number} 密码强度
 * @举例 checkPwd('ss142152') ------>  2
 */
export function checkPwd(str) {
  var Lv = 0
  if (str.length < 6) { return Lv } 
  if (/[0-9]/.test(str)) { Lv++ } // 数字+1
  if (/[a-z]/.test(str)) { Lv++ } // 小写字母+1
  if (/[A-Z]/.test(str)) { Lv++ }  // 大写字母+1
  if (/[\.|-|_!@#$%^&*()`]/.test(str)) { Lv++ } // 特殊字符+1
  return Lv
}
/**
 * 异步加载js
 * @param {String} url 需要加载的js
 * @举例子 在async函数中调用 await loadJs("//res.wx.qq.com/open/js/jweixin-1.6.0.js") 
 */
export const loadJs = (function() {
  let loadedJs = []
  return function (url){
    return new Promise((resolve, reject) => {
      if(loadedJs.includes(url)) { return resolve() }
      let script = document.createElement("script")
      script.type = "text/javascript"
      script.src = url
      document.body.appendChild(script)
      script.onload = () => { loadedJs.push(url);resolve(); }
      script.onerror = () => reject()
    })
  }
})()
/**
 * 异步加载css
 * @param {String} href 需要加载的css
 * @举例子 在async函数中调用 await loadCss("") 
 */
export const loadCss = (function(href) {
  let loadedCss = []
  return function (){
    return new Promise((resolve, reject) => {
      if(loadedCss.includes(href)) { return resolve() }
      let link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.href = href
      document.head.appendChild(link)
      link.onload = () => { loadedCss.push(href);resolve(); }
      link.onerror = () => reject()
    })
  }
})()
/**
 * 图片预加载
 * @param {Array} arr 需要预加载的图片数组
 * 利用浏览器的缓存策略只要加载过的图片会缓存起来，第二次加载会优先从缓存中找
 * @举例 
 * preLoadImg([
 *   'https://health.gagctv.com/wechat/jjzs/static/wechat_icon.png',
 *   'https://health.gagctv.com/wechat/jjzs/static/basic_info_top_bg.png',
 *   'https://health.gagctv.com/wechat/jjzs/static/summary.png',
 *   'https://health.gagctv.com/wechat/jjzs/static/man_model.png',
 *   'https://health.gagctv.com/wechat/jjzs/static/person_icon.png'
 * ])
 */
export function preLoadImg(arr = []) {
  const promiseAll = arr.map(item => {
    return new Promise((resolve, reject) => {
      var img = new Image()
      img.onload = () => { img.onload = null;resolve(img) }
      img.error = () => reject('图片加载失败')
      img.src = item
    })
  })
  return Promise.all(promiseAll)
}
/**
 * 加载图片。如果传入了宽高。那么原始图片
 * 1、图片 naturalWidth > naturalHeight ---->  图片 width ---> 设定的值。高度自适应
 * 2、图片 naturalHeight > naturalWidth ---->  图片 height ---> 设定的值。宽度自适应
 * 逻辑：
 * 如果原始尺寸就是宽 >= 高，则图片显示宽度，等于传入宽度，然后自动算出图片显示高度
 * 如果原始尺寸就是宽 < 高，则图片显示高度，等于传入高度，然后自动算出图片显示宽度
 * @param {*} src 
 * @param {*} width 最大宽度边界
 * @param {*} height 最大高度边界
 * @param {*} type 适配类型   auto自动适配，如果原始图片宽>高，就限制宽为传入的宽，如果高>宽大就限制高为传入的高
 *                           width限制宽为传入的宽
 *                           height限制宽为传入的宽
 * @returns 
 */
export function loadImgObj(src, width, height, type = 'auto') {
  if(!src) { return }
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.src = src
    image.onload = e => {
      const { naturalWidth, naturalHeight } = image
      const ratio = naturalHeight / naturalWidth
      if(type == 'auto') {
        if(naturalHeight >= naturalWidth) {
          width = Number(round(height / ratio, 0))
        } else {
          height = Number(round(width * ratio, 0))
        }
      } else if(type == 'width') {
        height = Number(round(width * ratio, 0))
      } else if(type == 'height'){
        width = Number(round(height / ratio, 0))
      }
      resolve({ image: src, naturalWidth, naturalHeight, width, height, ratio, scale: width / naturalWidth })
    }
    image.onerror = () => reject(new Error('图片加载失败'))
  })
}
/**
 * 异常捕获处理
 * @param {*} fn 
 * @param {*} catchFn 
 * @param {*} finallyFn 
 * @举例 tryCatch(() => { console.log(1) }, e => console.log(e), e => {})
 */
export async function tryCatch(fn, catchFn = e => {}, finallyFn = () => {}){
  let res = null
  try {
    res = await fn()
  } catch (e) {
    catchFn(e)
  } finally {
    finallyFn()
  }
  return res
}
/**
 * 执行此函数，可以做一个延时功能。在需要延时执行一段逻辑的时候可以使用
 * @param {String|Number} t
 * @returns 返回一个promise对象，等待t时间后，最终返回定时器id
 * 举例子: await wait(500)   // 那么程序会在此处阻塞等待500ms
 * 备注：
 *  ·此方案平均误差：<2ms，最大误差：<5ms
 *  ·而setTimeout方式，误差大约在10ms~50ms
 */
export function wait(ms) {
  const target = performance.now() + ms
  return new Promise(resolve => {
    function check() {
      const diff = target - performance.now()
      if (diff <= 0) return resolve()
      // 剩余时间短就用短间隔循环检测
      setTimeout(check, Math.min(diff, 4))
    }
    setTimeout(check, ms - 4) // 提前4ms启动微调
  })
}
/**
 * 执行此函数，可以做一个延时功能。在需要延时执行一段逻辑的时候可以使用
 * @param {String|Number} t
 * @returns 返回一个promise对象，等待t时间后，最终返回定时器id
 * 举例子: await frameWait(500)   // 那么程序会在此处阻塞等待500ms
 * 备注：
 *  ·此方案实际测试误差1~4ms，理论误差最大为16.7ms。
 *  ·但是这个方案适合做动画，因为他天然绑定了帧率
 *  ·而setTimeout方式，误差大约在10ms~50ms
 */
export function frameWait(ms) {
  const start = performance.now()
  return new Promise(resolve => {
    function loop() {
      performance.now() - start >= ms ? resolve() : requestAnimationFrame(loop)
    }
    loop()
  })
}
/**
 * 深拷贝
 * @param {*} obj 传入任意类型都可以做深拷贝 
 * @returns 返回深拷贝的数据
 * @举例子
   const obj = {name:'a', age:'18', time: new Date()}; 
   deepCopy(obj) ----> {name:'a', age:'18'}
 */
export function deepCopy(obj, hash = new WeakMap()) {
  if(!isReference(obj) && !isDate(obj) && !isRegExp(obj) && !isMap(obj) && !isSet(obj)) { return obj }
  if(hash.has(obj)) { return hash.get(obj) } 
  if(isDate(obj)) { return new Date(obj) }
  if(isRegExp(obj)) { return new RegExp(obj) }
  if(isMap(obj)) {
    const result = new Map()
    hash.set(obj, result)
    obj.forEach((v, k) => result.set(deepCopy(k, hash), deepCopy(v, hash)))
    return result
  }
  if(isSet(obj)) {
    const result = new Set()
    hash.set(obj, result)
    obj.forEach(v => result.add(deepCopy(v, hash)))
    return result
  }
  const result = isArray(obj) ? [] : {}
  hash.set(obj, result)
  Reflect.ownKeys(obj).forEach(key => result[key] = deepCopy(obj[key], hash))
  return result
}
/**
 * 函数防抖
 * @param {*} fn 需要防抖的函数
 * @param {*} wait 防抖时间
 * @returns 
 * @举例 const fn = (e) => {console.log(e)}
 * @举例 const newFn = debounce(fn, 2e3) ----> 这样的话执行newFunc()就会有防抖效果
 * newFn(1);newFn(1);newFn(1);newFn(1);newFn(1);newFn(1);
 */
export function debounce(fn, wait=3e3) {
  let timeout = null  // 使用闭包，让每次调用时点击定时器状态不丢失
  return function () { 
    clearTimeout(timeout) // 如果用户在定时器（上一次操作）执行前再次点击，那么上一次操作将被取消
    timeout = setTimeout(()=> fn(...arguments), wait)
  }
}
/**
 * 函数节流
 * @param {Function} fn  需要做节流的函数
 * @param {Number|String} wait 节流时间
 * @returns 
 * @举例 const fn = () => {console.log(1)}
 * @举例 const newFn = throttling(fn, 2e3) ----> 生成了节流函数
 */
export function throttling(fn, wait=3e3) {
  let [timeout, last] = [null, Date.now()]
  return (...args) => {
    let now = Date.now() // 记录第一次以后的每次点击的时间戳
    clearTimeout(timeout)
    if(now - last >= wait) { // 当时间到达设置的延时时间则立即调用数据处理函数
      last = now // 执行处理函数后，将结束时间设置为开始时间，重新开始记时
      fn(...args)
    } else {
      timeout = setTimeout(() => {last = Date.now();fn(...args)}, wait - (now - last)) // 后续点击没有到达设置的延时，定时器设定延时进行调用
    }
  }
}
/**
 * 获取cookie
 * @param {*} name cookie的字段名
 * @returns 
 * @举例 var third_app_token = getCookie('third_app_token')
 */
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
  return arr = document.cookie.match(reg) ? unescape(arr[2]) : null
}
//  清除cookie
export const clearCookies = () => document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
/**
 * 选择器查询
 * @param {String} selector 
 * @returns 返回全部/单个dom
 * 举例子: queryAll('.lazyLoadClass') ---->  查出所有类名为.lazyLoadClass的dom集合并转成数组
 * 举例子: query('.lazyLoadClass') ---->  查出第一个类名为.lazyLoadClass的dom
 */
export const queryAll = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector))
export const query = (selector, ctx = document) => ctx.querySelector(selector)
/**
 * 根据id、class获取dom
 * @param {*} el  可以传入id值
 * @returns dom或者dom数组
 */
export const getDom = el => isDom(el) ? el : document.getElementById(el)
/**
 * 本地存储
 * @param {String} name 
 * @returns 
 * getLocalStorage('token') ----> 获取token的值比如说为："be59044c178640c6be6d7fbcff2148af"
 * setLocalStorage('token', "be59044c178640c6be6d7fbcff2148af") ----> 设置token的值为be59044c178640c6be6d7fbcff2148af
 * removeLocalStorage('token') // 移除token
 */
export const getLocalStorage = name => safeGet(() => JSON.parse(window.localStorage.getItem(name)), window.localStorage.getItem(name))
export const setLocalStorage = (name, val) => window.localStorage.setItem(name, JSON.stringify(val))
export const removeLocalStorage = name => window.localStorage.removeItem(name)
export const clearLocalStorage = () => window.localStorage.clear()
/**
 * 会话存储
 * @param {String} name 
 * @returns 
 * getSessionStorage('token') ----> 获取token的值比如说为："be59044c178640c6be6d7fbcff2148af"
 * setSessionStorage('token', "be59044c178640c6be6d7fbcff2148af") ----> 设置token的值为be59044c178640c6be6d7fbcff2148af
 * removeSessionStorage('token') // 移除token
 */
export const getSessionStorage = name => safeGet(() => JSON.parse(sessionStorage.getItem(name)), window.localStorage.getItem(name))
export const setSessionStorage = (name, val) => window.sessionStorage.setItem(name, JSON.stringify(val))
export const removeSessionStorage = name => window.sessionStorage.removeItem(name)
export const clearSessionStorage = () => window.sessionStorage.clear()
/**
 * 根据身份证获取生日、虚岁、实岁、性别
 * @param {String} idCard 身份证
 * @returns 生日、虚岁、周岁、性别、身份证脱敏
 * @举例 getIdCardInfo('321281198210185179')  对身份证进行解析
 */
export function getIdCardInfo(idCard = '') {
  if(!isIdentity(idCard)) { return {} }
  const birthDay = `${idCard.slice(6, 10)}-${idCard.slice(10, 12)}-${idCard.slice(12, 14)}`
  const inventedAge = Number(dateFormat('YYYY', new Date())) - Number(idCard.slice(6, 10)) + 1
  const realAge = Math.floor((Number(dateFormat('YYYYMMDD', new Date())) - Number(idCard.slice(6, 14))) / 10000)
  const gender = idCard.slice(-2,-1) % 2
  const genderText = gender == 1 ? '男' : '女'
  return { birthDay, inventedAge, realAge, gender, genderText, secretIdCard: idCard.slice(0, 6) + '********' + idCard.slice(-4) }
}
/**
 * 宽松相等判断
 * @param {*} a 
 * @param {*} b 
 * @returns 
 * @举例 looseEqual({name: "zz"}, {name: "dd"}) // false
 * @举例 looseEqual({}, {}) // true
 * @举例 looseEqual([{}], [{}]) // true
 */
export function looseEqual(a, b) {
  if (a === b) { return true }
  const [isReferenceA, isReferenceB, isArrayA, isArrayB] = [isReference(a), isReference(b), isArray(a), isArray(b)]
  if (isReferenceA && isReferenceB) {
    try {
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => looseEqual(e, b[i]))
      } else if (isDate(a) && isDate(b)) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        const [keysA, keysB] = [Object.keys(a), Object.keys(b)]
        return keysA.length === keysB.length && keysA.every(key => looseEqual(a[key], b[key]))
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else if (!isReferenceA && !isReferenceB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
/**
 * 生产环境消除console
 * @举例 reWriteLog()   在main.js中执行此函数
 */
export function reWriteLog(){
  console.log = (function(log){
    return import.meta.env.MODE == 'development' ? log : function() {}
  })(console.log)
}
/**
 * 获取当前是被哪个函数调用
 * @returns 
 * @举例 console.log(_.where())
 */
export function where() {
  let reg = /\s+at\s(\S+)\s\(/g
  let str = new Error().stack.toString()
  let res = reg.exec(str) && reg.exec(str)
  return res && res[1]
}
/**
 * 监听键盘事件（在需要监听的页面的created生命周期中使用）
 * @param {*} ctx 上下文
 * @param {*} obj 事件注册对象
 * @举例 
 * created(){
 *   _.listenKey(this, {
 *      ArrowLeft: () => { console.log(this.scale) }, // 左箭头的点击事件
 *      ArrowRight: () => { console.log(this.scale) }, // 右箭头的点击事件
 *   })
 * }
 */
export function listenKey(ctx = window, obj = {}) {
  const mapFn = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Control', 'Alt', 'Shift', 'Tab', 'Space', 'Delete', 'Backspace'].reduce((prev, item) => (prev[item] = obj[item] || function(){}, prev), {})
  document.onkeydown = e => {
    e = e || window.event
    // console.log(e) // 此处可以打印查看按键key值
    const key = e.key.replace(/\s+/g, '') || e.code
    mapFn[key] && mapFn[key].call(ctx)
  }
}
/**
 * 绑定事件
 * @param {String} key 
 * @param {Function} fn 
 * @举例子 addEvent('contextmenu',handleRightMouseMenu) // 绑定右键事件
 * @举例子 addEvent('keydown', handleRightMouseMenu) // 绑定键盘按下事件事件
 * --------> 处理事件
 * const handleKeyDown = e => {
 *   const key = e.key.replace(/\s+/g, '') || e.code // key ---->'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Control', 'Alt', 'Shift', 'Tab', 'Space', 'Delete', 'Backspace'
 *   if(key == 'Space') {
 *     ...
 *   }
 * }
 */
export const addEvent = (key, fn) => window.addEventListener(key,fn)
/**
 * 解绑事件
 * @param {String} key 
 * @param {Function} fn 
 * @举例子 removeEvent('contextmenu', handleRightMouseMenu) // 解绑右键事件
 * @举例子 removeEvent('keydown', handleKeyDown) // 解绑键盘事件
 */
export const removeEvent = (key, fn) => window.removeEventListener(key,fn)
/**
 * 注销键盘事件
 * @returns 
 * @举例 cancelListenKey() // 这样就取消了键盘的监听事件
 * beforeDestroy(){
 *   _.cancelListenKey()
 * }
 */
export const cancelListenKey = () => document.onkeydown = e => (e || window.event).preventDefault()
/*
**********************************************************************************************
******************************************网络安全*********************************************
**********************************************************************************************
*/
// https://juejin.cn/post/7033697067390205966
// https://juejin.cn/post/7013335205054251044
// npm install xss
// import filterXSS from "xss"
/*
**********************************************************************************************
******************************************函数处理（组合拆分）*********************************
**********************************************************************************************
*/
/**
 * 职责链模式（流程控制、跳转、递归、兜底异常捕获。用户可以指定下一步指向啥函数，默认按顺序执行）
 * 设计哲学：符合任务流的业务逻辑使用此代码，才能完美适配。否则就徒增烦恼。这就像，杀鸡你用牛刀就不合适。
 * 1、函数末尾返回next则继续执行
 * 2、函数执行有优先级，按照数组顺序
 * 3、重新调用，则从头开始匹配
 * @param {Array[...fns]} steps 职责链函数 
 * @param {Object} ctx 外部传入参数，作为上下文。可以默认不传任何参数 
 * @param {Object} 参数选项 
 * 
async function step1(ctx){
  ctx.token = 'abc123'
  console.log('Step1: 拿到token')
}
async function step2(ctx) {
  ctx.user = { id: 1, name: 'Tom' }
  console.log('Step2: 获取用户信息')
  return 'step3' // 2 传入2也可以。因为我同时支持了数字从0开始和字符串。
}
async function step3(ctx){
  console.log(ctx)
  console.log('Step3: 模拟失败')
  return false // 传入false则结束流程， true则直接走下一步
}
async function step4(ctx){
  console.log('Step4: 不会执行到这里')
}
flow([step1,step2,step3,step4])
// 举例子2：红绿灯
async function red(){
  console.log('红色1s')
  await wait(1000)
  console.log('红色2s')
  await wait(1000)
  console.log('红色3s')
  await wait(1000)
  return 'green'
}
async function green(){
  console.log('绿色1s')
  await wait(1000)
  console.log('绿色2s')
  await wait(1000)
  return 'yellow'
}
async function yellow(){
  console.log('黄色1s')
  await wait(1000)
  return 'red'
}
flow([red,green,yellow])
*/
export async function flow(steps = [], ctx = {}, { beforeEach = () => {}, afterEach = () => {}, onError = (err, ctx, i) => console.log(err, ctx, i) } = {}) {
  assert(isArray(steps), '必须传入数组')
  const nameToIndex = new Map(steps.map((fn, idx) => [fn.name, idx]))
  for (let i = 0; i < steps.length;) {
    const step = steps[i]
    try {
      await beforeEach(ctx, i)
      const res = await step(ctx)
      await afterEach(ctx, i, res)
      if (res === false) { // 返回false则不执行后续
        break
      } else if(res === true){ // 返回true则直接前往下一级
        continue
      }
      i = isNumber(res) ? res :
          isString(res) ? safeGet(() => nameToIndex.get(res), i) : i + 1
    } catch (err) {
      await onError(err, ctx, i)
      break
    }
  }
}
/**
 * 命令模式（任务队列）
 * @params fns 需要执行的函数列表 []fn | fn
 * 1、适合批量的往调用栈里面塞函数去执行
 * 2、全量执行，不可阻断和跳过
 * 3、执行过程中可以继续往后塞入新的函数执行
export const jump = async ctx => console.log('弹跳')
export const running = async ctx => console.log('奔跑')
export const boxing = async ctx => console.log('出拳')
export const leg = async ctx => console.log('出腿')
command([running]) 
command([boxing, boxing, leg]) 
command([jump, boxing]) 
*/
export const command = (function () {
  let commandList = [] // 命令函数列表
  let isExec = false // 是否有异步任务正在执行，防止重复执行
  return async function (fns = [], ctx = {}) {
    // 如果 fns 是数组，则拼接到 commandList 中
    commandList = [...commandList, ...(isArray(fns) ? fns : [fns])]
    if (isExec) return // 如果有任务在执行，则等待新的任务加入队列
    // 启动执行队列
    isExec = true
    while (commandList.length > 0) {
      const commandFn = commandList.shift() // 获取并移除队列中的第一个命令
      await commandFn.call(this, ctx) // 执行命令，传入上下文
    }
    isExec = false // 执行完毕
  }
})()
/*
**********************************************************************************************
******************************************数据结构*********************************************
**********************************************************************************************
*/
/**
 * Map
 * @属性方法 .size()   .set(key, value)   .get(key)   .has(key)   .delete(key)   .clear()
 * @遍历方法 .keys()   .values()   .entries()   .forEach((val, key, map) => {console.log(val, key, map)})
 * @举例 const map = new Map([[1, 'one'], [2, 'two']]) 转数组后可以使用数组方法
 * [...map.keys()] ===> [1, 2]
 * [...map.values()] ===> ['one', 'two']
 * [...map.entires()] ===> [[1, 'one'], [2, 'two']]
 * [...map] ===> [[1, 'one'], [2, 'two']]
 */
/**
 * 键值数组转对象
 * @param {Map} Map对象
 * @举例 map2Obj(new Map([[1, 'one'], [2, 'two']]))  // {1: 'one', 2: 'two'}
 */
export function map2Obj(map){
  let obj = Object.create(null)
  for(let [k, v] of map) { obj[k] = v }
  return obj
}
/**
 * JSON转键值数组
 * @param {Map} Map对象
 * @举例 obj2Map({1: 'one', 2: 'two'}) // [[1, 'one'], [2, 'two']]
 */
export function obj2Map(obj){
  let map = new Map()
  for(let k of Object.keys(obj)) { map.set(k, obj[k]) }
  return map
}
/**
 * 数组转对象
 * @param {Array} arr 需要转为对象的数组
 * @returns 
 * @举例 arr2Obj([{a:1, b:4, c:7}, {a:2, b:5, c: 8}, {a:3, b:6, c: 9}]) ----> {a: [1,2,3], b: [4, 5, 6], c: [7,8,9]}
 * @举例 arr2Obj(['a', 'b']) ----> {0:'a', 1:'b'}
 */
export function arr2Obj(arr){
  return arr.reduce((prev, item, index) => (isObject(item) ? Object.entries(item).forEach(p => (prev[p[0]] = [...(prev[p[1]] || []), p[1]])) : (prev[index] = item), prev), {})
}
/**
 * 将一个属性值为数组的一个集合，处理成对象数组
 * @param {*} obj 
 * @举例子 
 *  const obj = {a: [1,2,3], b: [4, 5, 6], c: [7,8,9]}
 *  obj2Arr(obj)
 * ------->  [{a:1, b:4, c:7}, {a:2, b:5, c: 8}, {a:3, b:6, c: 9}]
 */
export function obj2Arr(obj){
  const maxLen = Math.max(...Object.values(obj).map(v => v.length))
  return new Array(maxLen).fill('').reduce((prev, item, index) => [...prev, Object.entries(obj).reduce((p, v) => (p[v[0]] = v[1][index], p), {})], [])
}
/**
 * 二维数组行列互换
 * @param {Array<Array>} arr 需要行列互换的二维数组
 * @returns {Array<Array>} 
 * @举例  transformArr([['a','b','c'], [0, 1, 2]]) ---> [['a', 0], ['b', 1], ['c', 2]]
 */
export const transformArr = arr => isArray(arr[0]) ? arr[0].map((col, i) => arr.map(row => row[i])) : []

/**
 * 键值互换：将对象的值作为键、键作为值
 * @param {Object} obj 原始对象
 * @param {String} type 'drop' 表示丢弃重复键（只保留最后一个），默认保留所有
 * @returns {Object}
 * @example
 * invertObj({ a: 1, b: 2, c: 1 })         // { 1: ['a', 'c'], 2: ['b'] }
 * invertObj({ a: 1, b: 2, c: 1 }, 'drop') // { 1: 'c', 2: 'b' }
 */
export function invertObj(obj = {}, type = 'keep') {
  return Object.entries(obj).reduce((prev, [key, val]) => ((type === 'drop' ? (prev[val] = key) : (prev[val] ||= []).push(key)), prev), {})
}
/**
 * 逆转Map
 * @param {Array[Array]} twoDArr 二维数组
 * @param {String} type 是否丢弃相同key的字段。默认不丢弃   'drop'为丢弃重复键值
 * @returns 
 * @举例
 *  invertMap([['a', 1], ['b', 2], ['c', 1]])           // Map { 1 => ['a', 'c'], 2 => ['b'] }
 *  invertMap([['a', 1], ['b', 2], ['c', 1]], 'drop')   // Map { 1 => 'c', 2 => 'b' }
 */
export function invertMap(twoDArr = [], type = 'keep'){
  return [...twoDArr].reduce((prev, [key, val]) => {
    if(type == 'keep') {
      prev.has(val) ? prev.get(val).push(key) : prev.set(val, [key])
    } else {
      prev.set(val, key)
    }
    return prev
  }, new Map())
}
/**
 * 执行任务数组，每次只执行部分，避免阻塞主线程。
 * @param {Function[]} tasks - 任务数组，每个任务为一个函数。
 * @param {Function} scheduler - 自定义调度器，默认使用 requestIdleCallback。
 * @returns {Object} 包含 promise 和 cancel 方法。
  // 大量任务函数数组
  const myTasks = Array.from({ length: 30000 }, (_, i) => () => {
    const div = document.createElement('div')
    div.textContent = i
    document.body.appendChild(div)
  })
  // 自定义调度器。每隔1s执行1ms
  const customScheduler = chunk => {
    setTimeout(() => {
      const start = performance.now()
      chunk(() => performance.now() - start < 1)
    }, 1e3)
  }
  performTask(myTasks, customScheduler)
 */
/**
 * 执行任务数组，默认使用 requestIdleCallback 分片执行。
 * 可通过自定义调度器调整节奏，支持取消。
 * @param {Function[]} tasks - 任务数组
 * @param {Function} scheduler - 调度器函数，默认使用 requestIdleCallback
 * @returns {Function} cancel - 取消任务函数
 */
export function performTask(tasks, scheduler = chunk => requestIdleCallback(deadline => chunk(() => deadline.timeRemaining() > 0))) {
  if (!isArray(tasks) || !tasks.length) return () => {}
  let [i, cancelled] = [0, false]
  const run = () => {
    if (cancelled || i >= tasks.length) { return }
    scheduler(shouldContinue => {
      while (i < tasks.length && shouldContinue()) { tasks[i++]() }
      run()
    })
  }
  run()
  return () => { cancelled = true }
}
/**
 * 初始化高清 canvas（自动处理 devicePixelRatio，支持 dom 或 id）
 * @param {HTMLElement|string} val - canvas DOM 节点 或 DOM ID
 * @param {number} width - canvas 宽度（CSS 逻辑尺寸）
 * @param {number} height - canvas 高度（CSS 逻辑尺寸）
 * @returns {{ canvasRef, ctx, width, height }} - 返回 canvas、context、宽高
 */
export function initCanvas(val = required('canvas-dom'), width = required('canvas宽度'), height = required('canvas高度')) {
  const canvasRef = getDom(val)
  if (!canvasRef || !(canvasRef instanceof HTMLCanvasElement)) {
    console.warn('initCanvas: 无效的 canvas DOM')
    return {}
  }
  const dpr = window.devicePixelRatio || 1
  const ctx = canvasRef.getContext('2d')
  // 设置实际像素尺寸
  canvasRef.width = Math.round(width * dpr)
  canvasRef.height = Math.round(height * dpr)
  // 设置 CSS 尺寸
  canvasRef.style.width = width + 'px'
  canvasRef.style.height = height + 'px'
  // 缩放坐标系
  ctx.scale(dpr, dpr)
  // 可选优化：防止图像模糊（尤其 drawImage 时）
  ctx.imageSmoothingEnabled = true
  // 可选扩展：清空方法，方便重绘
  ctx.clear = () => ctx.clearRect(0, 0, width, height)
  return { canvasRef, ctx, width, height }
}