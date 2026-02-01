# Claude Code 完整知识手册

> 基于 Claude Code 官方文档整理，涵盖命令、插件、代理、技能、钩子、权限等核心功能。

---

## 目录

1. [内置斜杠命令](#1-内置斜杠命令)
2. [自定义斜杠命令](#2-自定义斜杠命令)
3. [插件命令详解](#3-插件命令详解)
4. [插件系统 (Plugins)](#4-插件系统-plugins)
5. [代理系统 (Agents/Subagents)](#5-代理系统-agentssubagents)
6. [技能系统 (Skills)](#6-技能系统-skills)
7. [钩子系统 (Hooks)](#7-钩子系统-hooks)
8. [权限管理 (Permissions)](#8-权限管理-permissions)
9. [MCP 服务器集成](#9-mcp-服务器集成)
10. [环境变量](#10-环境变量)
11. [模型选择](#11-模型选择)
12. [高级用法](#12-高级用法)

---

## 1. 内置斜杠命令

Claude Code 提供以下内置命令：

### 1.1 会话与上下文管理

| 命令 | 描述 |
|------|------|
| `/help` | 显示所有可用命令，包括自定义命令和 MCP 服务器命令 |
| `/clear` | 清除当前对话历史 |
| `/compact [instructions]` | 压缩对话历史以节省 token，可选指定保留重点 |
| `/context` | 可视化当前上下文使用情况（彩色网格显示） |
| `/rewind` | 打开回退菜单，撤销最近的操作（也可用 Esc+Esc） |
| `/resume` | 显示所有历史会话，选择恢复 |
| `/export <file>` | 导出对话内容到文件 |

### 1.2 配置与设置

| 命令 | 描述 |
|------|------|
| `/config` | 打开交互式配置界面 |
| `/model` | 选择或切换 AI 模型 |
| `/permissions` | 查看或更新工具权限 |
| `/allowed-tools` | 交互式配置工具权限 |
| `/vim` | 启用 Vim 风格编辑模式 |
| `/terminal-setup` | 安装终端快捷键（Shift+Enter），仅在需要手动配置的终端中显示 |
| `/theme` | 主题选择器（Ctrl+T 切换语法高亮） |
| `/output-style` | 设置输出风格 |
| `/statusline` | 配置状态栏显示 |
| `/privacy-settings` | 查看和更新隐私设置 |

### 1.3 项目与工作区

| 命令 | 描述 |
|------|------|
| `/init` | 初始化新项目，生成 CLAUDE.md 指南 |
| `/memory` | 打开 CLAUDE.md 记忆文件进行编辑 |
| `/add-dir` | 添加额外的工作目录到项目范围（适用于 monorepo） |
| `/sandbox` | 启用沙箱化 Bash，隔离文件系统和网络 |

### 1.4 IDE 集成

| 命令 | 描述 |
|------|------|
| `/ide` | 连接到当前 IDE（从外部终端启动时使用） |
| `/ide vscode` | 配置 VS Code 集成 |
| `/ide cursor` | 配置 Cursor 集成 |
| `/ide configure` | 打开 IDE 配置设置 |

### 1.5 账户与认证

| 命令 | 描述 |
|------|------|
| `/login` | 切换 Anthropic 账户 |
| `/logout` | 登出当前账户 |

### 1.6 诊断与状态

| 命令 | 描述 |
|------|------|
| `/bug` | 报告 Bug（发送对话到 Anthropic） |
| `/doctor` | 运行安装诊断，检测问题 |
| `/cost` | 显示 token 使用统计和费用 |
| `/status` | 显示账户和系统信息 |
| `/usage` | 显示计划使用限制 |

### 1.7 功能与代理管理

| 命令 | 描述 |
|------|------|
| `/mcp` | 管理 MCP 服务器连接和 OAuth 认证 |
| `/agents` | 管理子代理（创建、编辑、列表） |
| `/hooks` | 显示已配置的钩子 |
| `/skills` | 列出可用的技能 |
| `/plugin` | 插件管理界面（安装、启用、禁用） |
| `/install-github-app` | 设置 GitHub Actions 集成 |
| `/review` | 代码审查 |
| `/pr_comments` | 查看 PR 评论 |
| `/kill <id>` | 停止后台进程 |
| `/listen` | 监听模式 |

### 1.8 CLI 启动参数

#### 基础参数

| 参数 | 描述 |
|------|------|
| `claude` | 在当前目录启动 Claude Code |
| `claude -p "prompt"` / `--print` | 非交互式打印模式 |
| `claude -c` / `--continue` | 恢复上次会话 |
| `claude -r <id>` / `--resume <id>` | 恢复指定会话 |
| `claude --verbose` | 启用详细日志 |
| `claude --debug` | 启用调试日志 |
| `claude update` | 更新到最新版本 |

#### 权限与安全参数

| 参数 | 描述 |
|------|------|
| `--dangerously-skip-permissions` | 跳过所有权限检查（YOLO 模式，仅用于 Docker） |
| `--allowedTools "Tool1,Tool2"` | 指定允许的工具列表 |
| `--disallowedTools "Tool1,Tool2"` | 指定禁止的工具列表 |

#### 输出与格式参数

| 参数 | 描述 |
|------|------|
| `--output-format json` | JSON 格式输出（含元数据） |
| `--output-format stream-json` | 流式 JSON 输出 |
| `--output-format text` | 纯文本输出 |

#### 高级参数

| 参数 | 描述 |
|------|------|
| `--max-turns <n>` | 限制代理轮次数 |
| `--model <model>` | 指定模型（sonnet/opus/haiku） |
| `--append-system-prompt "text"` | 追加自定义系统提示 |
| `--plugin-dir <path>` | 指定插件目录 |
| `--ide` | 以 IDE 模式启动 |

#### 配置管理命令

| 命令 | 描述 |
|------|------|
| `claude config list` | 列出所有配置 |
| `claude config get <key>` | 获取指定配置 |
| `claude config set <key> <value>` | 设置配置值 |
| `claude config add <key> <value>` | 添加值到数组配置 |
| `claude config remove <key> <value>` | 从数组配置移除值 |

#### MCP 管理命令

| 命令 | 描述 |
|------|------|
| `claude mcp add <name> <command> [args...]` | 添加 MCP 服务器 |
| `claude mcp list` | 列出已安装的服务器 |
| `claude mcp remove <name>` | 移除 MCP 服务器 |

### 1.9 键盘快捷键

| 快捷键 | 描述 |
|--------|------|
| `Shift+Enter` | 换行（需要 `/terminal-setup` 配置） |
| `Esc` | 中断 Claude |
| `Esc+Esc` | 打开回退菜单 |
| `Ctrl+C` (x2) | 完全退出 |
| `Ctrl+R` | 显示完整输出/上下文 |
| `Ctrl+V` | 粘贴图片 |
| `Ctrl+T` | 切换语法高亮 |
| `Ctrl+B` | 后台运行 Bash 命令 |
| `Shift+Tab` | 切换自动接受模式（Auto-accept） |
| `Shift+Tab+Tab` | 切换计划模式（Plan Mode） |
| `Tab` | 切换思考模式（Thinking On/Off） |
| `Cmd+Esc` / `Ctrl+Esc` | IDE 中快速启动 |
| `Cmd+Option+K` / `Alt+Ctrl+K` | 插入文件引用 |
| `!` | Bash 模式前缀 |
| `@` | 提及文件/文件夹 |
| `\` + Enter | 换行 |

### 1.10 扩展思考模式（Extended Thinking）

Claude Code 支持通过特定关键词触发不同级别的思考预算：

| 级别 | 关键词 | Token 预算 | 适用场景 |
|------|--------|------------|----------|
| **think** | `think` | 4,000 | 标准推理，日常任务 |
| **megathink** | `think hard`, `think deeply`, `think more`, `think a lot`, `think about it` | 10,000 | 增强分析，中等复杂度 |
| **ultrathink** | `ultrathink`, `think harder`, `think intensely`, `think really hard`, `think super hard`, `think very hard` | 31,999 | 深度问题解决，复杂架构决策 |

**使用方法：**

```
# 在提示词中添加关键词
研究迁移这个遗留系统的最佳方案 ultrathink

# 或者单独使用
ultrathink 分析这个性能问题的根本原因
```

**重要说明：**
- 这些关键词**仅在 Claude Code CLI 中生效**，不适用于 claude.ai 网页版或直接 API 调用
- Claude Code V2 引入了 Tab 键切换思考模式（Thinking On/Off）
- 费用估算：think ~$0.06/任务，megathink ~$0.15/任务，ultrathink ~$0.48/任务
- 使用 `/cost` 命令监控实时费用

### 1.11 输入模式

Claude Code 有三种输入模式，使用 `Shift+Tab` 切换：

| 模式 | 快捷键 | 描述 |
|------|--------|------|
| **Edit Mode** | 默认 | 修改文件前需要确认 |
| **Auto-accept Mode** | 1x Shift+Tab | 自动接受文件修改（YOLO 模式） |
| **Plan Mode** | 2x Shift+Tab | 创建行动计划，不修改代码 |

### 1.12 IDE 集成

#### VS Code
```bash
# 在 VS Code 终端中启动
claude

# 从外部终端连接
claude
/ide vscode
```

#### Cursor
```bash
# 安装 shell 命令
# Command Palette → "Install 'cursor' to shell"
claude
/ide cursor
```

#### JetBrains (IntelliJ, PyCharm, WebStorm, GoLand)
1. 安装 Claude Code [Beta] 插件
2. Settings → Tools → Claude Code [Beta] 配置
3. 在内置终端运行 `claude`

#### Neovim
使用 `claudecode.nvim` 插件：
```bash
claude --ide
# 或
claude
/ide
```

---

## 2. 自定义斜杠命令

### 2.1 命令文件格式

斜杠命令是 Markdown 文件，包含可选的 YAML frontmatter：

```markdown
---
description: 简短描述（显示在 /help 中）
argument-hint: [arg1] [arg2]
allowed-tools: Read, Bash(git:*)
model: sonnet
---

命令提示内容，支持：
- 参数: $1, $2, 或 $ARGUMENTS
- 文件引用: @path/to/file
- Bash 执行: !`command here`
```

### 2.2 Frontmatter 字段

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `description` | String | 否 | 命令描述，显示在 `/help`，建议 ≤60 字符 |
| `argument-hint` | String | 否 | 参数提示，如 `[file] [options]` |
| `allowed-tools` | String/Array | 否 | 允许使用的工具列表 |
| `model` | String | 否 | 使用的模型: `haiku`, `sonnet`, `opus` |
| `disable-model-invocation` | Boolean | 否 | 禁止程序化调用 |

### 2.3 动态参数

```markdown
# 全部参数
$ARGUMENTS  # 捕获所有参数为单个字符串

# 位置参数
$1          # 第一个参数
$2          # 第二个参数
$3          # 第三个参数（以此类推）

# 示例
---
argument-hint: [app-name] [environment]
---
部署 $1 到 $2 环境
```

### 2.4 文件引用 (@ 语法)

```markdown
# 动态引用
分析文件 @$1

# 静态引用
检查配置 @package.json

# 多文件比较
比较 @src/old.js 和 @src/new.js
```

### 2.5 Bash 执行 (!` 语法)

```markdown
# 内联执行
当前分支: !`git branch --show-current`

# 执行插件脚本
运行: !`${CLAUDE_PLUGIN_ROOT}/bin/process.sh $1`
```

### 2.6 完整示例

```markdown
---
description: Deploy application to environment
argument-hint: [app-name] [environment] [version]
allowed-tools: Bash(kubectl:*), Bash(helm:*), Read
model: sonnet
---

Deploy $1 to $2 environment using version $3

Pre-deployment checks:
- Verify $2 configuration
- Check cluster status: !`kubectl cluster-info`
- Validate version $3 exists

Proceed with deployment following deployment runbook.
```

---

## 3. 插件命令详解

### 3.1 插件管理命令

| 命令 | 描述 |
|------|------|
| `/plugin` | 打开交互式插件管理 UI |
| `/plugin install <plugin>@<marketplace>` | 安装插件 |
| `/plugin uninstall <plugin>@<marketplace>` | 卸载插件 (别名: remove, rm) |
| `/plugin enable <plugin>@<marketplace>` | 启用已禁用的插件 |
| `/plugin disable <plugin>@<marketplace>` | 禁用插件（不卸载） |
| `/plugin update <plugin>@<marketplace>` | 更新插件到最新版本 |

### 3.2 市场管理命令

| 命令 | 描述 |
|------|------|
| `/plugin marketplace list` | 列出所有已配置的市场 |
| `/plugin marketplace add <path\|url>` | 添加本地或远程市场 |
| `/plugin marketplace update <name>` | 更新市场插件列表 |
| `/plugin marketplace remove <name>` | 移除市场（会卸载其插件） |

### 3.3 插件安装作用域 (Scopes)

使用 `--scope` 参数指定安装位置：

```bash
/plugin install formatter@my-org --scope project
```

| Scope | 配置文件 | 使用场景 |
|-------|----------|----------|
| `user` | `~/.claude/settings.json` | 个人插件，所有项目可用（默认） |
| `project` | `.claude/settings.json` | 团队插件，通过版本控制共享 |
| `local` | `.claude/settings.local.json` | 项目特定插件，gitignored |
| `managed` | `managed-settings.json` | 托管插件，只读仅可更新 |

### 3.4 使用示例

#### 添加市场并安装插件

```bash
# 添加本地市场
/plugin marketplace add ./my-marketplace

# 添加远程市场 (GitHub)
/plugin marketplace add anthropics/claude-code

# 从市场安装插件
/plugin install review-plugin@my-plugins

# 安装到项目作用域（团队共享）
/plugin install formatter@my-org --scope project
```

#### 管理已安装插件

```bash
# 列出所有市场
/plugin marketplace list

# 更新市场插件列表
/plugin marketplace update my-plugins

# 禁用插件（保留安装）
/plugin disable formatter@my-org

# 重新启用插件
/plugin enable formatter@my-org

# 更新插件到最新版
/plugin update formatter@my-org

# 完全卸载插件
/plugin uninstall formatter@my-org
```

### 3.5 CLI 与斜杠命令对照

在终端外可使用 `claude plugin` 命令管理插件：

| 斜杠命令 | CLI 等效命令 |
|----------|--------------|
| `/plugin install formatter@my-org` | `claude plugin install formatter@my-org` |
| `/plugin uninstall formatter@my-org` | `claude plugin uninstall formatter@my-org` |
| `/plugin marketplace list` | `claude plugin marketplace list` |
| `/plugin marketplace add <path>` | `claude plugin marketplace add <path>` |

---

## 4. 插件系统 (Plugins)

### 4.1 插件目录结构

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json          # 必需: 插件清单
├── commands/                 # 斜杠命令 (.md 文件)
├── agents/                   # 代理定义 (.md 文件)
├── skills/                   # 技能目录
│   └── skill-name/
│       └── SKILL.md         # 每个技能必需
├── hooks/
│   └── hooks.json           # 事件处理配置
├── .mcp.json                # MCP 服务器定义
└── scripts/                 # 辅助脚本
```

### 4.2 插件清单 (plugin.json)

**最小配置：**
```json
{
  "name": "plugin-name"
}
```

**完整配置：**
```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "插件功能简述",
  "author": {
    "name": "Author Name",
    "email": "author@example.com",
    "url": "https://example.com"
  },
  "homepage": "https://docs.example.com",
  "repository": "https://github.com/user/plugin-name",
  "license": "MIT",
  "keywords": ["testing", "automation", "ci-cd"]
}
```

### 4.3 插件配置文件

用户可在项目中创建 `.claude/plugin-name.local.md` 配置插件：

```markdown
---
enabled: true
mode: standard
max_retries: 3
notification_level: info
---

# Plugin Configuration

Plugin is active in standard mode.
```

---

## 5. 代理系统 (Agents/Subagents)

### 5.1 代理文件结构

代理定义为 Markdown 文件，存放在 `agents/` 目录：

```markdown
---
name: agent-identifier
description: Use this agent when [触发条件]...
model: inherit
color: blue
tools: ["Read", "Write", "Grep", "Bash"]
---

You are [agent role description]...

**Your Core Responsibilities:**
1. [Responsibility 1]
2. [Responsibility 2]

**Analysis Process:**
[Step-by-step workflow]

**Output Format:**
[What to return]
```

### 5.2 Frontmatter 字段

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `name` | String | 是 | 代理标识符 (kebab-case) |
| `description` | String | 是 | 触发条件和示例 |
| `model` | String | 否 | `inherit`, `sonnet`, `opus`, `haiku` |
| `color` | String | 否 | 显示颜色 |
| `tools` | Array | 否 | 可用工具限制 |

### 5.3 描述示例（带触发条件）

```markdown
---
name: code-analyzer
description: Use this agent when [triggering conditions]. Examples:

<example>
Context: [Situation description]
user: "[User request]"
assistant: "[How assistant should respond and use this agent]"
<commentary>
[Why this agent should be triggered]
</commentary>
</example>

model: inherit
color: blue
---
```

### 5.4 使用 Task 工具调用代理

```json
{
  "subagent_type": "general-purpose",
  "description": "Analyze conversation for unwanted behaviors",
  "prompt": "You are analyzing a Claude Code conversation..."
}
```

### 5.5 代理目录结构

```
plugin-name/
└── agents/
    ├── analyzer.md
    ├── reviewer.md
    └── generator.md
```

---

## 6. 技能系统 (Skills)

### 6.1 技能目录结构

```
skill-name/
├── SKILL.md              # 必需: 核心技能定义
├── references/           # 可选: 详细文档
│   ├── patterns.md
│   └── advanced.md
├── examples/             # 可选: 代码示例
│   └── example.sh
└── scripts/              # 可选: 工具脚本
    └── validate.sh
```

### 6.2 SKILL.md 结构

```markdown
---
name: Skill Name
description: When to use this skill
version: 1.0.0
---

# Skill Overview

Skill instructions and guidance...

## Key Capabilities
- Capability 1
- Capability 2

## Usage Patterns
[How to apply this skill]
```

### 6.3 技能 Frontmatter

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `name` | String | 是 | 技能名称 |
| `description` | String | 是 | 触发条件描述 |
| `version` | String | 否 | 版本号 (SemVer) |

### 6.4 技能描述最佳实践

使用具体的触发短语：

```markdown
---
name: Hook Development
description: This skill should be used when the user asks to "create a hook",
"add a PreToolUse hook", "validate tool use", "implement prompt-based hooks",
or mentions hook events (PreToolUse, PostToolUse, Stop).
version: 0.1.0
---
```

### 6.5 创建技能目录

```bash
mkdir -p plugin-name/skills/skill-name/{references,examples,scripts}
touch plugin-name/skills/skill-name/SKILL.md
```

---

## 7. 钩子系统 (Hooks)

### 7.1 钩子事件类型

| 事件 | 触发时机 | 用途 |
|------|----------|------|
| `PreToolUse` | 工具执行前 | 验证、阻止、修改工具调用 |
| `PostToolUse` | 工具执行后 | 分析结果、提供反馈、日志记录 |
| `Stop` | 主代理停止前 | 验证任务完成情况 |
| `SubagentStop` | 子代理停止前 | 验证子任务完成情况 |
| `SessionStart` | 会话开始时 | 加载项目上下文、设置环境变量 |

### 7.2 钩子类型

#### Prompt-Based Hook（推荐）

使用 LLM 进行上下文感知验证：

```json
{
  "PreToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "prompt",
          "prompt": "Validate file write safety. Check: system paths, credentials, path traversal. Return 'approve' or 'deny'."
        }
      ]
    }
  ]
}
```

#### Command Hook

执行 Bash 命令进行确定性检查：

```json
{
  "PreToolUse": [
    {
      "matcher": "Bash",
      "hooks": [
        {
          "type": "command",
          "command": "python3 ${CLAUDE_PLUGIN_ROOT}/hooks/validate-bash.py",
          "timeout": 10
        }
      ]
    }
  ]
}
```

### 7.3 PreToolUse 钩子

```json
{
  "PreToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "prompt",
          "prompt": "File path: $TOOL_INPUT.file_path. Verify: 1) Not in /etc or system directories 2) Not .env or credentials 3) Path doesn't contain '..' traversal. Return 'approve' or 'deny'."
        }
      ]
    }
  ]
}
```

**返回结构：**
```json
{
  "hookSpecificOutput": {
    "permissionDecision": "allow|deny|ask",
    "updatedInput": {
      "field": "modified_value"
    }
  },
  "systemMessage": "Explanation for Claude"
}
```

### 7.4 PostToolUse 钩子

```json
{
  "PostToolUse": [
    {
      "matcher": "Edit",
      "hooks": [
        {
          "type": "prompt",
          "prompt": "Analyze edit result for potential issues: syntax errors, security vulnerabilities, breaking changes. Provide feedback."
        }
      ]
    }
  ]
}
```

### 7.5 Stop 钩子

```json
{
  "Stop": [
    {
      "matcher": "*",
      "hooks": [
        {
          "type": "prompt",
          "prompt": "Verify task completion: tests run, build succeeded, questions answered. Return 'approve' to stop or 'block' with reason to continue."
        }
      ]
    }
  ]
}
```

**返回结构：**
```json
{
  "decision": "approve|block",
  "reason": "Explanation",
  "systemMessage": "Additional context"
}
```

### 7.6 SessionStart 钩子

```json
{
  "SessionStart": [
    {
      "matcher": "*",
      "hooks": [
        {
          "type": "command",
          "command": "bash ${CLAUDE_PLUGIN_ROOT}/scripts/load-context.sh"
        }
      ]
    }
  ]
}
```

**配套脚本示例：**
```bash
#!/bin/bash
cd "$CLAUDE_PROJECT_DIR" || exit 1

# 检测项目类型
if [ -f "package.json" ]; then
  echo "export PROJECT_TYPE=nodejs" >> "$CLAUDE_ENV_FILE"
elif [ -f "Cargo.toml" ]; then
  echo "export PROJECT_TYPE=rust" >> "$CLAUDE_ENV_FILE"
fi
```

### 7.7 完整钩子配置示例

```json
{
  "PreToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "command",
          "command": "bash ${CLAUDE_PLUGIN_ROOT}/hooks/scripts/security/scan-secrets.sh",
          "timeout": 30
        }
      ]
    },
    {
      "matcher": "Bash",
      "hooks": [
        {
          "type": "prompt",
          "prompt": "Evaluate if this bash command is safe. Check for destructive operations, missing safeguards, and potential security issues.",
          "timeout": 20
        }
      ]
    }
  ],
  "PostToolUse": [
    {
      "matcher": "Bash",
      "hooks": [
        {
          "type": "command",
          "command": "bash ${CLAUDE_PLUGIN_ROOT}/hooks/scripts/workflow/update-status.sh",
          "timeout": 15
        }
      ]
    }
  ],
  "Stop": [
    {
      "matcher": ".*",
      "hooks": [
        {
          "type": "command",
          "command": "bash ${CLAUDE_PLUGIN_ROOT}/hooks/scripts/quality/check-config.sh",
          "timeout": 45
        }
      ]
    }
  ],
  "SessionStart": [
    {
      "matcher": ".*",
      "hooks": [
        {
          "type": "command",
          "command": "bash ${CLAUDE_PLUGIN_ROOT}/hooks/scripts/security/validate-permissions.sh",
          "timeout": 20
        }
      ]
    }
  ]
}
```

---

## 8. 权限管理 (Permissions)

### 8.1 allowed-tools 字段

在命令 frontmatter 中限制可用工具：

```yaml
# 单个工具
allowed-tools: Read

# 多个工具（逗号分隔）
allowed-tools: Read, Write, Edit

# 多个工具（数组格式）
allowed-tools:
  - Read
  - Write
  - Bash(git:*)

# 所有工具（不推荐）
allowed-tools: "*"
```

### 8.2 Bash 命令过滤

使用命令过滤器限制 Bash 权限：

```yaml
# 仅允许 git 命令
allowed-tools: Bash(git:*)

# 仅允许 npm 命令
allowed-tools: Bash(npm:*)

# 仅允许 docker 命令
allowed-tools: Bash(docker:*)

# 组合使用
allowed-tools:
  - Read
  - Bash(git:*)
  - Bash(npm:*)
```

### 8.3 权限最佳实践

1. **最小权限原则**：只授予必需的权限
2. **使用命令过滤器**：避免使用 `Bash(*)` 通配符
3. **文档化权限**：说明为什么需要特定工具
4. **仅在需要时指定**：默认继承会话权限

### 8.4 常见错误

❌ 忘记声明必需的工具权限：
```markdown
Check git status: !`git status`
```

✅ 正确声明权限：
```markdown
---
allowed-tools: Bash(git:*)
---
Check git status: !`git status`
```

---

## 9. MCP 服务器集成

### 9.1 .mcp.json 配置

在插件根目录创建 `.mcp.json`：

```json
{
  "serverType": "stdio",
  "command": "node",
  "args": ["${CLAUDE_PLUGIN_ROOT}/server.js"],
  "extensionToLanguage": {},
  "env": {}
}
```

### 9.2 服务器类型

| 类型 | 描述 | 用途 |
|------|------|------|
| `stdio` | 本地进程 | 文件系统访问、本地工具 |
| `SSE` | 服务器发送事件 | 云服务、实时更新 |
| `HTTP` | REST API | 自定义头部和认证 |
| `WebSocket` | 双向通信 | 实时交互 |

### 9.3 多服务器配置

```json
{
  "mcpServers": {
    "kubernetes": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/servers/kubernetes-mcp/index.js"],
      "env": {
        "KUBECONFIG": "${KUBECONFIG}",
        "K8S_NAMESPACE": "${K8S_NAMESPACE:-default}"
      }
    },
    "terraform": {
      "command": "python",
      "args": ["${CLAUDE_PLUGIN_ROOT}/servers/terraform-mcp/main.py"],
      "env": {
        "TF_STATE_BUCKET": "${TF_STATE_BUCKET}",
        "AWS_REGION": "${AWS_REGION}"
      }
    },
    "github-actions": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/servers/github-actions-mcp/server.js"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}",
        "GITHUB_ORG": "${GITHUB_ORG}"
      }
    }
  }
}
```

### 9.4 文件系统服务器示例

```json
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"],
    "env": {
      "LOG_LEVEL": "debug"
    }
  }
}
```

---

## 10. 环境变量

### 10.1 可用环境变量

| 变量 | 描述 | 适用范围 |
|------|------|----------|
| `$CLAUDE_PROJECT_DIR` | 当前项目根路径 | 所有钩子 |
| `$CLAUDE_PLUGIN_ROOT` | 插件目录路径 | 所有钩子、MCP 配置 |
| `$CLAUDE_ENV_FILE` | 环境变量持久化文件 | 仅 SessionStart |
| `$CLAUDE_CODE_REMOTE` | 是否远程运行 | 所有钩子 |
| `$TOOL_INPUT` | 工具输入 JSON | 钩子内 |
| `$TOOL_RESULT` | 工具结果 | PostToolUse |
| `$USER_PROMPT` | 用户提示文本 | 钩子内 |

### 10.2 在脚本中使用

```bash
#!/bin/bash
# 使用项目目录
cd "$CLAUDE_PROJECT_DIR" || exit 1

# 引用插件资源
source "${CLAUDE_PLUGIN_ROOT}/lib/common.sh"
```

### 10.3 在 JSON 配置中使用

```json
{
  "command": "bash ${CLAUDE_PLUGIN_ROOT}/scripts/run.sh"
}
```

### 10.4 持久化环境变量

在 SessionStart 钩子中写入 `$CLAUDE_ENV_FILE`：

```bash
#!/bin/bash
echo "export MY_VAR=value" >> "$CLAUDE_ENV_FILE"
echo "export PROJECT_TYPE=nodejs" >> "$CLAUDE_ENV_FILE"
```

---

## 11. 模型选择

### 11.1 可用模型

| 模型 | 特点 | 适用场景 |
|------|------|----------|
| `haiku` | 快速、经济 | 简单任务、高频命令、公式化操作 |
| `sonnet` | 平衡（默认） | 标准工作流、大多数用例 |
| `opus` | 最强能力 | 复杂分析、架构决策、深度代码理解 |
| `inherit` | 继承父级 | 代理默认推荐 |

### 11.2 在命令中指定

```yaml
---
model: haiku    # 快速执行简单任务
---
```

```yaml
---
model: sonnet   # 平衡性能（默认）
---
```

```yaml
---
model: opus     # 复杂任务最大能力
---
```

### 11.3 在代理中指定

```yaml
---
name: complex-analyzer
description: ...
model: opus      # 复杂分析使用 Opus
---
```

```yaml
---
name: quick-helper
description: ...
model: inherit   # 推荐：继承父级模型
---
```

### 11.4 选择指南

- **haiku**: 格式转换、简单查询、频繁调用的命令
- **sonnet**: 代码审查、标准分析、日常开发任务
- **opus**: 架构设计、安全审计、复杂重构
- **inherit**: 代理默认选择，保持一致性

---

## 12. 高级用法

### 12.1 命令调用代理

在命令中触发专用代理：

```markdown
---
description: Deep analysis using plugin agent
argument-hint: [file-path]
---

Initiate deep code analysis of @$1 using the code-analyzer agent.

The agent will:
1. Analyze code structure
2. Identify patterns
3. Suggest improvements
4. Generate detailed report

Note: This uses the Task tool to launch the plugin's code-analyzer agent.
```

### 12.2 渐进式信息披露

技能采用层级结构管理复杂性：

1. **SKILL.md**: 高层元数据和核心指导
2. **references/**: 详细模式和高级用法
3. **examples/**: 工作代码示例
4. **scripts/**: 工具脚本

### 12.3 命名空间

插件组件自动获得命名空间：

- 命令: `/plugin-name:command-name`
- 代理: `plugin-name:agent-name`
- 技能: `plugin-name/skill-name`

### 12.4 子命令模式

实现带帮助的子命令：

```bash
if [ "$1" = "help" ] || [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
  echo "Command Help"
  echo ""
  echo "USAGE:"
  echo "  /command [subcommand] [args]"
  echo ""
  echo "SUBCOMMANDS:"
  echo "  init [name]       Initialize new configuration"
  echo "  deploy [env]      Deploy to environment"
  echo "  status            Show current status"
  echo "  rollback          Rollback last deployment"
  echo "  help              Show this help"
  exit 0
fi
```

### 12.5 钩子决策流程

```
工具调用 → PreToolUse 钩子
           ↓
    ┌──────┴──────┐
    │  决策判断   │
    └──────┬──────┘
           ↓
  ┌────────┼────────┐
  │        │        │
allow    deny     ask
  │        │        │
  ↓        ↓        ↓
执行工具  阻止执行  询问用户
  │
  ↓
PostToolUse 钩子
  │
  ↓
继续执行...
```

### 12.6 安全验证模式

```json
{
  "PreToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "prompt",
          "prompt": "File path: $TOOL_INPUT.file_path. Verify: 1) Not in /etc or system directories 2) Not .env or credentials 3) Path doesn't contain '..' traversal. Return 'approve' or 'deny'."
        }
      ]
    }
  ]
}
```

---

## 快速参考

### 创建新插件

```bash
mkdir -p my-plugin/.claude-plugin
mkdir -p my-plugin/{commands,agents,skills,hooks,scripts}
echo '{"name": "my-plugin", "version": "0.1.0"}' > my-plugin/.claude-plugin/plugin.json
```

### 创建新命令

```bash
cat > my-plugin/commands/my-command.md << 'EOF'
---
description: My custom command
argument-hint: [arg]
allowed-tools: Read, Bash(git:*)
---

Execute my command with argument: $1
EOF
```

### 创建新代理

```bash
cat > my-plugin/agents/my-agent.md << 'EOF'
---
name: my-agent
description: Use this agent when...
model: inherit
color: blue
---

You are a specialized agent for...
EOF
```

### 创建新技能

```bash
mkdir -p my-plugin/skills/my-skill
cat > my-plugin/skills/my-skill/SKILL.md << 'EOF'
---
name: My Skill
description: Use when...
version: 1.0.0
---

# My Skill

Guidance and instructions...
EOF
```

---

## 相关资源

- [Claude Code 官方仓库](https://github.com/anthropics/claude-code)
- [Plugin Development Guide](https://github.com/anthropics/claude-code/tree/main/plugins/plugin-dev)
- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code)
- [Claude Code Handbook](https://github.com/nikiforovall/claude-code-rules)

---

*文档基于 Claude Code 官方文档整理，最后更新: 2026-02-01*
