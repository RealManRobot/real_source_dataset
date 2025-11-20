#!/bin/bash
# ======================================
# 🚀 自动生成项目目录结构 README
# ✅ 无需 tree 命令
# ✅ 支持排除文件/目录
# ✅ 可选择是否显示文件
# ✅ 只替换 README.md 中 "# 项目结构" 部分
# ✅ 自动清理临时文件
# ======================================

README_FILE="README.md"       # README 文件
TMP_TREE_FILE="tree.tmp"      # 临时存储树结构
TARGET_DIR="src"              # 要扫描的主目录
MAX_DEPTH=2                   # 最大层级（推荐 2~3）
SHOW_FILES=true               # 是否显示文件（true / false）

# 🚫 排除规则（目录或文件名，可使用通配符）
EXCLUDE_LIST=("node_modules" "dist" ".git" ".vscode" "__pycache__" "*.log" "*.DS_Store")

# ======================================
# 构建 find 命令参数
# ======================================
FIND_CMD=(find "$TARGET_DIR")

if [ "$SHOW_FILES" = true ]; then
  FIND_CMD+=("(" -type d -o -type f ")")
else
  FIND_CMD+=("-type" "d")
fi

# 添加排除规则
for pattern in "${EXCLUDE_LIST[@]}"; do
  FIND_CMD+=("-not" "-path" "*/$pattern/*")
  FIND_CMD+=("-not" "-name" "$pattern")
done

# ======================================
# 生成目录结构到临时文件
# ======================================
"${FIND_CMD[@]}" | sort | awk -v max_depth=$MAX_DEPTH '
BEGIN { FS = "/" }
{
  depth = NF - 1
  if (depth <= max_depth) {
    indent = ""
    for (i = 1; i < depth; i++) indent = indent "│   "
    prefix = (depth > 0 ? "├── " : "")
    print indent prefix $NF
  }
}' > "$TMP_TREE_FILE"

# 在树结构前后加上代码块标记
echo '```' | cat - "$TMP_TREE_FILE" > "$TMP_TREE_FILE.tmp" && mv "$TMP_TREE_FILE.tmp" "$TMP_TREE_FILE"
echo '```' >> "$TMP_TREE_FILE"

# ======================================
# 替换 README.md 中 # 项目结构 部分
# ======================================
if [ ! -f "$README_FILE" ]; then
  echo "❌ README.md 不存在，创建新文件..."
  echo "# 项目结构" > "$README_FILE"
  cat "$TMP_TREE_FILE" >> "$README_FILE"
else
  awk -v tree_file="$TMP_TREE_FILE" '
  BEGIN {
    while ((getline line < tree_file) > 0) {
      tree_lines = tree_lines line "\n"
    }
    in_section = 0
  }
  /^# 项目结构/ {
    print "# 项目结构"
    printf "%s", tree_lines
    in_section = 1
    next
  }
  /^#/ && in_section==1 && $0 !~ /^# 项目结构/ {
    in_section = 0
  }
  !in_section || /^# 项目结构/ { print }
  ' "$README_FILE" > "${README_FILE}.tmp"

  mv "${README_FILE}.tmp" "$README_FILE"
fi

# ======================================
# 附加说明信息（可选）
# ======================================
# echo "" >> "$README_FILE"
# echo "## 说明" >> "$README_FILE"
# echo "" >> "$README_FILE"
# echo "- 以上结构由脚本自动生成，请勿手动修改。" >> "$README_FILE"
# echo "- 若有新增目录，请运行 \`./shell/tree.sh\` 更新。" >> "$README_FILE"
# echo "- 已排除以下目录/文件：" >> "$README_FILE"
# for item in "${EXCLUDE_LIST[@]}"; do
#   echo "  - $item" >> "$README_FILE"
# done

# if [ "$SHOW_FILES" = true ]; then
#   echo "- 当前模式：显示文件 ✅" >> "$README_FILE"
# else
#   echo "- 当前模式：仅显示目录 📁" >> "$README_FILE"
# fi

# ======================================
# 清理临时文件
# ======================================
rm -f "$TMP_TREE_FILE"

echo "✅ README.md 中的 '# 项目结构' 已更新完成！"
