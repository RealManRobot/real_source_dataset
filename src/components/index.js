import zConfirm from "./zConfirm/index.vue"
import { addDom } from "@/common.js"
import { createApp } from 'vue'
/**
 * 命令式调用二次确认弹框
 *@举例子
  _.$zConfirm({
    width: 350, // 弹框宽度单位为px
    name: props.item.name, 
    content:'<div class="fs18 tc mb10">您确定要删除此数据集吗？</div> ', 
    isShowTip: true,
    // btn1配置项
    btn1IsShow: false, btn1Type:'default', btn1Text: '关闭',
    btn1Fn: async () => {console.log('点击了close')}, 
    // btn2配置项
    btn2IsShow: true,  btn2Type:'default', btn2Text: '取消',
    btn2Fn: async () => {console.log('点击了cancel')}, 
    // btn3配置项
    btn3IsShow: true, btn3Type:'warning', btn3Text: '确认',
    btn3Fn: async () => {
      const res = await _.request(`/dataset/delete/${props.item.id}`, {type: 1}, {method: 'DELETE'})
      // ...
    }
  })
 * @param {Object} e 
 */
export function $zConfirm(e = {}){
  const app = createApp(zConfirm, e)
  const divDom = addDom('', 'confirm_dom')
  app.mount(divDom)
}