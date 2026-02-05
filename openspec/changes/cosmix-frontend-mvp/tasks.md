# Implementation Tasks

## Phase 1: 基础设施 (Week 1)

### 1.1 共享包创建
- [x] 创建 `packages/cosmix-types/` - API 类型定义
- [x] 创建 `packages/cosmix-api-client/` - API 客户端封装
- [x] 创建 `packages/design-tokens/` - 设计变量 (品牌色 #8B5CF6, #06B6D4, #F59E0B)

### 1.2 用户端应用骨架
- [x] 创建 `apps/cosmix-web/` - Next.js 15 + React 19 应用
- [x] 配置 Tailwind CSS v4 + shadcn/ui
- [x] 配置 Zustand 状态管理
- [x] 配置 next-themes 暗黑模式

### 1.3 管理端应用骨架
- [ ] 创建 `apps/cosmix-admin/` - Vue3 + Vite 应用
- [ ] 配置 Element Plus + Pinia
- [ ] 配置基础路由

### 1.4 Mock API 服务
- [x] 配置 Mock API (内置在 hooks/use-generation.ts)

## Phase 2: 核心骨架 (Week 2)

### 2.1 用户端布局
- [x] 创建 AppLayout 组件 (顶部导航 Header)
- [x] 创建 WorkspaceLayout 创作工作台布局
- [x] 实现响应式布局

### 2.2 流式渲染组件
- [x] 创建 StreamingText 组件 (打字机效果)
- [x] 创建 SSE 连接 Hook (useGeneration)
- [x] 实现光标闪烁动画

### 2.3 管理端布局
- [ ] 创建 AdminLayout 组件
- [ ] 创建登录页面
- [ ] 创建仪表盘骨架

## Phase 3: 端到端流程 (Week 3-4)

### 3.1 创作工作台
- [x] 创建 IdeaInput 组件 (想法输入)
- [x] 创建 TemplateSelector 组件 (模板选择)
- [x] 创建 GenerateButton 组件 (生成按钮 + 防抖)

### 3.2 富文本编辑器
- [x] 集成 Tiptap 编辑器
- [x] 配置基础扩展 (Bold, Italic, Heading, Paragraph)
- [x] 实现内容自动保存

### 3.3 内容操作
- [x] 创建 CopyButton 组件 (富文本/纯文本双模式)
- [x] 创建 RegenerateButton 组件 (重新生成)
- [x] 创建 Toast 通知组件

### 3.4 草稿管理
- [x] 创建 useDrafts Hook (localStorage 存储)
- [x] 创建 DraftList 组件 (草稿列表)
- [x] 实现草稿自动保存 (debounce 1s)
- [x] 实现草稿上限 (10 篇)

### 3.5 状态管理
- [x] 创建 useGenerationStore (Zustand)
- [x] 创建 useDraftStore (Zustand)
- [x] 创建 useSettingsStore (Zustand)

## Phase 4: 体验完善 (Week 5)

### 4.1 暗黑模式
- [x] 配置 next-themes
- [x] 创建 ThemeToggle 组件
- [x] 适配所有组件暗黑样式

### 4.2 快捷键
- [x] 创建 useKeyboardShortcuts Hook
- [x] 实现 Cmd+G (生成内容)
- [x] 实现 Cmd+C (复制内容)
- [x] 实现 Cmd+S (保存草稿)
- [x] 实现 Cmd+Z (撤销)
- [x] 实现 Cmd+D (切换暗黑模式)

### 4.3 模板库
- [x] 创建模板数据结构
- [x] 实现"逆袭打脸"模板
- [x] 实现"校花倒追"模板
- [x] 创建 TemplateCard 组件 (TemplateSelector)

### 4.4 微交互
- [x] 生成完成动效 (轻微震动)
- [x] 生成完成音效 (框架已实现，需添加音效文件)
- [x] 复制成功绿色闪烁
- [ ] 加载骨架屏

### 4.5 数据埋点
- [ ] 创建 useAnalytics Hook
- [ ] 实现核心事件埋点 (page_view, content_generate_*, content_copy, theme_switch)

## Phase 5: 管理端功能 (Week 5-6)

### 5.1 AI 配置
- [ ] 创建 AI 参数配置页面
- [ ] 实现内容长度设置
- [ ] 实现模型选择配置

### 5.2 模板管理
- [ ] 创建模板列表页面
- [ ] 创建模板编辑表单
- [ ] 实现模板 CRUD

### 5.3 系统监控
- [ ] 创建系统状态页面
- [ ] 显示 API 调用统计
