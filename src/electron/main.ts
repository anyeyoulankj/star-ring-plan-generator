import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs';

// 确保应用是单实例运行
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: '星环计划页面生成器',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false, // 允许加载本地文件
    },
  });

  // 加载应用
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../index.html'));
  } else {
    // 开发环境加载Vite服务器
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  }

  // 窗口关闭事件
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 监听文件保存对话框请求
ipcMain.handle('show-save-dialog', async (event, options) => {
  const result = await dialog.showSaveDialog(mainWindow!, options);
  return result;
});

// 监听文件写入请求
ipcMain.handle('write-file', async (event, { path, data }) => {
  try {
    await fs.promises.writeFile(path, data, 'base64');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// 应用就绪后创建窗口
app.whenReady().then(createWindow);

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 应用激活时创建窗口（macOS）
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});