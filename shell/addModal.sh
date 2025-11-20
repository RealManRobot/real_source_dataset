#!/bin/bash
# 使用方法： ./_addPage.sh doctor
# 使用方法： ./_addPage.sh AddUser components
# 1. 获取组件名
name=$1
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
cd ../src
if [ -z "$name" ]; then
  echo "❌ 请输入组件名"
  exit 1
fi
# 2. 生成路径，默认的话，是在src/views/目录下
dir=${2:-"./views"}/$name
# 3. 判断目录是否已存在，避免覆盖
if [ -d "$dir" ]; then
  echo "⚠️ 目录 $dir 已存在，操作已取消。"
  exit 1
fi
# 4. 创建目录
mkdir -p "$dir"
if [ $? -ne 0 ]; then
  echo "❌ 目录创建失败，请检查权限或磁盘空间。"
  exit 1
fi

# 5. 创建 index.vue 并填入模板内容
cat > "$dir/index.vue" <<EOF
<template>
  <ModalRender
    :modalObj="modalObj"
    @setModalObj="e => modalObj = e"
    @close="emit('setIsShow', false)"
    @btn1Fn="emit('setIsShow', false)"
    @btn2Fn="emit('setIsShow', false)"
    @btn3Fn="emit('setIsShow', false)"
  >
    <div class="" style="background:skyblue;">顶部</div>
    <div style="width:1000px;">我是内容</div>
    <div class="" style="background:pink;height:100px">底部</div>  
  </ModalRender>
</template>
<script>
import f from "./index.js"
export default {
  components: {},
  props: {
    isShow: { type: Boolean, default: false },
  },
  emits: ['setIsShow'],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped></style>
EOF
if [ $? -ne 0 ]; then
  echo "❌ 创建 index.vue 文件失败。"
  exit 1
fi
# 6. 创建 index.js，并填入模板内容
cat > "$dir/index.js" <<EOF
import { ref, watch } from "vue"
export default function (props, emit) {
  const modalObj = ref({
    isShow: true, // *必要参数modal弹框是否显示
    style:'', // 弹框盒子的样式
    zIndex: 1, // 层级
    animate: true, // 需要动画吗？
    customEmit: false, // true：完全自定义点击事件，关闭、取消、确定。代码不做默认处理
    mask: true, // 需要遮罩吗？
    draggable: false, // 需要可拖拽吗？
    width: '600px', // 弹框宽度
    top: '10%', // 弹框距离顶部的高度
    left: 'calc(50% - 300px)', // 视口宽度50% - 弹框宽度的一半
    // 顶部模块 // 是否显示顶部  // 标题// 是否显示顶部右侧叉号
    header: { isShow: true, title: '温馨提示', isShowClose: true },
    footer: { // 底部模块
      isShow: true, // 是否显示底部
      align: 'right', // right:按钮靠右显示  left: 按钮靠左显示    center: 按钮居中显示
      view: '3d', // 2d: 平面按钮    3d:3d按钮
      isShowBtn1: true, btn1Type: 'default', btn1Text: '关闭',  // 显示btn1按钮  // 默认样式  // 文案 
      isShowBtn2: true, btn2Type: 'default', btn2Text: '取消',  // 显示btn2按钮  // 默认样式  // 文案
      isShowBtn3: true, btn3Type: 'warning', btn3Text: '确定',  // 显示btn3按钮  // 确认样式  // 文案         
    },
  })
  watch(()=>[props.isShow], newVal => {
    const [isShow] = newVal
    modalObj.value.isShow = isShow
  }, {immediate: true})
  return {
    modalObj,
    emit,
  }
}
EOF
if [ $? -ne 0 ]; then
  echo "❌ 创建 index.js 文件失败。"
  exit 1
fi
# 7. 创建空的 index.css 文件
touch "$dir/index.css"
if [ $? -ne 0 ]; then
  echo "❌ 创建 index.css 文件失败。"
  exit 1
fi
# 8. 如果需要，可以创建 .gitkeep 文件（以便保持空目录）
# touch "$dir/.gitkeep"
# 9. 提示用户创建成功
echo -e "✅ 弹框组件 '\033[1;32m$name\033[0m' 已创建完成于 \033[1;34m$dir\033[0m"
