const r = import.meta.glob("./modules/*.js", {eager: true})
const directives = Object.keys(r).reduce((prev, item) => ({ ...prev, ...r[item]}), {})
export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}