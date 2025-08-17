@echo off
echo 🚀 开发环境启动器
echo.
echo 使用Bypass策略运行开发工具...
echo.

:menu
echo 请选择操作：
echo 1. 检查Node.js版本
echo 2. 检查Git版本
echo 3. 部署到Vercel
echo 4. 退出
echo.
set /p choice=请输入选项(1-4): 

if "%choice%"=="1" (
    powershell -ExecutionPolicy Bypass -Command "node --version"
    pause
    goto menu
)

if "%choice%"=="2" (
    powershell -ExecutionPolicy Bypass -Command "git --version"
    pause
    goto menu
)

if "%choice%"=="3" (
    cd /d "%~dp0dist\static"
    powershell -ExecutionPolicy Bypass -Command "npx vercel --prod"
    pause
    goto menu
)

if "%choice%"=="4" (
    exit
)

goto menu