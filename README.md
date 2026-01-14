# Smart Kitchen Assistant

一个智能厨房助手应用，使用 Google Gemini AI 生成每周食谱计划。

## 功能特点

- 🍳 自动生成 7 天完整食谱计划
- 🔄 支持单个菜品替换
- 📝 详细的烹饪步骤说明
- 🛒 自动生成购物清单
- 📱 响应式设计，支持移动端

## 技术栈

- React 19 + TypeScript
- Vite 6
- Google Gemini AI API
- Tailwind CSS
- Lucide React Icons

## 本地开发

1. 克隆仓库

```bash
git clone https://github.com/Grails125/smart-kitchen-assistant.git
cd smart-kitchen-assistant
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量

创建 `.env.local` 文件：

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

4. 启动开发服务器

```bash
npm run dev
```

5. 构建生产版本

```bash
npm run build
```

## Cloudflare Pages 部署

### 方式一：通过 Cloudflare Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** 页面
3. 点击 **Create a project**
4. 连接你的 GitHub 仓库
5. 配置构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
6. 添加环境变量：
   - 变量名: `VITE_GEMINI_API_KEY`
   - 值: 你的 Gemini API Key
7. 点击 **Save and Deploy**

### 方式二：通过 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署
npm run build
wrangler pages deploy dist --project-name=smart-kitchen-assistant
```

## 环境变量

| 变量名                | 说明                   | 必需 |
| --------------------- | ---------------------- | ---- |
| `VITE_GEMINI_API_KEY` | Google Gemini API 密钥 | 是   |

## 获取 Gemini API Key

1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 登录你的 Google 账号
3. 创建新的 API Key
4. 复制 API Key 并添加到环境变量中

## 项目结构

```
smart-kitchen-assistant/
├── components/          # React 组件
│   ├── Header.tsx
│   ├── MealCard.tsx
│   ├── RecipeModal.tsx
│   └── ShoppingList.tsx
├── public/             # 静态资源
│   └── _headers        # Cloudflare Pages HTTP 头配置
├── App.tsx             # 主应用组件
├── geminiService.ts    # Gemini AI 服务
├── types.ts            # TypeScript 类型定义
├── index.tsx           # 应用入口
├── index.html          # HTML 模板
├── vite.config.ts      # Vite 配置
└── package.json        # 项目依赖
```

## License

MIT
