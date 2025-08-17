import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { useConfig } from '@/contexts/ConfigContext';
import { ConfigPanel } from '@/components/ConfigPanel';
import PreviewArea from '@/components/PreviewArea';
import UsageInstructions from '@/components/UsageInstructions';
import { toast } from 'sonner';

// 错误边界组件
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("StarRingPlan组件错误:", error, errorInfo);
    toast.error(`页面加载错误: ${error.message}`);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <i className="fa-solid fa-exclamation-triangle text-5xl text-yellow-500 mb-4"></i>
          <h2 className="text-2xl font-bold mb-2">页面加载出错</h2>
          <p className="text-gray-600 mb-6 max-w-md">{this.state.error?.message || '未知错误'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <i className="fa-solid fa-refresh mr-2"></i>刷新页面
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function StarRingPlan() {
  const { config, setConfig, resetConfig } = useConfig();
  const [, setIsExporting] = useState(false);
  
  // 导出图片功能
  const handleExport = async (format: 'jpg' | 'png') => {
    try {
      setIsExporting(true);
      toast.info('正在生成图片...');
      
      const exportContainer = document.getElementById('export-container');
      if (!exportContainer) {
        toast.error('未找到导出区域');
        setIsExporting(false);
        return;
      }
      
      // 使用html2canvas将DOM转换为图片
      const canvas = await html2canvas(exportContainer, {
        useCORS: true,
        logging: false,
        backgroundColor: null,
        imageTimeout: 15000,
        width: 1240,
        height: 2772,
        scale: 1
      });
      
      // 创建下载链接
      const link = document.createElement('a');
      const now = new Date();
      const formattedTime = now.getFullYear().toString() + 
                           (now.getMonth() + 1).toString().padStart(2, '0') + 
                           now.getDate().toString().padStart(2, '0') + 
                           now.getHours().toString().padStart(2, '0') + 
                           now.getMinutes().toString().padStart(2, '0') + 
                           now.getSeconds().toString().padStart(2, '0');
      const fileName = `星环计划收益_${formattedTime}.${format}`;
      link.download = fileName;
      
      if (format === 'png') {
        link.href = canvas.toDataURL('image/png');
      } else {
        link.href = canvas.toDataURL('image/jpeg', 1.0);
      }
      
      link.click();
      toast.success('图片导出成功！');
    } catch (error) {
      console.error('图片导出失败:', error);
      toast.error('图片导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4">
        <div className="container mx-auto max-w-7xl">
          <UsageInstructions />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 预览区域 */}
            <div className="glass-card rounded-3xl p-6 backdrop-blur-xl border border-white/20 shadow-2xl">
              <div className="flex items-center mb-4">
                <i className="fas fa-eye text-white text-xl mr-3"></i>
                <h2 className="text-2xl font-bold text-white">实时预览</h2>
              </div>
              <PreviewArea />
            </div>
            
            {/* 配置面板 */}
            <div className="glass-card rounded-3xl p-6 backdrop-blur-xl border border-white/20 shadow-2xl">
              <div className="flex items-center mb-4">
                <i className="fas fa-cogs text-white text-xl mr-3"></i>
                <h2 className="text-2xl font-bold text-white">配置面板</h2>
              </div>
              <ConfigPanel 
                config={config} 
                setConfig={setConfig} 
                resetConfig={resetConfig} 
                onExport={handleExport} 
              />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}