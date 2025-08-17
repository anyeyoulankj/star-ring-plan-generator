# Git配置脚本
Write-Host "🚀 开始配置Git环境..." -ForegroundColor Green

# 1. 检查Git安装
$gitPath = "C:\Program Files\Git\cmd\git.exe"
if (Test-Path $gitPath) {
    Write-Host "✅ Git已安装在：$gitPath" -ForegroundColor Green
} else {
    Write-Host "❌ Git未找到，请先安装Git" -ForegroundColor Red
    exit 1
}

# 2. 添加到系统PATH
$gitDir = "C:\Program Files\Git\cmd"
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if ($currentPath -notlike "*$gitDir*") {
    $newPath = $currentPath + ";" + $gitDir
    [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
    Write-Host "✅ Git已添加到用户PATH" -ForegroundColor Green
} else {
    Write-Host "✅ Git已在PATH中" -ForegroundColor Green
}

# 3. 配置Git用户信息
Write-Host "📋 配置Git用户信息..." -ForegroundColor Yellow
$username = Read-Host "请输入Git用户名(或按Enter使用默认)"
$email = Read-Host "请输入Git邮箱(或按Enter跳过)"

if ($username) {
    & $gitPath config --global user.name $username
    Write-Host "✅ 用户名已设置：$username" -ForegroundColor Green
}

if ($email) {
    & $gitPath config --global user.email $email
    Write-Host "✅ 邮箱已设置：$email" -ForegroundColor Green
}

# 4. 验证配置
Write-Host "🔍 验证Git配置..." -ForegroundColor Yellow
& $gitPath --version
& $gitPath config --global --list | Select-String "user\."