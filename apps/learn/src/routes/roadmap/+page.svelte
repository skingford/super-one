<script lang="ts">
  import { CheckCircle, Circle, ArrowRight, Zap, Sparkles, Lock } from "lucide-svelte";

  type NodeStatus = "done" | "active" | "locked";
  type TrackKey = "rust" | "python" | "go" | "node";

  type GraphNode = {
    id: string;
    status: NodeStatus;
    x: number;
    y: number;
    xp: number;
  };

  type ActionCard = {
    id: string;
    title: string;
    description: string;
    tone: "violet" | "cyan" | "emerald";
    duration: string;
    reward: string;
  };


  const baseNodes = [
    { id: "syntax", status: "done", xp: 240 },
    { id: "ownership", status: "active", xp: 380 },
    { id: "borrowing", status: "locked", xp: 320 },
    { id: "pointers", status: "locked", xp: 280 },
    { id: "concurrency", status: "locked", xp: 300 }
  ] as const;

  const positionsByTrack: Record<TrackKey, Record<string, { x: number; y: number }>> = {
    rust: {
      syntax: { x: 18, y: 52 },
      ownership: { x: 50, y: 50 },
      borrowing: { x: 68, y: 30 },
      pointers: { x: 70, y: 72 },
      concurrency: { x: 82, y: 48 }
    },
    python: {
      syntax: { x: 20, y: 40 },
      ownership: { x: 42, y: 30 },
      borrowing: { x: 58, y: 58 },
      pointers: { x: 78, y: 36 },
      concurrency: { x: 72, y: 72 }
    },
    go: {
      syntax: { x: 22, y: 60 },
      ownership: { x: 40, y: 40 },
      borrowing: { x: 60, y: 28 },
      pointers: { x: 76, y: 56 },
      concurrency: { x: 84, y: 40 }
    },
    node: {
      syntax: { x: 16, y: 46 },
      ownership: { x: 38, y: 58 },
      borrowing: { x: 56, y: 40 },
      pointers: { x: 70, y: 26 },
      concurrency: { x: 84, y: 54 }
    }
  };

  const defaultActiveByTrack: Record<TrackKey, string> = {
    rust: "ownership",
    python: "ownership",
    go: "borrowing",
    node: "borrowing"
  };


  const trackText = {
    rust: {
      title: "Rust Knowledge Graph",
      subtitle: "基于你最近在 Ownership 的表现动态生成。",
      velocityLabel: "当前速度",
      velocityValue: "XP +850/hr",
      focusNode: "Focus Node",
      completed: "Completed",
      locked: "Locked",
      activeNode: "当前节点",
      progress: "进度",
      recommended: "推荐行动",
      basedOn: "联动更新：",
      view2d: "2D View",
      view3d: "3D Galaxy"
    },
    python: {
      title: "Python Knowledge Graph",
      subtitle: "基于你最近在 Fundamentals 的表现动态生成。",
      velocityLabel: "当前速度",
      velocityValue: "XP +620/hr",
      focusNode: "Focus Node",
      completed: "Completed",
      locked: "Locked",
      activeNode: "当前节点",
      progress: "进度",
      recommended: "推荐行动",
      basedOn: "联动更新：",
      view2d: "2D View",
      view3d: "3D Galaxy"
    },
    go: {
      title: "Go Knowledge Graph",
      subtitle: "基于你最近在 Concurrency 的表现动态生成。",
      velocityLabel: "当前速度",
      velocityValue: "XP +720/hr",
      focusNode: "Focus Node",
      completed: "Completed",
      locked: "Locked",
      activeNode: "当前节点",
      progress: "进度",
      recommended: "推荐行动",
      basedOn: "联动更新：",
      view2d: "2D View",
      view3d: "3D Galaxy"
    },
    node: {
      title: "Node.js Knowledge Graph",
      subtitle: "基于你最近在 Runtime 的表现动态生成。",
      velocityLabel: "当前速度",
      velocityValue: "XP +680/hr",
      focusNode: "Focus Node",
      completed: "Completed",
      locked: "Locked",
      activeNode: "当前节点",
      progress: "进度",
      recommended: "推荐行动",
      basedOn: "联动更新：",
      view2d: "2D View",
      view3d: "3D Galaxy"
    }
  } as const;

  const nodeLabels: Record<TrackKey, Record<string, string>> = {
    rust: {
      syntax: "基础语法",
      ownership: "Rust 所有权",
      borrowing: "借用检查器",
      pointers: "智能指针",
      concurrency: "并发"
    },
    python: {
      syntax: "基础语法",
      ownership: "数据模型",
      borrowing: "上下文管理",
      pointers: "异步 IO",
      concurrency: "并发"
    },
    go: {
      syntax: "基础语法",
      ownership: "接口与组合",
      borrowing: "Goroutine",
      pointers: "通道与同步",
      concurrency: "并发模式"
    },
    node: {
      syntax: "基础语法",
      ownership: "事件循环",
      borrowing: "异步模式",
      pointers: "模块系统",
      concurrency: "性能与调优"
    }
  };

  const nodeSummaries: Record<TrackKey, Record<string, string>> = {
    rust: {
      syntax: "基础语法与类型系统起步：let、控制流、模式匹配。",
      ownership: "理解所有权与借用规则，建立内存安全模型。",
      borrowing: "掌握生命周期与引用边界，减少借用冲突。",
      pointers: "进阶指针：Box/Rc/Arc 与共享所有权。",
      concurrency: "最难：线程、并发与异步模型。"
    },
    python: {
      syntax: "基础语法：变量、控制流、函数与内置类型。",
      ownership: "进阶语法：数据模型与协议（__dunder__）。",
      borrowing: "资源管理：上下文管理器与异常处理。",
      pointers: "异步基础：async/await 与事件循环。",
      concurrency: "最难：线程/进程/协程并发对比。"
    },
    go: {
      syntax: "语法基础：包、函数、控制流与类型。",
      ownership: "接口与组合，建立可扩展设计。",
      borrowing: "并发起步：goroutine 生命周期。",
      pointers: "通道与同步原语（mutex/waitgroup）。",
      concurrency: "最难：并发模式与调度优化。"
    },
    node: {
      syntax: "基础语法：模块、函数、控制流。",
      ownership: "事件循环与任务队列机制。",
      borrowing: "异步进阶：Promise/async 与错误处理。",
      pointers: "模块系统与依赖边界管理。",
      concurrency: "最难：性能、监控与调优实践。"
    }
  };

  const actionsByNode: Record<TrackKey, Record<string, ActionCard[]>> = {
    rust: {
      syntax: [
        {
          id: "syntax-quiz",
          title: "语法入门测验",
          description: "快速回顾变量、控制流与基础类型。",
          tone: "emerald",
          duration: "5 min",
          reward: "+120 XP"
        },
        {
          id: "syntax-kata",
          title: "基础小练习",
          description: "完成 3 个小任务，巩固绑定与可变性。",
          tone: "cyan",
          duration: "8 min",
          reward: "+160 XP"
        }
      ],
      ownership: [
        {
          id: "ownership-quiz",
          title: "所有权理解测验",
          description: "聚焦 move/borrow 基础判断。",
          tone: "violet",
          duration: "7 min",
          reward: "+220 XP"
        },
        {
          id: "ownership-lab",
          title: "借用规则小实验",
          description: "修复 3 个常见借用错误。",
          tone: "cyan",
          duration: "12 min",
          reward: "+280 XP"
        }
      ],
      borrowing: [
        {
          id: "borrow-sim",
          title: "生命周期可视化",
          description: "理解可变/不可变借用冲突。",
          tone: "violet",
          duration: "6 min",
          reward: "+200 XP"
        },
        {
          id: "borrow-review",
          title: "借用边界回顾",
          description: "复盘 `&'a` 语义与常见误区。",
          tone: "cyan",
          duration: "9 min",
          reward: "+240 XP"
        }
      ],
      pointers: [
        {
          id: "pointer-lab",
          title: "智能指针对比实验",
          description: "对比 Box/Rc/Arc 的所有权边界。",
          tone: "violet",
          duration: "10 min",
          reward: "+260 XP"
        },
        {
          id: "pointer-notes",
          title: "指针速记卡",
          description: "梳理引用计数与线程安全。",
          tone: "cyan",
          duration: "4 min",
          reward: "+120 XP"
        }
      ],
      concurrency: [
        {
          id: "concurrency-path",
          title: "并发预热",
          description: "预习 Send/Sync 与线程模型。",
          tone: "violet",
          duration: "9 min",
          reward: "+240 XP"
        },
        {
          id: "async-preview",
          title: "Async 进阶实验",
          description: "对比同步/异步写法，建立直觉。",
          tone: "cyan",
          duration: "11 min",
          reward: "+300 XP"
        }
      ]
    },
    python: {
      syntax: [
        {
          id: "py-syntax",
          title: "Python 基础冲刺",
          description: "回顾变量、控制流与基础函数。",
          tone: "emerald",
          duration: "6 min",
          reward: "+140 XP"
        },
        {
          id: "py-kata",
          title: "基础函数练习",
          description: "完成 3 个函数题，强化可读性。",
          tone: "cyan",
          duration: "9 min",
          reward: "+180 XP"
        }
      ],
      ownership: [
        {
          id: "py-datamodel",
          title: "数据模型入门",
          description: "掌握 __init__/__repr__/__iter__。",
          tone: "violet",
          duration: "7 min",
          reward: "+210 XP"
        },
        {
          id: "py-classes",
          title: "类设计小练习",
          description: "构建一个可迭代容器。",
          tone: "cyan",
          duration: "12 min",
          reward: "+260 XP"
        }
      ],
      borrowing: [
        {
          id: "py-context",
          title: "上下文管理器",
          description: "实现 __enter__/__exit__ 管理资源。",
          tone: "violet",
          duration: "8 min",
          reward: "+230 XP"
        },
        {
          id: "py-io",
          title: "文件 IO 练习",
          description: "练习读写与异常处理。",
          tone: "cyan",
          duration: "10 min",
          reward: "+240 XP"
        }
      ],
      pointers: [
        {
          id: "py-async",
          title: "Async 入门体验",
          description: "用 asyncio 并发抓取。",
          tone: "violet",
          duration: "10 min",
          reward: "+260 XP"
        },
        {
          id: "py-await",
          title: "await 进阶梳理",
          description: "理解事件循环与任务调度。",
          tone: "cyan",
          duration: "6 min",
          reward: "+180 XP"
        }
      ],
      concurrency: [
        {
          id: "py-concurrency",
          title: "并发方式对比",
          description: "线程/进程/协程场景对比。",
          tone: "violet",
          duration: "9 min",
          reward: "+240 XP"
        },
        {
          id: "py-benchmark",
          title: "并发性能小实验",
          description: "比较并发模型吞吐。",
          tone: "cyan",
          duration: "11 min",
          reward: "+300 XP"
        }
      ]
    },
    go: {
      syntax: [
        {
          id: "go-syntax",
          title: "Go 基础语法",
          description: "回顾包、函数与控制流。",
          tone: "emerald",
          duration: "6 min",
          reward: "+150 XP"
        },
        {
          id: "go-kata",
          title: "错误处理练习",
          description: "完成 3 个小任务，熟悉 error。",
          tone: "cyan",
          duration: "10 min",
          reward: "+190 XP"
        }
      ],
      ownership: [
        {
          id: "go-interface",
          title: "接口与组合入门",
          description: "设计一个可扩展的服务结构。",
          tone: "violet",
          duration: "8 min",
          reward: "+220 XP"
        },
        {
          id: "go-struct",
          title: "结构体与方法",
          description: "构建带方法集的类型。",
          tone: "cyan",
          duration: "12 min",
          reward: "+260 XP"
        }
      ],
      borrowing: [
        {
          id: "go-goroutine",
          title: "Goroutine 入门",
          description: "掌握 goroutine 生命周期。",
          tone: "violet",
          duration: "7 min",
          reward: "+220 XP"
        },
        {
          id: "go-context",
          title: "Context 管理",
          description: "使用 context 管理并发任务。",
          tone: "cyan",
          duration: "9 min",
          reward: "+240 XP"
        }
      ],
      pointers: [
        {
          id: "go-channel",
          title: "Channel 基础",
          description: "练习缓冲与无缓冲通道。",
          tone: "violet",
          duration: "10 min",
          reward: "+260 XP"
        },
        {
          id: "go-sync",
          title: "同步原语",
          description: "Mutex/WaitGroup 常见用法。",
          tone: "cyan",
          duration: "6 min",
          reward: "+180 XP"
        }
      ],
      concurrency: [
        {
          id: "go-patterns",
          title: "并发模式进阶",
          description: "扇入扇出、工作池与流水线。",
          tone: "violet",
          duration: "10 min",
          reward: "+280 XP"
        },
        {
          id: "go-profiling",
          title: "性能调优进阶",
          description: "pprof 入门与瓶颈定位。",
          tone: "cyan",
          duration: "12 min",
          reward: "+320 XP"
        }
      ]
    },
    node: {
      syntax: [
        {
          id: "node-syntax",
          title: "Node 基础语法",
          description: "ES 模块、函数与控制流回顾。",
          tone: "emerald",
          duration: "6 min",
          reward: "+150 XP"
        },
        {
          id: "node-kata",
          title: "异步入门练习",
          description: "完成 3 个小任务，熟悉异步。",
          tone: "cyan",
          duration: "9 min",
          reward: "+190 XP"
        }
      ],
      ownership: [
        {
          id: "node-loop",
          title: "事件循环入门",
          description: "宏任务/微任务与阶段理解。",
          tone: "violet",
          duration: "7 min",
          reward: "+220 XP"
        },
        {
          id: "node-runtime",
          title: "Runtime 机制",
          description: "libuv 与 I/O 线程池。",
          tone: "cyan",
          duration: "11 min",
          reward: "+260 XP"
        }
      ],
      borrowing: [
        {
          id: "node-async",
          title: "Promise/async 进阶",
          description: "Promise/async/stream 实战。",
          tone: "violet",
          duration: "9 min",
          reward: "+240 XP"
        },
        {
          id: "node-error",
          title: "错误处理进阶",
          description: "重试、降级与监控。",
          tone: "cyan",
          duration: "8 min",
          reward: "+220 XP"
        }
      ],
      pointers: [
        {
          id: "node-mod",
          title: "模块系统进阶",
          description: "ESM/CJS 与依赖边界。",
          tone: "violet",
          duration: "8 min",
          reward: "+230 XP"
        },
        {
          id: "node-deps",
          title: "依赖治理",
          description: "锁定版本与安全更新。",
          tone: "cyan",
          duration: "6 min",
          reward: "+180 XP"
        }
      ],
      concurrency: [
        {
          id: "node-perf",
          title: "性能调优进阶",
          description: "诊断事件阻塞与吞吐。",
          tone: "violet",
          duration: "10 min",
          reward: "+280 XP"
        },
        {
          id: "node-observe",
          title: "监控与告警",
          description: "指标、日志、链路追踪。",
          tone: "cyan",
          duration: "12 min",
          reward: "+320 XP"
        }
      ]
    }
  };

  let activeId = "ownership";
  let viewMode: "map" | "galaxy" = "galaxy";
  let track: TrackKey = "rust";

  const getNodes = () =>
    baseNodes.map((node) => ({
      ...node,
      ...positionsByTrack[track][node.id]
    })) as GraphNode[];

  $: nodes = getNodes();
  $: if (track && defaultActiveByTrack[track] && activeId !== defaultActiveByTrack[track]) {
    activeId = defaultActiveByTrack[track];
  }

  const getNode = (id: string) => nodes.find((node) => node.id === id) ?? nodes[1];
  const getActionCards = (id: string) => actionsByNode[track][id] ?? actionsByNode[track].ownership;

  const getNodeClass = (status: NodeStatus, isActive: boolean) => {
    if (status === "active") {
      return `border-violet-500 text-violet-100 shadow-[0_0_30px_rgba(139,92,246,0.45)] ${
        isActive ? "scale-110" : "scale-100"
      }`;
    }
    if (status === "done") {
      return "border-emerald-500 text-emerald-400";
    }
    return "border-slate-700 text-slate-500 group-hover:border-cyan-500 group-hover:text-cyan-400";
  };

  const getNodeIcon = (status: NodeStatus) => {
    if (status === "done") {
      return CheckCircle;
    }
    if (status === "active") {
      return Sparkles;
    }
    return Lock;
  };

  const getToneClass = (tone: ActionCard["tone"]) => {
    if (tone === "violet") {
      return "border-violet-500/30 hover:border-violet-500/70 bg-violet-500/5";
    }
    if (tone === "emerald") {
      return "border-emerald-500/30 hover:border-emerald-500/70 bg-emerald-500/5";
    }
    return "border-cyan-500/30 hover:border-cyan-500/70 bg-cyan-500/5";
  };

  const getToneBadge = (tone: ActionCard["tone"]) => {
    if (tone === "violet") {
      return "text-violet-300 bg-violet-500/10";
    }
    if (tone === "emerald") {
      return "text-emerald-300 bg-emerald-500/10";
    }
    return "text-cyan-300 bg-cyan-500/10";
  };
</script>

<div class="space-y-8">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-heading font-bold">{trackText[track].title}</h1>
      <p class="text-muted-foreground mt-1">{trackText[track].subtitle}</p>
    </div>
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-4 bg-slate-900/50 px-4 py-2 rounded-xl border border-border">
        <div class="flex flex-col items-end">
          <span class="text-xs text-muted-foreground uppercase tracking-wider">{trackText[track].velocityLabel}</span>
          <span class="font-mono text-lg font-bold text-cyan-400">{trackText[track].velocityValue}</span>
        </div>
        <div class="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
          <Zap class="text-cyan-400" size={20} />
        </div>
      </div>
      <div class="flex items-center gap-2 rounded-xl border border-border bg-slate-900/70 p-1">
        <button
          class={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            track === "rust" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
          }`}
          on:click={() => (track = "rust")}
        >
          Rust
        </button>
        <button
          class={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            track === "python" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
          }`}
          on:click={() => (track = "python")}
        >
          Python
        </button>
        <button
          class={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            track === "go" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
          }`}
          on:click={() => (track = "go")}
        >
          Go
        </button>
        <button
          class={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            track === "node" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
          }`}
          on:click={() => (track = "node")}
        >
          Node
        </button>
      </div>
    </div>
  </div>

  <!-- Graph Visualization Area -->
  <div class="relative w-full h-[620px] bg-slate-950 rounded-2xl border border-border overflow-hidden md:p-10 p-4">
    <div
      class="absolute inset-0 pointer-events-none transition-opacity duration-500"
      class:opacity-20={viewMode === "map"}
      class:opacity-40={viewMode === "galaxy"}
    >
      <div class="absolute inset-0 bg-grid"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e1b4b_0%,transparent_55%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#0f172a_0%,transparent_45%)]"></div>
      <div class="absolute inset-0 animate-float-slow opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent_45%)]"></div>
    </div>

    {#each nodes as node (node.id)}
      <button
        class="absolute z-10 group cursor-pointer"
        style={`left:${node.x}%; top:${node.y}%; transform: translate(-50%, -50%);`}
        on:click={() => (activeId = node.id)}
      >
        <div class="flex flex-col items-center gap-2">
          <div
            class={`w-20 h-20 rounded-full bg-slate-900 border-2 flex items-center justify-center transition-all duration-300 ${getNodeClass(
              node.status,
              node.id === activeId
            )}`}
          >
            <svelte:component this={getNodeIcon(node.status)} size={24} />
          </div>
          <span
            class={`text-xs font-medium transition-colors ${
              node.status === "active"
                ? "text-violet-200"
                : node.status === "done"
                  ? "text-emerald-300"
                  : "text-slate-400 group-hover:text-cyan-300"
            }`}
          >
            {nodeLabels[track][node.id]}
          </span>
        </div>
      </button>
    {/each}

    <div class="absolute top-6 left-6 flex items-center gap-2 rounded-xl border border-border bg-slate-900/80 px-3 py-2 text-xs text-slate-300">
      <div class="flex items-center gap-2">
        <span class="inline-flex w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
        {trackText[track].focusNode}
      </div>
      <div class="h-4 w-px bg-slate-700"></div>
      <div class="flex items-center gap-2">
        <span class="inline-flex w-2 h-2 rounded-full bg-emerald-500"></span>
        {trackText[track].completed}
      </div>
      <div class="h-4 w-px bg-slate-700"></div>
      <div class="flex items-center gap-2">
        <span class="inline-flex w-2 h-2 rounded-full bg-slate-500"></span>
        {trackText[track].locked}
      </div>
    </div>

    <div class="absolute right-6 top-6 w-64 rounded-2xl border border-border bg-slate-900/80 p-4 backdrop-blur-md shadow-xl">
      <p class="text-xs uppercase tracking-wider text-slate-500">{trackText[track].activeNode}</p>
      <h3 class="mt-2 text-lg font-bold text-white">{nodeLabels[track][activeId]}</h3>
      <p class="mt-2 text-sm text-slate-300">{nodeSummaries[track][activeId]}</p>
      <div class="mt-4">
        <div class="flex items-center justify-between text-xs text-slate-400">
          <span>{trackText[track].progress}</span>
          <span>{getNode(activeId).xp} XP</span>
        </div>
        <div class="mt-2 h-2 w-full rounded-full bg-slate-800">
          <div
            class="h-2 rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 animate-progress"
            style={`width:${Math.min(100, Math.max(20, getNode(activeId).xp / 5))}%`}
          ></div>
        </div>
      </div>
    </div>

    <!-- Floating Legend/Controls -->
    <div class="absolute bottom-6 right-6 flex gap-2 bg-slate-900/80 p-2 rounded-xl border border-border backdrop-blur-md">
      <button
        class={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
          viewMode === "map" ? "bg-white/10 text-white" : "hover:bg-white/5"
        }`}
        on:click={() => (viewMode = "map")}
      >
        {trackText[track].view2d}
      </button>
      <button
        class={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
          viewMode === "galaxy" ? "bg-white/10 text-white" : "hover:bg-white/5"
        }`}
        on:click={() => (viewMode = "galaxy")}
      >
        {trackText[track].view3d}
      </button>
    </div>
  </div>
  
  <!-- Recommended Actions -->
  <div class="flex items-center justify-between">
    <div>
      <h3 class="text-lg font-bold">{trackText[track].recommended}</h3>
      <p class="text-xs text-muted-foreground mt-1">
        {trackText[track].basedOn}
        <span class="text-violet-300 font-medium">{nodeLabels[track][activeId]}</span>
      </p>
    </div>
    <div class="text-xs text-slate-500">联动更新</div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each getActionCards(activeId) as card, index (card.id)}
      <div
        class={`p-6 rounded-2xl border bg-slate-900/50 transition-colors cursor-pointer group ${getToneClass(
          card.tone
        )}`}
      >
        <div class="flex items-start justify-between mb-4">
          <div class={`w-10 h-10 rounded-lg flex items-center justify-center ${getToneBadge(card.tone)}`}>
            <span class="font-bold">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <ArrowRight class="text-slate-600 group-hover:text-white transition-colors" />
        </div>
        <h3 class="font-bold text-lg mb-1 group-hover:text-white">{card.title}</h3>
        <p class="text-sm text-muted-foreground">{card.description}</p>
        <div class="mt-4 flex items-center gap-3 text-xs text-slate-400">
          <span class={`px-2 py-1 rounded-full ${getToneBadge(card.tone)}`}>{card.duration}</span>
          <span>{card.reward}</span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  @keyframes float-slow {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-12px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes progress-glow {
    0% {
      filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.35));
    }
    50% {
      filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.55));
    }
    100% {
      filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.35));
    }
  }

  .animate-float-slow {
    animation: float-slow 10s ease-in-out infinite;
  }

  .animate-progress {
    animation: progress-glow 3.5s ease-in-out infinite;
  }

</style>
