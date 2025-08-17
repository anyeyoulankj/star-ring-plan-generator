# 星环计划页面生成器使用指南

欢迎使用**星环计划页面生成器**！这是茶醒星球出品的星环计划生图工具，帮助您快速生成个性化的收益图。

## 快速开始

### 前提条件
- Node.js (v16或更高版本)
- pnpm 包管理器

### 安装步骤

1. **安装依赖**
   ```cmd
   pnpm install
   ```
   
   > 如果安装失败，请尝试：
   > ```cmd
   > rm -rf node_modules
   > rm -rf pnpm-lock.yaml
   > pnpm install --force
   > ```

2. **开发模式运行**
   ```cmd
   pnpm dev
   ```

3. **构建可执行文件**
   ```cmd
   pnpm electron:build
   ```

4. **构建结果**
   构建完成后，可执行文件位于：
   ```
   项目文件夹\dist-electron\星环计划生成器-win32-x64\星环计划生成器.exe
   ```

## 常见问题解决

### "'vite' 不是内部或外部命令" 错误
这通常表示依赖未正确安装，请确保：
1. 已成功运行 `pnpm install`
2. 没有看到任何错误信息
3. node_modules 文件夹已创建

### 安装依赖时网络错误
如果遇到网络问题，可以使用淘宝镜像：
```cmd
pnpm config set registry https://registry.npmmirror.com/
pnpm install
```

### 构建过程中出错
尝试删除缓存并重新构建：
```cmd
pnpm cache clean
rm -rf dist-electron
pnpm electron:build
```