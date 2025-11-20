/**
<atomSvg type="add" width="24" height="24" color="#1890ff"></atomSvg>
<atomSvg type="decrease" width="25" height="25" color="#ff0000"></atomSvg>
 */
import { ref, watch } from "vue"
const modules = import.meta.glob('./modules/*.svg', { eager: true, as: 'raw' })
export default function (props, emit) {
  // 生成映射表 key: iconName (去掉 Icon 前缀的小写)
  const svgContent = ref('')
  watch(() => [props.type, props.width, props.height, props.color], (newVal) => {
    const [type, width, height, color]= newVal
    const pathKey = `./modules/${type}.svg`
    if (modules[pathKey]) {
      let content = modules[pathKey]
      // 替换 width/height/color/stroke
      content = content.replace(/width="[^"]*"/, `width="${width}"`)
                      .replace(/height="[^"]*"/, `height="${height}"`)
                      .replace(/fill="[^"]*"/g, `fill="${color}"`)
                      .replace(/stroke="[^"]*"/g, `stroke="${color}"`)
      svgContent.value = content
    } else {
      svgContent.value = `<svg width="${width}" height="${height}"><text x="0" y="15">Icon not found</text></svg>`
    }
  }, { immediate: true })
  return {
    svgContent,
    emit,
  }
}