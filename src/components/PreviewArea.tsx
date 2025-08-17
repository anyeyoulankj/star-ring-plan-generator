import { useConfig } from '@/contexts/ConfigContext';

// 用户头像占位图 - 使用更可靠的默认头像URL
const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e5e7eb'/%3E%3Ccircle cx='50' cy='40' r='20' fill='%239ca3af'/%3E%3Cpath d='M50 70 Q30 90 20 100 L80 100 Q70 90 50 70' fill='%239ca3af'/%3E%3C/svg%3E";
// 背景图片
const BACKGROUND_IMAGE = 'https://lf-code-agent.coze.cn/obj/x-ai-cn/132594379778/attachment/每日收益图背景_20250813160306.png';


export default function PreviewArea() {
  const { config } = useConfig();
  
  return (
    <>
      {/* 预览显示 - 390×872 */}
      <div className="w-[390px] h-[872px] mx-auto overflow-hidden">
        <div 
          className="relative w-[1240px] h-[2772px] bg-gray-100 overflow-hidden border border-gray-300 shadow-lg" 
          style={{ transform: 'scale(0.3145)', transformOrigin: 'top left' }}
        >
          <PreviewContent config={config} />
        </div>
      </div>
      
      {/* 隐藏的导出容器 - 1240×2772 */}
      <div className="fixed top-[-9999px] left-[-9999px] w-[1240px] h-[2772px]">
        <div 
          className="relative w-[1240px] h-[2772px] bg-gray-100 overflow-hidden" 
          id="export-container"
        >
          <PreviewContent config={config} />
        </div>
      </div>
    </>
  );
}

// 预览内容组件
const PreviewContent = ({ config }: { config: any }) => {
  
  // 格式化数字为保留两位小数
  const formatNumber = (num: number) => {
    return (num || 0).toFixed(2);
  };





  // 获取头像URL
  const getAvatarUrl = () => {
    if (!config?.userAvatar) {
      return DEFAULT_AVATAR;
    }
    return config.userAvatar;
  };

  // 获取状态栏图片URL
  const getStatusBarUrl = () => {
    if (!config?.statusBarImage) {
      return null;
    }
    return config.statusBarImage;
  };

  return (
    <>
      {/* 使用用户提供的背景图片 */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}></div>
      
      {/* 所有内容使用绝对定位，确保与原图位置完全一致 */}
      <div className="absolute inset-0">
        {/* 状态栏图片 - 宽度填满，高度自适应裁剪显示顶部 */}
        {getStatusBarUrl() && (
          <div 
            className="absolute top-0 left-0 w-full h-[120px] z-10"
            style={{
              backgroundImage: `url(${getStatusBarUrl()})`,
              backgroundSize: '100% auto',
              backgroundPosition: 'center top',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
        
        {/* 状态栏时间 - 仅在未上传状态栏图片时显示 */}
        {!getStatusBarUrl() && (
          <div className="absolute top-[25.5px] left-[64px] text-[44.5px] font-semibold text-black z-20">
            {config?.time || ''}
          </div>
        )}
        
        {/* 用户头像 */}
        <div 
          className="absolute top-[347px] left-[64px] w-[204px] h-[204px] rounded-full overflow-hidden border-[0px]"
          style={{
            backgroundImage: `url(${getAvatarUrl()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            width: '204px',
            height: '204px'
          }}
        />
        
        {/* 用户名 */}
        <div className="absolute top-[399px] left-[303px] text-[47.7px] font-bold text-black">
          {config?.userName || '用户昵称'}
        </div>
        
        {/* 累计奖励数值 */}
        <div className="absolute top-[735px] left-[18%] transform -translate-x-1/2 text-[54px] font-bold text-black text-center">
          {formatNumber(config?.totalReward || 0)}
        </div>
        
        {/* 待结算奖励数值 */}
        <div className="absolute top-[735px] left-[48.5%] transform -translate-x-1/2 text-[54px] font-bold text-black text-center">
          {formatNumber(config?.pendingReward || 0)}
        </div>
        
        {/* 已结算奖励数值 */}
        <div className="absolute top-[735px] left-[79%] transform -translate-x-1/2 text-[54px] font-bold text-black text-center">
          {formatNumber(config?.settledReward || 0)}
        </div>
        
        {/* 可提现奖励数值 */}
        <div className="absolute top-[955px] left-[143px] text-[54px] font-bold text-white">
          {formatNumber(config?.withdrawableReward || 0)}
        </div>
        
        {/* 我的团队人数 */}
        <div className="absolute top-[2013px] right-[127px] text-[45px] text-gray-700">
          {config?.teamMembers || 0}人
        </div>
        
        {/* 帮扶基金数值 */}
        <div className="absolute top-[2308px] right-[127px] text-[45px] text-gray-700">
          ¥ {formatNumber(config?.supportFund || 0)}
        </div>
      </div>
    </>
  );
};