/// <reference types="vite/client" />

// 扩展Window接口以包含Electron相关属性
declare global {
  interface Window {
    process?: {
      type: string;
    };
    electron?: {
      ipcRenderer: {
        invoke: (channel: string, ...args: any[]) => Promise<any>;
      };
      utils: {
        saveFileViaElectron: (dataUrl: string, suggestedName: string) => Promise<{
          success: boolean;
          message?: string;
          error?: string;
        }>;
      };
    };
  }
}
