/**
 * 按钮组件封装，都可以静态传参
 * @举例子 
1、2d按钮
  <atomButton @click="clickMe" type="primary" className="" view="2d" width="60px" height="32px" radius="20px" :autoLoading="true" :disabled="false">新增</atomButton>
  <atomButton @click="clickMe" type="default" className="" view="2d" width="60px" height="32px" radius="20px" :autoLoading="true" :disabled="false">新增</atomButton>
  <atomButton @click="clickMe" type="error" className="" view="2d" width="60px" height="32px" radius="20px" :autoLoading="true" :disabled="false">新增</atomButton>
  <atomButton @click="clickMe" type="warning" className="" view="2d" width="60px" height="32px" radius="20px" :autoLoading="true" :disabled="false">新增</atomButton>
  <atomButton @click="clickMe" type="success" className="" view="2d" width="60px" height="32px" radius="20px" :autoLoading="true" :disabled="false">新增</atomButton>
1、3d按钮
  <atomButton @click="clickMe" type="default" className="" view="3d" width="60px" height="32px" radius="8px" :autoLoading="true" :disabled="false">保存</atomButton>
  <atomButton @click="clickMe" type="primary" className="" view="3d" width="60px" height="32px" radius="8px" :autoLoading="true" :disabled="false">保存</atomButton>
  <atomButton @click="clickMe" type="error" className="" view="3d" width="60px" height="32px" radius="8px" :autoLoading="true" :disabled="false">保存</atomButton>
  <atomButton @click="clickMe" type="warning" className="" view="3d" width="60px" height="32px" radius="8px" :autoLoading="true" :disabled="false">新增</atomButton>
  <atomButton @click="clickMe" type="success" className="" view="3d" width="60px" height="32px" radius="8px" :autoLoading="true" :disabled="false">新增</atomButton>
3、标签按钮
  <atomButton type="default" className="" view="tag" width="60px" height="20px" radius="20px" :autoLoading="false" :disabled="false">新增</atomButton>
  <atomButton type="primary" className="" view="tag" width="60px" height="20px" radius="20px" :autoLoading="false" :disabled="false">新增</atomButton>
  <atomButton type="error" className="" view="tag" width="60px" height="20px" radius="20px" :autoLoading="false" :disabled="false">新增</atomButton>
  <atomButton type="warning" className="" view="tag" width="60px" height="20px" radius="20px" :autoLoading="false" :disabled="false">新增</atomButton>
  <atomButton type="success" className="" view="tag" width="60px" height="20px" radius="20px" :autoLoading="false" :disabled="false">新增</atomButton>
3、下划线按钮
  <atomButton type="default" className="" view="underline" radius="20px" :autoLoading="false" :disabled="false">新增</atomButton>
  <atomButton type="primary" className="" view="underline" radius="20px" :autoLoading="false" :disabled="false">新增</atomButton>
  <atomButton type="error" className="" view="underline" radius="20px" :autoLoading="false" :disabled="false">删除</atomButton>
  <atomButton type="warning" className="" view="underline" radius="20px" :autoLoading="false" :disabled="false">重置</atomButton>
  <atomButton type="success" className="" view="underline" radius="20px" :autoLoading="false" :disabled="false">查看</atomButton>
 */
import { computed, onMounted, ref, useAttrs } from 'vue'
export default function (props, emit) {
  const innerLoading = ref(false)
  const attrs = useAttrs()
  const btnId = `btn_${_.guID()}`
  // 2d按钮动态样式
  const two_d_class = computed(() => {
    const mapClass = {
      default: 'default-btn',
      primary: 'primary-btn',
      error: 'error-btn',
      warning: 'warning-btn',
      success: 'success-btn',
    } 
    return mapClass[props.type]
  })
  // 3d按钮动态样式
  const three_d_class = computed(() => {
    const mapClass = {
      default: 'btn-3d-ccc',
      primary: 'btn-3d-1890ff',
      error: 'btn-3d-ed4014',
      warning: 'btn-3d-ec6102',
      success: 'btn-3d-2fa800',
    } 
    return mapClass[props.type]
  })
  // 标签按钮动态样式
  const tag_class = computed(() => {
    const mapClass = {
      default: 'tag-ccc',
      primary: 'tag-1890ff',
      error: 'tag-ff0000',
      warning: 'tag-ffa439',
      success: 'tag-28c76f',
    } 
    return mapClass[props.type]
  })
  const underline_class = computed(() => {
    const mapClass = {
      default: 'underline-ccc',
      primary: 'underline-1890ff',
      error: 'underline-ff0000',
      warning: 'underline-ffa439',
      success: 'underline-28c76f',
    } 
    return mapClass[props.type]
  })
  // 点击，触发loading、disabled限制
  async function handleClick(e){
    if (props.disabled || innerLoading.value) return
    const clickHandler = attrs.onClick
    if (_.isFunction(clickHandler)) {
      const result = clickHandler(e) // 得到一个promise对象
      // console.log(clickHandler)
      // console.log(_.isFunction(clickHandler))
      // console.log(result)
      if (props.autoLoading && result instanceof Promise) {
        innerLoading.value = true
        try {
          await result
        } finally {
          innerLoading.value = false
        }
      }
    }
  }
  onMounted(() => {
   
  })
  return {
    innerLoading, btnId, two_d_class, three_d_class, tag_class, underline_class,
    emit, handleClick,
  }
}
