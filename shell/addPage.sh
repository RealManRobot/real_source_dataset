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
  <div class="pl30 pr30 pt30">
    
  </div>
</template>
<script>
import f from "./index.js"
export default {
  name: '',
  components: {
  },
  props: {
  },
  emits: [],
  setup(props, { emit }) {
    return f(props, emit)
  }
}
</script>
<style src="./index.css" scoped>
</style>
EOF
if [ $? -ne 0 ]; then
  echo "❌ 创建 index.vue 文件失败。"
  exit 1
fi
# 6. 创建 index.js，并填入模板内容
cat > "$dir/index.js" <<EOF
import { onMounted, ref } from 'vue'
export default function (props, emit) {
  
  onMounted(() => {
    
  })
  return {
   
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
echo -e "✅ 页面组件 '\033[1;32m$name\033[0m' 已创建完成于 \033[1;34m$dir\033[0m"
