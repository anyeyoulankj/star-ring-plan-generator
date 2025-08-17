# PowerShell开发环境配置脚本
Write-Host "🔧 正在配置PowerShell开发环境..." -ForegroundColor Green

# 设置当前用户执行策略
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# 设置当前进程执行策略（立即生效）
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# 添加Git到PATH（如果已安装）
$gitPath = "C:\Program Files\Git\bin"
if (Test-Path $gitPath) {
    $env:PATH += ";$gitPath"
    Write-Host "✅ Git已添加到PATH" -ForegroundColor Green
}

# 添加Node.js到PATH
$nodePath = "$env:APPDATA\npm"
if (Test-Path $nodePath) {
    $env:PATH += ";$nodePath"
    Write-Host "✅ Node.js工具已添加到PATH" -ForegroundColor Green
}

Write-Host "🎉 配置完成！现在可以运行git、npm、npx、pnpm等命令了" -ForegroundColor Green
Write-Host "💡 重新打开PowerShell窗口使设置生效" -ForegroundColor Yellow