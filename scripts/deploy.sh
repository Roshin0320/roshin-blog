# !/bin/bash

set -e # 确保脚本抛出遇到的错误

# 检查本地是否存在 .env 文件，如果存在，当做环境变量导出
if [ -f ".env" ];then
  export $(xargs <.env)
fi 

# 检查 Actions 目录配置，不存在直接退出
if [ -z "${PUBLISH_DIR}" ]; then
  echo "【致命错误】：workflows 尚未设置 PUBLISH_DIR"
  exit 1
fi

# 检查设置的目录是否存在，不存在直接退出
if [ -d "$(pwd)${PUBLISH_DIR}" ]; then
  echo "【致命错误】：PUBLISH_DIR 尚未生成"
  exit 1
fi

# 检查要发布的分支名称，不存在直接退出
if [ -z "${PUBLISH_BRANCH}" ]; then
  print_error "【致命错误】：没有发现 PUBLISH_BRANCH"
  exit 1
fi

# 更改时间
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# 格式化的输出
function print_error() {
  echo -e "\e[31mERROR: ${1}\e[m"
}

function print_info() {
  echo -e "\e[36mINFO: ${1}\e[m"
}

# 进入到 build 的目录
cd "${PUBLISH_DIR}" # ./dist

# 设置 CNAME
if [ -n "${CNAME}" ]; then 
  echo "${CNAME}">CNAME
fi 

# 配置git
git config --global user.name "roshin"
git config --global user.email "1425258785@qq.com"

# --------------- GITHUB ---------------------

# 配置仓库地址 环境变量参考 https://docs.github.com/cn/actions/reference/environment-variables
if [ -n "${EXTERNAL_REPOSITORY}" ]; then
  PUBLISH_REPOSITORY=${EXTERNAL_REPOSITORY}
else
  PUBLISH_REPOSITORY=${GITHUB_REPOSITORY}
fi

# 配置 ssh
if [ -n "${GITHUB_TOKEN_DEPLOY}" ]; then
  echo "设置 github 仓库地址"
  github_remote_repo="https://roshin:${GITHUB_TOKEN_DEPLOY}@github.com/${PUBLISH_REPOSITORY}.git"
fi

# 跳过配置 personal_token 和 github_token
remote_branch="${PUBLISH_BRANCH}"

git init
git checkout --orphan "${remote_branch}" # 积累无数次 commit，不算分支

git remote rm origin || true
git remote add origin "${github_remote_repo}"

# git提交
git add .
push_time="$(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "【Deployment success】：${push_time}"

git push origin -f "${PUBLISH_BRANCH}"

print_info "${GITHUB_SHA} deploy successful：${push_time}"

# --------------- CODING ---------------------

# 配置 ssh
if [ -n "${CODING_TOKEN_DEPLOY}" ]; then
  echo "设置 coding 仓库地址"
  coding_remote_repo="https://QeGXTfGGCj:${CODING_TOKEN_DEPLOY}@e.coding.net/roshin/websites/roshin.cn.git"
fi

# 配置 git
git init
git checkout --orphan master # 切换到新的分支

git remote rm origin || true
git remote add origin "${coding_remote_repo}"

# git提交
git add .
push_time="$(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "【Deployment success】：${push_time}"

git push origin -f master

print_info "${GITHUB_SHA} deploy successful： ${push_time}"