// v-draggable.js
export const draggable = {
  mounted(el, {value}) {
    const [isDrag, dragNode] = value
    if(!isDrag) { return false }
    let  fatherDom = dragNode == 'parent' ? el.parentElement : el
    fatherDom.style.position = 'fixed' // 设置元素为绝对定位，方便拖动
    el.style.cursor = 'move'
    let offsetX = 0
    let offsetY = 0
    const [maxWidth, maxHeight] = [_.get100vw(), _.get100vh()]
    fatherDom.elObj = _.getViewPos(fatherDom)
    // 鼠标按下时触发
    el.onMouseDown = (e) => {
      offsetX = e.clientX - fatherDom.offsetLeft
      offsetY = e.clientY - fatherDom.offsetTop
      // 添加鼠标移动和鼠标松开事件
      const onMouseMove = (e) => {
        fatherDom.style.left = Number(_.range(e.clientX - offsetX, 0, maxWidth - fatherDom.elObj.width)) + 'px'
        fatherDom.style.top = Number(_.range(e.clientY - offsetY, 0, maxHeight - fatherDom.elObj.height)) + 'px'
        // console.log(fatherDom.style.left)
        // console.log(fatherDom.style.top)
      };
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      };
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    };
    // 鼠标按下时，触发 onMouseDown 函数
    el.addEventListener('mousedown', el.onMouseDown)
  },
  unmounted(el) {
    // 清理事件监听器
    el.removeEventListener('mousedown', el.onMouseDown)
  }
};
