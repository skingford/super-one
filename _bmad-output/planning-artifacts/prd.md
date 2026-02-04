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
