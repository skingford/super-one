# Everything Claude Code 完整配置指南

> 生产级 Claude Code 配置生态系统，包含专用 Agents、Skills、Hooks、Commands 和 Rules。
> 来源: [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)

---

## 目录

1. [概述](#1-概述)
2. [快速安装](#2-快速安装)
3. [专用 Agents](#3-专用-agents)
   - [3.1 planner - 功能规划专家](#31-planner---功能规划专家)
   - [3.2 architect - 软件架构师](#32-architect---软件架构师)
   - [3.3 tdd-guide - TDD 开发引导](#33-tdd-guide---tdd-开发引导)
   - [3.4 code-reviewer - 代码审查员](#34-code-reviewer---代码审查员)
   - [3.5 security-reviewer - 安全审查专家](#35-security-reviewer---安全审查专家)
   - [3.6 build-error-resolver - 构建错误修复](#36-build-error-resolver---构建错误修复)
   - [3.7 e2e-runner - E2E 测试专家](#37-e2e-runner---e2e-测试专家)
   - [3.8 refactor-cleaner - 代码清理专家](#38-refactor-cleaner---代码清理专家)
   - [3.9 doc-updater - 文档更新专家](#39-doc-updater---文档更新专家)
4. [斜杠命令](#4-斜杠命令)
5. [技能 (Skills)](#5-技能-skills)
6. [MCP 服务器配置](#6-mcp-服务器配置)
7. [推荐工作流](#7-推荐工作流)
8. [Hooks 配置](#8-hooks-配置)
9. [CLAUDE.md 模板](#9-claudemd-模板)
10. [安全模式](#10-安全模式)
11. [核心原则](#11-核心原则)

---

## 1. 概述

Everything Claude Code 是一个经过 10+ 个月密集使用、在真实产品中不断演进的完整配置系统。

### 核心特性

| 特性 | 描述 |
|------|------|
| **安全优先** | OWASP Top 10 检测，安全审查集成 |
| **TDD 驱动** | 测试驱动开发，80%+ 覆盖率要求 |
| **模块化设计** | 按需选择配置，灵活组合 |

### 文件结构

```
~/.claude/
├── agents/          # 专用子代理配置
├── commands/        # 斜杠命令定义
├── skills/          # 技能和工作流
└── rules/           # 项目规则
```

---

## 2. 快速安装

```bash
# 克隆仓库
git clone https://github.com/affaan-m/everything-claude-code.git

# 复制配置文件
cp everything-claude-code/agents/*.md ~/.claude/agents/
cp everything-claude-code/rules/*.md ~/.claude/rules/
cp everything-claude-code/commands/*.md ~/.claude/commands/
cp -r everything-claude-code/skills/* ~/.claude/skills/
```

---

## 3. 专用 Agents

专用子代理，处理特定领域任务。存放于 `~/.claude/agents/`。

### 3.1 planner - 功能规划专家

| 属性 | 值 |
|------|------|
| **命令** | `/plan` |
| **模型** | opus |
| **工具** | Read, Grep, Glob |

**核心功能:**
- 需求分析与重述
- 风险识别与评估
- 分阶段实施计划
- 复杂度估算
- 等待用户确认后执行

**示例用法:**
```
/plan 我需要添加实时通知功能

Agent 返回:
# 实施计划: 实时通知系统
## 阶段 1: 数据库设计
## 阶段 2: 通知服务
## 阶段 3: 集成点
## 风险评估
## 预估复杂度: 中等

**等待确认**: 是否执行此计划?
```

**Agent 定义格式:**
```yaml
---
name: planner
description: 功能实现规划专家，制定详细实施步骤
tools: Read, Grep, Glob
model: opus
---

You are a planner specialist...
```

---

### 3.2 architect - 软件架构师

| 属性 | 值 |
|------|------|
| **命令** | Task agent |
| **模型** | opus |
| **工具** | Read, Grep, Glob |

**核心功能:**
- 系统架构设计
- 技术选型权衡
- 设计模式推荐
- 可扩展性分析
- 确保代码库一致性

**常见模式:**
```
Frontend: 组件组合、Container/Presenter、自定义 Hooks
Backend: Repository 模式、Service 层、中间件模式
Data: 数据库规范化、缓存层、最终一致性
```

---

### 3.3 tdd-guide - TDD 开发引导

| 属性 | 值 |
|------|------|
| **命令** | `/tdd` |
| **模型** | opus |
| **工具** | Read, Write, Edit, Bash, Grep |

**核心功能:**
- Red-Green-Refactor 循环
- 先写测试再写代码
- 单元 + 集成 + E2E 测试
- 边界情况覆盖
- 持续测试 (Watch Mode)

**示例用法:**
```javascript
// 1. RED: 先写失败的测试
describe('calculateScore', () => {
  it('should return high score for valid input', () => {
    expect(calculateScore(data)).toBeGreaterThan(80)
  })
})

// 2. GREEN: 写最小代码通过测试
// 3. REFACTOR: 优化代码
```

---

### 3.4 code-reviewer - 代码审查员

| 属性 | 值 |
|------|------|
| **命令** | `/code-review` |
| **模型** | opus |
| **工具** | Read, Grep, Glob, Bash |

**核心功能:**
- 代码质量检查
- 安全漏洞扫描
- 性能问题识别
- 最佳实践建议
- 可维护性评估

**审查流程:**
```bash
# 1. git diff --name-only HEAD
# 2. 检查每个文件:
#    - 安全问题 (硬编码密钥、SQL注入、XSS)
#    - 代码质量 (复杂度、重复代码)
#    - 性能问题 (N+1 查询、内存泄漏)
```

---

### 3.5 security-reviewer - 安全审查专家

| 属性 | 值 |
|------|------|
| **命令** | `/security-review` |
| **模型** | opus |
| **工具** | Read, Grep, Glob, Bash |

**核心功能:**
- OWASP Top 10 检测
- 密钥泄露扫描
- 输入验证检查
- 认证授权审计
- 漏洞 PoC 和修复代码

**检测项目:**
- SQL 注入
- XSS 跨站脚本
- SSRF 服务端请求伪造
- 硬编码凭据
- 不安全的加密
- 缺失的输入验证

---

### 3.6 build-error-resolver - 构建错误修复

| 属性 | 值 |
|------|------|
| **命令** | `/build-fix` |
| **模型** | sonnet |
| **工具** | Read, Write, Edit, Bash, Grep, Glob |

**核心功能:**
- TypeScript 类型错误
- 构建配置问题
- 依赖冲突解决
- 最小化改动修复
- 快速让构建变绿

**修复流程:**
```bash
# 1. npm run build 2>&1 | head -100
# 2. 分析错误信息
# 3. 定位问题文件
# 4. 最小改动修复
# 5. 验证构建通过
```

---

### 3.7 e2e-runner - E2E 测试专家

| 属性 | 值 |
|------|------|
| **命令** | `/e2e` |
| **模型** | sonnet |
| **工具** | Read, Write, Edit, Bash, Grep, Glob |

**核心功能:**
- 用户旅程测试
- Page Object 模式
- 截图和视频录制
- Trace 上传
- Flaky 测试隔离

**示例用法:**
```javascript
test('用户可以搜索并查看详情', async ({ page }) => {
  await page.goto('/')
  await page.fill('input[placeholder="Search"]', 'query')
  await page.waitForResponse(resp =>
    resp.url().includes('/api/search'))
  await expect(page.locator('.result')).toBeVisible()
})
```

---

### 3.8 refactor-cleaner - 代码清理专家

| 属性 | 值 |
|------|------|
| **命令** | `/refactor-clean` |
| **模型** | sonnet |
| **工具** | Read, Write, Edit, Bash, Grep, Glob |

**核心功能:**
- 死代码检测 (knip, depcheck)
- 未使用导出移除
- 重复代码合并
- 安全重构验证
- 依赖清理

**分析工具:**
```bash
npx knip          # 检测未使用的导出
npx depcheck      # 检测未使用的依赖
npx ts-prune      # 检测未使用的 TS 导出
```

---

### 3.9 doc-updater - 文档更新专家

| 属性 | 值 |
|------|------|
| **命令** | `/update-docs` |
| **模型** | sonnet |
| **工具** | Read, Write, Edit, Bash, Grep, Glob |

**核心功能:**
- Codemap 生成与更新
- README 同步
- API 文档更新
- 变更日志维护
- 架构图生成

**更新流程:**
```bash
/update-codemaps  # 更新代码地图
/update-docs      # 同步所有文档

# 生成: docs/CODEMAPS/*.md
```

---

## 4. 斜杠命令

快速执行的命令。存放于 `~/.claude/commands/`

| 命令 | 描述 | 分类 |
|------|------|------|
| `/tdd` | 测试驱动开发流程 | 开发 |
| `/plan` | 功能实现规划 | 规划 |
| `/e2e` | 生成 E2E 测试 | 测试 |
| `/code-review` | 代码质量审查 | 审查 |
| `/build-fix` | 修复构建错误 | 修复 |
| `/refactor-clean` | 清理死代码 | 重构 |
| `/test-coverage` | 测试覆盖率分析 | 测试 |
| `/update-codemaps` | 更新代码地图 | 文档 |
| `/update-docs` | 同步文档 | 文档 |
| `/security-review` | 安全审查 | 安全 |

---

## 5. 技能 (Skills)

工作流定义和领域知识。存放于 `~/.claude/skills/`

| 技能名称 | 描述 | 路径 |
|----------|------|------|
| `tdd-workflow` | TDD 工作流，80%+ 覆盖率要求 | `~/.claude/skills/tdd-workflow/` |
| `security-review` | 安全审查，OWASP Top 10 检测 | `~/.claude/skills/security-review/` |
| `coding-standards` | 编码标准，最佳实践 | `~/.claude/skills/coding-standards.md` |
| `backend-patterns` | 后端模式：API、数据库、缓存 | `~/.claude/skills/backend-patterns.md` |
| `frontend-patterns` | 前端模式：React、Next.js | `~/.claude/skills/frontend-patterns.md` |
| `postgres-patterns` | PostgreSQL 优化，Supabase 最佳实践 | `~/.claude/skills/postgres-patterns.md` |
| `golang-patterns` | Go 语言惯用模式 | `~/.claude/skills/golang-patterns.md` |
| `springboot-patterns` | Spring Boot 架构模式 | `~/.claude/skills/springboot-patterns.md` |
| `clickhouse-io` | ClickHouse 分析查询 | `~/.claude/skills/clickhouse-io.md` |
| `continuous-learning` | 会话模式提取，自动学习 | `~/.claude/skills/continuous-learning/` |

---

## 6. MCP 服务器配置

外部服务集成。配置于 `~/.claude.json`。建议每个项目不超过 10 个。

| 服务器 | 描述 |
|--------|------|
| `github` | GitHub 操作 - PR、Issues、Repos |
| `supabase` | Supabase 数据库操作 |
| `vercel` | Vercel 部署和项目管理 |
| `railway` | Railway 部署 |
| `memory` | 跨会话持久化记忆 |
| `context7` | 实时文档查询 |
| `clickhouse` | ClickHouse 分析查询 |
| `cloudflare-docs` | Cloudflare 文档搜索 |
| `firecrawl` | 网页抓取和爬虫 |

---

## 7. 推荐工作流

### 开发流程

```bash
# 推荐工作流

1. /plan          # 规划功能实现
2. /tdd           # TDD 开发
3. /build-fix     # 修复构建错误
4. /code-review   # 代码审查
5. /e2e           # E2E 测试
6. /security-review # 安全审查
```

---

## 8. Hooks 配置

配置文件位置: `~/.claude/settings.json`

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "tool == \"Edit\" && tool_input.file_path matches \"\\\\.(ts|tsx|js|jsx)$\"",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write \"$file_path\""
          }
        ],
        "description": "Auto-format JS/TS files after edits"
      }
    ]
  }
}
```

---

## 9. CLAUDE.md 模板

项目根目录的 `CLAUDE.md` 文件模板:

```markdown
# Project CLAUDE.md

## 项目概述
[简要描述 - 功能、技术栈]

## 关键规则

### 代码组织
- 多个小文件优于少数大文件
- 200-400 行常规，800 行上限
- 按功能/领域组织，而非类型

### 代码风格
- 不可变性优先 - 永不修改对象
- 生产代码禁用 console.log
- 使用 Zod 进行输入验证

### 测试
- TDD: 先写测试
- 80% 最低覆盖率
- 单元 + 集成 + E2E 测试

## 可用命令
- `/tdd` - 测试驱动开发
- `/plan` - 创建实施计划
- `/code-review` - 代码质量审查
```

---

## 10. 安全模式

### 错误示例

```javascript
// SQL 注入漏洞
const query = `SELECT * FROM users
  WHERE id = ${userId}`

// XSS 漏洞 (直接设置 HTML 内容)
element.innerHTML = userInput

// 硬编码密钥
const apiKey = "sk-xxx"
```

### 正确示例

```javascript
// 参数化查询
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)

// 使用 textContent 或转义
element.textContent = userInput

// 使用环境变量
const apiKey = process.env.API_KEY
```

---

## 11. 核心原则

| 原则 | 描述 |
|------|------|
| **Agent 优先** | 专用子代理处理委托任务 |
| **TDD 工作流** | 先写测试，80%+ 覆盖率 |
| **安全优先** | OWASP Top 10 检测 |
| **模块化设计** | 按需选择配置 |
| **Hooks 自动化** | 格式化、Lint、安全检查 |

---

## 参考资料

- [GitHub 仓库](https://github.com/affaan-m/everything-claude-code)
- [Context7 文档](https://context7.com)

---

*最后更新: 2026-02-01*
