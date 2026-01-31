<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import BentoCard from "$lib/components/ui/BentoCard.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import {
    ArrowLeft,
    Terminal,
    Shield,
    TestTube,
    FileCode,
    Workflow,
    Database,
    Globe,
    Zap,
    BookOpen,
    Layers,
    CheckCircle2,
    AlertTriangle,
    Code2,
    Settings,
    GitBranch,
    Server,
    Layout,
    Brain,
    Copy,
    Check,
    X,
    ChevronRight,
  } from "lucide-svelte";

  // Copy functionality
  let copiedId = $state<string | null>(null);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    copiedId = id;
    setTimeout(() => (copiedId = null), 2000);
  }

  // Detailed agent configurations
  const agentDetails = [
    {
      name: "planner",
      description: "功能实现规划专家，制定详细实施步骤",
      command: "/plan",
      icon: Workflow,
      color: "text-violet-400",
      bg: "bg-violet-500/20",
      tools: ["Read", "Grep", "Glob"],
      model: "opus",
      features: [
        "需求分析与重述",
        "风险识别与评估",
        "分阶段实施计划",
        "复杂度估算",
        "等待用户确认后执行",
      ],
      example: `/plan 我需要添加实时通知功能

Agent 返回:
# 实施计划: 实时通知系统
## 阶段 1: 数据库设计
## 阶段 2: 通知服务
## 阶段 3: 集成点
## 风险评估
## 预估复杂度: 中等

**等待确认**: 是否执行此计划?`,
    },
    {
      name: "architect",
      description: "高级软件架构师，专注可扩展、可维护的系统设计",
      command: "Task agent",
      icon: Layers,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      tools: ["Read", "Grep", "Glob"],
      model: "opus",
      features: [
        "系统架构设计",
        "技术选型权衡",
        "设计模式推荐",
        "可扩展性分析",
        "确保代码库一致性",
      ],
      example: `常见模式:
Frontend: 组件组合、Container/Presenter、自定义 Hooks
Backend: Repository 模式、Service 层、中间件模式
Data: 数据库规范化、缓存层、最终一致性`,
    },
    {
      name: "tdd-guide",
      description: "TDD 开发引导，确保 80%+ 测试覆盖率",
      command: "/tdd",
      icon: TestTube,
      color: "text-green-400",
      bg: "bg-green-500/20",
      tools: ["Read", "Write", "Edit", "Bash", "Grep"],
      model: "opus",
      features: [
        "Red-Green-Refactor 循环",
        "先写测试再写代码",
        "单元 + 集成 + E2E 测试",
        "边界情况覆盖",
        "持续测试 (Watch Mode)",
      ],
      example: `// 1. RED: 先写失败的测试
describe('calculateScore', () => {
  it('should return high score for valid input', () => {
    expect(calculateScore(data)).toBeGreaterThan(80)
  })
})

// 2. GREEN: 写最小代码通过测试
// 3. REFACTOR: 优化代码`,
    },
    {
      name: "code-reviewer",
      description: "高级代码审查员，检查质量、安全和可维护性",
      command: "/code-review",
      icon: FileCode,
      color: "text-amber-400",
      bg: "bg-amber-500/20",
      tools: ["Read", "Grep", "Glob", "Bash"],
      model: "opus",
      features: [
        "代码质量检查",
        "安全漏洞扫描",
        "性能问题识别",
        "最佳实践建议",
        "可维护性评估",
      ],
      example: `# 审查流程:
1. git diff --name-only HEAD
2. 检查每个文件:
   - 安全问题 (硬编码密钥、SQL注入、XSS)
   - 代码质量 (复杂度、重复代码)
   - 性能问题 (N+1 查询、内存泄漏)`,
    },
    {
      name: "security-reviewer",
      description: "安全漏洞检测与修复专家，OWASP Top 10",
      command: "/security-review",
      icon: Shield,
      color: "text-red-400",
      bg: "bg-red-500/20",
      tools: ["Read", "Grep", "Glob", "Bash"],
      model: "opus",
      features: [
        "OWASP Top 10 检测",
        "密钥泄露扫描",
        "输入验证检查",
        "认证授权审计",
        "漏洞 PoC 和修复代码",
      ],
      example: `检测项目:
- SQL 注入
- XSS 跨站脚本
- SSRF 服务端请求伪造
- 硬编码凭据
- 不安全的加密
- 缺失的输入验证`,
    },
    {
      name: "build-error-resolver",
      description: "构建错误修复专家，TypeScript 类型问题",
      command: "/build-fix",
      icon: AlertTriangle,
      color: "text-orange-400",
      bg: "bg-orange-500/20",
      tools: ["Read", "Write", "Edit", "Bash", "Grep", "Glob"],
      model: "sonnet",
      features: [
        "TypeScript 类型错误",
        "构建配置问题",
        "依赖冲突解决",
        "最小化改动修复",
        "快速让构建变绿",
      ],
      example: `# 修复流程:
1. npm run build 2>&1 | head -100
2. 分析错误信息
3. 定位问题文件
4. 最小改动修复
5. 验证构建通过`,
    },
    {
      name: "e2e-runner",
      description: "Playwright E2E 测试专家",
      command: "/e2e",
      icon: Globe,
      color: "text-cyan-400",
      bg: "bg-cyan-500/20",
      tools: ["Read", "Write", "Edit", "Bash", "Grep", "Glob"],
      model: "sonnet",
      features: [
        "用户旅程测试",
        "Page Object 模式",
        "截图和视频录制",
        "Trace 上传",
        "Flaky 测试隔离",
      ],
      example: `test('用户可以搜索并查看详情', async ({ page }) => {
  await page.goto('/')
  await page.fill('input[placeholder="Search"]', 'query')
  await page.waitForResponse(resp =>
    resp.url().includes('/api/search'))
  await expect(page.locator('.result')).toBeVisible()
})`,
    },
    {
      name: "refactor-cleaner",
      description: "死代码清理和重复代码整合专家",
      command: "/refactor-clean",
      icon: Zap,
      color: "text-pink-400",
      bg: "bg-pink-500/20",
      tools: ["Read", "Write", "Edit", "Bash", "Grep", "Glob"],
      model: "sonnet",
      features: [
        "死代码检测 (knip, depcheck)",
        "未使用导出移除",
        "重复代码合并",
        "安全重构验证",
        "依赖清理",
      ],
      example: `# 分析工具:
npx knip          # 检测未使用的导出
npx depcheck      # 检测未使用的依赖
npx ts-prune      # 检测未使用的 TS 导出`,
    },
    {
      name: "doc-updater",
      description: "文档和 Codemap 同步更新专家",
      command: "/update-docs",
      icon: BookOpen,
      color: "text-indigo-400",
      bg: "bg-indigo-500/20",
      tools: ["Read", "Write", "Edit", "Bash", "Grep", "Glob"],
      model: "sonnet",
      features: [
        "Codemap 生成与更新",
        "README 同步",
        "API 文档更新",
        "变更日志维护",
        "架构图生成",
      ],
      example: `# 更新流程:
/update-codemaps  # 更新代码地图
/update-docs      # 同步所有文档

生成: docs/CODEMAPS/*.md`,
    },
  ];

  // Simple agents list for grid display
  const agents = agentDetails.map(a => ({
    name: a.name,
    description: a.description,
    command: a.command,
    icon: a.icon,
    color: a.color,
    bg: a.bg,
    tools: a.tools,
    model: a.model,
  }));

  // Selected agent for detail view
  let selectedAgent = $state<typeof agentDetails[0] | null>(null);

  const commands = [
    { name: "/tdd", description: "测试驱动开发流程", category: "开发" },
    { name: "/plan", description: "功能实现规划", category: "规划" },
    { name: "/e2e", description: "生成 E2E 测试", category: "测试" },
    { name: "/code-review", description: "代码质量审查", category: "审查" },
    { name: "/build-fix", description: "修复构建错误", category: "修复" },
    { name: "/refactor-clean", description: "清理死代码", category: "重构" },
    { name: "/test-coverage", description: "测试覆盖率分析", category: "测试" },
    { name: "/update-codemaps", description: "更新代码地图", category: "文档" },
    { name: "/update-docs", description: "同步文档", category: "文档" },
    { name: "/security-review", description: "安全审查", category: "安全" },
  ];

  const skills = [
    {
      name: "tdd-workflow",
      description: "TDD 工作流，80%+ 覆盖率要求",
      path: "~/.claude/skills/tdd-workflow/",
    },
    {
      name: "security-review",
      description: "安全审查，OWASP Top 10 检测",
      path: "~/.claude/skills/security-review/",
    },
    {
      name: "coding-standards",
      description: "编码标准，最佳实践",
      path: "~/.claude/skills/coding-standards.md",
    },
    {
      name: "backend-patterns",
      description: "后端模式：API、数据库、缓存",
      path: "~/.claude/skills/backend-patterns.md",
    },
    {
      name: "frontend-patterns",
      description: "前端模式：React、Next.js",
      path: "~/.claude/skills/frontend-patterns.md",
    },
    {
      name: "postgres-patterns",
      description: "PostgreSQL 优化，Supabase 最佳实践",
      path: "~/.claude/skills/postgres-patterns.md",
    },
    {
      name: "golang-patterns",
      description: "Go 语言惯用模式",
      path: "~/.claude/skills/golang-patterns.md",
    },
    {
      name: "springboot-patterns",
      description: "Spring Boot 架构模式",
      path: "~/.claude/skills/springboot-patterns.md",
    },
    {
      name: "clickhouse-io",
      description: "ClickHouse 分析查询",
      path: "~/.claude/skills/clickhouse-io.md",
    },
    {
      name: "continuous-learning",
      description: "会话模式提取，自动学习",
      path: "~/.claude/skills/continuous-learning/",
    },
  ];

  const mcpServers = [
    { name: "github", description: "GitHub 操作 - PR、Issues、Repos", icon: GitBranch },
    { name: "supabase", description: "Supabase 数据库操作", icon: Database },
    { name: "vercel", description: "Vercel 部署和项目管理", icon: Globe },
    { name: "railway", description: "Railway 部署", icon: Server },
    { name: "memory", description: "跨会话持久化记忆", icon: Brain },
    { name: "context7", description: "实时文档查询", icon: BookOpen },
    { name: "clickhouse", description: "ClickHouse 分析查询", icon: Database },
    { name: "cloudflare-docs", description: "Cloudflare 文档搜索", icon: Globe },
    { name: "firecrawl", description: "网页抓取和爬虫", icon: Globe },
  ];

  const installCode = `# 克隆仓库
git clone https://github.com/affaan-m/everything-claude-code.git

# 复制配置文件
cp everything-claude-code/agents/*.md ~/.claude/agents/
cp everything-claude-code/rules/*.md ~/.claude/rules/
cp everything-claude-code/commands/*.md ~/.claude/commands/
cp -r everything-claude-code/skills/* ~/.claude/skills/`;

  const hookConfigCode = `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "tool == \\"Edit\\" && tool_input.file_path matches \\"\\\\.(ts|tsx|js|jsx)$\\"",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write \\"$file_path\\""
          }
        ],
        "description": "Auto-format JS/TS files after edits"
      }
    ]
  }
}`;

  const workflowCode = `# 推荐工作流

1. /plan          # 规划功能实现
2. /tdd           # TDD 开发
3. /build-fix     # 修复构建错误
4. /code-review   # 代码审查
5. /e2e           # E2E 测试
6. /security-review # 安全审查`;

  const claudeMdCode = `# Project CLAUDE.md

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
- \`/tdd\` - 测试驱动开发
- \`/plan\` - 创建实施计划
- \`/code-review\` - 代码质量审查`;

  const securityBadCode = `// SQL 注入漏洞
const query = \`SELECT * FROM users
  WHERE id = \${userId}\`

// XSS 漏洞 (使用 .innerHTML)
element.innerHTML = userInput

// 硬编码密钥
const apiKey = "sk-xxx"`;

  const securityGoodCode = `// 参数化查询
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)

// 使用 textContent 或转义
element.textContent = userInput

// 使用环境变量
const apiKey = process.env.API_KEY`;
</script>

<div class="max-w-5xl mx-auto space-y-10">
  <!-- Header -->
  <div class="flex items-center gap-4">
    <a href="/knowledge" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <ArrowLeft class="w-5 h-5 text-white/60" />
    </a>
    <div class="flex-1">
      <h1 class="text-3xl font-bold text-white">Everything Claude Code</h1>
      <p class="text-white/50 mt-1">完整的 Claude Code 配置生态系统指南</p>
    </div>
    <a
      href="https://github.com/affaan-m/everything-claude-code"
      target="_blank"
      class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-sm transition-colors"
    >
      GitHub →
    </a>
  </div>

  <!-- Hero -->
  <BentoCard
    variant="gradient"
    gradient="linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(59,130,246,0.2) 100%)"
    class="p-8"
  >
    <div class="flex items-start gap-6">
      <div class="p-4 rounded-2xl bg-white/10">
        <Terminal class="w-10 h-10 text-violet-400" />
      </div>
      <div class="flex-1">
        <h2 class="text-2xl font-bold text-white mb-2">生产级 Claude Code 配置</h2>
        <p class="text-white/70 leading-relaxed">
          包含专用 Agents、Skills、Hooks、Commands 和 Rules 的完整配置系统。
          经过 10+ 个月密集使用，在真实产品中不断演进。
        </p>
        <div class="flex flex-wrap gap-3 mt-4">
          <span class="px-3 py-1 rounded-full text-sm bg-violet-500/20 text-violet-300">安全优先</span>
          <span class="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-300">TDD 驱动</span>
          <span class="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300">模块化设计</span>
        </div>
      </div>
    </div>
  </BentoCard>

  <!-- Quick Install -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Settings class="w-5 h-5 text-white/60" />
      快速安装
    </h2>
    <BentoCard variant="glass" class="p-6">
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm text-white/50">Terminal</span>
        <button
          class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          onclick={() => copyToClipboard(installCode, "install")}
        >
          {#if copiedId === "install"}
            <Check class="w-4 h-4 text-green-400" />
          {:else}
            <Copy class="w-4 h-4 text-white/40" />
          {/if}
        </button>
      </div>
      <pre class="text-sm text-white/80 font-mono overflow-x-auto"><code>{installCode}</code></pre>
    </BentoCard>
  </section>

  <!-- Agents -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Brain class="w-5 h-5 text-white/60" />
      专用 Agents
    </h2>
    <p class="text-white/50 text-sm mb-4">
      专用子代理，处理特定领域任务。存放于 <code class="text-white/70">~/.claude/agents/</code>。点击卡片查看详情。
    </p>
    <div class="grid md:grid-cols-3 gap-4">
      {#each agents as agent, i}
        {@const Icon = agent.icon}
        <button
          class="text-left p-4 rounded-2xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-200"
          onclick={() => selectedAgent = agentDetails[i]}
        >
          <div class="flex items-start gap-3">
            <div class={cn("p-2 rounded-xl", agent.bg)}>
              <Icon class={cn("w-5 h-5", agent.color)} />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-white">{agent.name}</h3>
              <p class="text-sm text-white/50 mt-0.5 line-clamp-2">{agent.description}</p>
              <div class="flex items-center gap-2 mt-2">
                <code class="text-xs text-violet-400">{agent.command}</code>
                <span class="text-xs text-white/30">· {agent.model}</span>
              </div>
              <div class="flex flex-wrap gap-1 mt-2">
                {#each agent.tools.slice(0, 3) as tool}
                  <span class="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-white/40">{tool}</span>
                {/each}
                {#if agent.tools.length > 3}
                  <span class="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-white/40">+{agent.tools.length - 3}</span>
                {/if}
              </div>
            </div>
          </div>
        </button>
      {/each}
    </div>

    <!-- Agent Detail Modal -->
    {#if selectedAgent}
      {@const Icon = selectedAgent.icon}
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        onclick={(e) => { if (e.target === e.currentTarget) selectedAgent = null; }}
        onkeydown={(e) => { if (e.key === 'Escape') selectedAgent = null; }}
      >
        <div class="fixed inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div class="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#1c1c1e] border border-white/10 shadow-2xl">
          <!-- Header -->
          <div class="sticky top-0 z-10 p-6 pb-4 bg-[#1c1c1e] border-b border-white/10">
            <button
              class="absolute right-4 top-4 p-2 rounded-xl hover:bg-white/10 transition-colors"
              onclick={() => selectedAgent = null}
            >
              <X class="w-5 h-5 text-white/60" />
            </button>
            <div class="flex items-center gap-4">
              <div class={cn("p-3 rounded-2xl", selectedAgent.bg)}>
                <Icon class={cn("w-8 h-8", selectedAgent.color)} />
              </div>
              <div>
                <h3 class="text-2xl font-bold text-white">{selectedAgent.name}</h3>
                <p class="text-white/50 mt-1">{selectedAgent.description}</p>
              </div>
            </div>
          </div>

          <div class="p-6 space-y-6">
            <!-- Meta -->
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 rounded-2xl bg-white/5">
                <p class="text-xs text-white/40 mb-1">调用命令</p>
                <code class="text-violet-400 font-medium">{selectedAgent.command}</code>
              </div>
              <div class="p-4 rounded-2xl bg-white/5">
                <p class="text-xs text-white/40 mb-1">模型</p>
                <span class="text-white font-medium">{selectedAgent.model}</span>
              </div>
            </div>

            <!-- Tools -->
            <div>
              <h4 class="text-sm font-medium text-white/80 mb-3">可用工具</h4>
              <div class="flex flex-wrap gap-2">
                {#each selectedAgent.tools as tool}
                  <span class="px-3 py-1.5 rounded-xl bg-white/5 text-white/70 text-sm">{tool}</span>
                {/each}
              </div>
            </div>

            <!-- Features -->
            <div>
              <h4 class="text-sm font-medium text-white/80 mb-3">核心功能</h4>
              <ul class="space-y-2">
                {#each selectedAgent.features as feature}
                  <li class="flex items-center gap-2 text-white/70 text-sm">
                    <CheckCircle2 class="w-4 h-4 text-green-400 shrink-0" />
                    {feature}
                  </li>
                {/each}
              </ul>
            </div>

            <!-- Example -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-medium text-white/80">示例用法</h4>
                <button
                  class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  onclick={() => copyToClipboard(selectedAgent?.example || '', 'agent-example')}
                >
                  {#if copiedId === 'agent-example'}
                    <Check class="w-4 h-4 text-green-400" />
                  {:else}
                    <Copy class="w-4 h-4 text-white/40" />
                  {/if}
                </button>
              </div>
              <pre class="p-4 rounded-2xl bg-black/30 text-sm text-white/70 font-mono overflow-x-auto whitespace-pre-wrap"><code>{selectedAgent.example}</code></pre>
            </div>

            <!-- Agent Definition -->
            <div>
              <h4 class="text-sm font-medium text-white/80 mb-3">Agent 定义格式</h4>
              <pre class="p-4 rounded-2xl bg-black/30 text-sm text-white/60 font-mono overflow-x-auto"><code>{`---
name: ${selectedAgent.name}
description: ${selectedAgent.description}
tools: ${selectedAgent.tools.join(', ')}
model: ${selectedAgent.model}
---

You are a ${selectedAgent.name} specialist...`}</code></pre>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </section>

  <!-- Commands -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Terminal class="w-5 h-5 text-white/60" />
      斜杠命令
    </h2>
    <p class="text-white/50 text-sm mb-4">
      快速执行的命令。存放于 <code class="text-white/70">~/.claude/commands/</code>
    </p>
    <BentoCard variant="glass" class="overflow-hidden">
      <div class="grid grid-cols-2 md:grid-cols-5 divide-x divide-y divide-white/5">
        {#each commands as cmd}
          <div class="p-4 hover:bg-white/5 transition-colors">
            <code class="text-violet-400 font-medium">{cmd.name}</code>
            <p class="text-sm text-white/50 mt-1">{cmd.description}</p>
            <span class="text-xs text-white/30 mt-2 block">{cmd.category}</span>
          </div>
        {/each}
      </div>
    </BentoCard>
  </section>

  <!-- Skills -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Code2 class="w-5 h-5 text-white/60" />
      技能 (Skills)
    </h2>
    <p class="text-white/50 text-sm mb-4">
      工作流定义和领域知识。存放于 <code class="text-white/70">~/.claude/skills/</code>
    </p>
    <div class="space-y-3">
      {#each skills as skill}
        <BentoCard variant="outline" class="p-4 hover:bg-white/5 transition-colors">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium text-white">{skill.name}</h3>
              <p class="text-sm text-white/50">{skill.description}</p>
            </div>
            <code class="text-xs text-white/30 font-mono">{skill.path}</code>
          </div>
        </BentoCard>
      {/each}
    </div>
  </section>

  <!-- MCP Servers -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Server class="w-5 h-5 text-white/60" />
      MCP 服务器配置
    </h2>
    <p class="text-white/50 text-sm mb-4">
      外部服务集成。配置于 <code class="text-white/70">~/.claude.json</code>。建议每个项目不超过 10 个。
    </p>
    <div class="grid md:grid-cols-3 gap-4">
      {#each mcpServers as server}
        {@const Icon = server.icon}
        <BentoCard variant="outline" class="p-4">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-xl bg-white/5">
              <Icon class="w-5 h-5 text-white/60" />
            </div>
            <div>
              <h3 class="font-medium text-white">{server.name}</h3>
              <p class="text-sm text-white/40">{server.description}</p>
            </div>
          </div>
        </BentoCard>
      {/each}
    </div>
  </section>

  <!-- Recommended Workflow -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Workflow class="w-5 h-5 text-white/60" />
      推荐工作流
    </h2>
    <div class="grid md:grid-cols-2 gap-6">
      <BentoCard variant="glass" class="p-6">
        <h3 class="font-medium text-white mb-3">开发流程</h3>
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm text-white/50">Workflow</span>
          <button
            class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            onclick={() => copyToClipboard(workflowCode, "workflow")}
          >
            {#if copiedId === "workflow"}
              <Check class="w-4 h-4 text-green-400" />
            {:else}
              <Copy class="w-4 h-4 text-white/40" />
            {/if}
          </button>
        </div>
        <pre class="text-sm text-white/70 font-mono whitespace-pre-wrap"><code>{workflowCode}</code></pre>
      </BentoCard>

      <BentoCard variant="glass" class="p-6">
        <h3 class="font-medium text-white mb-3">核心原则</h3>
        <ul class="space-y-3 text-sm text-white/70">
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <span><strong class="text-white">Agent 优先</strong> - 专用子代理处理委托任务</span>
          </li>
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <span><strong class="text-white">TDD 工作流</strong> - 先写测试，80%+ 覆盖率</span>
          </li>
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <span><strong class="text-white">安全优先</strong> - OWASP Top 10 检测</span>
          </li>
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <span><strong class="text-white">模块化设计</strong> - 按需选择配置</span>
          </li>
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <span><strong class="text-white">Hooks 自动化</strong> - 格式化、Lint、安全检查</span>
          </li>
        </ul>
      </BentoCard>
    </div>
  </section>

  <!-- Hooks Config -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Zap class="w-5 h-5 text-white/60" />
      Hooks 配置示例
    </h2>
    <BentoCard variant="glass" class="p-6">
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm text-white/50">~/.claude/settings.json</span>
        <button
          class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          onclick={() => copyToClipboard(hookConfigCode, "hooks")}
        >
          {#if copiedId === "hooks"}
            <Check class="w-4 h-4 text-green-400" />
          {:else}
            <Copy class="w-4 h-4 text-white/40" />
          {/if}
        </button>
      </div>
      <pre class="text-sm text-white/70 font-mono overflow-x-auto"><code>{hookConfigCode}</code></pre>
    </BentoCard>
  </section>

  <!-- CLAUDE.md Template -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <FileCode class="w-5 h-5 text-white/60" />
      CLAUDE.md 模板
    </h2>
    <BentoCard variant="glass" class="p-6">
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm text-white/50">项目根目录/CLAUDE.md</span>
        <button
          class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          onclick={() => copyToClipboard(claudeMdCode, "claudemd")}
        >
          {#if copiedId === "claudemd"}
            <Check class="w-4 h-4 text-green-400" />
          {:else}
            <Copy class="w-4 h-4 text-white/40" />
          {/if}
        </button>
      </div>
      <pre class="text-sm text-white/70 font-mono overflow-x-auto whitespace-pre-wrap"><code>{claudeMdCode}</code></pre>
    </BentoCard>
  </section>

  <!-- Security Patterns -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Shield class="w-5 h-5 text-red-400" />
      安全模式
    </h2>
    <div class="grid md:grid-cols-2 gap-4">
      <BentoCard variant="outline" class="p-5 border-red-500/20">
        <h3 class="font-medium text-red-400 mb-3">❌ 错误示例</h3>
        <pre class="text-sm text-white/60 font-mono overflow-x-auto"><code>{securityBadCode}</code></pre>
      </BentoCard>
      <BentoCard variant="outline" class="p-5 border-green-500/20">
        <h3 class="font-medium text-green-400 mb-3">✅ 正确示例</h3>
        <pre class="text-sm text-white/60 font-mono overflow-x-auto"><code>{securityGoodCode}</code></pre>
      </BentoCard>
    </div>
  </section>

  <!-- Footer -->
  <div class="flex items-center justify-between pt-6 border-t border-white/10">
    <Button variant="ghost" href="/knowledge" class="text-white/60">
      <ArrowLeft class="w-4 h-4" />
      返回知识库
    </Button>
    <span class="text-sm text-white/30">
      数据来源: Context7 · affaan-m/everything-claude-code
    </span>
  </div>
</div>
