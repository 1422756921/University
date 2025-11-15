# 移动大学官方网站

![移动大学](images/favicon.ico)

一个现代化、科技感十足的大学官方网站，采用深色主题和霓虹发光效果，为移动大学提供全面的在线展示平台。

## 🌟 特性

- 🎨 **现代科技风格设计** - 采用深色主题和霓虹发光效果
- 📱 **完全响应式** - 适配各种屏幕尺寸，提供优秀的移动端体验
- ⚡ **本地资源优化** - 所有外部资源已本地化，支持离线访问
- 🌐 **多页面结构** - 包含首页、关于、学术、招生、校园生活和联系我们等页面
- ✨ **动画效果** - 流畅的过渡和微交互动画
- 🔍 **SEO优化** - 良好的语义化HTML结构
- 🌐 **中英文支持** - 以中文为主，包含英文元素
- 📚 **本地化字体** - 使用Noto Sans SC和Orbitron字体，支持中英文显示

## 📋 页面结构

- **首页** (`index.html`) - 网站主页，包含轮播图、快速链接和最新资讯
- **关于我们** (`about.html`) - 学校概况、历史、特色和愿景使命
- **学术研究** (`academics.html`) - 学术项目、研究方向和成果
- **招生信息** (`admissions.html`) - 招生政策、申请流程和要求
- **校园生活** (`campus.html`) - 校园设施、学生活动和社团组织
- **联系我们** (`contact.html`) - 联系方式、地图和咨询表单

## 🛠 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 现代样式和动画，使用CSS变量和Flexbox/Grid布局
- **JavaScript** - 交互功能，包含轮播图、动画效果和表单处理
- **Font Awesome 6.0.0** - 本地化图标库（已本地化）
- **jQuery 3.6.0** - DOM操作和事件处理（已本地化）
- **Google Fonts** - Noto Sans SC和Orbitron字体（已本地化）

## 📁 项目结构

```
移动大学网站/
├── css/
│   ├── font-awesome-local.css   # 本地化Font Awesome样式
│   ├── google-fonts-local.css   # 本地化Google字体样式
│   ├── style.css                # 主样式文件
│   └── style-tech.css           # 科技风格增强样式
├── fonts/
│   ├── font-awesome/            # Font Awesome字体文件
│   │   ├── fa-brands-400.woff2
│   │   ├── fa-regular-400.woff2
│   │   └── fa-solid-900.woff2
│   └── google/                  # Google字体文件
│       ├── noto-sans-sc-300.ttf
│       ├── noto-sans-sc-400.ttf
│       ├── noto-sans-sc-500.ttf
│       ├── noto-sans-sc-600.ttf
│       ├── noto-sans-sc-700.ttf
│       ├── orbitron-400.ttf
│       ├── orbitron-500.ttf
│       ├── orbitron-600.ttf
│       ├── orbitron-700.ttf
│       └── orbitron-900.ttf
├── js/
│   ├── jquery-3.6.0.min.js      # 本地化jQuery库
│   └── script.js                # JavaScript交互脚本
├── images/                       # 图片资源
│   ├── favicon.ico               # 网站图标
│   └── picsum_*.jpg             # 页面图片
├── index.html                   # 首页
├── about.html                   # 关于我们
├── academics.html               # 学术研究
├── admissions.html              # 招生信息
├── campus.html                  # 校园生活
├── contact.html                 # 联系我们
└── README.md                    # 项目说明文档
```

## 🚀 快速开始

### 安装

1. 下载或克隆项目文件
2. 使用Web服务器打开项目（推荐使用Live Server等本地服务器）

```bash
# 如果使用Live Server（VS Code扩展）
# 右键点击index.html -> "Open with Live Server"
```

### 查看

在浏览器中访问 `http://localhost:PORT`（PORT取决于你的服务器配置）

## 🎨 设计系统

### 颜色方案

网站采用科技感设计风格，主要使用以下颜色：

- **深色背景** - `#0a0e27` 和 `#060818`
- **霓虹蓝色** - `#00d4ff`
- **霓虹紫色** - `#9D00FF`
- **霓虹粉色** - `#ff006e`
- **霓虹青色** - `#00fff5`
- **霓虹绿色** - `#39ff14`
- **卡片背景** - `rgba(15, 23, 41, 0.6)`
- **玻璃效果** - `rgba(255, 255, 255, 0.05)`
- **文字颜色** - 白色、浅蓝和灰色系

### 字体

- **中文字体** - Noto Sans SC (300, 400, 500, 600, 700 字重)
- **英文字体** - Orbitron (400, 500, 600, 700, 900 字重)
- **图标字体** - Font Awesome 6.0.0

### 响应式断点

- **桌面端** - `> 1024px` - 完整功能和最丰富的视觉效果
- **平板端** - `768px - 1024px` - 适度调整布局和字体大小
- **手机端** - `480px - 768px` - 简化导航、调整布局、增大触摸目标
- **小屏手机** - `< 480px` - 紧凑布局

## 📱 响应式设计

网站针对不同设备进行了全面优化：

- **移动端** - 汉堡菜单、简化导航、调整布局、增大触摸目标
- **平板端** - 适度调整布局和字体大小
- **桌面端** - 完整功能和最丰富的视觉效果

## ⚙️ 配置

### CSS自定义属性

项目使用CSS自定义属性（变量）便于主题定制：

```css
:root {
    /* 科技风格配色方案 */
    --tech-dark: #0a0e27;
    --tech-darker: #060818;
    --neon-blue: #00d4ff;
    --neon-purple: #9D00FF;
    --neon-pink: #ff006e;
    --neon-cyan: #00fff5;
    --neon-green: #39ff14;
    /* ... 更多变量 */
}
```

## 🌐 外部链接与集成

### 重要链接

- **录取通知书查询**: `https://select.mv.edu.kg/select`
- **录取通知书生成**: `https://select.mv.edu.kg/main`
  - 账号: admin
  - 密码: ceet2016

### 社交媒体

- Facebook, Twitter, Instagram, LinkedIn 图标已集成，链接可自定义

## 🔧 本地化资源

为了确保网站在没有网络连接的情况下也能正常运行，以下外部资源已经本地化：

1. **Font Awesome 6.0.0** - 所有图标文件和CSS已下载到本地
2. **jQuery 3.6.0** - 完整库文件已下载到本地
3. **Google Fonts** - Noto Sans SC和Orbitron字体文件已下载到本地
4. **字体引用** - 所有CSS文件中的字体引用已更新为本地路径

## 🎯 用户体验特色

### 交互设计

- **微交互**: 悬停效果、点击反馈
- **加载动画**: 页面和元素加载效果
- **视觉反馈**: 表单验证、提交状态
- **无障碍设计**: 键盘导航支持
- **毛玻璃效果**: 现代化的视觉层次

### 性能优化

- **本地资源**: 所有外部资源已本地化，减少网络请求
- **代码分离**: CSS/JS模块化
- **缓存策略**: 静态资源优化
- **SEO友好**: 语义化HTML结构

## 📊 项目统计

### 代码量统计

- **HTML**: 6个页面，约40KB
- **CSS**: 4个文件，约70KB
- **JavaScript**: 2个文件，约350KB（包含jQuery）
- **字体文件**: 15个文件，约50MB（主要是Noto Sans SC字体）
- **图片资源**: 18个文件

### 功能特性

- ✅ 完全响应式设计
- ✅ 现代化UI/UX
- ✅ 无障碍访问支持
- ✅ SEO优化
- ✅ 跨浏览器兼容
- ✅ 移动端优化
- ✅ 离线访问支持
- ✅ 本地资源完全集成

## 🤝 贡献

欢迎提交问题和改进建议！如果你有好的想法或发现了bug，请创建一个issue。

### 开发指南

1. Fork此仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📜 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🌐 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 📞 联系方式

- **地址**: 吉尔吉斯斯坦华沙市大学路123号
- **电话**: +44 928759455
- **邮箱**: uniamo@mv.edu.kg

## 📝 更新日志

### 2025年11月8日

- 完成所有外部资源的本地化
- 修复社交媒体图标显示问题
- 优化离线访问体验
- 更新项目文档

---

© 1989 - 2025 移动大学. 版权所有.