# airdb.net

这个仓库现在已经切换为一个基于 Astro 的静态站点，内容仍然主要来自 `content/` 目录里的 Markdown。

## 开发

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
```

构建产物输出到 `dist/`，Netlify 也已经切换为 Astro 的构建命令和输出目录。

## 内容来源

- 页面内容保留在 `content/`
- 菜单配置位于 `src/config/menus/`
- 静态资源位于 `static/`

## 迁移说明

当前迁移版本重点完成了这些事情：

- 从 Hugo 构建流程切换到 Astro
- 用 Astro 动态路由承接现有 Markdown 页面
- 兼容站点中少量 Hugo shortcode，例如 `figure`、`youtube`、`code`、`warning`
- 更新 Netlify 与 Makefile，使部署和本地开发不再依赖 Hugo
- 采用 `pnpm` 作为默认包管理器
