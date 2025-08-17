import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// 定义配置数据类型
interface ConfigData {
  // 用户信息配置
  userName: string;
  userAvatar: string | null;
  
  // 状态栏配置
  time: string;
  statusBarImage: string | null;
  
  // 奖励数据配置
  totalReward: number;
  pendingReward: number;
  settledReward: number;
  withdrawableReward: number;
  
  // 团队数据配置
  teamMembers: number;
  supportFund: number;
  
  // 导出配置
  outputPath: string;
}

// 定义上下文类型
interface ConfigContextType {
  config: ConfigData;
  setConfig: (config: Partial<ConfigData>) => void;
  resetConfig: () => void;
}

// 默认配置
const defaultConfig: ConfigData = {
  userName: '用户昵称',
  userAvatar: null,
  time: '',
  statusBarImage: null,
  totalReward: 0,
  pendingReward: 0,
  settledReward: 0,
  withdrawableReward: 0,
  teamMembers: 0,
  supportFund: 0,
  outputPath: '',
}

// 创建上下文
const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// 提供者组件
export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ConfigData>(() => {
    // 从本地存储加载配置
    const savedConfig = localStorage.getItem('starRingConfig');
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    if (savedConfig) {
      try {
        return {
          ...defaultConfig,
          ...JSON.parse(savedConfig),
          time: currentTime // 时间始终使用当前时间
        };
      } catch (error) {
        console.error('Failed to parse saved config:', error);
      }
    }
    
    return {
      ...defaultConfig,
      time: currentTime
    };
  });
  
  // 保存配置到本地存储
  useEffect(() => {
    localStorage.setItem('starRingConfig', JSON.stringify(config));
  }, [config]);
  
  // 更新配置
  const updateConfig = (newConfig: Partial<ConfigData>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };
  
  // 重置配置
  const resetConfig = () => {
    setConfig({
      ...defaultConfig,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })
    });
    localStorage.removeItem('starRingConfig');
  };
  
  return (
    <ConfigContext.Provider value={{ config, setConfig: updateConfig, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

// 自定义Hook方便使用上下文
export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}