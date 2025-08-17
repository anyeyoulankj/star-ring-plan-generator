import React, { useRef } from 'react';
import { toast } from 'sonner';

interface ConfigPanelProps {
  config: any;
  setConfig: (config: any) => void;
  onExport: (format: 'png' | 'jpg') => void;
  resetConfig: () => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  config,
  setConfig,
  onExport,
  resetConfig
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const statusBarInputRef = useRef<HTMLInputElement>(null);
  const [exportFormat, setExportFormat] = React.useState('png');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newConfig = {
      ...config,
      [name]: name.includes('Reward') || name === 'supportFund' ? parseFloat(value) || 0 :
               name === 'teamMembers' ? parseInt(value) || 0 : value
    };
    
    // 当用户选择时间时，清空状态栏图片并显示系统时间
    if (name === 'time' && value) {
      newConfig.statusBarImage = '';
      // 清空文件输入框
      if (statusBarInputRef.current) {
        statusBarInputRef.current.value = '';
      }
    }
    
    setConfig(newConfig);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('图片大小不能超过10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setConfig({ ...config, userAvatar: result });
        toast.success('头像上传成功');
      };
      reader.onerror = () => {
        toast.error('图片读取失败，请重试');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStatusBarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('图片大小不能超过10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setConfig({ ...config, statusBarImage: result });
        toast.success('状态栏图片上传成功');
      };
      reader.onerror = () => {
        toast.error('图片读取失败，请重试');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 backdrop-blur-xl border border-white/20">
        <h2 className="text-xl font-bold text-white text-center mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          自定义配置
        </h2>
        
        {/* 状态栏设置 */}
        <div className="space-y-4 mt-8">
          <h3 className="font-semibold text-lg text-white border-b border-white/20 pb-2">
            <i className="fas fa-clock mr-2"></i>状态栏设置
          </h3>
          
          <div>
            <label className="block text-sm text-white/90 mb-2">时间 (24小时制)</label>
            <input
              type="time"
              name="time"
              value={config?.time || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
             <label className="block text-sm text-white/90 mb-2">状态栏图片</label>
             <input
               type="file"
               accept="image/*"
               onChange={handleStatusBarUpload}
               className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30 transition-all"
               ref={statusBarInputRef}
             />
           </div>
        </div>

        {/* 用户信息配置 */}
        <div className="space-y-4 mt-8">
          <h3 className="font-semibold text-lg text-white border-b border-white/20 pb-2">
            <i className="fas fa-user mr-2"></i>用户信息
          </h3>
          
          <div>
            <label className="block text-sm text-white/90 mb-2">昵称 (最多5位)</label>
            <input
              type="text"
              name="userName"
              value={config?.userName || ''}
              maxLength={5}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
              placeholder="请输入昵称"
            />
          </div>
          
          <div>
            <label className="block text-sm text-white/90 mb-2">上传头像</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30 transition-all"
              ref={fileInputRef}
            />
          </div>
        </div>
        
        {/* 奖励数据配置 */}
        <div className="space-y-4 mt-8">
          <h3 className="font-semibold text-lg text-white border-b border-white/20 pb-2">
            <i className="fas fa-coins mr-2"></i>奖励数据
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/90 mb-2">累计奖励(元)</label>
              <input
                type="number"
                name="totalReward"
                value={config?.totalReward || 0}
                step="0.01"
                min="0" max="99999999.99"
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label className="block text-sm text-white/90 mb-2">待结算奖励(元)</label>
              <input
                type="number"
                name="pendingReward"
                value={config?.pendingReward || 0}
                step="0.01"
                min="0" max="99999999.99"
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label className="block text-sm text-white/90 mb-2">已结算奖励(元)</label>
              <input
                type="number"
                name="settledReward"
                value={config?.settledReward || 0}
                step="0.01"
                min="0" max="99999999.99"
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label className="block text-sm text-white/90 mb-2">可提现奖励(元)</label>
              <input
                type="number"
                name="withdrawableReward"
                value={config?.withdrawableReward || 0}
                step="0.01"
                min="0" max="99999999.99"
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label className="block text-sm text-white/90 mb-2">团队人数</label>
              <input
                type="number"
                name="teamMembers"
                value={config?.teamMembers || 0}
                min="0" max="9999999"
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder="0"
              />
            </div>
            
            <div>
              <label className="block text-sm text-white/90 mb-2">帮扶基金(元)</label>
              <input
                type="number"
                name="supportFund"
                value={config?.supportFund || 0}
                step="0.01"
                min="0" max="9999999.99"
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
        
        {/* 导出设置 */}
        <div className="space-y-4 mt-8">
          <h3 className="font-semibold text-lg text-white border-b border-white/20 pb-2">
            <i className="fas fa-download mr-2"></i>导出设置
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/90 mb-2">图片输出位置</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name="outputPath"
                  value={config?.outputPath || ''}
                  onChange={handleInputChange}
                  placeholder="浏览器默认保存到下载文件夹"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                />
                <button
                  onClick={() => {
                    toast.info('浏览器限制：网页无法直接选择下载位置，图片将保存到系统默认下载文件夹');
                  }}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
                >
 浏览
                </button>
              </div>
              <p className="text-xs text-white/70 mt-1">提示：现代浏览器出于安全考虑，网页应用无法直接选择文件保存位置</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="format-png"
                  name="export-format"
                  value="png"
                  checked={exportFormat === 'png'}
                  onChange={() => setExportFormat('png')}
                  className="mr-2 w-4 h-4 text-blue-600 bg-white/10 border-white/20 focus:ring-white/30"
                />
                <label htmlFor="format-png" className="text-white/90">PNG格式</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="format-jpg"
                  name="export-format"
                  value="jpg"
                  checked={exportFormat === 'jpg'}
                  onChange={() => setExportFormat('jpg')}
                  className="mr-2 w-4 h-4 text-blue-600 bg-white/10 border-white/20 focus:ring-white/30"
                />
                <label htmlFor="format-jpg" className="text-white/90">JPG格式</label>
              </div>
            </div>
          </div>
        </div>
        
        {/* 导出和重置按钮 - 并排布局 */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              if (window.confirm('确定要重置所有配置为默认值吗？此操作不可撤销。')) {
                resetConfig();
                toast.success('配置已重置为默认值，昵称将显示为"用户昵称"');
              }
            }}
            className="inline-flex items-center text-xs text-white/60 hover:text-white/80 transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
            title="重置为默认配置"
          >
            <i className="fas fa-undo mr-1"></i>
            重置配置
          </button>
          <button
            onClick={() => onExport(exportFormat as 'jpg' | 'png')}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <i className="fas fa-download mr-2"></i>导出图片
          </button>
        </div>
      </div>
    </div>
  );
};