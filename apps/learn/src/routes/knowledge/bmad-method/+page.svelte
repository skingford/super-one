<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import BentoCard from "$lib/components/ui/BentoCard.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import {
    ArrowLeft,
    Brain,
    Workflow,
    Search,
    FileText,
    Code,
    Layers,
    Users,
    Shield,
    TrendingUp,
    Palette,
    TestTube,
    GitBranch,
    Settings,
    CheckCircle2,
    Copy,
    Check,
    X,
    ChevronRight,
    Zap,
    BookOpen,
    Terminal,
    Sparkles,
    Target,
    Lightbulb,
    Puzzle,
    Play,
    Repeat,
    MonitorSmartphone,
    Globe,
    Package,
    MessageSquare,
    FileCog,
  } from "lucide-svelte";

  // Copy functionality
  let copiedId = $state<string | null>(null);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    copiedId = id;
    setTimeout(() => (copiedId = null), 2000);
  }

  // Four Development Phases
  const phases = [
    {
      id: "analysis",
      name: "Phase 1: Analysis",
      icon: Search,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      gradient: "from-blue-500/20 to-cyan-500/5",
      description: "头脑风暴、研究发现、创建产品简介",
      activities: ["头脑风暴 (30+ 技术)", "研究与发现", "产品简介创建", "项目初始化"],
    },
    {
      id: "planning",
      name: "Phase 2: Planning",
      icon: Target,
      color: "text-violet-400",
      bg: "bg-violet-500/20",
      gradient: "from-violet-500/20 to-fuchsia-500/5",
      description: "创建 PRD 或 Tech-Spec（始终必需）",
      activities: ["PRD 创建", "Epic/Story 拆分", "需求定义", "范围与约束"],
    },
    {
      id: "solutioning",
      name: "Phase 3: Solutioning",
      icon: Puzzle,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      gradient: "from-emerald-500/20 to-teal-500/5",
      description: "架构设计与实现就绪验证（Level 2-4）",
      activities: ["架构设计", "技术选型", "实现就绪验证", "UX 设计"],
    },
    {
      id: "implementation",
      name: "Phase 4: Implementation",
      icon: Play,
      color: "text-amber-400",
      bg: "bg-amber-500/20",
      gradient: "from-amber-500/20 to-orange-500/5",
      description: "按 Sprint → Epic → Story 逐步构建",
      activities: ["Sprint 规划", "Story 实现", "代码审查", "持续迭代"],
    },
  ];

  // Specialized Agents
  const bmadAgents = [
    {
      name: "Analyst",
      abbrev: "AN",
      description: "项目初始化、需求分析和头脑风暴",
      icon: Search,
      color: "text-indigo-400",
      bg: "bg-indigo-500/20",
      phase: "Analysis",
      features: ["项目初始化 (*workflow-init)", "头脑风暴 30+ 技术 (*brainstorm)", "需求分析与发现", "可行性评估与风险识别"],
      command: "*workflow-init / *brainstorm",
    },
    {
      name: "Product Manager",
      abbrev: "PM",
      description: "创建 PRD、需求文档和 Epic 拆分",
      icon: FileText,
      color: "text-violet-400",
      bg: "bg-violet-500/20",
      phase: "Planning",
      features: ["PRD 创建 (*prd)", "Epic/Story 拆分 (*create-epics-and-stories)", "需求收集与范围定义", "用户故事编写"],
      command: "*prd / *create-epics-and-stories",
    },
    {
      name: "Architect",
      abbrev: "Architect",
      description: "系统架构设计和实现就绪验证",
      icon: Layers,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      phase: "Solutioning",
      features: ["架构文档 (*create-architecture)", "实现就绪验证 (*implementation-readiness)", "技术选型与设计模式", "可扩展性分析"],
      command: "*create-architecture / *implementation-readiness",
    },
    {
      name: "Scrum Master",
      abbrev: "SM",
      description: "Sprint 规划和 Story 管理",
      icon: Workflow,
      color: "text-amber-400",
      bg: "bg-amber-500/20",
      phase: "Solutioning/Implementation",
      features: ["Sprint 规划 (*sprint-planning)", "Story 创建 (*create-story)", "进度跟踪 (*workflow-status)", "团队协调"],
      command: "*sprint-planning / *create-story",
    },
    {
      name: "Developer",
      abbrev: "DEV",
      description: "Story 实现和代码审查",
      icon: Code,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      phase: "Implementation",
      features: ["Story 实现 (*dev-story)", "代码审查 (*code-review)", "技术实现与调试", "代码质量保证"],
      command: "*dev-story / *code-review",
    },
    {
      name: "Test Engineer",
      abbrev: "TEA",
      description: "质量工程、测试策略和自动化",
      icon: TestTube,
      color: "text-green-400",
      bg: "bg-green-500/20",
      phase: "Implementation",
      features: ["测试策略制定", "自动化测试架构", "质量保证与覆盖分析", "测试用例设计"],
      command: "[TEA] menu commands",
    },
    {
      name: "UX Designer",
      abbrev: "UX",
      description: "用户体验设计和界面原型",
      icon: Palette,
      color: "text-pink-400",
      bg: "bg-pink-500/20",
      phase: "Solutioning",
      features: ["用户体验设计", "界面原型与交互", "可用性分析", "设计系统构建"],
      command: "[UX] menu commands",
    },
    {
      name: "Technical Writer",
      abbrev: "TW",
      description: "技术文档和 API 文档编写",
      icon: BookOpen,
      color: "text-orange-400",
      bg: "bg-orange-500/20",
      phase: "All Phases",
      features: ["技术文档编写", "API 文档生成", "用户指南", "README 和变更日志"],
      command: "[TW] menu commands",
    },
    {
      name: "Security Engineer",
      abbrev: "SEC",
      description: "安全审计、漏洞防护和合规检查",
      icon: Shield,
      color: "text-red-400",
      bg: "bg-red-500/20",
      phase: "All Phases",
      features: ["安全审计", "漏洞检测与防护", "安全最佳实践", "合规性检查"],
      command: "[SEC] menu commands",
    },
    {
      name: "Product Owner",
      abbrev: "PO",
      description: "需求管理、文档一致性和 Epic 分片",
      icon: Target,
      color: "text-yellow-400",
      bg: "bg-yellow-500/20",
      phase: "Planning/Solutioning",
      features: ["文档一致性验证", "Epic 分片 (shard-epics)", "文档分片 (*shard-doc)", "项目进度总览 (*status)"],
      command: "/po *status / *shard-doc",
    },
    {
      name: "QA Engineer",
      abbrev: "QA",
      description: "代码审查、质量保证和重构建议",
      icon: CheckCircle2,
      color: "text-teal-400",
      bg: "bg-teal-500/20",
      phase: "Implementation",
      features: ["代码审查", "质量保证", "重构建议", "最佳实践检查"],
      command: "/qa",
    },
    {
      abbrev: "QF",
      description: "独立快速任务执行",
      icon: Zap,
      color: "text-cyan-400",
      bg: "bg-cyan-500/20",
      phase: "Any",
      features: ["快速独立任务", "无需完整工作流", "即时执行", "轻量级操作"],
      command: "[QF] menu commands",
    },
  ];

  // Selected agent for detail view
  let selectedAgent = $state<(typeof bmadAgents)[0] | null>(null);

  // Core Workflows
  const workflows = [
    { command: "*workflow-init", agent: "Analyst", purpose: "初始化新项目，定义目标和规划轨道", category: "初始化" },
    { command: "*workflow-status", agent: "Any", purpose: "检查当前阶段进度和下一步", category: "状态" },
    { command: "*brainstorm", agent: "Analyst", purpose: "使用 30+ 技术进行头脑风暴", category: "分析" },
    { command: "*prd", agent: "PM", purpose: "创建产品需求文档 (PRD)", category: "规划" },
    { command: "*create-prd", agent: "PM", purpose: "创建 PRD（*prd 别名）", category: "规划" },
    { command: "*create-epics-and-stories", agent: "PM", purpose: "将 PRD 拆分为 Epics 和 Stories", category: "规划" },
    { command: "*create-architecture", agent: "Architect", purpose: "生成系统架构文档", category: "设计" },
    { command: "*implementation-readiness", agent: "Architect", purpose: "验证规划一致性和实现就绪", category: "设计" },
    { command: "*sprint-planning", agent: "SM", purpose: "初始化 Sprint 跟踪", category: "开发" },
    { command: "*create-story", agent: "SM", purpose: "从 Epic Backlog 生成 Story 文件", category: "开发" },
    { command: "*dev-story", agent: "DEV", purpose: "实现一个 Story", category: "开发" },
    { command: "*code-review", agent: "DEV", purpose: "代码质量验证和审查", category: "审查" },
  ];

  const agentCommandTable = bmadAgents.map((agent) => ({
    name: agent.name,
    abbrev: agent.abbrev,
    command: agent.command,
    phase: agent.phase,
    purpose: agent.description,
  }));

  // Agent Types
  const agentTypes = [
    {
      name: "Simple Agent",
      description: "单个 YAML 文件配置，基础功能",
      features: ["单文件 YAML 配置", "Persona + Role 定义", "Menu 命令", "hasSidecar: false"],
      example: "commit-poet agent",
      color: "text-blue-400",
      bg: "bg-blue-500/20",
    },
    {
      name: "Expert Agent",
      description: "YAML + Sidecars（指令/记忆/模板/知识库）",
      features: ["hasSidecar: true", "memories 记忆存储", "templates 模板", "knowledge 知识库"],
      example: "journal-keeper agent",
      color: "text-violet-400",
      bg: "bg-violet-500/20",
    },
    {
      name: "Module Agent",
      description: "完整模块的一部分，共享资源和工作流",
      features: ["模块集成 (BMM/BMB/CIS)", "共享 workflows", "编译为 XML 格式", "IDE 平台适配"],
      example: "BMM: architect, PM, DEV agents",
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
    },
  ];

  // Complexity Levels
  const complexityLevels = [
    { level: "Level 0", name: "Trivial", description: "极简项目，直接编码", phases: "Phase 4 only" },
    { level: "Level 1", name: "Simple", description: "简单项目，需要 PRD/Tech-Spec", phases: "Phase 2 → 4" },
    { level: "Level 2", name: "Moderate", description: "中等项目，需要架构设计", phases: "Phase 2 → 3 → 4" },
    { level: "Level 3", name: "Complex", description: "复杂项目，完整流程", phases: "Phase 1 → 2 → 3 → 4" },
    { level: "Level 4", name: "Enterprise", description: "企业级项目，全面深度规划", phases: "Phase 1 → 2 → 3 → 4 (深度)" },
  ];

  // Supported Platforms
  const supportedIDEs = [
    { name: "Claude Code", status: "IDE" },
    { name: "Cursor", status: "IDE" },
    { name: "Windsurf", status: "IDE" },
    { name: "VS Code", status: "IDE" },
    { name: "Cline", status: "IDE" },
    { name: "Antigravity", status: "IDE" },
    { name: "ChatGPT (GPTs)", status: "Web UI" },
    { name: "Gemini (Gems)", status: "Web UI" },
    { name: "Claude Web", status: "Web UI" },
  ];

  // Claude Code Slash Commands (practical usage)
  const slashCommands = [
    { command: "/analyst", agent: "Analyst", action: "启动头脑风暴，探索项目背景、目标用户、核心需求，自动生成 Project Brief" },
    { command: "/pm", agent: "PM", action: "分析 Project Brief，自动生成 PRD，创建 Epic Stories，确定功能优先级" },
    { command: "/ux-expert", agent: "UX", action: "创建前端规格说明，用户体验设计和界面原型" },
    { command: "/architect", agent: "Architect", action: "分析 PRD 和 Epic，设计系统架构文档，确定技术栈、数据库、API 结构" },
    { command: "/po", agent: "PO", action: "确保文档一致性，管理 Epic 分片，查看项目进度 (*status)" },
    { command: "/sm", agent: "SM", action: "基于 PRD/Epic/架构文档，创建下一个 User Story，定义验收标准" },
    { command: "/dev", agent: "DEV", action: "接收 User Story，执行编码、单元测试、集成测试，交付实现" },
    { command: "/qa", agent: "QA", action: "代码审查、质量保证、重构建议" },
  ];

  // BMAD Meta Commands
  const metaCommands = [
    { command: "*help", description: "查看所有可用命令" },
    { command: "*status", description: "检查当前状态和进度" },
    { command: "*exit", description: "退出当前 Agent" },
    { command: "*create", description: "创建下一个 Story（SM Agent）" },
    { command: "*shard-doc", description: "文档分片，如 *shard-doc docs/prd.md prd" },
    { command: "#bmad-orchestrator", description: "随时获取引导帮助（Web UI）" },
  ];

  // Development Modes
  const devModes = [
    {
      name: "Progressive 模式",
      description: "稳步推进，质量优先，适合正式项目",
      color: "text-blue-400",
      bg: "bg-blue-500/20",
    },
    {
      name: "YOLO 模式",
      description: "快速原型，探索验证，适合 MVP 和概念验证",
      color: "text-amber-400",
      bg: "bg-amber-500/20",
    },
  ];

  // Use Cases
  const useCases = [
    { title: "独立开发者", description: "一人拥有完整团队能力，独立完成项目" },
    { title: "小型团队", description: "补充技能缺口，AI Agent 填补角色空白" },
    { title: "快速原型", description: "快速验证产品想法，从概念到可运行代码" },
    { title: "技能学习", description: "通过 AI Agent 学习不同角色的工作流程" },
    { title: "非技术领域", description: "商业计划、创意写作、课程设计、市场分析" },
  ];

  // Expansion Packs
  const expansionPacks = [
    {
      name: "Business Strategy",
      description: "商业策略扩展包",
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      agents: ["Market Analyst 市场分析", "Financial Analyst 财务分析", "Operations Manager 运营管理", "Marketing Strategist 增长策略"],
    },
    {
      name: "Creative Writing",
      description: "创意写作扩展包",
      color: "text-pink-400",
      bg: "bg-pink-500/20",
      agents: ["Plot Architect 情节架构", "Character Psychologist 角色心理", "World Builder 世界构建", "Editor 编辑校对"],
    },
    {
      name: "Health & Fitness",
      description: "健康管理扩展包",
      color: "text-green-400",
      bg: "bg-green-500/20",
      agents: ["Fitness Coach 健身教练", "Nutritionist 营养师", "Sleep Coach 睡眠教练", "Stress Manager 压力管理"],
    },
  ];

  // Context Engineering Features
  const contextFeatures = [
    { title: "自包含模板", description: "模板内嵌输出格式和 AI 处理指令" },
    { title: "变量替换系统", description: "使用 {{variable}} 动态注入上下文" },
    { title: "条件逻辑", description: "根据项目需求自动调整模板内容" },
    { title: "上下文传递", description: "Agent 间无缝传递完整项目上下文" },
  ];

  // Best Practices
  const bestPractices = [
    {
      title: "使用全新对话",
      description: "每个工作流始终启动新的对话，避免上下文污染",
      icon: Sparkles,
    },
    {
      title: "遵循阶段进展",
      description: "按 Analysis → Planning → Solutioning → Implementation 顺序推进",
      icon: Workflow,
    },
    {
      title: "利用 Agent 专业知识",
      description: "在每个阶段使用对应的专业 Agent，不要混用",
      icon: Users,
    },
    {
      title: "检查工作流状态",
      description: "使用 *workflow-status 查看 bmm-workflow-status.md 了解进度",
      icon: Target,
    },
    {
      title: "自适应复杂度",
      description: "系统根据项目复杂度（Level 0-4）自动调整规划深度",
      icon: Settings,
    },
    {
      title: "V6: Epics 在架构之后",
      description: "v6 中 Epics 在架构设计完成后创建，提升质量",
      icon: Lightbulb,
    },
  ];

  // Code examples
  const installCode = `# 安装 BMAD-METHOD (v6 alpha)
npx bmad-method@alpha install

# 交互式安装器会引导你:
# 1. 选择安装位置（推荐当前目录）
# 2. 选择 AI 工具（Claude Code / Cursor / Windsurf / VS Code）
# 3. 选择模块（BMM = BMad Method）
# 4. 配置保存在 _bmad/[module]/config.yaml

# 初始化项目
# 加载 Analyst agent 并运行 *workflow-init`;

  const agentYamlCode = `# v6 Agent YAML Schema
id: analyst                    # 唯一标识符 [a-z0-9-]
name: "Mary"                   # Agent 人格名称
persona: "Thoughtful, detail-oriented treasure hunter"
role: |
  Expert business analyst who treats requirements
  analysis like a treasure hunt.

expertise:                     # 专业领域列表
  - Requirements gathering and elicitation
  - Stakeholder communication
  - Product documentation

tools:                         # 可用工具
  - brainstorming-techniques
  - elicitation-methods
  - bmad-knowledge-base

communication_language: en     # 交流语言
output_language: en            # 输出语言
skill_level: all               # beginner|intermediate|advanced|all
hasSidecar: false              # 是否有 Sidecar 支持文件

menu:                          # 菜单命令
  - trigger: "brainstorm"
    workflow: "brainstorm-project"
    description: "Brainstorm project ideas using 30+ techniques"
  - trigger: "prd"
    workflow: "prd"
    description: "Create comprehensive PRD"

prompts:                       # 可复用提示
  - id: main-action
    content: |
      <instructions>What this does</instructions>
      <process>1. Step one 2. Step two</process>

memories:                      # 可选：记忆存储
  - context-memory-file`;

  const workflowExampleCode = `# 完整开发流程（Pipeline）
# brainstorming → research → brief → PRD → UX →
# architecture → epics → sprint-planning →
# implement-story → review → repeat

# Phase 1: Analysis（分析）
1. *workflow-init              # 初始化项目（Analyst）
2. *brainstorm                 # 头脑风暴 30+ 技术（Analyst）

# Phase 2: Planning（规划）
3. *prd                        # 创建 PRD（PM）
4. *create-epics-and-stories   # 拆分 Epics/Stories（PM）

# Phase 3: Solutioning（方案设计）
5. *create-architecture        # 设计架构（Architect）
6. *implementation-readiness   # 验证实现就绪（Architect）

# Phase 4: Implementation（实现）
7. *sprint-planning            # Sprint 规划（SM）
8. *create-story               # 创建 Story（SM）
9. *dev-story                  # 实现 Story（DEV）
10. *code-review               # 代码审查（DEV）

# 随时可用
*workflow-status               # 检查进度（Any Agent）`;
</script>

<div class="max-w-5xl mx-auto space-y-10">
  <!-- Header -->
  <div class="flex items-center gap-4">
    <a href="/knowledge" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <ArrowLeft class="w-5 h-5 text-white/60" />
    </a>
    <div class="flex-1">
      <h1 class="text-3xl font-bold text-white">BMAD-METHOD</h1>
      <p class="text-white/50 mt-1">Breakthrough Method for Agile AI-Driven Development</p>
    </div>
    <a
      href="https://github.com/bmad-code-org/BMAD-METHOD"
      target="_blank"
      class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-sm transition-colors"
    >
      GitHub →
    </a>
  </div>

  <!-- Hero -->
  <BentoCard
    variant="gradient"
    gradient="linear-gradient(135deg, rgba(16,185,129,0.4) 0%, rgba(59,130,246,0.2) 100%)"
    class="p-8"
  >
    <div class="flex items-start gap-6">
      <div class="p-4 rounded-2xl bg-white/10">
        <Brain class="w-10 h-10 text-emerald-400" />
      </div>
      <div class="flex-1">
        <h2 class="text-2xl font-bold text-white mb-2">AI Agent 编排框架 · 敏捷驱动开发</h2>
        <p class="text-white/70 leading-relaxed">
          BMAD-METHOD 是一个开源的 AI Agent 编排框架，模拟完整敏捷团队实现人机协作。
          不仅限于软件开发，通过 Expansion Packs 可扩展到商业策略、创意写作等任何领域。
          支持 IDE（开发）和 Web UI（规划）两种协作模式，覆盖 9 大平台。
        </p>
        <div class="flex flex-wrap gap-3 mt-4">
          <span class="px-3 py-1 rounded-full text-sm bg-emerald-500/20 text-emerald-300">AI Agent 编排</span>
          <span class="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300">敏捷方法</span>
          <span class="px-3 py-1 rounded-full text-sm bg-violet-500/20 text-violet-300">开源免费</span>
          <span class="px-3 py-1 rounded-full text-sm bg-amber-500/20 text-amber-300">12+ Agents</span>
          <span class="px-3 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-300">9 平台</span>
          <span class="px-3 py-1 rounded-full text-sm bg-pink-500/20 text-pink-300">领域扩展</span>
        </div>
      </div>
    </div>
  </BentoCard>

  <!-- Quick Install -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Terminal class="w-5 h-5 text-white/60" />
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

  <!-- Four Phases -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Workflow class="w-5 h-5 text-white/60" />
      四个开发阶段
    </h2>
    <p class="text-white/50 text-sm mb-4">
      BMAD 遵循结构化的四阶段方法，根据项目复杂度自动调整规划深度（Level 0-4）
    </p>
    <div class="grid md:grid-cols-2 gap-4">
      {#each phases as phase}
        {@const Icon = phase.icon}
        <BentoCard variant="outline" class="p-5 hover:bg-white/5 transition-colors overflow-hidden relative">
          <div class={`absolute inset-0 bg-gradient-to-br ${phase.gradient} opacity-50`}></div>
          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-3">
              <div class={cn("p-2.5 rounded-xl", phase.bg)}>
                <Icon class={cn("w-5 h-5", phase.color)} />
              </div>
              <div>
                <h3 class="font-semibold text-white">{phase.name}</h3>
                <p class="text-sm text-white/50">{phase.description}</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mt-3">
              {#each phase.activities as activity}
                <span class="px-2 py-1 rounded-lg text-xs bg-white/5 text-white/60">{activity}</span>
              {/each}
            </div>
          </div>
        </BentoCard>
      {/each}
    </div>
  </section>

  <!-- Specialized Agents -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Users class="w-5 h-5 text-white/60" />
      专用 Agents (12+)
    </h2>
    <p class="text-white/50 text-sm mb-4">
      领域特定的 AI 角色，在整个开发生命周期提供针对性指导。点击卡片查看详情。
    </p>
    <div class="grid md:grid-cols-3 gap-4">
      {#each bmadAgents as agent, i}
        {@const Icon = agent.icon}
        <button
          class="text-left p-4 rounded-2xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-200"
          onclick={() => (selectedAgent = bmadAgents[i])}
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
                <span class="text-xs text-white/30">· {agent.phase}</span>
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
        onclick={(e) => {
          if (e.target === e.currentTarget) selectedAgent = null;
        }}
        onkeydown={(e) => {
          if (e.key === "Escape") selectedAgent = null;
        }}
      >
        <div class="fixed inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div
          class="relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-[#1c1c1e] border border-white/10 shadow-2xl"
        >
          <!-- Header -->
          <div class="sticky top-0 z-10 p-6 pb-4 bg-[#1c1c1e] border-b border-white/10">
            <button
              class="absolute right-4 top-4 p-2 rounded-xl hover:bg-white/10 transition-colors"
              onclick={() => (selectedAgent = null)}
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
                <p class="text-xs text-white/40 mb-1">所属阶段</p>
                <span class="text-white font-medium">{selectedAgent.phase}</span>
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
          </div>
        </div>
      </div>
    {/if}
  </section>

  <!-- Core Workflows -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <GitBranch class="w-5 h-5 text-white/60" />
      核心工作流命令
    </h2>
    <p class="text-white/50 text-sm mb-4">
      12 核心工作流命令，覆盖四个开发阶段的完整 Pipeline
    </p>
    <BentoCard variant="glass" class="overflow-hidden">
      <div class="divide-y divide-white/5">
        {#each workflows as workflow}
          <div class="p-4 hover:bg-white/5 transition-colors flex items-center justify-between">
            <div class="flex items-center gap-4">
              <code class="text-violet-400 font-mono font-medium">{workflow.command}</code>
              <span class="text-white/60">{workflow.purpose}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-white/30">{workflow.agent}</span>
              <span class="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/40">{workflow.category}</span>
            </div>
          </div>
        {/each}
      </div>
    </BentoCard>
  </section>

  <!-- Command Tables -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <BookOpen class="w-5 h-5 text-white/60" />
      命令表格（汇总）
    </h2>
    <p class="text-white/50 text-sm mb-4">将核心工作流与各 Agent 命令统一表格展示</p>

    <BentoCard variant="glass" class="p-6">
      <div class="text-sm text-white/50 mb-3">核心工作流</div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="text-white/50">
            <tr class="border-b border-white/10">
              <th class="text-left py-2 pr-4 font-medium">命令</th>
              <th class="text-left py-2 pr-4 font-medium">Agent</th>
              <th class="text-left py-2 pr-4 font-medium">用途</th>
              <th class="text-left py-2 pr-4 font-medium">分类</th>
            </tr>
          </thead>
          <tbody class="text-white/70">
            {#each workflows as workflow}
              <tr class="border-b border-white/5">
                <td class="py-2 pr-4"><code class="text-violet-400">{workflow.command}</code></td>
                <td class="py-2 pr-4">{workflow.agent}</td>
                <td class="py-2 pr-4">{workflow.purpose}</td>
                <td class="py-2 pr-4">{workflow.category}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </BentoCard>

    <div class="h-4"></div>

    <BentoCard variant="glass" class="p-6">
      <div class="text-sm text-white/50 mb-3">Agent 命令</div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="text-white/50">
            <tr class="border-b border-white/10">
              <th class="text-left py-2 pr-4 font-medium">Agent</th>
              <th class="text-left py-2 pr-4 font-medium">简称</th>
              <th class="text-left py-2 pr-4 font-medium">命令</th>
              <th class="text-left py-2 pr-4 font-medium">阶段</th>
              <th class="text-left py-2 pr-4 font-medium">职责</th>
            </tr>
          </thead>
          <tbody class="text-white/70">
            {#each agentCommandTable as row}
              <tr class="border-b border-white/5">
                <td class="py-2 pr-4">{row.name}</td>
                <td class="py-2 pr-4">{row.abbrev}</td>
                <td class="py-2 pr-4"><code class="text-violet-400">{row.command}</code></td>
                <td class="py-2 pr-4">{row.phase}</td>
                <td class="py-2 pr-4">{row.purpose}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </BentoCard>
  </section>

  <!-- Agent Types -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Layers class="w-5 h-5 text-white/60" />
      Agent 类型
    </h2>
    <p class="text-white/50 text-sm mb-4">
      BMAD 支持三种 Agent 类型，从简单到复杂
    </p>
    <div class="grid md:grid-cols-3 gap-4">
      {#each agentTypes as type}
        <BentoCard variant="outline" class="p-5">
          <div class={cn("inline-flex p-2 rounded-xl mb-3", type.bg)}>
            <Settings class={cn("w-5 h-5", type.color)} />
          </div>
          <h3 class="font-semibold text-white mb-1">{type.name}</h3>
          <p class="text-sm text-white/50 mb-3">{type.description}</p>
          <ul class="space-y-1.5 mb-3">
            {#each type.features as feature}
              <li class="flex items-center gap-2 text-xs text-white/60">
                <ChevronRight class="w-3 h-3 text-white/30" />
                {feature}
              </li>
            {/each}
          </ul>
          <p class="text-xs text-white/30">示例: {type.example}</p>
        </BentoCard>
      {/each}
    </div>
  </section>

  <!-- Complexity Levels -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <TrendingUp class="w-5 h-5 text-white/60" />
      复杂度级别 (Level 0-4)
    </h2>
    <p class="text-white/50 text-sm mb-4">
      BMAD 根据项目复杂度自动调整规划深度，跳过不必要的阶段
    </p>
    <BentoCard variant="glass" class="overflow-hidden">
      <div class="divide-y divide-white/5">
        {#each complexityLevels as cl}
          <div class="p-4 hover:bg-white/5 transition-colors grid grid-cols-[5.5rem_5.5rem_1fr_auto] items-center gap-x-3">
            <span class="font-mono font-bold text-emerald-400 whitespace-nowrap">{cl.level}</span>
            <span class="text-white font-medium">{cl.name}</span>
            <span class="text-white/50 truncate">{cl.description}</span>
            <code class="text-xs text-violet-400 whitespace-nowrap">{cl.phases}</code>
          </div>
        {/each}
      </div>
    </BentoCard>
  </section>

  <!-- Platform Support -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Globe class="w-5 h-5 text-white/60" />
      平台支持
    </h2>
    <p class="text-white/50 text-sm mb-4">
      支持 IDE（开发阶段）和 Web UI（规划阶段）两种协作模式
    </p>
    <div class="flex flex-wrap gap-3">
      {#each supportedIDEs as ide}
        <div class="px-4 py-3 rounded-2xl border border-white/10 bg-white/5 flex items-center gap-3">
          <span class="text-white font-medium">{ide.name}</span>
          <span class={cn("px-2 py-0.5 rounded text-[10px]", ide.status === "IDE" ? "bg-emerald-500/20 text-emerald-300" : "bg-violet-500/20 text-violet-300")}>{ide.status}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Agent Configuration -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Code class="w-5 h-5 text-white/60" />
      Agent 配置结构 (v6 YAML Schema)
    </h2>
    <BentoCard variant="glass" class="p-6">
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm text-white/50">agent.yaml</span>
        <button
          class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          onclick={() => copyToClipboard(agentYamlCode, "yaml")}
        >
          {#if copiedId === "yaml"}
            <Check class="w-4 h-4 text-green-400" />
          {:else}
            <Copy class="w-4 h-4 text-white/40" />
          {/if}
        </button>
      </div>
      <pre class="text-sm text-white/70 font-mono overflow-x-auto"><code>{agentYamlCode}</code></pre>
    </BentoCard>
  </section>

  <!-- Workflow Example -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Zap class="w-5 h-5 text-white/60" />
      完整开发流程 (Pipeline)
    </h2>
    <BentoCard variant="glass" class="p-6">
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm text-white/50">Workflow</span>
        <button
          class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          onclick={() => copyToClipboard(workflowExampleCode, "workflow")}
        >
          {#if copiedId === "workflow"}
            <Check class="w-4 h-4 text-green-400" />
          {:else}
            <Copy class="w-4 h-4 text-white/40" />
          {/if}
        </button>
      </div>
      <pre class="text-sm text-white/70 font-mono overflow-x-auto whitespace-pre-wrap"><code
          >{workflowExampleCode}</code
        ></pre>
    </BentoCard>
  </section>

  <!-- Best Practices -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Lightbulb class="w-5 h-5 text-white/60" />
      最佳实践
    </h2>
    <div class="grid md:grid-cols-2 gap-4">
      {#each bestPractices as practice}
        {@const Icon = practice.icon}
        <BentoCard variant="outline" class="p-4 hover:bg-white/5 transition-colors">
          <div class="flex items-start gap-3">
            <div class="p-2 rounded-xl bg-white/5">
              <Icon class="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 class="font-medium text-white">{practice.title}</h3>
              <p class="text-sm text-white/50 mt-1">{practice.description}</p>
            </div>
          </div>
        </BentoCard>
      {/each}
    </div>
  </section>

  <!-- Claude Code Slash Commands -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Terminal class="w-5 h-5 text-white/60" />
      Agent 实战命令
    </h2>
    <p class="text-white/50 text-sm mb-4">
      在 IDE 中通过斜杠命令直接调用 Agent，实现完整开发循环（Web UI 同样适用）
    </p>
    <BentoCard variant="glass" class="overflow-hidden">
      <div class="divide-y divide-white/5">
        {#each slashCommands as sc}
          <div class="p-4 hover:bg-white/5 transition-colors flex items-start gap-4">
            <code class="text-violet-400 font-mono font-medium whitespace-nowrap pt-0.5">{sc.command}</code>
            <div class="flex-1 min-w-0">
              <span class="text-white/60 text-sm">{sc.action}</span>
            </div>
            <span class="text-xs text-white/30 whitespace-nowrap pt-0.5">{sc.agent}</span>
          </div>
        {/each}
      </div>
    </BentoCard>
    <BentoCard variant="outline" class="mt-4 p-5">
      <div class="flex items-center gap-3 mb-3">
        <div class="p-2 rounded-xl bg-amber-500/20">
          <Repeat class="w-5 h-5 text-amber-400" />
        </div>
        <h3 class="font-semibold text-white">持续迭代循环</h3>
      </div>
      <p class="text-sm text-white/50 mb-3">Phase 4 进入 SM → DEV 循环，直到所有 Story 完成：</p>
      <code class="text-sm text-white/70 font-mono">/sm → 创建 Story → /dev → 实现 Story → /sm → 创建下一个 → /dev → 实现 → ...</code>
    </BentoCard>
    <div class="mt-4">
      <p class="text-sm text-white/50 mb-3">通用元命令（所有 Agent 可用）</p>
      <BentoCard variant="glass" class="overflow-hidden">
        <div class="divide-y divide-white/5">
          {#each metaCommands as mc}
            <div class="p-3 hover:bg-white/5 transition-colors flex items-center gap-4">
              <code class="text-emerald-400 font-mono text-sm whitespace-nowrap">{mc.command}</code>
              <span class="text-white/60 text-sm">{mc.description}</span>
            </div>
          {/each}
        </div>
      </BentoCard>
    </div>
  </section>

  <!-- Development Modes -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Settings class="w-5 h-5 text-white/60" />
      开发模式
    </h2>
    <div class="grid md:grid-cols-2 gap-4">
      {#each devModes as mode}
        <BentoCard variant="outline" class="p-5">
          <div class={cn("inline-flex px-3 py-1 rounded-lg text-sm font-medium mb-3", mode.bg, mode.color)}>
            {mode.name}
          </div>
          <p class="text-sm text-white/50">{mode.description}</p>
        </BentoCard>
      {/each}
    </div>
  </section>

  <!-- Use Cases -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <MonitorSmartphone class="w-5 h-5 text-white/60" />
      适用场景
    </h2>
    <div class="grid md:grid-cols-2 gap-4">
      {#each useCases as uc}
        <BentoCard variant="outline" class="p-4 hover:bg-white/5 transition-colors">
          <h3 class="font-medium text-white">{uc.title}</h3>
          <p class="text-sm text-white/50 mt-1">{uc.description}</p>
        </BentoCard>
      {/each}
    </div>
  </section>

  <!-- Web UI Quick Start -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <MessageSquare class="w-5 h-5 text-white/60" />
      Web UI 快速启动
    </h2>
    <p class="text-white/50 text-sm mb-4">
      在 ChatGPT / Gemini / Claude Web 中使用 BMAD（适合规划阶段）
    </p>
    <BentoCard variant="glass" class="p-6">
      <ol class="space-y-3 text-sm text-white/70">
        <li class="flex items-start gap-3">
          <span class="font-mono text-emerald-400 shrink-0">1.</span>
          <span>下载 <code class="text-violet-400">team-fullstack.txt</code> 从 GitHub dist/teams/</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="font-mono text-emerald-400 shrink-0">2.</span>
          <span>在 Gemini/ChatGPT 中创建新助手，上传文件并附加指令：<code class="text-violet-400">"Your critical operating instructions are attached, do not break character as directed"</code></span>
        </li>
        <li class="flex items-start gap-3">
          <span class="font-mono text-emerald-400 shrink-0">3.</span>
          <span>输入 <code class="text-violet-400">/help</code> 查看可用命令，使用 <code class="text-violet-400">#bmad-orchestrator</code> 随时获取引导</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="font-mono text-emerald-400 shrink-0">4.</span>
          <span>完成规划后，使用 <code class="text-violet-400">*shard-doc</code> 分片文档，导入 IDE 进行开发</span>
        </li>
      </ol>
    </BentoCard>
  </section>

  <!-- Context Engineering -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <FileCog class="w-5 h-5 text-white/60" />
      Context Engineering
    </h2>
    <p class="text-white/50 text-sm mb-4">
      BMAD 的核心技术：通过上下文工程确保 Agent 间信息无缝传递
    </p>
    <div class="grid md:grid-cols-2 gap-4">
      {#each contextFeatures as cf}
        <BentoCard variant="outline" class="p-4 hover:bg-white/5 transition-colors">
          <h3 class="font-medium text-white">{cf.title}</h3>
          <p class="text-sm text-white/50 mt-1">{cf.description}</p>
        </BentoCard>
      {/each}
    </div>
  </section>

  <!-- Expansion Packs -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Package class="w-5 h-5 text-white/60" />
      Expansion Packs（领域扩展包）
    </h2>
    <p class="text-white/50 text-sm mb-4">
      BMAD 不仅限于软件开发，通过扩展包可应用于任何领域
    </p>
    <div class="grid md:grid-cols-3 gap-4">
      {#each expansionPacks as pack}
        <BentoCard variant="outline" class="p-5">
          <h3 class={cn("font-semibold mb-1", pack.color)}>{pack.name}</h3>
          <p class="text-sm text-white/50 mb-3">{pack.description}</p>
          <ul class="space-y-1.5">
            {#each pack.agents as agent}
              <li class="flex items-center gap-2 text-xs text-white/60">
                <ChevronRight class="w-3 h-3 text-white/30" />
                {agent}
              </li>
            {/each}
          </ul>
        </BentoCard>
      {/each}
    </div>
  </section>

  <!-- Key Advantages -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Sparkles class="w-5 h-5 text-white/60" />
      核心优势
    </h2>
    <BentoCard variant="glass" class="p-6">
      <div class="grid md:grid-cols-2 gap-4">
        <ul class="space-y-3 text-sm text-white/70">
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <span><strong class="text-white">智能协作</strong> - Agents 引导思考而非替代思考</span>
          </li>
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <span><strong class="text-white">全面覆盖</strong> - 从头脑风暴到部署全流程</span>
          </li>
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <span><strong class="text-white">自适应复杂度</strong> - 根据项目规模和领域需求调整</span>
          </li>
        </ul>
        <ul class="space-y-3 text-sm text-white/70">
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <span><strong class="text-white">即时文档</strong> - 需要时提供指导</span>
          </li>
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <span><strong class="text-white">可扩展框架</strong> - 创建定制 Agents 满足特定需求</span>
          </li>
          <li class="flex items-start gap-2">
            <CheckCircle2 class="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <span><strong class="text-white">完全开源</strong> - MIT 许可证，无付费墙</span>
          </li>
        </ul>
      </div>
    </BentoCard>
  </section>

  <!-- Footer -->
  <div class="flex items-center justify-between pt-6 border-t border-white/10">
    <Button variant="ghost" href="/knowledge" class="text-white/60">
      <ArrowLeft class="w-4 h-4" />
      返回知识库
    </Button>
    <span class="text-sm text-white/30"> 数据来源: Context7 · bmad-code-org/BMAD-METHOD (v6 alpha) </span>
  </div>
</div>
