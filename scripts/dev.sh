#!/bin/bash

# 设置环境变量

if [ -f .env.development ]; then
  cp .env.development .env
fi

# 停止并删除已存在的开发容器
docker stop responsive-tester-dev 2>/dev/null || true
docker rm responsive-tester-dev 2>/dev/null || true

# 构建开发镜像
docker build --target development -t responsive-tester-dev .

# 运行开发容器
docker run -d \
  --name responsive-tester-dev \
  -p 3003:3000 \
  -v $(pwd):/app \
  responsive-tester-dev
