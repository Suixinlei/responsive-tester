# 基础镜像
FROM node:20-alpine AS base
WORKDIR /app
RUN npm config set registry https://registry.npmmirror.com
RUN apk add --no-cache wget

# 依赖安装阶段
FROM base AS deps
COPY package.json ./
COPY package-lock.json ./
COPY .npmrc ./
RUN npm install

# 开发环境 - 支持热重载
FROM base AS development
WORKDIR /app
# 复制项目根目录的文件
COPY package.json ./
COPY package-lock.json ./
COPY .npmrc ./
# 复制依赖
COPY --from=deps /app/node_modules ./node_modules

# 源码将通过卷挂载
ENV PORT=3000
ENV NODE_ENV=development

# 健康检查
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT} || exit 1

# 默认使用 dev 命令
CMD ["npm", "run", "dev"]

# 生产环境
FROM base AS production
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY .npmrc ./

COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

ENV PORT=3000
ENV NODE_ENV=production

HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT} || exit 1

CMD ["npm", "run", "start"]
