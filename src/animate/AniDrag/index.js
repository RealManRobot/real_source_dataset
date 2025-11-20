/**
 * 注意：itemClassName可以传w100   这样就单行显示了
  <AniDrag :list="list" @setList="e => list = e" @change="handleChange" className="f ac rw" :styleObj="{gap: '20px'}"  itemClassName="" :itemStyleObj="{}">
		<template #item="{ item, index }"> 
			<div class="bg5993bb gf f ac xc rds5" style="width:200px;height:40px;">{{item.name}}</div>
		</template>
	</AniDrag>
  
  const list = ref([
    { name: 'a', id: 1 },
    { name: 'b', id: 2 },
    { name: 'c', id: 3 },
    { name: 'd', id: 4 },
    { name: 'e', id: 5 },
    { name: 'f', id: 6 },
    { name: 'g', id: 7 },
    { name: 'h', id: 8 },
    { name: 'i', id: 9 },
    { name: 'j', id: 10 },
    { name: 'k', id: 11 },
  ])
  // 监听拖拽, 这里可以拿到拖拽结束后的数据
  function handleChange(list){
    console.log(list)
  }
 * 
 */
import { ref, watch } from 'vue'
export default function (props, emit) {
  let dragIndex = 0
  const innerList = ref([])
  // 初始化 & 外部变化时同步
  watch(() => props.list, val => {
    innerList.value = [...val]
  },{ immediate: true, deep: true })
  // 带有白色边角的版本，简单，但是带有一点轻微瑕疵
  // function dragstart(e, index) {
  //   e.stopPropagation()
  //   dragIndex = index
  //   setTimeout(() => {
  //     e.target.classList.add('moveing')
  //   }, 100)
  // }
  function dragstart(e, index) {
    e.stopPropagation()
    dragIndex = index
    const rect = e.target.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top
    // 克隆节点用于作为拖拽影像
    const clone = e.target.cloneNode(true)
    clone.style.position = "absolute"
    clone.style.top = "-99999px"
    clone.style.left = "-99999px"
    clone.style.opacity = "0.8"
    clone.style.pointerEvents = "none"
    document.body.appendChild(clone)
    // 把鼠标相对偏移传进去，让位置自然
    e.dataTransfer.setDragImage(clone, offsetX, offsetY)
    // 拖拽结束后清理 clone
    setTimeout(() => document.body.removeChild(clone), 0)
    // 原元素隐藏（或设透明）
    setTimeout(() => {
      e.target.classList.add('moveing')
    }, 100)
  }
  function dragenter(e, index) {
    e.preventDefault()
    if (dragIndex !== index) {
      const source = innerList.value[dragIndex]
      innerList.value.splice(dragIndex, 1)
      innerList.value.splice(index, 0, source)
      dragIndex = index
      // 通知外部变化
      emit("setList", innerList.value)
    }
  }
  function dragover(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }
  function dragend(e) {
    e.target.classList.remove('moveing')
    emit("change", innerList.value)
  }

  return {
    innerList,
    dragstart, dragenter, dragover, dragend
  }
}
