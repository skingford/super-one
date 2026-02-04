---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
workflowStatus: completed
completedAt: '2026-02-04'
inputDocuments: []
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 0
projectType: greenfield
classification:
  productName: Cosmix
  slogan: "AI造万象"
  positioning: "校园爽剧 AI 内容工厂"
  projectType: "SaaS Web App"
  domain: "内容创作/自媒体"
  complexity: "中等"
  projectContext: "greenfield"
  mvpUser: "创始人自用"
  coreDifferentiation:
    - 多平台发布
    - AI 生成
  contentVertical:
    - 爽剧
    - 校园
  techStack:
    api:
      framework: "Go-Zero"
      architecture: "单体 API（模块化，可拆分）"
      evolutionPath: "Go → Rust (优化) → Python (AI/ML)"
    frontend:
      userApp:
        tech: "Next.js 或 Svelte"
        purpose: "创作者工作台，流畅的 AI 生成 + 发布体验"
      adminApp:
        tech: "Vue3 + Vite"
        purpose: "后台配置，组织架构、权限、数据分析"
  phase1Focus:
    - 用户端核心体验
    - 核心 API
    - 管理端极简
  targetPlatforms:
    phase1:
      - 微信公众号
      - 今日头条
    phase2:
      - 小红书
      - 番茄小说
    phase3:
      - 抖音
      - YouTube
  aiMode: "全自动"
  developmentApproach: "Vibe Coding / AI 编程"
mvpSimplifications:
  - 发布方式: "生成 → 复制 → 手动发布"
  - 数据获取: "手动录入阅读量"
  - 通知渠道: "仅钉钉"
  - AI学习: "固定 prompt 模板"
---

# Product Requirements Document - Cosmix

**Author:** 大人
**Date:** 2026-02-04
**Version:** 1.0
**Status:** Ready for Development

---

## Executive Summary

### 产品概述

| 项目 | 内容 |
|------|------|
| **产品名称** | Cosmix |
| **Slogan** | AI造万象 |
| **定位** | 校园爽剧 AI 内容工厂 |
| **项目类型** | SaaS Web App（Greenfield） |

### 核心价值主张

> **5 分钟内，从模糊想法到可发布的校园爽剧内容**

- AI 自动生成 2000 字可发布质量内容
- 流式输出 + 沉浸式编辑体验
- 一键复制，多平台发布

### 目标用户

| 阶段 | 用户 |
|------|------|
| MVP | 创始人自用 |
| Growth | 开放给校园爽剧创作者 |
| Vision | 全品类内容创作者 |

### 核心差异化

1. **垂直聚焦**：专注校园爽剧，prompt 模板深度优化
2. **效率优先**：快捷键 + 暗黑模式 + 自动保存
3. **数据驱动**：Day 1 埋点，快速迭代

### 项目约束

| 约束 | 内容 |
|------|------|
| **工期** | 5 周核心开发 + 1 周 Buffer |
| **资源** | 1 人全栈 + Vibe Coding |
| **架构** | 前后端分离（本仓库仅前端）|

---

## Success Criteria

### User Success

| 阶段 | 日产出 | 单篇阅读量 | AI 可用率 |
|------|--------|-----------|----------|
| **MVP (0-3月)** | 1篇/天 | 1万+ | 需少量修改 |
| **Growth (3-6月)** | 2篇/天 | 10万+ | 生成即可用 |
| **Vision (6-12月)** | 3篇/天 | 100万+ | 风格个性化 |

**用户成功定义：**
- 每天能稳定产出可发布的高质量内容
- AI 生成的内容质量逐步提升，从"需少量修改"到"生成即可用"
- 内容阅读量随时间增长，最终达到爆款标准

### Business Success

| 阶段 | 收入目标 | 关键里程碑 |
|------|---------|-----------|
| **MVP (0-3月)** | 覆盖成本 | 流程跑通，首篇内容发布 |
| **Growth (3-6月)** | 月纯利润 5000元 | 稳定产出，粉丝增长 |
| **Vision (6-12月)** | 月纯利润 3万元 | 多平台矩阵，爆款频出 |

**变现渠道：**
- 平台分成（今日头条、番茄小说等）
- 广告收入（公众号流量主等）

### Technical Success

| 指标 | MVP 目标 |
|------|---------|
| **内容生成** | 能生成可发布的校园/爽剧内容 |
| **发布成功率** | > 99% |
| **全流程时间** | < 5 分钟（创意到发布） |
| **AI 生成速度** | < 30 秒/篇 |

### Measurable Outcomes

| 指标 | 3个月 | 6个月 | 12个月 |
|------|-------|-------|--------|
| 累计发布内容 | 90篇 | 270篇 | 700篇+ |
| 粉丝总量 | 1万+ | 5万+ | 20万+ |
| 月收入 | 覆盖成本 | 5000元 | 3万元 |

## Product Scope

### MVP - Minimum Viable Product

> **目标**：验证 AI 生成 + 多平台发布的核心价值

| 功能 | 范围 |
|------|------|
| AI 内容生成 | 校园/爽剧类型小说、文案 |
| 多平台发布 | 微信公众号 + 今日头条 |
| 用户端 | 基础创作工作台 |
| 管理端 | 极简配置 |

### Growth Features (Post-MVP)

> **目标**：扩展平台覆盖，提升内容质量

| 功能 | 范围 |
|------|------|
| 新增平台 | 小红书 + 番茄小说 |
| AI 增强 | 风格学习、爆款分析 |
| 数据分析 | 内容表现追踪 |
| 用户系统 | 开放给其他创作者 |

### Vision (Future)

> **目标**：成为校园爽剧 AI 内容工厂

| 功能 | 范围 |
|------|------|
| 视频平台 | 抖音 + YouTube |
| AI 视频 | 文案转视频自动化 |
| 平台化 | SaaS 订阅模式 |
| 社区 | 创作者社区 + IP 交易 |

## User Journeys

### Journey 1: 首次使用（Onboarding）

**角色：大人（新用户）**

**场景**：第一次打开 Cosmix

**旅程**：
1. 注册/登录
2. 引导配置 AI 偏好（内容类型：校园/爽剧）
3. 授权发布平台（微信公众号、今日头条）
4. 配置通知方式（钉钉）
5. 进入创作工作台，看到欢迎引导

**成功标志**：完成配置，准备好创作第一篇内容

---

### Journey 2: 日常内容创作（核心路径）

**角色：大人（创作者）**

**痛点**：没有好的内容灵感

**旅程**：
1. 打开 Cosmix，进入创作工作台
2. 输入模糊想法："校园霸凌 → 逆袭打脸"
3. AI 自动补全，给出 5 个选题建议
4. 选择一个选题，点击"生成内容"
5. 30 秒后，2000 字校园爽文生成完成
6. 快速预览，微调标题
7. 点击"复制内容"，手动发布到各平台（MVP）
8. 返回 Cosmix，手动录入发布链接

**成功标志**：5 分钟内完成从想法到发布

---

### Journey 3: 内容调优（迭代优化）

**角色：大人（创作者）**

**场景**：AI 生成的内容不满意

**旅程**：
1. 选中不满意的段落
2. 点击"重新生成"或输入修改指令
3. AI 给出多个版本供选择
4. 选择满意的版本，继续

**成功标志**：快速迭代，获得满意内容

---

### Journey 4: 内容审核（发布前检测）

**角色：大人（创作者）**

**场景**：发布前自动检测内容合规性

**旅程**：
1. 内容生成完成后，系统自动检测
2. 检测项：敏感词、违规内容、平台规则
3. 如有问题，高亮显示并建议修改
4. 修改后重新检测
5. 检测通过，可以发布

**成功标志**：避免内容被平台删除/限流

---

### Journey 5: 发布失败（异常处理）

**角色：大人（创作者）**

**场景**：发布或录入时遇到问题

**旅程**：
1. 系统检测到异常（如链接无效）
2. 界面显示错误提示
3. 钉钉收到通知消息
4. 点击通知，跳转到问题页面
5. 修复问题，重新操作

**成功标志**：快速发现问题，快速修复

---

### Journey 6: 数据查看（效果追踪）

**角色：大人（创作者）**

**场景**：查看内容表现

**旅程**：
1. 打开数据面板
2. 查看各平台阅读量、收藏量（手动录入）
3. 看到内容表现趋势
4. 标记表现好的内容为"爆款"

**成功标志**：了解哪些内容效果好

---

### Journey 7: 管理员配置

**角色：大人（管理员）**

**场景**：配置系统设置

**旅程**：
1. 打开管理端
2. 管理发布平台（添加/删除/授权）
3. 配置通知方式（钉钉 Webhook）
4. 设置 AI 参数（内容长度、风格等）
5. 保存配置

**成功标志**：系统按需求运行

---

### Journey Requirements Summary

| 旅程 | 核心功能需求 |
|------|-------------|
| **Journey 1** | 用户注册、平台授权、偏好配置、引导流程 |
| **Journey 2** | 灵感输入、AI 补全、内容生成、一键复制 |
| **Journey 3** | 段落重写、指令调优、版本选择 |
| **Journey 4** | 敏感词检测、违规提示、修改建议 |
| **Journey 5** | 错误提示、钉钉通知、问题定位 |
| **Journey 6** | 数据录入、阅读量展示、爆款标记 |
| **Journey 7** | 平台管理、通知配置、AI 参数设置 |

### MVP Simplifications

| 功能 | MVP 版本 | 后续版本 |
|------|---------|---------|
| **发布方式** | 生成 → 复制 → 手动发布 | 自动发布到平台 |
| **数据获取** | 手动录入阅读量 | 自动对接平台 API |
| **通知渠道** | 仅钉钉 | 钉钉 + 微信 + 邮件 |
| **AI 学习** | 固定 prompt 模板 | 学习用户偏好 |
| **选题推荐** | 无（用户自己输入） | 热门选题推荐 |

## Domain Requirements

### 内容合规

| 要求 | 说明 |
|------|------|
| **敏感词检测** | 覆盖政治、色情、暴力、违禁词等类别 |
| **平台政策** | 符合微信公众号、今日头条等平台内容政策 |
| **用户可控** | 用户可查看被标记内容并手动修改 |
| **检测时机** | 生成完成后自动检测，发布前提示 |

### 数据隐私

| 要求 | 说明 |
|------|------|
| **草稿存储** | MVP 阶段仅 localStorage，不上传服务器 |
| **AI 对话** | 不存储原始 AI 对话记录 |
| **用户数据** | 仅存储必要账户信息 |
| **日志脱敏** | 日志不记录用户生成的具体内容 |

### 版权声明

| 要求 | 说明 |
|------|------|
| **AI 生成声明** | 用户需知晓内容由 AI 辅助生成 |
| **版权归属** | 生成内容版权归用户所有 |
| **平台免责** | 用户对发布内容负责 |

## SaaS Web App Specific Requirements

### Project Architecture Overview

**仓库拆分策略：前后端分离**

| 仓库 | 内容 | 技术栈 |
|------|------|--------|
| **super-one (本仓库)** | 前端服务 | Next.js + Vue3 |
| **cosmix-api (独立仓库)** | 后端服务 | Go-Zero + PostgreSQL + Redis + MongoDB |

### Frontend Repository Structure (super-one)

```
super-one/
├── apps/
│   ├── web/                    # 现有官网 (Next.js)
│   ├── cosmix-web/             # Cosmix 用户端 (Next.js 15 + React 19)
│   └── cosmix-admin/           # Cosmix 管理端 (Vue3 + Vite)
│
├── packages/
│   ├── ui/                     # 共享 React UI
│   ├── utils/                  # 共享工具
│   ├── config/                 # 共享配置
│   ├── cosmix-types/           # API 类型定义
│   ├── cosmix-api-client/      # API 客户端封装
│   ├── cosmix-analytics/       # 数据埋点封装
│   ├── design-tokens/          # 设计变量（含品牌色）
│   └── cosmix-templates/       # 内容模板库
│
└── docs/
    └── cosmix/                 # Cosmix 文档
```

### Technical Stack (Frontend)

| 层级 | 技术选型 |
|------|---------|
| **用户端** | Next.js 15 + React 19 + shadcn/ui + Tailwind |
| **管理端** | Vue3 + Vite + Element Plus |
| **状态管理** | Zustand (用户端) + Pinia (管理端) |
| **API 调用** | Axios / Fetch + TanStack Query |
| **包管理** | bun + workspaces |
| **CI/CD** | GitHub Actions |
| **测试** | Vitest + Playwright |

### Technical Stack (Backend - 独立仓库)

| 层级 | 技术选型 |
|------|---------|
| **API 网关** | Go-Zero |
| **业务数据库** | PostgreSQL |
| **缓存 + 队列** | Redis + Redis Stream |
| **日志存储** | MongoDB |
| **部署** | Docker Compose（本地自托管） |

### AI & Platform Integrations

| 集成类型 | 服务 | 优先级 |
|---------|------|--------|
| **AI/LLM** | OpenAI / Claude / 国产大模型 | P0 |
| **内容平台** | 微信公众号 / 今日头条 API | P0 |
| **通知** | 钉钉 Webhook | P0 |

### MVP Simplifications (Architecture)

| 功能 | MVP 实现 | 后续扩展 |
|------|---------|---------|
| **多租户** | 单租户 + tenant_id 预留 | 平台化时启用 |
| **权限模型** | admin / user 两角色 | 逐步扩展 RBAC |
| **订阅系统** | 不实现 | 平台化时加入 |
| **消息队列** | Redis Stream | 流量上来换 Kafka |
| **文件存储** | 本地磁盘 | 迁移 MinIO/OSS |

### Feature Specifications

#### Core Features (MVP)

| 功能 | 描述 |
|------|------|
| **创作工作台** | 沉浸式写作界面 |
| **AI 流式生成** | 打字机动画，逐字显示 |
| **内容编辑** | 富文本编辑，段落重写 |
| **暗黑模式** | 明/暗主题切换 |
| **快捷键** | 高效操作 |
| **基础模板库** | 校园爽文、甜宠文模板 |
| **微交互** | 音效反馈、完成动画 |
| **数据埋点** | 用户行为追踪 |

#### Growth Features

| 功能 | 描述 |
|------|------|
| **今日灵感** | 每日推荐热门话题 |
| **故事骰子** | 随机组合创作元素 |
| **金句开头** | 爆款开头模板 |
| **创作连击** | 连续创作天数 🔥 |
| **成就徽章** | 里程碑成就系统 |
| **平台预览** | 预览不同平台效果 |

### Visual Design Specifications

| 维度 | 规范 |
|------|------|
| **品牌主色** | `#8B5CF6` 紫色（AI/创意） |
| **辅助色** | `#06B6D4` 青色（科技感） |
| **强调色** | `#F59E0B` 橙色（活力/热门） |
| **亮色模式** | 纯白背景 + 淡紫强调 |
| **暗色模式** | 深灰背景 + 霓虹渐变 |
| **编辑区** | 大面积留白，沉浸式 |
| **工具栏** | 极简浮动设计 |

### Keyboard Shortcuts

| 快捷键 | 功能 |
|--------|------|
| `Cmd/Ctrl + G` | 生成内容 |
| `Cmd/Ctrl + C` | 复制内容 |
| `Cmd/Ctrl + S` | 保存草稿 |
| `Cmd/Ctrl + Enter` | 提交/确认 |
| `Cmd/Ctrl + Z` | 撤销 |
| `Cmd/Ctrl + D` | 切换暗黑模式 |

### Micro-interactions

| 场景 | 交互效果 |
|------|---------|
| **AI 生成中** | 打字机动画 + 光标闪烁 |
| **生成完成** | 轻微震动 + 完成音效 |
| **复制成功** | 绿色闪烁 + Toast 提示 |
| **连续创作** | 🔥 火焰图标 + 天数显示 |
| **成就解锁** | 徽章弹出 + 庆祝动画 |

### Analytics Events

| 事件 | 描述 |
|------|------|
| `page_view` | 页面访问 |
| `content_generate_start` | 开始生成 |
| `content_generate_success` | 生成成功 |
| `content_generate_fail` | 生成失败 |
| `content_copy` | 复制内容 |
| `content_edit` | 编辑内容 |
| `content_regenerate` | 重新生成 |
| `theme_switch` | 主题切换 |

### Content Template Library

```
模板分类：
├── 校园爽文
│   ├── 逆袭打脸
│   ├── 校花倒追
│   └── 学霸养成
├── 甜宠文
│   ├── 青梅竹马
│   ├── 先婚后爱
│   └── 霸总追妻
└── 悬疑文
    ├── 密室逃脱
    └── 身份反转
```

### Implementation Considerations

| 考虑点 | 建议 |
|--------|------|
| **AI 调用成本** | 实现 token 计量 + 配额限制 |
| **平台 API 限流** | 队列控制发布频率 |
| **内容安全** | 敏感词检测 + 内容审核 |
| **前端性能** | 流式渲染 + 骨架屏 |
| **SEO** | 用户端 SSR（如需公开页面） |

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-Solving MVP
- 核心验证：AI 生成效率 5x 提升假设
- 最小用户：创始人自用
- 最短路径：5 周核心开发 + 1 周 Buffer

**Resource Requirements:**
- 开发：1 人全栈（Vibe Coding 辅助）
- 设计：AI 生成 + shadcn/ui
- 运维：Docker Compose 自托管

### MVP Development Milestones

| Week | 里程碑 | Definition of Done |
|------|--------|-------------------|
| **W1** | 基础设施就绪 | API Spec 输出 + AI 调用返回 200 |
| **W2** | 核心骨架搭建 | 流式文字可在页面渲染 |
| **W3-W4** | 端到端跑通 | 生成 → 编辑 → 复制完整流程可用 |
| **W5** | 体验完善 | 暗黑/快捷键/模板全部可用 |
| **W6** | Buffer + 测试 | E2E 测试通过 + 首篇内容发布 |

### MVP Feature Priority Matrix

#### P0 - 核心必须（Week 1-4）

| 功能 | 实现方式 | 工期 |
|------|---------|------|
| AI 流式生成 | SSE + 逐字渲染 | 1.5 周 |
| 富文本编辑 | Tiptap | 1 周 |
| 一键复制 | 富文本 + 纯文本双模式 | 0.5 天 |
| **草稿自动保存** | localStorage + 上限 10 篇 | 1 天 |

#### P1 - 体验必须（Week 5）

| 功能 | 实现方式 | 工期 |
|------|---------|------|
| 暗黑模式 | next-themes | 0.5 天 |
| 快捷键 | Cmd/Ctrl + G/C/S/Z/D | 0.5 天 |
| 生成完成动效 | 轻微震动 + 音效 | 0.5 天 |
| 模板库 | 2 个模板（逆袭打脸 + 校花倒追）| 2 天 |

#### P2 - 可选（Week 6 或后续）

| 功能 | 说明 |
|------|------|
| 钉钉通知 | Webhook，时间允许则加入 |
| 段落重写 | MVP 可用整篇重写替代 |

### Architecture Decision Records

| ADR | 决策 | 理由 |
|-----|------|------|
| ADR-001 | 编辑器用 Tiptap | Vue/React 通用、文档完善、扩展性强 |
| ADR-002 | 多模型 Fallback | OpenAI → Claude → 国产，保障可用性 |
| ADR-003 | 状态管理用 Zustand | 轻量、简单、TS 友好 |
| ADR-004 | 流式用 SSE | 单向推送足够，实现简单 |

### Risk Prevention Strategy

#### Top 3 Critical Risks

| # | 风险 | 缓解措施 |
|---|------|---------|
| 1 | AI 生成质量差 | 多模型备选 + prompt 可编辑入口 |
| 2 | 内容无人问津 | Day 1 埋点 + 数据驱动快速调整 |
| 3 | 工期延误 | 极简 4 周 MVP 兜底方案 |

#### Security Hardening

| 措施 | 优先级 |
|------|--------|
| 草稿存储上限 10 篇 | P1 |
| 复制内容消毒（sanitize HTML）| P1 |
| 按钮防抖 + loading 状态 | P0 |
| API Rate limit 前端提示 | P2 |

#### Resilience Improvements

| 场景 | 加固措施 | 优先级 |
|------|---------|--------|
| AI API 宕机 | 多模型自动切换 | P0 |
| 网络断开 | 已生成内容本地缓存 | P1 |
| Token 耗尽 | 余额检测 + 提前预警 | P1 |
| 并发点击 | 按钮防抖 + loading 状态 | P0 |
| 请求超时 | 30s 超时 + 重试机制 | P1 |

### Contingency Plan

#### 极简 MVP（4 周兜底）

如工期不足，可裁剪至最小可用版本：

| 保留 | 裁剪 |
|------|------|
| AI 生成 | 钉钉通知 |
| 富文本编辑 | 模板库 |
| 一键复制 | 段落重写 |
| 暗黑模式 | 快捷键 |
| 草稿自动保存 | 微交互动效 |

#### API 成本控制

| 限制 | 值 |
|------|-----|
| 每日生成上限 | 10 篇 |
| 单篇字数上限 | 2000 字 |

### Hidden Assumptions（需验证）

| 假设 | 风险 | 验证时机 |
|------|------|---------|
| 用户不中断生成 | 低 | MVP |
| 状态复杂度可控 | 低 | Phase 2 |
| 单设备使用 | 中 | Phase 2 加云同步 |
| 2000 字够用 | 中 | 用户反馈 |
| 2 个模板够用 | 中 | 埋点分析 |

### MVP Data Tracking Events

| 事件 | 用途 |
|------|------|
| `template_select` | 模板偏好分析 |
| `generate_duration` | 生成耗时监控 |
| `edit_duration` | 编辑时长分析 |
| `copy_success` | 发布转化追踪 |

### Lessons Applied

1. **AI 不是魔法** → 用户会失望，必须提供编辑能力
2. **创作是习惯** → 降低启动摩擦，快捷键 + 默认模板
3. **数据是指南针** → Day 1 就埋点，不知道什么火就没法调整
4. **MVP 是实验** → 验证假设优先，快速迭代机制

### UI Terminology Simplification

| 原术语 | 简化为 |
|--------|--------|
| Prompt 模板 | 故事类型 |
| AI 生成 | 开始创作 |
| Token 限制 | 字数上限 |
| 流式输出 | （不展示，只体验）|

### SCAMPER Optimizations

1. **Combine**: 首页 = 模板选择 + 一键生成（减少步骤）
2. **Adapt**: 参考 Notion AI 的 "/" 命令交互
3. **Eliminate**: 去掉设置页，用智能默认值
4. **Modify**: 放大生成完成的庆祝动效

### Critical Path

```
AI 流式生成 → 内容质量 → 编辑体验 → 发布效率
     ↓
任何环节卡住都会阻塞后续，需优先保障
```

### Early Validation Checkpoints

| Week | 必须验证 |
|------|---------|
| W1 | AI API 响应速度 < 30s |
| W2 | 流式渲染无卡顿 |
| W4 | 生成内容达到可发布质量 |

## Functional Requirements

### 内容创作（Content Creation）

- FR1: 创作者可以输入创作想法或关键词
- FR2: 创作者可以选择内容模板（故事类型）
- FR3: 创作者可以触发 AI 内容生成
- FR4: 创作者可以实时查看 AI 生成的内容（流式显示）
- FR5: 创作者可以在生成过程中看到进度反馈
- FR6: 创作者可以在生成完成后收到视觉/音效反馈
- FR38: 创作者可以查看内容的字数统计
- FR39: 创作者可以调整编辑区的字体大小
- FR51: 创作者可以随机获取创作灵感提示
- FR52: 创作者可以设置本次生成的目标字数

### 内容编辑（Content Editing）

- FR7: 创作者可以编辑 AI 生成的内容
- FR8: 创作者可以对整篇内容重新生成
- FR9: 创作者可以撤销编辑操作
- FR10: 创作者可以保存内容为草稿
- FR11: 系统可以自动保存创作中的内容
- FR12: 创作者可以查看和恢复历史草稿

### 内容发布（Content Publishing）

- FR13: 创作者可以复制生成的内容（富文本格式）
- FR14: 创作者可以复制生成的内容（纯文本格式）
- FR15: 创作者可以收到复制成功的反馈
- FR16: 创作者可以手动录入已发布内容的链接

### 用户体验（User Experience）

- FR17: 创作者可以切换明/暗主题模式
- FR18: 创作者可以使用键盘快捷键执行常用操作
- FR19: 创作者可以在沉浸式界面中进行创作
- FR20: 新用户可以通过引导流程了解产品使用方式

### 模板管理（Template Management）

- FR21: 创作者可以浏览可用的内容模板
- FR22: 创作者可以查看模板的描述和示例
- FR23: 系统提供预设的内容模板（校园爽文类型）

### 通知与反馈（Notifications）

- FR24: 系统可以在发生异常时发送钉钉通知
- FR25: 创作者可以在界面中查看错误提示
- FR26: 创作者可以从错误提示中了解如何修复问题

### 数据追踪（Analytics）

- FR27: 系统可以记录用户的关键操作行为
- FR28: 系统可以记录内容生成的耗时数据
- FR29: 系统可以记录模板使用偏好数据

### 管理配置（Admin Configuration）

- FR30: 管理员可以配置 AI 生成参数（内容长度等）
- FR31: 管理员可以管理内容模板
- FR32: 管理员可以配置钉钉通知 Webhook
- FR33: 管理员可以查看系统运行状态

### 用户账户（User Account）

- FR34: 用户可以注册新账户
- FR35: 用户可以登录已有账户
- FR36: 用户可以退出登录
- FR37: 系统可以记住用户的登录状态

### 系统韧性（System Resilience）

- FR40: 系统可以在 AI 生成失败时自动重试
- FR41: 系统可以限制同时进行的生成请求数量
- FR43: 系统可以在网络恢复后同步本地编辑内容

### 内容安全（Content Safety）

- FR44: 系统可以检测内容中的敏感词并提示
- FR45: 创作者可以查看敏感词检测结果

### 配额管理（Quota Management）

- FR46: 系统可以限制用户每日生成次数
- FR47: 创作者可以查看剩余生成次数

### 内容管理（Content Management）

- FR42: 创作者可以标记内容为"爆款"以供分析
- FR48: 创作者可以收藏/取消收藏已生成的内容
- FR49: 创作者可以筛选查看已收藏的内容
- FR50: 创作者可以查看历史生成内容列表

### 效率优化（Efficiency）

- FR53: 创作者可以复用上次的生成设置
- FR54: 创作者可以批量复制多篇内容
- FR55: 系统可以记住用户的常用模板偏好

## Non-Functional Requirements

### Performance（性能）

| NFR# | 需求 | 目标值 |
|------|------|--------|
| NFR1 | AI 内容生成首字节响应时间 | < 3 秒 |
| NFR2 | AI 完整内容生成时间（2000 字）| < 30 秒 |
| NFR3 | 页面首次加载时间（LCP）| < 2.5 秒 |
| NFR4 | 用户交互响应时间（点击/输入）| < 100ms |
| NFR5 | 流式渲染帧率 | > 30 FPS，无卡顿 |
| NFR6 | 草稿自动保存延迟 | < 1 秒 |

### Security（安全）

| NFR# | 需求 | 说明 |
|------|------|------|
| NFR7 | 用户密码加密存储 | bcrypt/argon2 |
| NFR8 | API 通信加密 | HTTPS/TLS 1.2+ |
| NFR9 | AI API 密钥不暴露给前端 | 后端代理调用 |
| NFR10 | 用户会话安全 | HttpOnly Cookie + CSRF 防护 |
| NFR11 | 敏感操作日志记录 | 登录、配置变更等 |
| NFR12 | 内容输出消毒 | 防止 XSS 注入 |

### Reliability（可靠性）

| NFR# | 需求 | 目标值 |
|------|------|--------|
| NFR13 | 服务可用性 | > 99%（MVP 阶段）|
| NFR14 | 草稿数据不丢失 | 本地缓存 + 定期同步 |
| NFR15 | AI 服务故障自动切换 | < 5 秒切换备用模型 |
| NFR16 | 错误恢复能力 | 生成中断后可恢复 |

### Integration（集成）

| NFR# | 需求 | 说明 |
|------|------|------|
| NFR17 | AI API 多模型支持 | OpenAI / Claude / 国产 |
| NFR18 | 钉钉 Webhook 可配置 | 管理端配置，无需重启 |
| NFR19 | API 超时处理 | 30 秒超时 + 重试机制 |
| NFR20 | API 限流处理 | 前端友好提示 |

### Usability（可用性）

| NFR# | 需求 | 说明 |
|------|------|------|
| NFR21 | 暗黑模式支持 | 跟随系统 + 手动切换 |
| NFR22 | 键盘快捷键 | 核心操作可用快捷键 |
| NFR23 | 移动端基础适配 | 响应式布局（MVP 桌面优先）|
| NFR24 | 错误提示友好 | 用户可理解的错误信息 |

### Maintainability（可维护性）

| NFR# | 需求 | 说明 |
|------|------|------|
| NFR25 | 代码类型安全 | TypeScript 严格模式 |
| NFR26 | 组件化架构 | 可复用 UI 组件 |
| NFR27 | 日志记录 | 关键操作可追踪 |
| NFR28 | 配置外部化 | 环境变量管理 |
