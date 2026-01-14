# 智能厨房助手 - Cloudflare Pages 部署指南

## 快速部署步骤

### 1. 准备工作

确保你已经：

- ✅ 拥有 Cloudflare 账号
- ✅ 拥有 Google Gemini API Key（[获取地址](https://makersuite.google.com/app/apikey)）
- ✅ 代码已推送到 GitHub 仓库

### 2. 在 Cloudflare Dashboard 部署

#### 步骤 1: 创建项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 在左侧菜单选择 **Workers & Pages**
3. 点击 **Create application** → **Pages** → **Connect to Git**

#### 步骤 2: 连接仓库

1. 选择 **GitHub** 并授权 Cloudflare 访问
2. 选择仓库：`Grails125/smart-kitchen-assistant`
3. 点击 **Begin setup**

#### 步骤 3: 配置构建设置

填写以下配置：

| 配置项                     | 值                        |
| -------------------------- | ------------------------- |
| **Project name**           | `smart-kitchen-assistant` |
| **Production branch**      | `main`                    |
| **Framework preset**       | `Vite`                    |
| **Build command**          | `npm run build`           |
| **Build output directory** | `dist`                    |
| **Root directory**         | `/`                       |
| **Node version**           | `20`                      |

#### 步骤 4: 添加环境变量

在 **Environment variables** 部分：

1. 点击 **Add variable**
2. 填写：
   - **Variable name**: `VITE_GEMINI_API_KEY`
   - **Value**: 你的 Gemini API Key
3. 选择环境：**Production** 和 **Preview** 都勾选

#### 步骤 5: 部署

1. 点击 **Save and Deploy**
2. 等待构建完成（约 2-3 分钟）
3. 部署成功后，你会获得一个 URL，例如：
   ```
   https://smart-kitchen-assistant.pages.dev
   ```

### 3. 验证部署

访问你的部署 URL，检查：

- ✅ 页面正常加载
- ✅ 可以生成食谱计划
- ✅ 可以替换菜品
- ✅ 购物清单功能正常

### 4. 自定义域名（可选）

1. 在项目页面点击 **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入你的域名（例如：`kitchen.yourdomain.com`）
4. 按照提示添加 DNS 记录
5. 等待 DNS 生效

## 常见问题

### Q1: 构建失败怎么办？

**检查以下几点：**

- 确保 `package.json` 中的依赖版本正确
- 检查构建日志中的错误信息
- 确认 Node 版本设置为 20

### Q2: API 调用失败？

**可能原因：**

- 环境变量 `VITE_GEMINI_API_KEY` 未正确设置
- API Key 无效或已过期
- API 配额已用完

**解决方法：**

1. 在 Cloudflare Dashboard 检查环境变量
2. 验证 API Key 是否有效
3. 检查 [Google AI Studio](https://makersuite.google.com/) 配额

### Q3: 如何更新代码？

只需推送代码到 GitHub：

```bash
git add .
git commit -m "更新说明"
git push origin main
```

Cloudflare Pages 会自动检测并重新部署。

### Q4: 如何查看部署日志？

1. 进入项目页面
2. 点击 **Deployments** 标签
3. 选择具体的部署记录
4. 查看 **Build logs**

## 性能优化建议

### 1. 启用缓存

已在 `public/_headers` 中配置：

- 静态资源（JS/CSS）缓存 1 年
- HTML 文件不缓存，确保更新及时

### 2. 使用 CDN

Cloudflare Pages 自动使用全球 CDN，无需额外配置。

### 3. 监控性能

在 Cloudflare Dashboard 的 **Analytics** 查看：

- 访问量统计
- 响应时间
- 错误率

## 环境变量管理

### 生产环境

在 Cloudflare Dashboard 设置：

```
VITE_GEMINI_API_KEY=your_production_key
```

### 预览环境

可以设置不同的 API Key 用于测试：

```
VITE_GEMINI_API_KEY=your_preview_key
```

## 回滚部署

如果新版本有问题：

1. 进入 **Deployments** 页面
2. 找到之前的稳定版本
3. 点击 **Rollback to this deployment**

## 技术支持

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Vite 文档](https://vitejs.dev/)
- [项目 GitHub Issues](https://github.com/Grails125/smart-kitchen-assistant/issues)

---

**祝部署顺利！** 🎉
