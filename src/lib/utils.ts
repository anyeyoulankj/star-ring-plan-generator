import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 检查是否在Electron环境中
export const isElectron = () => {
  return typeof window !== 'undefined' && window.process?.type === 'renderer';
};

// 通过Electron保存文件
export const saveFileViaElectron = async (dataUrl: string, suggestedName: string) => {
  if (!isElectron()) {
    throw new Error('Not in Electron environment');
  }

  try {
    // 从dataURL中提取base64数据
    const base64Data = dataUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    
    // 调用Electron主进程显示保存对话框
    const result = await window.electron.ipcRenderer.invoke('show-save-dialog', {
      title: '保存图片',
      defaultPath: suggestedName,
      filters: [
        { name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }
      ]
    });

    if (result.canceled) {
      return { success: false, message: '用户取消了保存' };
    }

    // 调用Electron主进程写入文件
    const writeResult = await window.electron.ipcRenderer.invoke('write-file', {
      path: result.filePath,
      data: base64Data
    });

    return writeResult;
  } catch (error) {
    console.error('保存文件失败:', error);
    return { success: false, error: error.message };
  }
};
