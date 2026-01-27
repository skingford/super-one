---
name: front-architect
description: Build and evolve a high-availability, high-performance frontend architecture using the repo’s default modern stack (Next.js + React for user app, Vue + Vite for admin, bun + workspace monorepo). Use for frontend system design, stack selection, project setup, performance, observability, or DX/tooling decisions.
---

# 目标与原则

- 交付可用且可扩展的前端架构，默认使用最新稳定版
- 优先前后端分离，前端只负责 UI/交互/状态与性能
- 默认采用 bun + workspace 的 monorepo 方案
- 以稳定性、性能、可观测性、协作效率为核心指标

## 工作流程（高层）

1. 明确场景：用户端/管理端/共享包/基础设施
2. 选择默认技术栈（除非需求强制变更）
3. 设计目录结构与包边界
4. 设定质量与性能门槛
5. 输出可执行的脚本、目录、配置与示例

## 质量目标

- 高可用性：系统设计确保提供稳定且可靠的服务，并具备快速故障恢复能力
- 高性能：现代技术栈确保应用程序响应迅速，能够处理高并发量
- 可扩展性：模块化设计便于功能迭代和横向扩展
- 开发效率：结合成熟的工具链和框架，以提高团队协作和交付效率
- 可观测性：通过全面的监控、日志记录和跟踪实现持续的系统健康保障

## 默认技术栈

### 开发语言与工具链

- TypeScript
- Oxc 工具链：Oxlint + Oxfmt
- Biome：作为备选/补充工具链
- Husky + lint-staged：提交前质量门槛

## 用户端核心框架

- 🚀 核心框架：Next.js 15+（App Router）
- React 19 及以上版本：具有并发功能的声明式用户界面库
- TypeScript
- shadcn/ui：基于 Radix UI 的现代组件库
- 🎨 样式与 UI：Tailwind CSS v4 + shadcn/ui
- CSS 模块/样式化组件：组件级样式隔离
- Framer Motion：动画和交互效果
- TanStack Query：服务器端状态管理
- Zustand：轻量级客户端状态管理
- 表单处理：React Hook Form + Zod
- 图标库：Lucide React 简洁、一致、 tree-shaking 友好
- 多语言：国际化（i18n）

## 管理后台

- Vue 3.4 及以上版本：组合式 API 和响应式系统
- Vite 8 及以上版本：快速开发服务器和构建工具
- TypeScript
- Element Plus：Vue 3 企业级组件库
- Pinia：Vue 官方推荐的状态管理库
- VueUse：Vue 组合式工具集合
- Vue Router 4：官方路由管理
- CASL：细粒度权限控制
- Alova: 网络请求
- 表格库: TanStack Table (Vue)
- Vite 插件检查器：性能分析与调试
- unplugin-auto-import：自动导入 API
- unplugin-vue-components：自动导入组件

### 代码质量

- TypeScript：编译时类型检查
- Oxlint：超快速的静态代码分析，取代 ESLint
- Oxfmt：高性能的代码格式化，取代 Prettier
- SonarQube：代码质量与安全扫描

## 性能优化

- 代码分割：基于路由/组件的延迟加载
- 代码瘦身：删除未使用的代码
- 套件分析器：套件大小分析
- 压缩：Gzip/Brotli 压缩

## 架构与目录建议

使用 monorepo 组织多个前端应用与共享包（示例）：

```bash
apps/
  web/        # 用户端 Next.js
  admin/      # 管理后台 Vue
packages/
  ui/         # 共享组件
  config/     # eslint/tsconfig 等共享配置
  utils/      # 共享工具
```

## 输出标准（交付物）

- 明确应用类型与默认框架
- 给出目录结构与包边界
- 提供关键脚本与工具链选型
- 说明性能与可观测性策略
- 标注任何偏离默认栈的原因

## 强制要求

- 只负责前端框功能开发，默认前后端分离
- 默认采用 bun + workspace 的 monorepo 方案
- 若需要变更技术栈，先给出约束与权衡说明
