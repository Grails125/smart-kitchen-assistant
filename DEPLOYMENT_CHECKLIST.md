# Cloudflare Pages 部署检查清单

## ✅ 部署前检查

- [x] 代码已推送到 GitHub
- [x] 环境变量已改为 `VITE_GEMINI_API_KEY`
- [x] 构建配置已优化
- [x] 添加了 `_headers` 文件
- [x] 创建了部署文档

## 📋 Cloudflare Pages 配置清单

### 基本设置

```
Project name: smart-kitchen-assistant
Production branch: main
Framework preset: Vite
```

### 构建设置

```
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 20
```

### 环境变量

```
VITE_GEMINI_API_KEY = [你的 Gemini API Key]
```

## 🚀 部署步骤

1. **登录 Cloudflare**

   - 访问: https://dash.cloudflare.com/
   - 进入 Workers & Pages

2. **创建项目**

   - Create application → Pages → Connect to Git
   - 选择仓库: `Grails125/smart-kitchen-assistant`

3. **配置构建**

   - 按照上面的配置清单填写

4. **添加环境变量**

   - 在 Environment variables 添加 `VITE_GEMINI_API_KEY`

5. **部署**
   - Save and Deploy
   - 等待构建完成

## 🔍 部署后验证

访问部署 URL 并测试：

- [ ] 页面正常加载
- [ ] 点击"生成本周食谱"按钮
- [ ] 食谱成功生成
- [ ] 可以替换单个菜品
- [ ] 购物清单功能正常
- [ ] 移动端显示正常

## 📊 预期构建输出

```
✓ built in ~3s
dist/index.html                 1.00 kB
dist/assets/index-[hash].js   474.68 kB
```

## 🐛 常见问题排查

### 构建失败

- 检查 Node 版本是否为 20
- 查看构建日志中的错误信息
- 确认依赖安装正常

### API 调用失败

- 验证环境变量是否正确设置
- 检查 API Key 是否有效
- 查看浏览器控制台错误

### 页面空白

- 检查构建输出目录是否为 `dist`
- 查看浏览器控制台是否有 JavaScript 错误
- 确认 `index.html` 正确生成

## 📝 部署 URL

部署成功后，你的应用将在以下地址可用：

```
https://smart-kitchen-assistant.pages.dev
```

或者你的自定义域名。

## 🔄 更新部署

每次推送到 `main` 分支时，Cloudflare Pages 会自动重新部署：

```bash
git add .
git commit -m "更新说明"
git push origin main
```

## 📚 相关文档

- [完整部署指南](./DEPLOYMENT.md)
- [项目 README](./README.md)
- [Cloudflare Pages 官方文档](https://developers.cloudflare.com/pages/)

---

**准备好了吗？开始部署吧！** 🎉
