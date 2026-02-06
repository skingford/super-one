<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import BentoCard from "$lib/components/ui/BentoCard.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import {
    ArrowLeft,
    BookOpen,
    Zap,
    Terminal,
    Workflow,
    Layers,
    Shield,
    Sparkles,
    ExternalLink,
    Copy,
    Check,
  } from "lucide-svelte";

  let copiedId = $state<string | null>(null);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    copiedId = id;
    setTimeout(() => (copiedId = null), 2000);
  }

  const highlights = [
    {
      title: "先对齐再实现",
      description: "以 spec 为中心协作，先确认需求与范围，再动手写代码。",
      icon: Shield,
      color: "text-emerald-400",
      bg: "bg-emerald-500/15",
    },
    {
      title: "组织更清晰",
      description: "规格与变更分层存放，便于审阅、追踪与复用。",
      icon: Layers,
      color: "text-cyan-400",
      bg: "bg-cyan-500/15",
    },
    {
      title: "流式工作流",
      description: "OPSX 把提案、补全、应用、归档串成一条连续链路。",
      icon: Workflow,
      color: "text-violet-400",
      bg: "bg-violet-500/15",
    },
    {
      title: "无需 API Key",
      description: "复用你现有的 AI 工具与权限体系。",
      icon: Sparkles,
      color: "text-amber-400",
      bg: "bg-amber-500/15",
    },
  ];

  const quickStart = [
    {
      id: "install",
      title: "安装 CLI",
      description: "全局安装最新版本（Node.js >= 20.19.0）",
      command: "npm install --global @fission-ai/openspec@latest",
      icon: Terminal,
      color: "text-emerald-400",
      border: "border-emerald-500/20",
    },
    {
      id: "init",
      title: "初始化项目",
      description: "生成 openspec 工作目录与指令集",
      command: "openspec init",
      icon: Zap,
      color: "text-cyan-400",
      border: "border-cyan-500/20",
    },
    {
      id: "new",
      title: "开启新需求",
      description: "在 AI 工具里执行（例：Claude Code / Cursor）",
      command: "/opsx:new 添加用户设置页夜间模式",
      icon: Workflow,
      color: "text-violet-400",
      border: "border-violet-500/20",
    },
    {
      id: "onboard",
      title: "进入引导模式",
      description: "第一次上手可运行 onboarding 快速熟悉流程",
      command: "/opsx:onboard",
      icon: Sparkles,
      color: "text-amber-400",
      border: "border-amber-500/20",
    },
  ];

  const opsxFlow = [
    {
      id: "opsx-new",
      title: "提出变更",
      command: "/opsx:new <需求>",
      description: "创建变更目录与 proposal，锁定目标与范围。",
    },
    {
      id: "opsx-ff",
      title: "补全规格",
      command: "/opsx:ff",
      description: "生成 spec、design、tasks 等完整文档。",
    },
    {
      id: "opsx-apply",
      title: "应用变更",
      command: "/opsx:apply",
      description: "让 AI 根据 specs 执行落地实现。",
    },
    {
      id: "opsx-archive",
      title: "归档合并",
      command: "/opsx:archive",
      description: "完成后合并 specs 并归档该变更。",
    },
  ];

  const structureTree = `openspec/
├─ changes/
│  └─ add-dark-mode/
│     ├─ proposal.md
│     ├─ specs/
│     ├─ design.md
│     └─ tasks.md
└─ specs/`;

  const aiTools = [
    "Claude Code",
    "Cursor",
    "GitHub Copilot",
    "OpenAI Codex",
    "Windsurf",
    "Cline",
    "RooCode",
    "Tabby",
  ];

  const maintenance = [
    {
      title: "更新指令与配置",
      command: "openspec update",
      description: "保持 tools 指令和规则为最新版本。",
    },
    {
      title: "重新安装升级",
      command: "npm install --global @fission-ai/openspec@latest",
      description: "升级 CLI 到最新发布。",
    },
  ];

  const tips = [
    "在 AI 工具里先选最强模型来生成 spec，再切换到轻量模型执行代码。",
    "保持 changelog 与 specs 同步，避免实现偏离原始意图。",
    "团队协作时，让每个变更都有独立的 proposal 与任务列表。",
  ];

  const cliCommands = [
    {
      name: "openspec init [path]",
      usage: "初始化 OpenSpec 项目与 AI 工具配置。",
      options: [
        "--tools <list>：指定工具（如 claude,cursor 或 all）",
        "--force：跳过提示并清理旧文件",
      ],
    },
    {
      name: "openspec update",
      usage: "更新 AI 指令文件。",
      options: ["--force：强制更新"],
    },
    {
      name: "openspec list",
      usage: "列出当前 changes 或 specs。",
      options: ["--specs：仅列出 specs", "--json：JSON 输出", "--sort name：按名称排序"],
    },
    {
      name: "openspec validate [change]",
      usage: "校验 changes/specs 的结构与一致性。",
      options: [
        "--changes / --specs / --all",
        "--json：JSON 输出",
        "--strict：严格校验",
        "--concurrency <n>：并行度",
      ],
    },
    {
      name: "openspec schemas",
      usage: "列出可用的 workflow schemas。",
      options: ["--json：JSON 输出"],
    },
    {
      name: "openspec config <subcommand>",
      usage: "查看或修改全局配置。",
      options: [
        "path | list | get <key> | set <key> <value> [--string]",
        "unset <key> | reset --all --yes | edit",
      ],
    },
    {
      name: "openspec completion <subcommand> [shell]",
      usage: "管理 CLI 自动补全。",
      options: ["generate | install | uninstall", "shell: bash | zsh | fish | powershell"],
    },
    {
      name: "openspec experimental",
      usage: "生成实验性技能，供 AI 工具识别。",
      options: [],
    },
  ];

  const opsxCommands = [
    {
      name: "/opsx:explore",
      usage: "探索/澄清需求，做头脑风暴与方案讨论。",
      example: "/opsx:explore",
    },
    {
      name: "/opsx:new",
      usage: "创建新的变更（change）。",
      example: "/opsx:new",
    },
    {
      name: "/opsx:continue <change>",
      usage: "为已有变更生成下一个 artifact。",
      example: "/opsx:continue add-my-feature",
    },
    {
      name: "/opsx:ff [change]",
      usage: "一次性生成所有规划类 artifacts。",
      example: "/opsx:ff add-dark-mode",
    },
    {
      name: "/opsx:apply [name]",
      usage: "依据 tasks/specs 执行实现。",
      example: "/opsx:apply add-dark-mode",
    },
    {
      name: "/opsx:verify",
      usage: "核对实现与 tasks/specs/design 的一致性。",
      example: "/opsx:verify",
    },
    {
      name: "/opsx:sync [change-name]",
      usage: "把 delta specs 合并回主 specs。",
      example: "/opsx:sync add-dark-mode",
    },
    {
      name: "/opsx:archive",
      usage: "完成变更并归档（必要时提示 sync）。",
      example: "/opsx:archive",
    },
    {
      name: "/opsx:bulk-archive",
      usage: "批量归档多个已完成变更。",
      example: "/opsx:bulk-archive",
    },
  ];
</script>

<div class="max-w-5xl mx-auto space-y-10">
  <!-- Header -->
  <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div class="flex items-center gap-4">
      <a href="/knowledge" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
        <ArrowLeft class="w-5 h-5 text-white/60" />
      </a>
      <div>
        <h1 class="text-3xl font-bold text-white">OpenSpec</h1>
        <p class="text-white/50 mt-1">Spec-Driven Development with AI</p>
      </div>
    </div>
    <div class="flex gap-2">
      <a
        href="https://openspec.dev"
        target="_blank"
        class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-sm transition-colors inline-flex items-center gap-2"
        rel="noreferrer"
      >
        官网
        <ExternalLink class="w-4 h-4" />
      </a>
      <a
        href="https://github.com/Fission-AI/OpenSpec"
        target="_blank"
        class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-sm transition-colors inline-flex items-center gap-2"
        rel="noreferrer"
      >
        GitHub
        <ExternalLink class="w-4 h-4" />
      </a>
    </div>
  </div>

  <!-- Hero -->
  <BentoCard
    variant="gradient"
    gradient="linear-gradient(135deg, rgba(16,185,129,0.35) 0%, rgba(59,130,246,0.2) 55%, rgba(168,85,247,0.2) 100%)"
    class="p-8"
  >
    <div class="flex flex-col md:flex-row md:items-start gap-6">
      <div class="p-4 rounded-2xl bg-white/10">
        <BookOpen class="w-10 h-10 text-emerald-300" />
      </div>
      <div class="flex-1">
        <h2 class="text-2xl font-bold text-white mb-2">用规格驱动 AI 编程的工作流</h2>
        <p class="text-white/70 leading-relaxed">
          OpenSpec 让需求、规格、设计与实现保持同步。先定义清晰的 spec，再让 AI 执行，实现前就达成共识。
        </p>
        <div class="flex flex-wrap gap-3 mt-4">
          <span class="px-3 py-1 rounded-full text-sm bg-emerald-500/20 text-emerald-200">Spec-First</span>
          <span class="px-3 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-200">20+ 工具集成</span>
          <span class="px-3 py-1 rounded-full text-sm bg-violet-500/20 text-violet-200">OPSX 工作流</span>
          <span class="px-3 py-1 rounded-full text-sm bg-amber-500/20 text-amber-200">无需 API Key</span>
        </div>
      </div>
    </div>
  </BentoCard>

  <!-- Highlights -->
  <section class="grid md:grid-cols-2 gap-4">
    {#each highlights as item}
      {@const Icon = item.icon}
      <BentoCard variant="glass" class="p-5">
        <div class="flex items-start gap-4">
          <div class={cn("p-3 rounded-xl", item.bg)}>
            <Icon class={cn("w-6 h-6", item.color)} />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white">{item.title}</h3>
            <p class="text-sm text-white/60 mt-1 leading-relaxed">{item.description}</p>
          </div>
        </div>
      </BentoCard>
    {/each}
  </section>

  <!-- Quick Start -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-xl bg-white/5">
        <Zap class="w-5 h-5 text-emerald-400" />
      </div>
      <h3 class="text-xl font-bold text-white">快速开始</h3>
      <span class="text-sm text-white/40">Node.js >= 20.19.0</span>
    </div>
    <div class="grid md:grid-cols-2 gap-4">
      {#each quickStart as step}
        {@const StepIcon = step.icon}
        <BentoCard variant="glass" class={cn("p-5 border", step.border)}>
          <div class="flex items-start gap-4">
            <div class="p-3 rounded-xl bg-white/5">
              <StepIcon class={cn("w-5 h-5", step.color)} />
            </div>
            <div class="flex-1">
              <h4 class="text-lg font-semibold text-white">{step.title}</h4>
              <p class="text-sm text-white/60 mt-1">{step.description}</p>

              <div class="mt-4">
                <div class="flex items-center justify-between mb-2 text-xs text-white/40 font-mono">
                  <span>命令</span>
                  <button
                    class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    onclick={() => copyToClipboard(step.command, step.id)}
                  >
                    {#if copiedId === step.id}
                      <Check class="w-4 h-4 text-emerald-400" />
                    {:else}
                      <Copy class="w-4 h-4 text-white/50" />
                    {/if}
                  </button>
                </div>
                <pre class="p-3 rounded-xl bg-black/50 text-sm text-emerald-300/90 font-mono overflow-x-auto whitespace-pre-wrap break-all border border-emerald-500/10"><code>{step.command}</code></pre>
              </div>
            </div>
          </div>
        </BentoCard>
      {/each}
    </div>
  </section>

  <!-- OPSX Flow -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-xl bg-white/5">
        <Workflow class="w-5 h-5 text-violet-400" />
      </div>
      <h3 class="text-xl font-bold text-white">OPSX 核心流程</h3>
      <span class="text-sm text-white/40">从提案到归档的连续链路</span>
    </div>
    <div class="grid md:grid-cols-2 gap-4">
      {#each opsxFlow as step}
        <BentoCard variant="glass" class="p-5">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h4 class="text-lg font-semibold text-white">{step.title}</h4>
              <p class="text-sm text-white/60 mt-1">{step.description}</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              class="rounded-lg bg-white/5 hover:bg-white/10 text-xs"
              onclick={() => copyToClipboard(step.command, step.id)}
            >
              {#if copiedId === step.id}
                <Check class="w-4 h-4 text-emerald-400" />
              {:else}
                <Copy class="w-4 h-4 text-white/60" />
              {/if}
            </Button>
          </div>
          <pre class="mt-4 p-3 rounded-xl bg-black/50 text-sm text-violet-300/90 font-mono overflow-x-auto border border-violet-500/10"><code>{step.command}</code></pre>
        </BentoCard>
      {/each}
    </div>
  </section>

  <!-- Structure -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-xl bg-white/5">
        <Layers class="w-5 h-5 text-cyan-400" />
      </div>
      <h3 class="text-xl font-bold text-white">目录结构示例</h3>
      <span class="text-sm text-white/40">每个变更独立存档</span>
    </div>
    <BentoCard variant="glass" class="p-6">
      <pre class="text-sm text-cyan-200/80 font-mono whitespace-pre overflow-x-auto"><code>{structureTree}</code></pre>
      <p class="text-sm text-white/50 mt-4">
        proposal、specs、design、tasks 都集中在 changes/&lt;change&gt; 目录中，便于统一审阅与追踪。
      </p>
    </BentoCard>
  </section>

  <!-- Integrations -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-xl bg-white/5">
        <Shield class="w-5 h-5 text-emerald-400" />
      </div>
      <h3 class="text-xl font-bold text-white">工具集成</h3>
      <span class="text-sm text-white/40">Slash 命令 + Context 规则双通道</span>
    </div>
    <BentoCard variant="glass" class="p-6">
      <div class="flex flex-wrap gap-2">
        {#each aiTools as tool}
          <span class="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-white/70 border border-white/10">
            {tool}
          </span>
        {/each}
      </div>
      <p class="text-sm text-white/50 mt-4">更多支持工具请查看官方仓库的完整列表。</p>
    </BentoCard>
  </section>

  <!-- Maintenance -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-xl bg-white/5">
        <Terminal class="w-5 h-5 text-amber-400" />
      </div>
      <h3 class="text-xl font-bold text-white">维护与更新</h3>
      <span class="text-sm text-white/40">让规则保持最新</span>
    </div>
    <div class="grid md:grid-cols-2 gap-4">
      {#each maintenance as item}
        <BentoCard variant="glass" class="p-5">
          <h4 class="text-lg font-semibold text-white">{item.title}</h4>
          <p class="text-sm text-white/60 mt-1">{item.description}</p>
          <div class="mt-4 flex items-center justify-between">
            <pre class="p-3 rounded-xl bg-black/50 text-sm text-amber-200/80 font-mono overflow-x-auto border border-amber-500/10 flex-1"><code>{item.command}</code></pre>
            <button
              class="ml-3 p-2 rounded-lg bg-white/5 hover:bg-white/10"
              onclick={() => copyToClipboard(item.command, item.title)}
            >
              {#if copiedId === item.title}
                <Check class="w-4 h-4 text-emerald-400" />
              {:else}
                <Copy class="w-4 h-4 text-white/50" />
              {/if}
            </button>
          </div>
        </BentoCard>
      {/each}
    </div>
  </section>

  <!-- Command Reference -->
  <section class="space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-xl bg-white/5">
        <Terminal class="w-5 h-5 text-emerald-400" />
      </div>
      <h3 class="text-xl font-bold text-white">命令与用法总览</h3>
      <span class="text-sm text-white/40">CLI + OPSX</span>
    </div>

    <BentoCard variant="glass" class="p-6">
      <h4 class="text-lg font-semibold text-white mb-4">OpenSpec CLI</h4>
      <div class="space-y-4">
        {#each cliCommands as cmd}
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-center justify-between gap-3">
              <div>
                <code class="text-emerald-300 font-mono text-sm">{cmd.name}</code>
                <p class="text-sm text-white/60 mt-1">{cmd.usage}</p>
              </div>
            </div>
            {#if cmd.options.length > 0}
              <ul class="mt-3 text-xs text-white/50 space-y-1 font-mono">
                {#each cmd.options as option}
                  <li>{option}</li>
                {/each}
              </ul>
            {/if}
          </div>
        {/each}
      </div>
    </BentoCard>

    <BentoCard variant="glass" class="p-6">
      <h4 class="text-lg font-semibold text-white mb-4">OPSX Slash Commands</h4>
      <div class="grid md:grid-cols-2 gap-4">
        {#each opsxCommands as cmd}
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
            <code class="text-violet-300 font-mono text-sm">{cmd.name}</code>
            <p class="text-sm text-white/60 mt-2">{cmd.usage}</p>
            <pre class="mt-3 p-2 rounded-xl bg-black/50 text-xs text-violet-200/80 font-mono overflow-x-auto border border-violet-500/10"><code>{cmd.example}</code></pre>
          </div>
        {/each}
      </div>
    </BentoCard>
  </section>

  <!-- Tips -->
  <section class="space-y-4">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-xl bg-white/5">
        <Sparkles class="w-5 h-5 text-violet-400" />
      </div>
      <h3 class="text-xl font-bold text-white">实用建议</h3>
      <span class="text-sm text-white/40">提升 spec 质量与执行效率</span>
    </div>
    <BentoCard variant="glass" class="p-6">
      <ul class="space-y-3 text-sm text-white/65">
        {#each tips as tip}
          <li class="flex items-start gap-2">
            <span class="mt-1 w-1.5 h-1.5 rounded-full bg-violet-400"></span>
            <span>{tip}</span>
          </li>
        {/each}
      </ul>
    </BentoCard>
  </section>
</div>
