<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import BentoCard from "$lib/components/ui/BentoCard.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import { onMount } from "svelte";
  import {
    ArrowLeft,
    Terminal,
    Command,
    Puzzle,
    Bot,
    Sparkles,
    Shield,
    Server,
    Variable,
    Cpu,
    Zap,
    ChevronRight,
    Copy,
    Check,
    Hash,
    Braces,
    GitBranch,
    FileCode,
    Workflow,
    Lock,
    ExternalLink,
    BookOpen,
    Search,
    ChevronDown,
    X,
  } from "lucide-svelte";

  // Typewriter effect state
  let displayTitle = $state("");
  let showCursor = $state(true);
  const fullTitle = "Claude Code 完整知识手册";

  // Copy state
  let copiedId = $state<string | null>(null);

  // Search and filter state
  let searchQuery = $state("");
  let activeSection = $state<string | null>(null);

  // Expanded sections
  let expandedSections = $state<Set<string>>(new Set(["commands"]));

  onMount(() => {
    // Typewriter effect
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullTitle.length) {
        displayTitle = fullTitle.slice(0, i + 1);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      showCursor = !showCursor;
    }, 530);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  });

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    copiedId = id;
    setTimeout(() => (copiedId = null), 2000);
  }

  function toggleSection(id: string) {
    if (expandedSections.has(id)) {
      expandedSections.delete(id);
      expandedSections = new Set(expandedSections);
    } else {
      expandedSections.add(id);
      expandedSections = new Set(expandedSections);
    }
  }

  // Built-in commands - organized by category
  const commandCategories = [
    {
      name: "会话与上下文",
      color: "emerald",
      commands: [
        { name: "/help", desc: "显示所有可用命令" },
        { name: "/clear", desc: "清除对话历史" },
        { name: "/compact", desc: "压缩对话以节省 token" },
        { name: "/context", desc: "可视化上下文使用情况" },
        { name: "/rewind", desc: "回退菜单 (Esc+Esc)" },
        { name: "/resume", desc: "恢复历史会话" },
        { name: "/export", desc: "导出对话到文件" },
      ],
    },
    {
      name: "配置与设置",
      color: "cyan",
      commands: [
        { name: "/config", desc: "打开配置界面" },
        { name: "/model", desc: "切换 AI 模型" },
        { name: "/permissions", desc: "查看/更新权限" },
        { name: "/allowed-tools", desc: "配置工具权限" },
        { name: "/vim", desc: "启用 Vim 模式" },
        { name: "/terminal-setup", desc: "安装终端快捷键" },
        { name: "/theme", desc: "主题选择器" },
        { name: "/output-style", desc: "设置输出风格" },
        { name: "/statusline", desc: "配置状态栏" },
        { name: "/privacy-settings", desc: "隐私设置" },
      ],
    },
    {
      name: "项目与工作区",
      color: "violet",
      commands: [
        { name: "/init", desc: "初始化项目 CLAUDE.md" },
        { name: "/memory", desc: "编辑记忆文件" },
        { name: "/add-dir", desc: "添加工作目录" },
        { name: "/sandbox", desc: "启用沙箱 Bash" },
      ],
    },
    {
      name: "IDE 集成",
      color: "pink",
      commands: [
        { name: "/ide", desc: "连接到当前 IDE" },
        { name: "/ide vscode", desc: "配置 VS Code" },
        { name: "/ide cursor", desc: "配置 Cursor" },
        { name: "/ide configure", desc: "打开 IDE 设置" },
      ],
    },
    {
      name: "账户与认证",
      color: "amber",
      commands: [
        { name: "/login", desc: "切换账户" },
        { name: "/logout", desc: "登出账户" },
      ],
    },
    {
      name: "诊断与状态",
      color: "red",
      commands: [
        { name: "/bug", desc: "报告 Bug" },
        { name: "/doctor", desc: "运行安装诊断" },
        { name: "/cost", desc: "显示 token 统计" },
        { name: "/status", desc: "账户和系统信息" },
        { name: "/usage", desc: "显示计划限制" },
      ],
    },
    {
      name: "功能与代理",
      color: "blue",
      commands: [
        { name: "/mcp", desc: "管理 MCP 服务器" },
        { name: "/agents", desc: "管理子代理" },
        { name: "/hooks", desc: "显示钩子配置" },
        { name: "/skills", desc: "列出可用技能" },
        { name: "/plugin", desc: "插件管理" },
        { name: "/install-github-app", desc: "GitHub Actions" },
        { name: "/review", desc: "代码审查" },
        { name: "/pr_comments", desc: "查看 PR 评论" },
        { name: "/kill <id>", desc: "停止后台进程" },
        { name: "/listen", desc: "监听模式" },
      ],
    },
  ];

  // CLI arguments - organized by category
  const cliCategories = [
    {
      name: "基础参数",
      args: [
        { arg: "claude", desc: "在当前目录启动" },
        { arg: "-p / --print", desc: "非交互式模式" },
        { arg: "-c / --continue", desc: "恢复上次会话" },
        { arg: "-r / --resume <id>", desc: "恢复指定会话" },
        { arg: "--verbose", desc: "详细日志" },
        { arg: "--debug", desc: "调试日志" },
        { arg: "update", desc: "更新版本" },
      ],
    },
    {
      name: "权限与安全",
      args: [
        { arg: "--dangerously-skip-permissions", desc: "跳过权限检查 (YOLO)" },
        { arg: "--allowedTools", desc: "指定允许的工具" },
        { arg: "--disallowedTools", desc: "指定禁止的工具" },
      ],
    },
    {
      name: "输出格式",
      args: [
        { arg: "--output-format json", desc: "JSON 输出" },
        { arg: "--output-format stream-json", desc: "流式 JSON" },
        { arg: "--output-format text", desc: "纯文本" },
      ],
    },
    {
      name: "高级参数",
      args: [
        { arg: "--max-turns <n>", desc: "限制代理轮次" },
        { arg: "--model <model>", desc: "指定模型" },
        { arg: "--append-system-prompt", desc: "追加系统提示" },
        { arg: "--plugin-dir <path>", desc: "指定插件目录" },
        { arg: "--ide", desc: "以 IDE 模式启动" },
      ],
    },
  ];

  // Keyboard shortcuts
  const keyboardShortcuts = [
    { key: "Shift+Enter", desc: "换行", note: "需要 /terminal-setup" },
    { key: "Esc", desc: "中断 Claude", note: "" },
    { key: "Esc+Esc", desc: "打开回退菜单", note: "" },
    { key: "Ctrl+C (x2)", desc: "完全退出", note: "" },
    { key: "Ctrl+R", desc: "显示完整输出", note: "" },
    { key: "Ctrl+V", desc: "粘贴图片", note: "" },
    { key: "Ctrl+T", desc: "切换语法高亮", note: "" },
    { key: "Ctrl+B", desc: "后台运行 Bash", note: "" },
    { key: "Tab", desc: "切换思考模式", note: "Thinking On/Off" },
    { key: "Shift+Tab", desc: "自动接受模式", note: "1x=Auto, 2x=Plan" },
    { key: "Cmd/Ctrl+Esc", desc: "IDE 快速启动", note: "" },
    { key: "!", desc: "Bash 模式前缀", note: "" },
    { key: "@", desc: "提及文件/文件夹", note: "" },
  ];

  // Extended Thinking levels
  const thinkingLevels = [
    {
      level: "think",
      tokens: "4,000",
      keywords: ["think"],
      usage: "标准推理，日常任务",
      cost: "~$0.06",
      color: "emerald",
    },
    {
      level: "megathink",
      tokens: "10,000",
      keywords: ["think hard", "think deeply", "think more", "think a lot", "think about it"],
      usage: "增强分析，中等复杂度",
      cost: "~$0.15",
      color: "amber",
    },
    {
      level: "ultrathink",
      tokens: "31,999",
      keywords: ["ultrathink", "think harder", "think intensely", "think really hard", "think super hard", "think very hard"],
      usage: "深度问题解决，复杂架构决策",
      cost: "~$0.48",
      color: "red",
    },
  ];

  // Input modes
  const inputModes = [
    { mode: "Edit Mode", shortcut: "默认", desc: "修改文件前需要确认" },
    { mode: "Auto-accept", shortcut: "1x Shift+Tab", desc: "自动接受文件修改 (YOLO)" },
    { mode: "Plan Mode", shortcut: "2x Shift+Tab", desc: "创建行动计划，不修改代码" },
  ];

  // Frontmatter fields
  const frontmatterFields = [
    { field: "description", type: "String", required: false, desc: "命令描述，显示在 /help，建议 ≤60 字符" },
    { field: "argument-hint", type: "String", required: false, desc: "参数提示，如 [file] [options]" },
    { field: "allowed-tools", type: "String/Array", required: false, desc: "允许使用的工具列表" },
    { field: "model", type: "String", required: false, desc: "使用的模型: haiku, sonnet, opus" },
    { field: "disable-model-invocation", type: "Boolean", required: false, desc: "禁止程序化调用" },
  ];

  // Hook events
  const hookEvents = [
    { event: "PreToolUse", timing: "工具执行前", purpose: "验证、阻止、修改工具调用", color: "text-amber-400" },
    { event: "PostToolUse", timing: "工具执行后", purpose: "分析结果、提供反馈、日志记录", color: "text-blue-400" },
    { event: "Stop", timing: "主代理停止前", purpose: "验证任务完成情况", color: "text-red-400" },
    { event: "SubagentStop", timing: "子代理停止前", purpose: "验证子任务完成情况", color: "text-purple-400" },
    { event: "SessionStart", timing: "会话开始时", purpose: "加载项目上下文、设置环境变量", color: "text-green-400" },
  ];

  // Environment variables
  const envVars = [
    { name: "$CLAUDE_PROJECT_DIR", desc: "当前项目根路径", scope: "所有钩子" },
    { name: "$CLAUDE_PLUGIN_ROOT", desc: "插件目录路径", scope: "所有钩子、MCP 配置" },
    { name: "$CLAUDE_ENV_FILE", desc: "环境变量持久化文件", scope: "仅 SessionStart" },
    { name: "$CLAUDE_CODE_REMOTE", desc: "是否远程运行", scope: "所有钩子" },
    { name: "$TOOL_INPUT", desc: "工具输入 JSON", scope: "钩子内" },
    { name: "$TOOL_RESULT", desc: "工具结果", scope: "PostToolUse" },
    { name: "$USER_PROMPT", desc: "用户提示文本", scope: "钩子内" },
  ];

  // Models
  const models = [
    { name: "haiku", features: "快速、经济", usage: "简单任务、高频命令、公式化操作", color: "bg-cyan-500/20 text-cyan-400" },
    { name: "sonnet", features: "平衡（默认）", usage: "标准工作流、大多数用例", color: "bg-violet-500/20 text-violet-400" },
    { name: "opus", features: "最强能力", usage: "复杂分析、架构决策、深度代码理解", color: "bg-orange-500/20 text-orange-400" },
    { name: "inherit", features: "继承父级", usage: "代理默认推荐", color: "bg-emerald-500/20 text-emerald-400" },
  ];

  // MCP server types
  const mcpTypes = [
    { type: "stdio", desc: "本地进程", usage: "文件系统访问、本地工具" },
    { type: "SSE", desc: "服务器发送事件", usage: "云服务、实时更新" },
    { type: "HTTP", desc: "REST API", usage: "自定义头部和认证" },
    { type: "WebSocket", desc: "双向通信", usage: "实时交互" },
  ];

  // Plugin commands - comprehensive list
  const pluginCommands = [
    {
      category: "插件管理",
      color: "violet",
      commands: [
        { cmd: "/plugin", desc: "打开交互式插件管理 UI" },
        { cmd: "/plugin install <plugin>@<marketplace>", desc: "安装插件" },
        { cmd: "/plugin uninstall <plugin>@<marketplace>", desc: "卸载插件 (别名: remove, rm)" },
        { cmd: "/plugin enable <plugin>@<marketplace>", desc: "启用已禁用的插件" },
        { cmd: "/plugin disable <plugin>@<marketplace>", desc: "禁用插件（不卸载）" },
        { cmd: "/plugin update <plugin>@<marketplace>", desc: "更新插件到最新版本" },
      ],
    },
    {
      category: "市场管理",
      color: "cyan",
      commands: [
        { cmd: "/plugin marketplace list", desc: "列出所有已配置的市场" },
        { cmd: "/plugin marketplace add <path|url>", desc: "添加本地或远程市场" },
        { cmd: "/plugin marketplace update <name>", desc: "更新市场插件列表" },
        { cmd: "/plugin marketplace remove <name>", desc: "移除市场（会卸载其插件）" },
      ],
    },
  ];

  // Plugin installation scopes
  const pluginScopes = [
    { scope: "user", file: "~/.claude/settings.json", desc: "个人插件，所有项目可用（默认）" },
    { scope: "project", file: ".claude/settings.json", desc: "团队插件，通过版本控制共享" },
    { scope: "local", file: ".claude/settings.local.json", desc: "项目特定插件，gitignored" },
    { scope: "managed", file: "managed-settings.json", desc: "托管插件，只读仅可更新" },
  ];

  // Navigation sections
  const sections = [
    { id: "commands", name: "斜杠命令", icon: Terminal },
    { id: "plugin-commands", name: "插件命令", icon: Puzzle },
    { id: "plugins", name: "插件系统", icon: Puzzle },
    { id: "agents", name: "代理系统", icon: Bot },
    { id: "skills", name: "技能系统", icon: Sparkles },
    { id: "hooks", name: "钩子系统", icon: Zap },
    { id: "permissions", name: "权限管理", icon: Lock },
    { id: "mcp", name: "MCP 服务器", icon: Server },
    { id: "env", name: "环境变量", icon: Variable },
    { id: "models", name: "模型选择", icon: Cpu },
  ];

  // Code examples
  const commandExample = `---
description: Deploy application to environment
argument-hint: [app-name] [environment] [version]
allowed-tools: Bash(kubectl:*), Bash(helm:*), Read
model: sonnet
---

Deploy $1 to $2 environment using version $3

Pre-deployment checks:
- Verify $2 configuration
- Check cluster status: !\`kubectl cluster-info\`
- Validate version $3 exists`;

  const pluginStructure = `plugin-name/
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
└── scripts/                 # 辅助脚本`;

  const agentExample = `---
name: code-analyzer
description: Use this agent when analyzing code structure
model: inherit
color: blue
tools: ["Read", "Write", "Grep", "Bash"]
---

You are a code analysis specialist...

**Your Core Responsibilities:**
1. Analyze code structure
2. Identify patterns

**Output Format:**
[Detailed analysis report]`;

  const skillExample = `---
name: Hook Development
description: This skill should be used when the user asks
to "create a hook", "add a PreToolUse hook"...
version: 0.1.0
---

# Hook Development for Claude Code Plugins

## Overview
Hooks are event-driven automation scripts...`;

  const hookExample = `{
  "PreToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "prompt",
        "prompt": "Validate file write safety..."
      }]
    }
  ],
  "Stop": [
    {
      "matcher": "*",
      "hooks": [{
        "type": "prompt",
        "prompt": "Verify tests run and build succeeded..."
      }]
    }
  ]
}`;

  const mcpExample = `{
  "mcpServers": {
    "kubernetes": {
      "command": "node",
      "args": ["\${CLAUDE_PLUGIN_ROOT}/servers/k8s/index.js"],
      "env": {
        "KUBECONFIG": "\${KUBECONFIG}",
        "K8S_NAMESPACE": "\${K8S_NAMESPACE:-default}"
      }
    }
  }
}`;

  const permissionExample = `# Bash 命令过滤
allowed-tools:
  - Read
  - Bash(git:*)    # 仅允许 git 命令
  - Bash(npm:*)    # 仅允许 npm 命令
  - Bash(docker:*) # 仅允许 docker 命令`;

  // Filter sections based on search
  const filteredSections = $derived(
    searchQuery
      ? sections.filter(
          (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : sections
  );
</script>

<div class="max-w-6xl mx-auto space-y-8">
  <!-- Terminal-style Header -->
  <div class="relative">
    <!-- Scanline overlay -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-[0.03]">
      <div class="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.03)_2px,rgba(0,255,0,0.03)_4px)]"></div>
    </div>

    <div class="relative p-8 rounded-3xl bg-[#0a0f0a] border border-emerald-500/20 overflow-hidden">
      <!-- Glow effect -->
      <div class="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <!-- Back button -->
      <a
        href="/knowledge"
        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm hover:bg-emerald-500/20 transition-colors mb-6"
      >
        <ArrowLeft class="w-4 h-4" />
        返回知识库
      </a>

      <!-- Terminal prompt style title -->
      <div class="flex items-center gap-3 mb-4">
        <div class="flex gap-1.5">
          <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
          <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
        </div>
        <span class="text-emerald-400/60 font-mono text-sm">claude@docs ~ %</span>
      </div>

      <h1 class="text-4xl md:text-5xl font-bold text-white font-mono tracking-tight">
        <span class="text-emerald-400">$</span> {displayTitle}<span class="text-emerald-400" class:opacity-100={showCursor} class:opacity-0={!showCursor}>▊</span>
      </h1>

      <p class="text-emerald-400/60 mt-4 font-mono text-lg max-w-2xl">
        {">"} 基于官方文档整理，涵盖命令、插件、代理、技能、钩子、权限等核心功能
      </p>

      <!-- Quick stats -->
      <div class="flex flex-wrap gap-4 mt-8">
        <div class="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <span class="text-emerald-400 font-mono text-2xl font-bold">45+</span>
          <span class="text-emerald-400/60 text-sm ml-2">内置命令</span>
        </div>
        <div class="px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
          <span class="text-violet-400 font-mono text-2xl font-bold">10</span>
          <span class="text-violet-400/60 text-sm ml-2">插件命令</span>
        </div>
        <div class="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <span class="text-cyan-400 font-mono text-2xl font-bold">5</span>
          <span class="text-cyan-400/60 text-sm ml-2">钩子事件</span>
        </div>
        <div class="px-4 py-2 rounded-xl bg-pink-500/10 border border-pink-500/20">
          <span class="text-pink-400 font-mono text-2xl font-bold">10</span>
          <span class="text-pink-400/60 text-sm ml-2">核心模块</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Search and Navigation -->
  <div class="sticky top-20 z-30 -mx-4 px-4 py-3 backdrop-blur-xl bg-black/60">
    <div class="flex items-center gap-4">
      <div class="relative flex-1 max-w-md">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/50" />
        <input
          type="search"
          placeholder="搜索模块..."
          bind:value={searchQuery}
          class="w-full h-11 pl-11 pr-4 rounded-xl bg-[#0a0f0a] border border-emerald-500/20 text-emerald-400 placeholder:text-emerald-400/30 font-mono focus:outline-none focus:border-emerald-500/50 transition-colors"
        />
      </div>
      <div class="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        {#each filteredSections as section}
          {@const Icon = section.icon}
          <a
            href="#{section.id}"
            class={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-mono whitespace-nowrap transition-all",
              activeSection === section.id
                ? "bg-emerald-500/20 text-emerald-400"
                : "text-emerald-400/50 hover:text-emerald-400 hover:bg-emerald-500/10"
            )}
            onclick={() => (activeSection = section.id)}
          >
            <Icon class="w-4 h-4" />
            {section.name}
          </a>
        {/each}
      </div>
    </div>
  </div>

  <!-- Section 1: Slash Commands -->
  <section id="commands" class="scroll-mt-32">
    <button
      class="w-full flex items-center justify-between p-5 rounded-2xl bg-[#0a0f0a] border border-emerald-500/20 hover:border-emerald-500/40 transition-colors group"
      onclick={() => toggleSection("commands")}
    >
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-emerald-500/10">
          <Terminal class="w-6 h-6 text-emerald-400" />
        </div>
        <div class="text-left">
          <h2 class="text-xl font-bold text-white font-mono">1. 斜杠命令</h2>
          <p class="text-emerald-400/50 text-sm">内置命令和自定义命令开发</p>
        </div>
      </div>
      <ChevronDown
        class={cn(
          "w-5 h-5 text-emerald-400/50 transition-transform",
          expandedSections.has("commands") && "rotate-180"
        )}
      />
    </button>

    {#if expandedSections.has("commands")}
      <div class="mt-4 space-y-6 animate-fade-up">
        <!-- Built-in Commands by Category -->
        <div class="p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Hash class="w-5 h-5 text-emerald-400" />
            内置命令 <span class="text-white/30 text-sm font-normal ml-2">({commandCategories.reduce((acc, cat) => acc + cat.commands.length, 0)} 个)</span>
          </h3>
          <div class="space-y-4">
            {#each commandCategories as category}
              <div class="p-4 rounded-xl bg-white/5 border border-white/5">
                <h4 class={cn(
                  "font-mono font-bold mb-3 text-sm",
                  category.color === "emerald" && "text-emerald-400",
                  category.color === "cyan" && "text-cyan-400",
                  category.color === "violet" && "text-violet-400",
                  category.color === "amber" && "text-amber-400",
                  category.color === "red" && "text-red-400",
                  category.color === "blue" && "text-blue-400",
                  category.color === "pink" && "text-pink-400"
                )}>{category.name}</h4>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {#each category.commands as cmd}
                    <div class="px-3 py-2 rounded-lg bg-black/30 hover:bg-black/50 transition-colors group">
                      <code class={cn(
                        "font-mono text-sm font-medium",
                        category.color === "emerald" && "text-emerald-400",
                        category.color === "cyan" && "text-cyan-400",
                        category.color === "violet" && "text-violet-400",
                        category.color === "amber" && "text-amber-400",
                        category.color === "red" && "text-red-400",
                        category.color === "blue" && "text-blue-400",
                        category.color === "pink" && "text-pink-400"
                      )}>{cmd.name}</code>
                      <p class="text-white/40 text-xs mt-0.5 group-hover:text-white/60 transition-colors">{cmd.desc}</p>
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- CLI Arguments -->
        <div class="p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Terminal class="w-5 h-5 text-cyan-400" />
            CLI 启动参数
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            {#each cliCategories as category}
              <div class="p-4 rounded-xl bg-white/5">
                <h4 class="text-cyan-400 font-mono font-bold text-sm mb-3">{category.name}</h4>
                <div class="space-y-2">
                  {#each category.args as arg}
                    <div class="flex items-start gap-2">
                      <code class="text-cyan-300 font-mono text-xs shrink-0">{arg.arg}</code>
                      <span class="text-white/40 text-xs">{arg.desc}</span>
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Keyboard Shortcuts -->
        <div class="p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Command class="w-5 h-5 text-violet-400" />
            键盘快捷键
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {#each keyboardShortcuts as shortcut}
              <div class="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <kbd class="text-violet-400 font-mono text-sm font-bold">{shortcut.key}</kbd>
                <p class="text-white/60 text-xs mt-1">{shortcut.desc}</p>
                {#if shortcut.note}
                  <p class="text-white/30 text-[10px] mt-0.5">{shortcut.note}</p>
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <!-- Extended Thinking -->
        <div class="p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Sparkles class="w-5 h-5 text-amber-400" />
            扩展思考模式 (Extended Thinking)
          </h3>
          <p class="text-white/50 text-sm mb-4">在提示词中添加关键词触发不同级别的思考预算。<strong class="text-amber-400">仅在 Claude Code CLI 中生效</strong>，不适用于网页版或 API。</p>
          <div class="grid md:grid-cols-3 gap-4">
            {#each thinkingLevels as level}
              <div class={cn(
                "p-4 rounded-xl border",
                level.color === "emerald" && "bg-emerald-500/10 border-emerald-500/20",
                level.color === "amber" && "bg-amber-500/10 border-amber-500/20",
                level.color === "red" && "bg-red-500/10 border-red-500/20"
              )}>
                <div class="flex items-center justify-between mb-2">
                  <span class={cn(
                    "font-mono font-bold",
                    level.color === "emerald" && "text-emerald-400",
                    level.color === "amber" && "text-amber-400",
                    level.color === "red" && "text-red-400"
                  )}>{level.level}</span>
                  <span class="text-white/40 text-xs">{level.cost}/任务</span>
                </div>
                <div class="text-white/60 text-sm mb-2">{level.tokens} tokens</div>
                <div class="text-white/50 text-xs mb-2">{level.usage}</div>
                <div class="flex flex-wrap gap-1 mt-2">
                  {#each level.keywords.slice(0, 3) as keyword}
                    <code class="px-1.5 py-0.5 rounded bg-black/30 text-white/60 text-[10px]">{keyword}</code>
                  {/each}
                  {#if level.keywords.length > 3}
                    <span class="text-white/30 text-[10px]">+{level.keywords.length - 3}</span>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Input Modes -->
        <div class="p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Workflow class="w-5 h-5 text-pink-400" />
            输入模式
          </h3>
          <div class="grid md:grid-cols-3 gap-4">
            {#each inputModes as mode}
              <div class="p-4 rounded-xl bg-white/5 border border-white/5">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-pink-400 font-mono font-bold text-sm">{mode.mode}</span>
                  <kbd class="text-white/40 text-xs">{mode.shortcut}</kbd>
                </div>
                <p class="text-white/60 text-sm">{mode.desc}</p>
              </div>
            {/each}
          </div>
        </div>

        <!-- Command Format -->
        <div class="p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileCode class="w-5 h-5 text-cyan-400" />
            自定义命令格式
          </h3>
          <div class="grid lg:grid-cols-2 gap-6">
            <!-- Frontmatter fields table -->
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-white/10">
                    <th class="text-left py-2 text-emerald-400/80 font-mono">字段</th>
                    <th class="text-left py-2 text-emerald-400/80 font-mono">类型</th>
                    <th class="text-left py-2 text-emerald-400/80 font-mono">描述</th>
                  </tr>
                </thead>
                <tbody>
                  {#each frontmatterFields as field}
                    <tr class="border-b border-white/5">
                      <td class="py-2 font-mono text-cyan-400">{field.field}</td>
                      <td class="py-2 text-white/50">{field.type}</td>
                      <td class="py-2 text-white/60">{field.desc}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>

            <!-- Dynamic features -->
            <div class="space-y-3">
              <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <h4 class="text-emerald-400 font-mono font-bold mb-2">动态参数</h4>
                <code class="text-white/70 text-sm block">$ARGUMENTS · $1, $2, $3...</code>
              </div>
              <div class="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <h4 class="text-cyan-400 font-mono font-bold mb-2">文件引用</h4>
                <code class="text-white/70 text-sm block">@path/to/file · @$1</code>
              </div>
              <div class="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <h4 class="text-violet-400 font-mono font-bold mb-2">Bash 执行</h4>
                <code class="text-white/70 text-sm block">!`git branch --show-current`</code>
              </div>
            </div>
          </div>

          <!-- Example -->
          <div class="mt-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-white/40 font-mono">完整示例</span>
              <button
                class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                onclick={() => copyToClipboard(commandExample, "cmd-example")}
              >
                {#if copiedId === "cmd-example"}
                  <Check class="w-4 h-4 text-green-400" />
                {:else}
                  <Copy class="w-4 h-4 text-white/40" />
                {/if}
              </button>
            </div>
            <pre class="p-4 rounded-xl bg-black/50 text-sm text-emerald-400/80 font-mono overflow-x-auto border border-emerald-500/10"><code>{commandExample}</code></pre>
          </div>
        </div>
      </div>
    {/if}
  </section>

  <!-- Section 1.5: Plugin Commands -->
  <section id="plugin-commands" class="scroll-mt-32">
    <button
      class="w-full flex items-center justify-between p-5 rounded-2xl bg-[#0a0f0a] border border-violet-500/20 hover:border-violet-500/40 transition-colors group"
      onclick={() => toggleSection("plugin-commands")}
    >
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-violet-500/10">
          <Puzzle class="w-6 h-6 text-violet-400" />
        </div>
        <div class="text-left">
          <h2 class="text-xl font-bold text-white font-mono">插件命令详解</h2>
          <p class="text-violet-400/50 text-sm">/plugin 完整命令用法和作用域</p>
        </div>
      </div>
      <ChevronDown
        class={cn(
          "w-5 h-5 text-violet-400/50 transition-transform",
          expandedSections.has("plugin-commands") && "rotate-180"
        )}
      />
    </button>

    {#if expandedSections.has("plugin-commands")}
      <div class="mt-4 space-y-6 animate-fade-up">
        <!-- Plugin Commands by Category -->
        <div class="p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Terminal class="w-5 h-5 text-violet-400" />
            /plugin 命令完整列表
          </h3>
          <div class="space-y-4">
            {#each pluginCommands as category}
              <div class="p-4 rounded-xl bg-white/5 border border-white/5">
                <h4 class={cn(
                  "font-mono font-bold mb-3 text-sm",
                  category.color === "violet" && "text-violet-400",
                  category.color === "cyan" && "text-cyan-400"
                )}>{category.category}</h4>
                <div class="space-y-2">
                  {#each category.commands as cmd}
                    <div class="flex items-start gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-colors group">
                      <code class={cn(
                        "font-mono text-sm font-medium shrink-0",
                        category.color === "violet" && "text-violet-400",
                        category.color === "cyan" && "text-cyan-400"
                      )}>{cmd.cmd}</code>
                      <p class="text-white/50 text-sm flex-1">{cmd.desc}</p>
                      <button
                        class="p-1.5 rounded-lg hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                        onclick={() => copyToClipboard(cmd.cmd, `plugin-${cmd.cmd}`)}
                      >
                        {#if copiedId === `plugin-${cmd.cmd}`}
                          <Check class="w-3 h-3 text-green-400" />
                        {:else}
                          <Copy class="w-3 h-3 text-white/40" />
                        {/if}
                      </button>
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Installation Scopes -->
        <div class="p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield class="w-5 h-5 text-amber-400" />
            插件安装作用域 (Scopes)
          </h3>
          <p class="text-white/50 text-sm mb-4">使用 <code class="text-amber-400">--scope</code> 参数指定安装位置：<code class="text-amber-400/80">/plugin install formatter@my-org --scope project</code></p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/10">
                  <th class="text-left py-3 text-amber-400 font-mono">Scope</th>
                  <th class="text-left py-3 text-amber-400 font-mono">配置文件</th>
                  <th class="text-left py-3 text-amber-400 font-mono">使用场景</th>
                </tr>
              </thead>
              <tbody>
                {#each pluginScopes as scope}
                  <tr class="border-b border-white/5 hover:bg-white/5">
                    <td class="py-3 font-mono text-violet-400">{scope.scope}</td>
                    <td class="py-3 font-mono text-white/50 text-xs">{scope.file}</td>
                    <td class="py-3 text-white/60">{scope.desc}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Usage Examples -->
        <div class="p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileCode class="w-5 h-5 text-cyan-400" />
            使用示例
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <h4 class="text-violet-400 font-mono font-bold mb-3">添加市场并安装插件</h4>
              <pre class="text-xs font-mono text-white/70 space-y-1"><code># 添加本地市场
/plugin marketplace add ./my-marketplace

# 添加远程市场 (GitHub)
/plugin marketplace add anthropics/claude-code

# 从市场安装插件
/plugin install review-plugin@my-plugins

# 安装到项目作用域（团队共享）
/plugin install formatter@my-org --scope project</code></pre>
            </div>
            <div class="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <h4 class="text-cyan-400 font-mono font-bold mb-3">管理已安装插件</h4>
              <pre class="text-xs font-mono text-white/70 space-y-1"><code># 列出所有市场
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
/plugin uninstall formatter@my-org</code></pre>
            </div>
          </div>
        </div>

        <!-- CLI vs Slash Command -->
        <div class="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/20">
          <h3 class="text-lg font-semibold text-white mb-4">CLI 与斜杠命令对照</h3>
          <p class="text-white/50 text-sm mb-4">在终端外可使用 <code class="text-violet-400">claude plugin</code> 命令管理插件：</p>
          <div class="grid md:grid-cols-2 gap-4 text-sm font-mono">
            <div class="p-3 rounded-lg bg-black/30">
              <span class="text-white/40"># 斜杠命令</span>
              <div class="text-violet-400 mt-1">/plugin install formatter@my-org</div>
            </div>
            <div class="p-3 rounded-lg bg-black/30">
              <span class="text-white/40"># CLI 等效命令</span>
              <div class="text-cyan-400 mt-1">claude plugin install formatter@my-org</div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </section>

  <!-- Section 2: Plugin System -->
  <section id="plugins" class="scroll-mt-32">
    <button
      class="w-full flex items-center justify-between p-5 rounded-2xl bg-[#0a0f0a] border border-violet-500/20 hover:border-violet-500/40 transition-colors group"
      onclick={() => toggleSection("plugins")}
    >
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-violet-500/10">
          <Puzzle class="w-6 h-6 text-violet-400" />
        </div>
        <div class="text-left">
          <h2 class="text-xl font-bold text-white font-mono">2. 插件系统</h2>
          <p class="text-violet-400/50 text-sm">目录结构和配置清单</p>
        </div>
      </div>
      <ChevronDown
        class={cn(
          "w-5 h-5 text-violet-400/50 transition-transform",
          expandedSections.has("plugins") && "rotate-180"
        )}
      />
    </button>

    {#if expandedSections.has("plugins")}
      <div class="mt-4 p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5 animate-fade-up">
        <div class="grid lg:grid-cols-2 gap-6">
          <!-- Directory structure -->
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">目录结构</h3>
            <pre class="p-4 rounded-xl bg-black/50 text-sm text-violet-400/80 font-mono overflow-x-auto border border-violet-500/10"><code>{pluginStructure}</code></pre>
          </div>

          <!-- Plugin.json -->
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">plugin.json 配置</h3>
            <pre class="p-4 rounded-xl bg-black/50 text-sm text-violet-400/80 font-mono overflow-x-auto border border-violet-500/10"><code>{`{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "插件功能简述",
  "author": {
    "name": "Author",
    "email": "author@example.com"
  },
  "license": "MIT",
  "keywords": ["testing", "automation"]
}`}</code></pre>
          </div>
        </div>
      </div>
    {/if}
  </section>

  <!-- Section 3: Agents -->
  <section id="agents" class="scroll-mt-32">
    <button
      class="w-full flex items-center justify-between p-5 rounded-2xl bg-[#0a0f0a] border border-blue-500/20 hover:border-blue-500/40 transition-colors group"
      onclick={() => toggleSection("agents")}
    >
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-blue-500/10">
          <Bot class="w-6 h-6 text-blue-400" />
        </div>
        <div class="text-left">
          <h2 class="text-xl font-bold text-white font-mono">3. 代理系统</h2>
          <p class="text-blue-400/50 text-sm">Agents 和 Subagents 定义</p>
        </div>
      </div>
      <ChevronDown
        class={cn(
          "w-5 h-5 text-blue-400/50 transition-transform",
          expandedSections.has("agents") && "rotate-180"
        )}
      />
    </button>

    {#if expandedSections.has("agents")}
      <div class="mt-4 p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5 animate-fade-up">
        <div class="grid lg:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">Frontmatter 字段</h3>
            <div class="space-y-2">
              {#each [
                { field: "name", desc: "代理标识符 (kebab-case)", required: true },
                { field: "description", desc: "触发条件和示例", required: true },
                { field: "model", desc: "inherit, sonnet, opus, haiku", required: false },
                { field: "color", desc: "显示颜色", required: false },
                { field: "tools", desc: "可用工具限制", required: false },
              ] as item}
                <div class="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <code class="text-blue-400 font-mono">{item.field}</code>
                  {#if item.required}
                    <span class="px-1.5 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400">必需</span>
                  {/if}
                  <span class="text-white/50 text-sm flex-1">{item.desc}</span>
                </div>
              {/each}
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-white">Agent 定义示例</h3>
              <button
                class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                onclick={() => copyToClipboard(agentExample, "agent-example")}
              >
                {#if copiedId === "agent-example"}
                  <Check class="w-4 h-4 text-green-400" />
                {:else}
                  <Copy class="w-4 h-4 text-white/40" />
                {/if}
              </button>
            </div>
            <pre class="p-4 rounded-xl bg-black/50 text-sm text-blue-400/80 font-mono overflow-x-auto border border-blue-500/10"><code>{agentExample}</code></pre>
          </div>
        </div>
      </div>
    {/if}
  </section>

  <!-- Section 4: Skills -->
  <section id="skills" class="scroll-mt-32">
    <button
      class="w-full flex items-center justify-between p-5 rounded-2xl bg-[#0a0f0a] border border-amber-500/20 hover:border-amber-500/40 transition-colors group"
      onclick={() => toggleSection("skills")}
    >
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-amber-500/10">
          <Sparkles class="w-6 h-6 text-amber-400" />
        </div>
        <div class="text-left">
          <h2 class="text-xl font-bold text-white font-mono">4. 技能系统</h2>
          <p class="text-amber-400/50 text-sm">SKILL.md 结构和工作流</p>
        </div>
      </div>
      <ChevronDown
        class={cn(
          "w-5 h-5 text-amber-400/50 transition-transform",
          expandedSections.has("skills") && "rotate-180"
        )}
      />
    </button>

    {#if expandedSections.has("skills")}
      <div class="mt-4 p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5 animate-fade-up">
        <div class="grid lg:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">技能目录结构</h3>
            <pre class="p-4 rounded-xl bg-black/50 text-sm text-amber-400/80 font-mono border border-amber-500/10"><code>{`skill-name/
├── SKILL.md       # 必需: 核心技能定义
├── references/    # 可选: 详细文档
├── examples/      # 可选: 代码示例
└── scripts/       # 可选: 工具脚本`}</code></pre>
          </div>

          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-white">SKILL.md 示例</h3>
              <button
                class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                onclick={() => copyToClipboard(skillExample, "skill-example")}
              >
                {#if copiedId === "skill-example"}
                  <Check class="w-4 h-4 text-green-400" />
                {:else}
                  <Copy class="w-4 h-4 text-white/40" />
                {/if}
              </button>
            </div>
            <pre class="p-4 rounded-xl bg-black/50 text-sm text-amber-400/80 font-mono overflow-x-auto border border-amber-500/10"><code>{skillExample}</code></pre>
          </div>
        </div>
      </div>
    {/if}
  </section>

  <!-- Section 5: Hooks -->
  <section id="hooks" class="scroll-mt-32">
    <button
      class="w-full flex items-center justify-between p-5 rounded-2xl bg-[#0a0f0a] border border-pink-500/20 hover:border-pink-500/40 transition-colors group"
      onclick={() => toggleSection("hooks")}
    >
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-pink-500/10">
          <Zap class="w-6 h-6 text-pink-400" />
        </div>
        <div class="text-left">
          <h2 class="text-xl font-bold text-white font-mono">5. 钩子系统</h2>
          <p class="text-pink-400/50 text-sm">事件驱动的自动化</p>
        </div>
      </div>
      <ChevronDown
        class={cn(
          "w-5 h-5 text-pink-400/50 transition-transform",
          expandedSections.has("hooks") && "rotate-180"
        )}
      />
    </button>

    {#if expandedSections.has("hooks")}
      <div class="mt-4 space-y-6 animate-fade-up">
        <!-- Hook Events -->
        <div class="p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5">
          <h3 class="text-lg font-semibold text-white mb-4">钩子事件类型</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {#each hookEvents as hook}
              <div class="p-4 rounded-xl bg-white/5 border border-white/5">
                <code class={cn("font-mono font-bold", hook.color)}>{hook.event}</code>
                <p class="text-white/40 text-xs mt-1">{hook.timing}</p>
                <p class="text-white/60 text-sm mt-2">{hook.purpose}</p>
              </div>
            {/each}
          </div>
        </div>

        <!-- Hook Types -->
        <div class="grid lg:grid-cols-2 gap-6">
          <div class="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
            <h3 class="text-lg font-semibold text-emerald-400 mb-3">Prompt-Based Hook（推荐）</h3>
            <p class="text-white/50 text-sm mb-3">使用 LLM 进行上下文感知验证</p>
            <pre class="p-3 rounded-lg bg-black/30 text-xs text-emerald-400/80 font-mono"><code>{`{
  "type": "prompt",
  "prompt": "Validate safety..."
}`}</code></pre>
          </div>

          <div class="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
            <h3 class="text-lg font-semibold text-cyan-400 mb-3">Command Hook</h3>
            <p class="text-white/50 text-sm mb-3">执行 Bash 命令进行确定性检查</p>
            <pre class="p-3 rounded-lg bg-black/30 text-xs text-cyan-400/80 font-mono"><code>{`{
  "type": "command",
  "command": "python3 validate.py",
  "timeout": 10
}`}</code></pre>
          </div>
        </div>

        <!-- Hook Example -->
        <div class="p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">完整配置示例</h3>
            <button
              class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              onclick={() => copyToClipboard(hookExample, "hook-example")}
            >
              {#if copiedId === "hook-example"}
                <Check class="w-4 h-4 text-green-400" />
              {:else}
                <Copy class="w-4 h-4 text-white/40" />
              {/if}
            </button>
          </div>
          <pre class="p-4 rounded-xl bg-black/50 text-sm text-pink-400/80 font-mono overflow-x-auto border border-pink-500/10"><code>{hookExample}</code></pre>
        </div>
      </div>
    {/if}
  </section>

  <!-- Section 6: Permissions -->
  <section id="permissions" class="scroll-mt-32">
    <button
      class="w-full flex items-center justify-between p-5 rounded-2xl bg-[#0a0f0a] border border-red-500/20 hover:border-red-500/40 transition-colors group"
      onclick={() => toggleSection("permissions")}
    >
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-red-500/10">
          <Lock class="w-6 h-6 text-red-400" />
        </div>
        <div class="text-left">
          <h2 class="text-xl font-bold text-white font-mono">6. 权限管理</h2>
          <p class="text-red-400/50 text-sm">工具访问控制和 Bash 过滤</p>
        </div>
      </div>
      <ChevronDown
        class={cn(
          "w-5 h-5 text-red-400/50 transition-transform",
          expandedSections.has("permissions") && "rotate-180"
        )}
      />
    </button>

    {#if expandedSections.has("permissions")}
      <div class="mt-4 p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5 animate-fade-up">
        <div class="grid lg:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">allowed-tools 配置</h3>
            <div class="space-y-3">
              <div class="p-4 rounded-xl bg-white/5">
                <code class="text-red-400 font-mono">allowed-tools: Read</code>
                <p class="text-white/50 text-sm mt-1">单个工具</p>
              </div>
              <div class="p-4 rounded-xl bg-white/5">
                <code class="text-red-400 font-mono">allowed-tools: Read, Write, Edit</code>
                <p class="text-white/50 text-sm mt-1">多个工具（逗号分隔）</p>
              </div>
              <div class="p-4 rounded-xl bg-white/5">
                <code class="text-red-400 font-mono">allowed-tools: Bash(git:*)</code>
                <p class="text-white/50 text-sm mt-1">Bash 命令过滤</p>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-white">最佳实践</h3>
            </div>
            <pre class="p-4 rounded-xl bg-black/50 text-sm text-red-400/80 font-mono overflow-x-auto border border-red-500/10"><code>{permissionExample}</code></pre>
            <div class="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <h4 class="text-red-400 font-bold mb-2">最小权限原则</h4>
              <ul class="text-white/60 text-sm space-y-1">
                <li>• 只授予必需的权限</li>
                <li>• 避免使用 Bash(*) 通配符</li>
                <li>• 文档化权限需求</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </section>

  <!-- Section 7: MCP -->
  <section id="mcp" class="scroll-mt-32">
    <button
      class="w-full flex items-center justify-between p-5 rounded-2xl bg-[#0a0f0a] border border-teal-500/20 hover:border-teal-500/40 transition-colors group"
      onclick={() => toggleSection("mcp")}
    >
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-teal-500/10">
          <Server class="w-6 h-6 text-teal-400" />
        </div>
        <div class="text-left">
          <h2 class="text-xl font-bold text-white font-mono">7. MCP 服务器集成</h2>
          <p class="text-teal-400/50 text-sm">Model Context Protocol 配置</p>
        </div>
      </div>
      <ChevronDown
        class={cn(
          "w-5 h-5 text-teal-400/50 transition-transform",
          expandedSections.has("mcp") && "rotate-180"
        )}
      />
    </button>

    {#if expandedSections.has("mcp")}
      <div class="mt-4 p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5 animate-fade-up">
        <div class="grid lg:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">服务器类型</h3>
            <div class="space-y-2">
              {#each mcpTypes as type}
                <div class="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                  <code class="text-teal-400 font-mono min-w-[80px]">{type.type}</code>
                  <span class="text-white/40 text-sm">{type.desc}</span>
                  <span class="text-white/60 text-sm flex-1 text-right">{type.usage}</span>
                </div>
              {/each}
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-white">.mcp.json 配置</h3>
              <button
                class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                onclick={() => copyToClipboard(mcpExample, "mcp-example")}
              >
                {#if copiedId === "mcp-example"}
                  <Check class="w-4 h-4 text-green-400" />
                {:else}
                  <Copy class="w-4 h-4 text-white/40" />
                {/if}
              </button>
            </div>
            <pre class="p-4 rounded-xl bg-black/50 text-sm text-teal-400/80 font-mono overflow-x-auto border border-teal-500/10"><code>{mcpExample}</code></pre>
          </div>
        </div>
      </div>
    {/if}
  </section>

  <!-- Section 8: Environment Variables -->
  <section id="env" class="scroll-mt-32">
    <button
      class="w-full flex items-center justify-between p-5 rounded-2xl bg-[#0a0f0a] border border-orange-500/20 hover:border-orange-500/40 transition-colors group"
      onclick={() => toggleSection("env")}
    >
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-orange-500/10">
          <Variable class="w-6 h-6 text-orange-400" />
        </div>
        <div class="text-left">
          <h2 class="text-xl font-bold text-white font-mono">8. 环境变量</h2>
          <p class="text-orange-400/50 text-sm">可用变量和使用方法</p>
        </div>
      </div>
      <ChevronDown
        class={cn(
          "w-5 h-5 text-orange-400/50 transition-transform",
          expandedSections.has("env") && "rotate-180"
        )}
      />
    </button>

    {#if expandedSections.has("env")}
      <div class="mt-4 p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5 animate-fade-up">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-white/10">
                <th class="text-left py-3 text-orange-400 font-mono">变量</th>
                <th class="text-left py-3 text-orange-400 font-mono">描述</th>
                <th class="text-left py-3 text-orange-400 font-mono">适用范围</th>
              </tr>
            </thead>
            <tbody>
              {#each envVars as v}
                <tr class="border-b border-white/5 hover:bg-white/5">
                  <td class="py-3 font-mono text-orange-300">{v.name}</td>
                  <td class="py-3 text-white/60">{v.desc}</td>
                  <td class="py-3 text-white/40">{v.scope}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}
  </section>

  <!-- Section 9: Models -->
  <section id="models" class="scroll-mt-32">
    <button
      class="w-full flex items-center justify-between p-5 rounded-2xl bg-[#0a0f0a] border border-indigo-500/20 hover:border-indigo-500/40 transition-colors group"
      onclick={() => toggleSection("models")}
    >
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-indigo-500/10">
          <Cpu class="w-6 h-6 text-indigo-400" />
        </div>
        <div class="text-left">
          <h2 class="text-xl font-bold text-white font-mono">9. 模型选择</h2>
          <p class="text-indigo-400/50 text-sm">haiku, sonnet, opus, inherit</p>
        </div>
      </div>
      <ChevronDown
        class={cn(
          "w-5 h-5 text-indigo-400/50 transition-transform",
          expandedSections.has("models") && "rotate-180"
        )}
      />
    </button>

    {#if expandedSections.has("models")}
      <div class="mt-4 p-6 rounded-2xl bg-[#0a0f0a]/80 border border-white/5 animate-fade-up">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {#each models as model}
            <div class="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
              <span class={cn("px-3 py-1 rounded-full text-sm font-mono font-bold", model.color)}>{model.name}</span>
              <p class="text-white/80 font-medium mt-3">{model.features}</p>
              <p class="text-white/50 text-sm mt-2">{model.usage}</p>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </section>

  <!-- Quick Reference -->
  <section class="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 border border-emerald-500/20">
    <h2 class="text-2xl font-bold text-white font-mono mb-6 flex items-center gap-3">
      <Workflow class="w-6 h-6 text-emerald-400" />
      快速参考
    </h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="p-4 rounded-xl bg-black/30 border border-white/5">
        <h3 class="text-emerald-400 font-mono font-bold mb-2">创建新插件</h3>
        <code class="text-white/60 text-xs block">mkdir -p my-plugin/.claude-plugin</code>
      </div>
      <div class="p-4 rounded-xl bg-black/30 border border-white/5">
        <h3 class="text-cyan-400 font-mono font-bold mb-2">创建新命令</h3>
        <code class="text-white/60 text-xs block">touch commands/my-command.md</code>
      </div>
      <div class="p-4 rounded-xl bg-black/30 border border-white/5">
        <h3 class="text-violet-400 font-mono font-bold mb-2">创建新代理</h3>
        <code class="text-white/60 text-xs block">touch agents/my-agent.md</code>
      </div>
      <div class="p-4 rounded-xl bg-black/30 border border-white/5">
        <h3 class="text-amber-400 font-mono font-bold mb-2">创建新技能</h3>
        <code class="text-white/60 text-xs block">mkdir -p skills/my-skill</code>
      </div>
      <div class="p-4 rounded-xl bg-black/30 border border-white/5">
        <h3 class="text-pink-400 font-mono font-bold mb-2">配置钩子</h3>
        <code class="text-white/60 text-xs block">touch hooks/hooks.json</code>
      </div>
      <div class="p-4 rounded-xl bg-black/30 border border-white/5">
        <h3 class="text-teal-400 font-mono font-bold mb-2">配置 MCP</h3>
        <code class="text-white/60 text-xs block">touch .mcp.json</code>
      </div>
    </div>
  </section>

  <!-- Resources Footer -->
  <footer class="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
    <Button variant="ghost" href="/knowledge" class="text-emerald-400/60 hover:text-emerald-400">
      <ArrowLeft class="w-4 h-4" />
      返回知识库
    </Button>
    <div class="flex items-center gap-4">
      <a
        href="https://github.com/anthropics/claude-code"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"
      >
        <GitBranch class="w-4 h-4" />
        官方仓库
        <ExternalLink class="w-3 h-3" />
      </a>
      <span class="text-white/20">|</span>
      <span class="text-sm text-white/30 font-mono">v2026.02.01</span>
    </div>
  </footer>
</div>

<style>
  /* Terminal glow effect */
  :global(.text-emerald-400) {
    text-shadow: 0 0 10px rgba(52, 211, 153, 0.3);
  }

  /* Scanline animation */
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
</style>
