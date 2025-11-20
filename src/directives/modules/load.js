import { guID } from "@/common.js"
/**
 * 编码格式大小写字母、数字、英文符号
 * @param {Function} 
 * 直接使用： <div v-load="{isShow:true, text:'加载中...'}"></div>
 */
export const load = {
  mounted(el, {value}, vnode) {
    el.lastId = guID()
    el.cssId = guID()
  },
  updated(el, {value}, vnode) {
    el._oldBindVal = value
    const { isShow, text } = value
    if(isShow) {
      if(!['relative', 'absolute'].includes(el.style.position) && !/rel|abs/.test(el.className)) { el.style.position = 'relative' }
      _.removeCss(el.cssId)
      el.divObj && el.removeChild(el.divObj)
      _.addStyle(`
        .loadingDirective {width: 20px;height: 20px;border: 2px solid #329cff;border-top-color: transparent;border-radius: 50%;animation: circleDirective infinite 0.75s linear;}
        @keyframes circleDirective {0% { transform: rotate(0); }100% { transform: rotate(360deg); }}`, el.cssId)
      const divObj = el.divObj || document.createElement("div") // 创建，写内容
      divObj.id = `${el.lastId}`
      divObj.setAttribute("class", "abs trbl0 f ac xc")
      divObj.setAttribute("style", `background:rgba(255,255,255,.4)`)
      divObj.innerHTML = `<div class="rel f xc ac mt10 mb10">
        <div class="loadingDirective"></div>
        <div class="ml10">${text}</div>
      </div>`
      el.divObj = divObj
      el.appendChild(el.divObj)
    } else {
      if(el.divObj) {
        el.removeChild(el.divObj)
        delete el.divObj
        delete el._oldBindVal
      }
    }
  }
}