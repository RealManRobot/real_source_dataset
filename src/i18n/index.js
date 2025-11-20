import { ref, computed } from 'vue'
import zh from './modules/zh.js'
import en from './modules/en.js'
import { getLocalStorage, setLocalStorage } from "@/common.js"

// 所有语言包
export const messages = { zh, en }
// 当前语言（响应式）
export const currentLocale = ref(getLocalStorage('z-language') || 'zh')
/**
 * 切换语言
 * @param {string} locale 语言标识（如 'en' 'zh'）
 * setLocale('en')
 */
export function setLocale(locale) {
  if (messages[locale]) {
    currentLocale.value = locale
    setLocalStorage('z-language', locale)
    window.dispatchEvent(new Event('localeChanged')) // 保留兼容性
  } else {
    console.warn(`未找到语言配置：${locale}`)
  }
}
/**
 * 翻译函数
 * @param {string} key 键值
 * @param {object} params 替换参数
 * @returns {string}
 * @举例 
 * // zh.js
  export default {
    hello: '你好，{name}！',
    unread: '你有 {count} 条未读消息',
  }
  // index.vue
  <div>{{ $t('hello', { name: '张三' }) }}</div>
  <div>{{ $t('unread', { count: 5 }) }}</div>
 */
export function t(key, params = {}) {
  return computed(() => {
    let text = messages[currentLocale.value]?.[key] || key
    return Object.entries(params).reduce((result, [paramKey, value]) => {
      return result.replace(new RegExp(`\\{\\s*${paramKey}\\s*\\}`, 'g'), value)
    }, text)
  })
}