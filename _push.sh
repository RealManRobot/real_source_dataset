#!/bin/bash
# 如果想提交代码：    ./_push.sh 完善xxx功能
COMMIT_MSG=$1
if [[ -z "$COMMIT_MSG" ]]; then
  echo "****************请传入commit信息******************"
  exit 1
fi 
echo "**************拉取远程仓库最新代码...****************"
git pull
if [ $? -ne 0 ]; then
  echo "*****拉取代码失败！请检查网络或解决冲突后重试。*******"
  exit 1
else
  echo "*********************拉取代码成功！********************"
fi 
# 定义需要排除的文件或目录
# EXCLUDE_FILES=("vite.config.js" "src/") # 空格隔开
EXCLUDE_FILES=("vite.config.js" ".env" ".env.development" ".env.production" ".env.test") # 空格隔开

# 提示当前忽略的文件
echo "以下文件将被排除提交："
for file in "${EXCLUDE_FILES[@]}"; do
  echo "  - $file"
done
echo "****************开始提交代码到 Git 仓库************"
git add .
# 从暂存区移除需要排除的文件
for file in "${EXCLUDE_FILES[@]}"; do
  git reset HEAD "$file"
done

git commit -m "$COMMIT_MSG"
git push origin $(git rev-parse --abbrev-ref HEAD)
if [ $? -eq 0 ]; then
  echo "********************提交成功！*******************"
else
  echo "***********提交失败！请检查 Git 状态。***********"
fi
