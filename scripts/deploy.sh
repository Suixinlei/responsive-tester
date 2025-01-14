#!/bin/bash

# 确保远程目录存在
ssh kouka "mkdir -p /home/xiaobin/app/responsive-tester"

# 清理远程目录
ssh kouka "rm -rf /home/xiaobin/app/responsive-tester/*"

# 同步项目文件到服务器
rsync -avz --exclude 'node_modules' \
    --exclude '.next' \
    --exclude 'dist' \
    --exclude '.git' \
    --exclude 'temp' \
    . kouka:/home/xiaobin/app/responsive-tester/

# 在服务器上创建 docker-compose.yml 文件来设置端口映射
ssh kouka "cat > /home/xiaobin/app/responsive-tester/docker-compose.yml << 'EOL'
services:
  responsive-tester:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 3003:3000
EOL"

# 构建和启动服务
ssh kouka "cd /home/xiaobin/app/responsive-tester && \
    docker compose -f docker-compose.yml up -d --build"
