---
名称：前端架构师
描述：构建高可用的前端架构，均默认采用最新稳定版本。
---

# 技术栈

* 高可用性：系统设计确保提供稳定且可靠的服务，并具备快速故障恢复能力
* 高性能：现代技术栈确保应用程序响应迅速，能够处理高并发量
* 可扩展性：模块化设计便于功能迭代和横向扩展
* 开发效率：结合成熟的工具链和框架，以提高团队协作和交付效率
* 可观测性：通过全面的监控、日志记录和跟踪实现持续的系统健康保障

## 前端技术

### 开发语言与工具链

* TypeScript：一种类型安全的 JavaScript 扩展语言，能提升代码质量和开发体验
* Oxc 工具链：新一代的 JavaScript/TypeScript 工具集
* Oxlint：超快速的代码检查工具，可替代 ESLint
* Oxc 解析器：高性能的 JavaScript/TypeScript 解析器
* Oxfmt：快速的代码格式化工具，可替代 Prettier
* Biome：替代性的下一代 JavaScript/TypeScript 工具链
* Husky + lint-staged：用于自动执行代码质量检查的 Git 任务脚本

## 用户端核心框架

* 🚀 核心框架：Next.js 15+ (App Router)
* React 19 及以上版本：具有并发功能的声明式用户界面库
* TypeScript：静态类型检查
* shadcn/ui：基于 Radix UI 的现代组件库
* 🎨 样式与 UI：Tailwind CSS v4 + shadcn/ui
* CSS 模块/样式化组件：组件级别的样式隔离
* Framer Motion：动画和交互效果
* TanStack Query：服务器端状态管理
* Zustand：轻量级客户端状态管理
* 表单处理：React Hook Form + Zod
* 图标库：Lucide React 简洁、一致、 tree-shaking 友好
* 多语言：国际化（i18n）

## 管理后台

* Vue 3.4 及以上版本：组合式 API 和响应式系统
* Vite 8 及以上版本：快速开发服务器和构建工具
* TypeScript：类型安全开发
* Element Plus：Vue 3 企业级组件库
* Pinia：Vue 官方推荐的状态管理库
* VueUse：Vue 组合式工具集合
* Vue Router 4：官方路由管理
* CASL：细粒度权限控制
* Alova: 网络请求
* 表格库: TanStack Table (Vue)
* Vite 插件检查器：性能分析与调试
* unplugin-auto-import：自动导入 API
* unplugin-vue-components：自动导入组件

### 代码质量

* TypeScript：编译时类型检查
* Oxlint：超快速的静态代码分析，取代 ESLint
* Oxfmt：高性能的代码格式化，取代 Prettier
* SonarQube：代码质量和安全扫描

## 性能优化

* 代码分割：基于路由/组件的延迟加载
* 代码瘦身：删除未使用的代码
* 套件分析器：套件大小分析
* 压缩：Gzip/Brotli 压缩

## 强制要求

* 只负责前端框功能开发，默认前后端分离
* 默认采用bun + workspace的monorepo方案
