/*
1、组件库形式，文字 + 底部横线
  <TabRender type="paneTab" :list="list" @setList="e => list = e" @changeTab="e => changeTab(e)"></TabRender>
2、圆形按钮，线框
  <TabRender type="roundTab" :list="list" @setList="e => list = e" @changeTab="e => changeTab(e)"></TabRender>
2、3d质感按钮
  <TabRender type="3dTab" :list="list" @setList="e => list = e" @changeTab="e => changeTab(e)"></TabRender>
  ======================数据=========================
  const list = ref([
    {name:'全部随访', value: '0', count:'3116', isChecked: true, disabled: false, id: _.guID()},
    {name:'待随访', value: '1', count:'2978', isChecked: false, disabled: false, id: _.guID()},
    {name:'已随访', value: '2', count:'95', isChecked: false, disabled: false, id: _.guID()},
    {name:'已取消', value: '3', count:'34', isChecked: false, disabled: false, id: _.guID()}
  ])
  const tabVal = computed(() => list.value.find(v => v.isChecked).value) // 当前选中的是哪个tab
  // 用户点击的时候会触发changeTab
  function changeTab(e){
    console.log(e)
  }
*/
import { ref, computed } from "vue"
export default function (props, emit) {
  let maxWidth = computed(() => {
    const textList = props.list.map(v => `${v.name}${v.count.slice(0, Math.ceil(v.count.length/2))}`)
    const maxLenText = textList.sort((a, b) => b.length - a.length)[0]
    return _.range(maxLenText.length * 18, 60)
  })
  let tabIndex = computed(() => props.list.findIndex(v => v.isChecked))
   // 改变tab
  function changeTab(item) {
    // console.log(item)
    const list = _.radioChecked(props.list, {id: item.id})
    emit('setList', list)
    emit('changeTab', {...item, isChecked: true})
  }
  return {
    maxWidth, tabIndex,
    emit, changeTab,
  }
}