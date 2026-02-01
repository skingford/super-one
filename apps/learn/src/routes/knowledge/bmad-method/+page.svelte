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
      name: "Analysis",
      icon: Search,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      gradient: "from-blue-500/20 to-cyan-500/5",
      description: "头脑风暴、研究发现、创建产品简介",
      activities: ["头脑风暴与创意", "研究与发现", "产品简介创建"],
    },
    {
      id: "planning",
      name: "Planning",
      icon: Target,
      color: "text-violet-400",
      bg: "bg-violet-500/20",
      gradient: "from-violet-500/20 to-fuchsia-500/5",
      description: "定义项目需求、创建 PRD 或技术规格",
      activities: ["需求定义", "PRD 创建", "范围与约束"],
    },
    {
      id: "solutioning",
      name: "Solutioning",
      icon: Puzzle,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      gradient: "from-emerald-500/20 to-teal-500/5",
      description: "设计系统架构、做出架构决策",
      activities: ["架构设计", "技术选型", "实现方案"],
    },
    {
      id: "implementation",
      name: "Implementation",
      icon: Play,
      color: "text-amber-400",
      bg: "bg-amber-500/20",
      gradient: "from-amber-500/20 to-orange-500/5",
      description: "按 Epic 和 Story 逐步构建",
      activities: ["Epic 开发", "Story 实现", "代码审查"],
    },
  ];

  // Specialized Agents
  const bmadAgents = [
    {
      name: "Product Manager",
      abbrev: "PM",
      description: "创建 PRD 和需求文档",
      icon: FileText,
      color: "text-violet-400",
      bg: "bg-violet-500/20",
      phase: "Planning",
      features: ["PRD 创建", "需求收集", "范围定义", "用户故事编写"],
      command: "*prd",
    },
    {
      name: "Architect",
      abbrev: "Architect",
      description: "设计系统架构和技术方案",
      icon: Layers,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      phase: "Solutioning",
      features: ["系统架构设计", "技术选型", "设计模式推荐", "可扩展性分析"],
      command: "*create-architecture",
    },
    {
      name: "Developer",
      abbrev: "DEV",
      description: "实现代码和功能开发",
      icon: Code,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      phase: "Implementation",
      features: ["Story 实现", "代码编写", "技术实现", "代码审查"],
      command: "*dev-story",
    },
    {
      name: "Scrum Master",
      abbrev: "SM",
      description: "管理 Sprint 和开发周期",
      icon: Workflow,
      color: "text-amber-400",
      bg: "bg-amber-500/20",
      phase: "Planning/Implementation",
      features: ["Sprint 规划", "Story 创建", "进度跟踪", "团队协调"],
      command: "*sprint-planning",
    },
    {
      name: "Test Engineer",
      abbrev: "TEA",
      description: "质量工程和测试架构",
      icon: TestTube,
      color: "text-green-400",
      bg: "bg-green-500/20",
      phase: "Implementation",
      features: ["测试策略", "质量保证", "自动化测试", "测试覆盖"],
      command: "TEA module",
    },
    {
      name: "UX Designer",
      abbrev: "UX",
      description: "用户体验和界面设计",
      icon: Palette,
      color: "text-pink-400",
      bg: "bg-pink-500/20",
      phase: "Solutioning",
      features: ["用户体验设计", "界面原型", "可用性分析", "设计系统"],
      command: "UX workflows",
    },
    {
      name: "Security Engineer",
      abbrev: "SEC",
      description: "安全考量和漏洞防护",
      icon: Shield,
      color: "text-red-400",
      bg: "bg-red-500/20",
      phase: "All Phases",
      features: ["安全审计", "漏洞检测", "安全最佳实践", "合规检查"],
      command: "Security workflows",
    },
    {
      name: "Trend Analyst",
      abbrev: "TA",
      description: "行业和技术趋势分析",
      icon: TrendingUp,
      color: "text-cyan-400",
      bg: "bg-cyan-500/20",
      phase: "Analysis",
      features: ["市场趋势", "技术分析", "竞品研究", "机会识别"],
      command: "Analysis workflows",
    },
    {
      name: "Analyst",
      abbrev: "AN",
      description: "项目初始化和分析",
      icon: Search,
      color: "text-indigo-400",
      bg: "bg-indigo-500/20",
      phase: "Analysis",
      features: ["项目初始化", "需求分析", "可行性评估", "风险识别"],
      command: "*workflow-init",
    },
  ];

  // Selected agent for detail view
  let selectedAgent = $state<(typeof bmadAgents)[0] | null>(null);

  // Core Workflows
  const workflows = [
    { command: "*workflow-init", agent: "Analyst", purpose: "初始化新项目", category: "初始化" },
    { command: "*workflow-status", agent: "Any", purpose: "检查进度和下一步", category: "状态" },
    { command: "*prd", agent: "PM", purpose: "创建产品需求文档", category: "规划" },
    { command: "*create-architecture", agent: "Architect", purpose: "生成架构文档", category: "设计" },
    { command: "*sprint-planning", agent: "SM", purpose: "初始化 Sprint 跟踪", category: "开发" },
    { command: "*create-story", agent: "SM", purpose: "生成 Story 文件", category: "开发" },
    { command: "*dev-story", agent: "DEV", purpose: "实现一个 Story", category: "开发" },
    { command: "*code-review", agent: "DEV", purpose: "代码质量验证", category: "审查" },
  ];

  // Agent Types
  const agentTypes = [
    {
      name: "Simple Agent",
      description: "单个 YAML 文件配置，基础功能",
      features: ["单文件配置", "元数据定义", "Persona 设置", "菜单命令"],
      example: "commit-poet agent",
      color: "text-blue-400",
      bg: "bg-blue-500/20",
    },
    {
      name: "Expert Agent",
      description: "YAML 文件 + Sidecars（支持文件）",
      features: ["指令文件", "记忆存储", "模板定义", "知识库"],
      example: "journal-keeper agent",
      color: "text-violet-400",
      bg: "bg-violet-500/20",
    },
    {
      name: "Module Agent",
      description: "完整模块的一部分，共享资源",
      features: ["模块集成", "共享资源", "完整领域专业", "可扩展性"],
      example: "architect, security-engineer agents",
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
    },
  ];

  // Best Practices
  const bestPractices = [
    {
      title: "使用全新对话",
      description: "每个工作流始终启动新的对话，避免上下文问题",
      icon: Sparkles,
    },
    {
      title: "遵循阶段进展",
      description: "按照 Analysis → Planning → Solutioning → Implementation 顺序推进",
      icon: Workflow,
    },
    {
      title: "利用 Agent 专业知识",
      description: "在每个阶段使用相应的专业 Agent",
      icon: Users,
    },
    {
      title: "检查工作流状态",
      description: "使用 *workflow-status 了解进度和下一步",
      icon: Target,
    },
    {
      title: "自适应规划",
      description: "让系统根据项目复杂度级别（0-4）自动调整深度",
      icon: Settings,
    },
  ];

  // Code examples
  const installCode = `# 安装 BMAD-METHOD
npx bmad-method install

# 初始化项目
# 加载 Analyst agent 并运行 workflow-init`;

  const agentYamlCode = `agent:
  metadata:
    id: _bmad/agents/{agent-name}/{agent-name}.md
    name: 'Persona Name'
    title: 'Agent Title'
    icon: '🔧'
    module: stand-alone

  persona:
    role: First-person primary function
    identity: Background and specializations
    communication_style: How the agent speaks
    principles: Core beliefs and methodologies

  prompts:
    - id: main-action
      content: Instructions and process steps

  menu:
    - trigger: Command trigger
      action: Action or prompt reference
      description: Command description`;

  const workflowExampleCode = `# 典型开发流程

1. *workflow-init       # 初始化项目（Analyst）
2. *prd                 # 创建 PRD（PM）
3. *create-architecture # 设计架构（Architect）
4. *sprint-planning     # Sprint 规划（SM）
5. *create-story        # 创建 Story（SM）
6. *dev-story           # 实现 Story（DEV）
7. *code-review         # 代码审查（DEV）`;
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
        <h2 class="text-2xl font-bold text-white mb-2">AI 驱动的敏捷开发框架</h2>
        <p class="text-white/70 leading-relaxed">
          BMAD-METHOD 是一个开源的 AI 驱动开发框架，通过智能人机协作实现敏捷软件创建。
          它不是替你思考，而是作为专家协作者引导你完成结构化工作流，产出更高质量的成果。
        </p>
        <div class="flex flex-wrap gap-3 mt-4">
          <span class="px-3 py-1 rounded-full text-sm bg-emerald-500/20 text-emerald-300">AI 驱动</span>
          <span class="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300">敏捷方法</span>
          <span class="px-3 py-1 rounded-full text-sm bg-violet-500/20 text-violet-300">开源免费</span>
          <span class="px-3 py-1 rounded-full text-sm bg-amber-500/20 text-amber-300">12+ Agents</span>
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
      50+ 结构化工作流，覆盖四个开发阶段
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

  <!-- Agent Configuration -->
  <section>
    <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Code class="w-5 h-5 text-white/60" />
      Agent 配置结构
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
      典型开发流程
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
    <span class="text-sm text-white/30"> 数据来源: Context7 · bmad-code-org/BMAD-METHOD </span>
  </div>
</div>
