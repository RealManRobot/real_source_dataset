import { nextTick, ref } from 'vue'
import { deepCopy, queryAll, isFunction, wait } from "@/common.js"
/**
 * 处理formRender的表单方法
 * @param {*} e 
 * @param {*} selector 
 * @returns 
 * @举例子
    // html
    <div id="" class="schoolForm f mb20" style="gap:0 20px;">
      <div class="f1">
        <LabelRender required label="姓名" desc="学生的姓名"></LabelRender>
        <el-input v-id v-label="'姓名：'" v-model="formObj.name" v-max="5" v-required="true" placeholder="请输入学生的姓名" />
      </div>
      <atomButton @click="clickMe" type="default" className="" view="2d" width="60px" height="32px" radius="20px" :autoLoading="true" :disabled="false">新增</atomButton>
    </div>
    // js
    const {formObj, reset, validate} = _.useFormRender({ name: '', school: '', age: '' }, '.schoolForm') // 参数1：初始化入参 + 表单选择器
    // 提交
    async function clickMe(){
      await validate(async () => {
        // 基础校验通过编写业务代码。或者再做复杂校验
        await _.wait(100) 
        console.log(formObj.value)
      })
    }
 */
export function useFormRender(e, selector) {
  const originVal = deepCopy(e)
  const formObj = ref(e)
  let msgInstance = null
  function resetMsg(){
    msgInstance && msgInstance.close()
  }
  // 表单重置
  function reset(){
    formObj.value = deepCopy(originVal)
    // 消除一切报错，并且数据恢复初始值
    nextTick(() => {
      const formAreaArr = queryAll(selector) // 查询出表单区域dom
      formAreaArr.forEach(v => {
        const dom = queryAll('.zaz-formRender-msg-class', v)
        ;[...dom].forEach(v => v.classList.add('dn'))
      })
      // 消除输入框的红色边框
      const wrapperDom = queryAll("[class*='el-'][class*='__wrapper']")
      wrapperDom.forEach(v => v.style.boxShadow = '' )
      // 消除消息弹出提示
      resetMsg()
    })
  }
  // 保存表单
  async function validate(fn){
    resetMsg()
    // 1、开启校验。查出全部的输入框
    const formAreaArr = queryAll(selector) // 查询出表单区域dom
    // 如果只针对单个表单的话，还可以继续增加滚动定位到错误位置
    // const firstErrorEl = container.querySelector('.zaz-form-class')
    // firstErrorEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // 2、对限定选择器内，所有输入框触发输入事件
    formAreaArr.forEach(v => {
      const allFormArr = queryAll('[id^="zaz-formRender-form-"]', v)
      allFormArr.forEach(el => {
        el = el.querySelector('input') || el.querySelector('textarea') || el
        el.dispatchEvent(new Event('input'))
      })
    })
    await wait(150)
    // 3、查询所有错误提示
    const dom = _.queryAll('.zaz-formRender-msg-class')
    if(dom.length) { 
      const msg = dom[0].textContent
      msgInstance = _.message.error(msg, 2500)
      return false
    }
    // 自定义校验 + 表单提交
    if(isFunction(fn)) {
      await fn()
    }
  }
  return { formObj, reset, validate }
}