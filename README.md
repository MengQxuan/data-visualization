# 数据可视化项目 (Data Visualization)

📊 一个包含多个数据可视化实践项目的集合，主要使用 D3.js 进行交互式数据可视化开发。

## 📖 项目简介

本仓库包含了多个数据可视化学习和实践项目，涵盖了美国选举数据分析、活动图表展示、HTML基础知识学习等内容。所有项目均使用现代Web技术栈构建，展示了数据可视化在实际场景中的应用。

## 🛠️ 技术栈

- **D3.js** - 数据驱动的文档操作库，用于创建动态、交互式数据可视化
- **HTML5/CSS3** - 页面结构和样式
- **JavaScript (ES6+)** - 核心编程语言
- **HTTP Server** - 本地开发服务器

## 📁 项目结构

```
data-visualization/
├── Us-Electoral-College-results/    # 美国选举团结果可视化（2000-2020）
├── groupwork/                        # 美国大选数据可视化小组项目
├── Weekly Activities Chart/          # 每周活动数据图表
├── Html/                            # HTML基础知识学习示例
└── README.md                        # 项目文档（本文件）
```

## 🎯 子项目详情

### 1. 美国选举团结果可视化 (Us-Electoral-College-results)

**功能描述：** 展示2000-2020年美国总统选举的选举团结果数据可视化

**主要特性：**
- 时间滑块交互，可查看不同年份的选举结果
- 散点图展示各州的选举数据
- 支持数据筛选和交互式探索

**技术实现：**
- 使用 D3.js v5 进行数据可视化
- CSV 数据格式存储历史选举数据
- 响应式设计，适配不同屏幕尺寸

**主要文件：**
- `index.html` - 主页面
- `index.js` - 可视化逻辑
- `style.css` - 样式文件
- `datasets/` - 包含1788-2020年选举数据的CSV文件和州地图图片

**运行方式：**
```bash
cd Us-Electoral-College-results
# 使用任意HTTP服务器打开，例如：
python -m http.server 8000
# 或
npx http-server
```

### 2. 美国大选可视化小组项目 (groupwork)

**功能描述：** 综合性的美国选举数据可视化项目，包含多种图表类型

**主要特性：**
- 多种可视化图表（柱状图、折线图等）
- 使用 D3.js v7 和模块化开发
- 包含篮球数据、摇摆州数据、失业率数据等多维度分析

**技术实现：**
- ES6 模块化开发
- 使用 D3.js v7
- 多数据源整合展示

**主要文件：**
- `index.html` - 主页面
- `main.js` - 主入口文件
- `linez.js` - 折线图模块
- `histogram copy.js` - 柱状图模块
- `assets/` - 数据资源文件夹

**运行方式：**
```bash
cd groupwork
# 需要支持ES6模块的服务器
python -m http.server 8000
# 或
npx http-server
```

### 3. 每周活动图表 (Weekly Activities Chart)

**功能描述：** 展示每周活动数据的交互式图表

**主要特性：**
- 使用 D3.js v7 绘制活动数据图表
- 支持交叉排序和数据交互
- 工具提示显示详细信息

**技术实现：**
- D3.js v7
- CSV/JSON 数据格式
- 多图表联动展示

**主要文件：**
- `drew.html` - 主页面
- `diagram.js` - 第一个图表脚本
- `diagram2.js` - 第二个图表脚本
- `data.csv` / `data.json` - 数据文件

**运行方式：**
```bash
cd "Weekly Activities Chart"
http-server
```

**注意事项：** 
根据 `Redme.txt`，数据形式在交叉排序时可能出现尖状图形，这是已知的数据格式问题。

### 4. HTML基础知识学习 (Html)

**功能描述：** HTML和CSS基础知识的学习示例集合

**内容包括：**
- HTML基础标签使用（`knowledge_01.html` - `knowledge_05.html`）
- CSS样式应用示例
- 图片和多媒体元素使用
- 示例项目：Gareth Bale（贝尔）相关页面

**主要文件：**
- `knowledge_01.html` - `knowledge_05.html` - 知识点示例
- `Bale.html` - 综合示例项目
- `illness.css` - 样式文件
- `Images/` - 图片资源

## 🚀 快速开始

### 前置要求

- 现代浏览器（Chrome、Firefox、Safari、Edge等）
- HTTP服务器（推荐使用以下任一方式）：
  - Python: `python -m http.server`
  - Node.js: `npx http-server`
  - VS Code: Live Server 扩展

### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/MengQxuan/data-visualization.git
cd data-visualization
```

2. **选择要运行的项目**
```bash
# 示例：运行美国选举团结果可视化
cd Us-Electoral-College-results
```

3. **启动本地服务器**
```bash
# 使用 Python（推荐）
python -m http.server 8000

# 或使用 Node.js
npx http-server -p 8000
```

4. **访问项目**
```
在浏览器中打开: http://localhost:8000
```

### 针对特定项目的安装

**Weekly Activities Chart 项目：**
```bash
cd "Weekly Activities Chart"
npm install  # 如果需要安装依赖
http-server
```

## 📊 数据来源

- **美国选举数据：** 1788-2020年美国总统选举历史数据
- **州地理数据：** 美国各州的经纬度和地图数据
- **自定义活动数据：** 每周活动统计数据（CSV/JSON格式）

## 🔧 开发说明

### 项目依赖

大部分项目通过CDN引入D3.js，无需安装npm依赖：
```html
<script src="https://d3js.org/d3.v5.min.js"></script>  <!-- 部分项目使用 v5 -->
<script src="https://d3js.org/d3.v7.min.js"></script>  <!-- 部分项目使用 v7 -->
```

### 本地开发

1. 使用HTTP服务器运行项目（必需，因为涉及到文件加载）
2. 修改HTML、CSS、JavaScript文件
3. 刷新浏览器查看更改

### 目录规范

- 数据文件统一放在 `datasets/` 或 `assets/` 目录
- 图片资源放在 `Images/` 或 `pictures/` 目录
- JavaScript文件与HTML文件同级或单独模块化

## 📝 常见问题

**Q: 为什么直接打开HTML文件不能正常显示？**
A: 由于浏览器的CORS（跨域资源共享）策略，本地文件协议（file://）无法加载外部数据文件。必须使用HTTP服务器运行项目。

**Q: 数据文件在哪里？**
A: 每个子项目的数据文件存储在各自的 `datasets/` 或 `assets/` 目录中，格式主要为CSV和JSON。

**Q: 如何修改可视化样式？**
A: 可以通过修改CSS文件调整布局和颜色，或在JavaScript文件中修改D3.js的样式配置。

**Q: Weekly Activities Chart 的尖状图形问题如何解决？**
A: 这是数据格式问题导致的，需要检查并调整数据文件中的数值格式和排序方式。

## 🎓 学习资源

- [D3.js 官方文档](https://d3js.org/)
- [D3.js 中文文档](https://d3js.org.cn/)
- [Observable D3 教程](https://observablehq.com/@d3/learn-d3)
- [数据可视化最佳实践](https://www.datavisualizationsociety.org/)


⭐ 如果这个项目对你有帮助，请给它一个星标！
