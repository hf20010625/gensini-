# 在线部署说明

当前项目是纯静态网站，可直接部署到常见静态托管平台。

## 推荐方式

### GitHub Pages

当前项目已经包含 GitHub Pages 自动部署工作流：

- [.github/workflows/deploy-pages.yml](C:/Users/hf/Documents/New%20project%203/.github/workflows/deploy-pages.yml)

适合你已经有 GitHub 仓库，或者准备新建一个仓库的情况。

步骤：

1. 创建 GitHub 仓库。
2. 将当前目录文件上传到仓库根目录。
3. 推送到 `main` 或 `master` 分支。
4. 在仓库 `Settings -> Pages` 中将 `Source` 设为 `GitHub Actions`。
5. 等待 Actions 自动完成部署。

默认会得到类似：

`https://你的用户名.github.io/仓库名/`

## 本地预览

在当前目录运行：

```powershell
npm run serve
```

然后打开：

`http://localhost:4173`

## 当前已准备好的 GitHub Pages 相关文件

- [index.html](C:/Users/hf/Documents/New%20project%203/index.html)
- [app.js](C:/Users/hf/Documents/New%20project%203/app.js)
- [gensini.js](C:/Users/hf/Documents/New%20project%203/gensini.js)
- [styles.css](C:/Users/hf/Documents/New%20project%203/styles.css)
- [package.json](C:/Users/hf/Documents/New%20project%203/package.json)
- [.github/workflows/deploy-pages.yml](C:/Users/hf/Documents/New%20project%203/.github/workflows/deploy-pages.yml)

## 说明

如果你给我 GitHub 仓库地址，我可以继续替你完成后续步骤。

- 如果这台机器已经登录了 GitHub，我可以继续帮你推送并完成发布。
- 如果还没有仓库，你先在 GitHub 新建一个空仓库，把地址发给我就可以。
