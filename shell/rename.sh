#!/bin/bash
# ============================== 批量修改文件名、扩展名=========================================
# 参数1: 正则替换规则
# 参数2: 原始文件扩展名
# 参数3: 新文件扩展名
# 扩展名修改方法1:  ./rename.sh 's/^//' png jpg	-----> 所有.png改为.jpg
# 扩展名修改方法2： ./rename.sh --include-ext 's/\.png/.jpg/'
# 名称替换: ./rename.sh 's/old/new/g'	-----> 所有文件名中old替换成new
# 删除指定字符: ./rename.sh 's/old//g'	-----> 所有文件名中old删除
# 去除文件名空格: ./rename.sh 's/ //g'	-----> 所有文件名中空格删除
# 加前缀: ./rename.sh 's/^/jjzs_/' -----> 所有文件都加前缀jjzs_，扩展名不变
# 指定png格式文件加前缀: ./rename.sh 's/^/jjzs_/' png	-----> 所有.png 文件加前缀_jjzs，扩展名不变
# png格式文件操作后转jpg格式: ./rename.sh 's/^/jjzs_/' png jpg	-----> 所有.png文件加前缀jjzs_，且扩展名改成 .jpg
# 加后缀: ./rename.sh 's/$/_jjzs/'	-----> 所有文件加后缀_jjzs，扩展名不变
# 多步操作: ./rename.sh 's/^/jjzs_/;s/$/_jjzs/'	-----> 多步替换（加前缀+后缀）
# 日期格式转化: ./rename.sh 's/(abc)([0-9]{4})([0-9]{2})([0-9]{2})/\1_\2-\3-\4/g' txt  ---> abc20240801.txt改为abc_2024-08-01.txt
#              反向操作: ./rename.sh 's/(abc)_([0-9]{4})-([0-9]{2})-([0-9]{2})/\1\2\3\4/g' txt 
# =================如果有复杂需求，需要复杂的sed表达式。================================
# 可以这么问？
# 1、我想写一个 sed 表达式，将文件名abc20240801改为abc_2024-08-01这种格式。
#    chatgpt会告诉你，sed -E 's/(abc)([0-9]{4})([0-9]{2})([0-9]{2})/\1_\2-\3-\4/'  ----那么你的编写---> ./rename.sh 's/(abc)([0-9]{4})([0-9]{2})([0-9]{2})/\1_\2-\3-\4/g'

SCRIPT_PATH="$(realpath "$0")"
SCRIPT_DIR="$(cd "$(dirname "$SCRIPT_PATH")" && pwd)"
cd "$SCRIPT_DIR"

# 默认行为
include_ext=false

# 解析是否传入了 --include-ext
if [[ "$1" == "--include-ext" ]]; then
  include_ext=true
  shift
fi

pattern=$1
ext_from=$2
ext_to=$3

if [ -z "$pattern" ]; then
  echo "❌ 错误: 必须提供正则替换规则"
  exit 1
fi

# 获取待处理的文件列表
if [ -z "$ext_from" ]; then
  files=$(find ./ -type f)
else
  files=$(find ./ -type f -name "*.$ext_from")
fi

declare -a old_files
declare -a new_files

echo "🔍 即将执行的重命名操作:"

while IFS= read -r -d '' file; do
  [ -f "$file" ] || continue
  [[ "$(realpath "$file")" == "$SCRIPT_PATH" ]] && continue

  dir_name=$(dirname "$file")
  filename=$(basename "$file")

  if $include_ext; then
    new_filename=$(echo "$filename" | sed -E "$pattern")
  else
    base="${filename%.*}"
    ext="${filename##*.}"
    if [[ "$ext" == "$ext_from" || -z "$ext_from" ]]; then
      new_base=$(echo "$base" | sed -E "$pattern")
      new_ext="${ext_to:-$ext}"
      new_filename="${new_base}.${new_ext}"
    else
      continue
    fi
  fi

  new_name="${dir_name}/${new_filename}"

  # 保护：避免新文件名与已有文件或文件夹冲突
  if [ "$file" != "$new_name" ]; then
    # 如果新名称已经在待重命名列表中，说明存在重复
    if [[ " ${new_files[*]} " =~ " ${new_name} " ]]; then
      echo "⚠️  冲突: 文件 $file 重命名为 $new_name 会重复，跳过"
      continue
    fi
    # 如果新名称已经是一个存在的文件夹，也跳过
    if [ -d "$new_name" ]; then
      echo "⚠️  冲突: 文件 $file 重命名为 $new_name 会与目录同名，跳过"
      continue
    fi
    # 如果目标文件已存在（不是自己），也跳过
    if [ -e "$new_name" ] && [ "$file" != "$new_name" ]; then
      echo "⚠️  冲突: 文件 $new_name 已存在，跳过 $file"
      continue
    fi
    echo "  mv \"$file\" \"$new_name\""
    old_files+=("$file")
    new_files+=("$new_name")
  fi
done < <(find ./ -type f -print0)

if [ ${#old_files[@]} -eq 0 ]; then
  echo "✅ 没有需要重命名的文件"
  exit 0
fi

echo
read -p "是否执行以上重命名操作？ [y/N] " confirm
if [[ "$confirm" =~ ^[Yy]$ ]]; then
  for i in "${!old_files[@]}"; do
    mv "${old_files[i]}" "${new_files[i]}"
    echo "✅ 已重命名: ${old_files[i]} → ${new_files[i]}"
  done
else
  echo "⏹ 操作已取消"
fi
