import { difference, guID, isRegExp, isArray, query, getDom, isEmpty } from "@/common.js"
/**
* 处理提示信息--------> 原先的提示函数：Message.info(`小数自动保留${value}位`)体验不佳，已去除
* @param {*} el 需要操作的dom
* @param {*} msg 错误信息
* @param {*} id 错误信息id，用户后续的寻找并移除
* @param {*} type 错误类型 auto: 自动2s后删除  custom:用户手动删除
* @returns 
*/
const removeMsg = id => getDom(id) && getDom(id).remove()
export const processTip = function (el, msg, id = `z${guID()}`,){
  if(el.tagName == 'INPUT') { // 兼容一下原生的input
    el = el.parentElement
    el.style.position = 'relative'
  }
  // 获取这个盒子容易，未来用于改变边框颜色
  const wrapperDom = query("[class*='el-'][class*='__wrapper']", el) || query(".custom-input", el)
  // 在新增错误提示之前，先把之前可能存在的错误提示清除掉
  removeMsg(id) // 先删除当前这个指令的校验错误信息
  if(msg) {
    // 存在错误信息，应该将这个dom之前的全部指令的错误提示清除
    let msgDom = query(".zaz-formRender-msg-class", el)
    isArray(msgDom) ? msgDom.forEach(el => el.remove()) : msgDom ? msgDom.remove() : ''
    let divObj = document.createElement("div")
    divObj.id = id
    divObj.innerHTML = `<div class="zaz-formRender-msg-class abs nowrap bgf zx1 r0 l0 tl fs12" style="bottom:-18px;color:#f56c6c;line-height:16px;height:16px;">${msg}</div>`
    el.appendChild(divObj)
    // 增加错误的红色边框颜色提示
    if(wrapperDom) {
      wrapperDom.style.border = '1px solid red'
      wrapperDom.style.boxShadow = 'none'
      // if(wrapperDom.style.border) {
      //   wrapperDom.style.border = '1px solid red'
      // } else {
      //   wrapperDom.style.boxShadow = '0 0 0 1px red'
      // }
    }
  } else {
    let msgDom = query(".zaz-formRender-msg-class", el)
    if(isEmpty(msgDom) && wrapperDom) {
      wrapperDom.style.border = '1px solid #dcdee2'
      wrapperDom.style.boxShadow = 'none'
      // if(wrapperDom.style.border) {
      //   wrapperDom.style.border = '1px solid #dcdee2' // 将红色边框回复原样
      // } else {
      //   wrapperDom.style.boxShadow = '0 0 0 1px #dcdfe6' // 将红色边框回复原样
      // }
    }
  }
}
/**
 * 移除事件
 * @param {*} el 
 */
function removeEvents(el){
  el.inputRef.removeEventListener('compositionstart', el.handleCompositionstart)
  el.inputRef.removeEventListener('compositionend', el.handlecompositionend)
  el.inputRef.removeEventListener('input', el.handleInput)
}
/**
 * 处理中文输入的情况
 * @param {*} ref 处理后的dom句柄
 * @param {*} el 当前绑定的dom
 * @param {*} vnode dom
 * @param {*} fn 处理函数
 */
function resolveChar(el, vnode){
  el.handleCompositionstart = () => vnode.inputLocking = true
  el.handlecompositionend = () => {vnode.inputLocking = false;el.inputRef.dispatchEvent(new Event('input'))}
  el.inputRef.addEventListener('compositionstart', el.handleCompositionstart)
  el.inputRef.addEventListener('compositionend', el.handlecompositionend)
  el.inputRef.removeEventListener('input', el.handleInput)
  el.inputRef.addEventListener('input', el.handleInput, true)
}
/**
 * 允许输入什么
 * 允许中文：/[\u4e00-\u9fa5]/
 * 允许数字：/[0-9]/
 * 允许小写字母：/[a-z]/
 * 允许大写字母：/[A-Z]/
 * 允许下划线：_
 * 直接使用： <Input v-allow="[/[\u4e00-\u9fa5]/, /[0-9]/, /[a-z]/, /[A-Z]/, '_']"></Input>
 */
export const allow = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el.querySelector('textarea') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      tmp = tmp.split('').reduce((prev, item) => value.some(v => isRegExp(v) ? v.test(item) : v == item) ? prev + item : prev, '')
      if(tmp != originVal) {
        processTip(el, `${el.label || ''}存在不符合规范的字符${difference(originVal.split(''), tmp.split('')).join(' ')}`, id) 
      } else {
        processTip(el, '', id) 
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 自定义校验
 * 传入校验函数
 *    函数入参：为输入框的值
 *    函数返回值：[错误提示信息, 修改后的值]  ---->  修改后的值可以不写，不写则使用默认值
 * 直接使用： <Input v-custom="e => { if(e > 10) return ['不得超过10', 10] }"></Input>
 */
export const custom = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el.querySelector('textarea') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      // let tmp = inputRef.value
      const [msg, val] = value(originVal) || []
      if(msg) { 
        // tmp = val || tmp
        processTip(el, `${el.label || ''}${msg}`, id)
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 禁止输入什么
 * 禁止中文：/[\u4e00-\u9fa5]/
 * 禁止数字：/[0-9]/
 * 禁止小写字母：/[a-z]/
 * 禁止大写字母：/[A-Z]/
 * 禁止下划线：_
 * 直接使用： <Input v-ban="[/[\u4e00-\u9fa5]/, /[0-9]/, /[a-z]/, /[A-Z]/, '_']"></Input>
 */
export const ban = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el.querySelector('textarea') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      tmp = tmp.split('').reduce((prev, item) => value.some(v => isRegExp(v) ? v.test(item) : v == item) ? prev : prev + item, '')
      if(tmp != originVal) { 
        processTip(el, `${el.label || ''}存在不符合规范的字符${difference(originVal.split(''), tmp.split('')).join(' ')}`, id)
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 传入对应的需要校验的字段值。来校验必填
 * 直接使用： <Input v-required="formObj.name"></Input>
 */
export const required = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el.querySelector('textarea') || el
    el.inputRef = inputRef
    el.msgId = `z${guID()}`
    el.originVal = inputRef.value
    el.handleInput = e => window.requestAnimationFrame(() => {
      if(value !== false && !inputRef.value) {
        processTip(el, `${el.label || '此项'}必填`, el.msgId)
      } else {
        processTip(el, '', el.msgId)
      }
    })
    resolveChar(el, vnode)
  },
  updated(el, binding) {
    const { oldValue, value } = binding
    if(value) {
      processTip(el, '', el.msgId)
    } else if(!value && value !== oldValue){
      // processTip(el, `${el.label || '此项'}必填`, el.msgId)
    }
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}

/**
 * 首字符删除什么
 * @param {Function} 
 * 删除中文：/[\u4e00-\u9fa5]/
 * 删除数字：/[0-9]/
 * 删除小写字母：/[a-z]/
 * 删除大写字母：/[A-Z]/
 * 删除下划线：_
 * 直接使用： <Input v-cutHead="[/[0-9]/]"></Input>
 */
export const cutHead = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el.querySelector('textarea') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      const [left, right] = [tmp[0], tmp.slice(1)]
      tmp = value.some(v => isRegExp(v) ? v.test(left) : v == left) ? right : tmp
      if(tmp != originVal) {
        processTip(el, `${el.label || ''}不能用【${difference(originVal.split(''), tmp.split('')).join(' ')}】开头`, id)
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 编码格式大小写字母、数字、英文符号
 * @param {Function} 
 * 直接使用： <Input v-code></Input>
 */
export const code = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      tmp = tmp.replace(/[^0-9A-Za-z!@#$%^&*()_+-{}?><|/.,`]/g, '')
      if(tmp != originVal) {
        processTip(el, `${el.label || ''}存在不符合规范的字符${difference(originVal.split(''), tmp.split('')).join(' ')}`, id) 
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 编码格式大小写字母、数字、英文符号
 * @param {Function} 
 * 直接使用： <Input v-type></Input>
 */
export const type = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      tmp = tmp.replace(/[^0-9A-Za-z_-\s]/g, '')
      if(tmp != originVal) {
        processTip(el, `${el.label || ''}存在不符合规范的字符${difference(originVal.split(''), tmp.split('')).join(' ')}`, id) 
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 数据集名称
 * @param {Function} 
 * 直接使用： <Input v-dataSet></Input>
 */
export const dataSet = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      tmp = tmp.replace(/[^a-zA-Z0-9_]/g, '')
      if(tmp != originVal) {
        processTip(el, `${el.label || ''}存在不符合规范的字符${difference(originVal.split(''), tmp.split('')).join(' ')}`, id) 
      } else {
        processTip(el, '', id)
      }
      inputRef.value = tmp
      if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 标签名称
 * @param {Function} 
 * 直接使用： <Input v-tag></Input>
 */
export const tag = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el.querySelector('textarea') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      tmp = tmp.replace(/[!@#$%^&*()+{}?><|/.,`！￥……（）=——\[\]；‘’。，、]/g, '')
      if(tmp != originVal) {
        processTip(el, `${el.label || ''}存在不符合规范的字符${difference(originVal.split(''), tmp.split('')).join(' ')}`, id) 
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 限制整数
 * @param {Function} 
 * 直接使用： <Input v-int></Input>
 * 传入-，允许所有整数： <Input v-int="-"></Input>
 * 传入+，允许自然数： <Input v-int="+"></Input>
 */
export const int = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      // let tmp = inputRef.value.replace(eval(`/[^0-9${value == '-'? '-' : ''}]/g`), '')
      let tmp = inputRef.value.replace(new RegExp(`[^0-9${value == '-'? '-' : ''}]`, 'g'), '')
      const symbol = tmp.at(0) == '-' ? '-' : ''
      if(symbol === '-') { tmp = tmp.slice(1) }
      tmp = tmp.replace(/-/g, '')
      tmp = tmp == '' ? '' : (tmp.replace(/^0+/g, '') || '0')
      tmp = symbol + tmp
      if(tmp != originVal) {
        processTip(el, `${el.label || ''}存在不符合规范的字符${difference(originVal.split(''), tmp.split('')).join(' ')}`, id) 
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 限制只能输入小数
 * @param {Function} 
 * 直接使用： <Input v-float></Input>
 * 传入true使用，允许输入负值： <Input v-float="true"></Input>
 */
export const float = {
  mounted(el, {value}, vnode) {
    let inputRef = el.querySelector('input') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      // tmp = tmp.replace(eval(`/[^0-9.${value ? '-' : ''}]/g`), '') // 非数字、点、负号，替换为空
      tmp = tmp.replace(new RegExp(`/[^0-9.${value ? '-' : ''}]`, 'g'), '') // 非数字、点、负号，替换为空
      // const symbol = tmp.at(0) == '-' ? '-' : ''
      // if(symbol === '-') { tmp = tmp.slice(1) }
      // tmp = tmp.replace(/-/g, '')
      // tmp = tmp.split('').reduce((prev, item) => {
      //   if(item === '.') {
      //     prev.tmp +=  prev.dotNum === 0 ? item : ''
      //     prev.dotNum++
      //   } else {
      //     prev.tmp += item
      //   }
      //   return prev
      // }, {tmp:'', dotNum: 0})['tmp']
      // if(tmp.includes('.') && /-?([0-9]*).([0-9]*)/.test(tmp)) {
      //   const [, left, right] = tmp.match(/-?([0-9]*).([0-9]*)/)
      //   tmp = symbol + (left.replace(/^[0]+/g, '') || '0') + '.' + right
      // } else {
      //   tmp = symbol + (tmp == '' ? '' : (tmp.replace(/^[0]+/, '') || '0'))
      // }
      if(tmp != originVal) { 
        processTip(el, `${el.label || ''}存在不符合规范的字符${difference(originVal.split(''), tmp.split('')).join(' ')}`, id) 
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    if(!inputRef) { inputRef = el }
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 字段名格式，只能由数字、字母、下划线构成，并且不能以数字开头
 * @param {Function} 
 * 直接使用： <Input v-field></Input>
 */
export const field = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      tmp = tmp.replace(/[^0-9A-Za-z_]/g, '')
      let testTmp0 = tmp[0]
      while(/[0-9]/.test(tmp[0])){ tmp = tmp.slice(1) }
      if(originVal != tmp) { 
        if(/[0-9]/.test(testTmp0)) {
          processTip(el, `${el.label || ''}不能以数字开头，不合规范的字符【${difference(originVal.split(''), tmp.split('')).join(' ')}】`, id)
        } else {
          processTip(el, `${el.label || ''}只能由数字、字母、下划线构成，不合规范的字符【${difference(originVal.split(''), tmp.split('')).join(' ')}】`, id)
        }
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 姓名，不可以输入空格和数字
 * @param {Function} 
 * 直接使用： <Input v-name></Input>
 */
export const name = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      tmp = tmp.replace(/[0-9!@#$%^&*()_+-?><|/,`！，、？~\s]+/g, '')
      if(originVal != tmp) {
        processTip(el, `${el.label || ''}存在不符合规范的字符${difference(originVal.split(''), tmp.split('')).join(' ')}`, id) 
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 去除空格
 * @param {Function} 
 * 直接使用，去除首尾空格： <Input v-trim></Input>
 * 传入0，去除首尾空格： <Input v-trim="'headTail'"></Input>
 * 传入1，去除全部空格： <Input v-trim="'all'"></Input>
 * 传入2，去除头部空格： <Input v-trim="'head'"></Input>
 * 传入3，去除尾部空格： <Input v-trim="'tail'"></Input>
 */
export const trim = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      const reg = { 'headTail': new RegExp(/(^\s*)|(\s*$)/g),'all': new RegExp(/\s+/g),'head': new RegExp(/(^\s*)/g),'tail': new RegExp(/(\s*$)/g) }
      tmp = tmp.replace(reg[value], '')
      if(originVal != tmp) { 
        processTip(el, `${el.label || ''}空格已被过滤`, id) 
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 限制最多输入几个字符
 * @param {Function} 
 * 直接使用： <Input v-limit="[0,5]"></Input>
 */
export const limit = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el.querySelector('textarea') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      const [min, max] = value
      tmp = tmp.slice(0, Number(max))
      if(originVal != tmp) {
        processTip(el, `${el.label || ''}最多输入${max}个字符`, id) 
      } else if(originVal.length < Number(min)) { 
        processTip(el, `${el.label || ''}最少输入${min}个字符`, id)
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 限制小数点后保留几位
 * @param {Function} 
 * 直接使用： <Input v-decimalLimit="2"></Input>
 */
export const decimalLimit = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      if(tmp.includes('.') && /-?([0-9]*).([0-9]*)/.test(tmp)) {
        const [, left, right] = tmp.match(/-?([0-9]*).([0-9]*)/)
        if(right.length > value) {
          tmp = left ? (tmp.at(0) == '-' ? '-' : '') + left + '.' + right.slice(0, Number(value)) : ''
        }
      }
      if(originVal != tmp) {
        processTip(el, `${el.label || ''}小数自动保留${value}位`, id)
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 限制最小值
 * @param {Function} 
 * 直接使用： <Input v-min="0"></Input>
 */
export const min = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(async() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      // let tmp = inputRef.value
      originVal = originVal || 0
      if(String(originVal) && Number(originVal) < Number(value)){
        // tmp = value // 如果限制了最小值为5，并且这里会直接改为5，用户将无法输入12这样的数字了。因此注释
        processTip(el, `${el.label || ''}最小值为${value}`, id)
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 限制最大值
 * @param {Function} 
 * 直接使用： <Input v-max="100"></Input>
 */
export const max = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      // let tmp = inputRef.value
      if(String(originVal) && Number(originVal) > Number(value)){
        // tmp = value
        processTip(el, `${el.label || ''}最大值为${value}`, id)
      } else {
        processTip(el, '', id)
      }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
/**
 * 设置错误提示的label
 * @param {Function} 
 * 直接使用： <Input v-label="姓名"></Input>
 */
export const label = {
  mounted(el, {value}, vnode) {
    el.label = value || ''
    el.id = el.id || `zaz-formRender-form-${guID()}`
  },
  beforeUnmount(el) {
  },
}
/**
 * 设置表单的绑定的id，用于提交时候匹配查询出来，然后触发input，再提示错误信息
 * @param {Function} 
 * 直接使用： <Input v-id></Input>
 * 直接使用： <Input v-id="domId"></Input>
 */
export const id = {
  mounted(el, {value}, vnode) {
    el.id =  el.id || `zaz-formRender-form-${guID()}` // 增加id标识，用于后续触发保存时校验
  },
  beforeUnmount(el) {
  },
}
/**
 * input遮罩层，禁止选择
 * @param {Function} 
 * 直接使用： <Input v-model="accountObj._pwd" @on-change="inputPwd" type="text" v-mask placeholder="请输入登录密码"></Input>
 */
export const mask = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el
    const fatherDom = inputRef.parentElement
    fatherDom.style.position = 'relative'
    const op10Mask = document.createElement("div")
    op10Mask.style.backgroundColor = 'transparent'
    op10Mask.style.position = 'absolute'
    op10Mask.style.top = '0'
    op10Mask.style.right = '0'
    op10Mask.style.bottom = '0'
    op10Mask.style.left = '0'
    el.handler = () => {
      inputRef.focus && inputRef.focus()
    }
    op10Mask.addEventListener('click', el.handler)
    fatherDom.appendChild(op10Mask)
  },
  beforeUnmount(el) {
    el.inputRef.removeEventListener('click', el.handler)
  },
}
/**
 * input自动聚焦指令
 * @param {Function} 
 * 直接使用： <Input v-focus></Input>
 */
export const focus = {
  mounted: function (el) {
    // 聚焦元素
    const inputRef = el.querySelector('input')
    inputRef ? inputRef.focus() : el.focus()
  }
}
/**
 * 校验ipv4地址
 */
export const ipv4 = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el.querySelector('textarea') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      tmp = tmp.replace(/[^0-9.]/g, '')
      if(originVal != tmp) {
        processTip(el, `${el.label || ''}存在不符合规范的字符${difference(originVal.split(''), tmp.split('')).join(' ')}`, id)
      } else {
        processTip(el, '', id)
      }
      // let arr = tmp.split('.')
      // tmp = arr.slice(0, 4).map(v => v > 255 ? 255 : v < 0 ? '' : v > 0 ? Number(v) : v).join('.')
      // if(tmp.split('.').filter(Boolean).length == 4 && !isIpv4(tmp)) {
      //   processTip(el, `ip地址不符合规范`)
      // }
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}
// 校验url地址
export const url = {
  mounted(el, {value}, vnode) {
    const inputRef = el.querySelector('input') || el.querySelector('textarea') || el
    el.inputRef = inputRef
    const id = `z${guID()}`
    el.handleInput = e => window.requestAnimationFrame(() => {
      e.preventDefault()
      if (vnode.inputLocking) { return }
      let originVal = inputRef.value
      let tmp = inputRef.value
      tmp = tmp.replace(/[^0-9a-zA-Z%/]/g, '')
      if(originVal != tmp) {
        processTip(el, `${el.label || ''}存在不符合规范的字符${difference(originVal.split(''), tmp.split('')).join(' ')}`, id)
      } else {
        processTip(el, '', id)
      }
      // if(tmp[0] != '/') {
      //   tmp = `/${tmp}`
      // }
      // tmp = tmp.replace(/\/+/g, '/')
      // inputRef.value = tmp
      // if(originVal != tmp) { inputRef.dispatchEvent(new Event('input')) }
    })
    resolveChar(el, vnode)
  },
  beforeUnmount(el) {
    removeEvents(el)
  },
}