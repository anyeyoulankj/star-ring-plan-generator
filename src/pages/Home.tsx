import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="glass-card rounded-3xl p-10 backdrop-blur-xl border border-white/20 shadow-2xl">
          {/* 标题区域 */}
          <div className="mb-8">
            <div className="text-6xl mb-4">🌟</div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              星环计划页面生成器
            </h1>
            <p className="text-xl text-white/80 font-light">
              茶醒星球&星环计划
            </p>
          </div>

          {/* 介绍卡片 */}
          <div className="bg-white/10 rounded-2xl p-8 mb-8 backdrop-blur-sm border border-white/10">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="text-white font-semibold mb-1">可视化编辑</h3>
                <p className="text-white/70 text-sm">所见即所得</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="text-white font-semibold mb-1">实时预览</h3>
                <p className="text-white/70 text-sm">即时效果展示</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💾</div>
                <h3 className="text-white font-semibold mb-1">一键导出</h3>
                <p className="text-white/70 text-sm">高清图片输出</p>
              </div>
            </div>
            
            <p className="text-white/90 text-lg leading-relaxed">
              茶醒星球&星环计划
            </p>
          </div>

          {/* 操作按钮 */}
          <div className="space-y-4">
            <Link 
              to="/star-ring-plan"
              className="inline-block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center">
                <i className="fas fa-rocket mr-3 text-xl"></i>
                <span className="text-lg">立即开始创作</span>
                <i className="fas fa-arrow-right ml-3"></i>
              </div>
            </Link>
            
            <div className="flex justify-center space-x-4 text-sm text-white/70">
              <span className="flex items-center">
                <i className="fas fa-check-circle mr-1 text-green-400"></i>
                无需安装
              </span>
              <span className="flex items-center">
                <i className="fas fa-check-circle mr-1 text-green-400"></i>
                在线使用
              </span>
              <span className="flex items-center">
                <i className="fas fa-check-circle mr-1 text-green-400"></i>
                免费
              </span>
            </div>
          </div>
        </div>

        {/* 装饰元素 */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-500/30 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}