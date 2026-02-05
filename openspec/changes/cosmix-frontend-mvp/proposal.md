# Cosmix Frontend MVP

## Summary

实现 Cosmix 校园爽剧 AI 内容工厂的前端 MVP，包括用户端创作工作台和管理端配置界面。

## Motivation

根据 PRD 文档，Cosmix 需要在 5 周内完成核心开发，目标是验证 AI 生成效率 5x 提升的假设。本次实现聚焦前端 MVP 核心功能。

## Approach

### 技术栈
- **用户端 (cosmix-web)**: Next.js 15 + React 19 + Tailwind CSS v4 + shadcn/ui + Zustand + Tiptap
- **管理端 (cosmix-admin)**: Vue3 + Vite + Element Plus + Pinia
- **共享包**: cosmix-types, cosmix-api-client, design-tokens

### 实施阶段

**Phase 1: 基础设施 (Week 1)**
- 创建 cosmix-web 和 cosmix-admin 应用骨架
- 创建共享包 (types, api-client, design-tokens)
- 配置 API Mock 服务

**Phase 2: 核心骨架 (Week 2)**
- 用户端：创作工作台布局、流式渲染组件
- 管理端：基础布局、登录页面

**Phase 3: 端到端流程 (Week 3-4)**
- AI 流式生成 → 富文本编辑 → 一键复制
- 模板选择、草稿管理

**Phase 4: 体验完善 (Week 5)**
- 暗黑模式、快捷键、微交互
- 模板库（逆袭打脸 + 校花倒追）

## Scope

### In Scope
- cosmix-web: 创作工作台、模板选择、草稿管理、暗黑模式
- cosmix-admin: 基础布局、AI 参数配置、模板管理
- 共享包: API 类型定义、API 客户端、设计变量

### Out of Scope
- 后端 API 实现（独立仓库）
- 真实 AI 调用（使用 Mock）
- 多租户、订阅系统
- 视频平台集成

## Success Criteria
- [ ] 用户可完成"输入想法 → AI 生成 → 复制内容"完整流程
- [ ] 流式渲染无卡顿 (> 30 FPS)
- [ ] 暗黑模式正常切换
- [ ] 快捷键可用 (Cmd+G/C/S/Z/D)
- [ ] 草稿自动保存正常工作
