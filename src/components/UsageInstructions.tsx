export default function UsageInstructions() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-200 mb-6 max-w-2xl mx-auto">
      <h3 className="font-bold text-blue-800 mb-3 flex items-center text-lg">
        <span className="mr-2">🚀</span>快速上手
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
        <div>
          <h4 className="font-semibold text-blue-700 mb-1">配置面板</h4>
          <ul className="space-y-1 list-disc pl-4">
            <li>修改个人信息</li>
            <li>上传头像</li>
            <li>调整数值</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-blue-700 mb-1">导出图片</h4>
          <ul className="space-y-1 list-disc pl-4">
            <li>实时预览效果</li>
            <li>选择导出格式</li>
            <li>一键保存到下载</li>
          </ul>
        </div>
      </div>
      <div className="mt-3 space-y-2">
         <div className="p-2 bg-blue-100 rounded text-xs text-blue-800">
           💡 提示：时间默认为当前，修改后立即生效
         </div>
         <div className="p-2 bg-purple-100 rounded text-xs text-purple-800">
           📱 小技巧：可上传星环计划界面截图，使用你的真实手机状态栏
         </div>
       </div>
    </div>
  );
}