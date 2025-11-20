#!/usr/bin/env sh

# -------------------------------------------------
# 自动部署脚本 - Vite + Vue3 到 GitHub Pages
# 仓库: RealManRobot/real_source_dataset
# 源码分支: main
# 发布到: gh-pages
# 使用 SSH 推送
# -------------------------------------------------

# 遇到错误就退出
set -e

# 1 构建项目
echo "🔨 Building project..."
npm run build

# 2进入打包生成的 dist 文件夹
cd dist

# 3初始化临时 git 仓库
git init
git add -A
git commit -m 'deploy'

# 4推送到 gh-pages 分支（SSH）
echo "🚀 Deploying to GitHub Pages via SSH..."
git push -f git@github.com:RealManRobot/real_source_dataset.git master:gh-pages

# 5 返回项目根目录
cd -

echo "✅ Deploy complete! Check your site at:"
echo "https://RealManRobot.github.io/real_source_dataset/"
