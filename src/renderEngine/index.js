import ContainerRender from "./ContainerRender/index.vue"
import LoadingRender from "./LoadingRender/index.vue"
import ModalRender from "./ModalRender/index.vue"
import SearchRender from "./SearchRender/index.vue"
import TableRender from "./TableRender/index.vue"
import TabRender from "./TabRender/index.vue"
import TreeRender from "./TreeRender/index.vue"

/**注册到全局 */
export default {
  install (Vue) {
    Vue.component('ContainerRender', ContainerRender)
    Vue.component('LoadingRender', LoadingRender)
    Vue.component('ModalRender', ModalRender)
    Vue.component('SearchRender', SearchRender)
    Vue.component('TableRender', TableRender)
    Vue.component('TabRender', TabRender)
    Vue.component('TreeRender', TreeRender)
  }
}