<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import BentoCard from "$lib/components/ui/BentoCard.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Input from "$lib/components/ui/Input.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import Dialog from "$lib/components/ui/Dialog.svelte";
  import Textarea from "$lib/components/ui/Textarea.svelte";
  import { knowledgeStore } from "$lib/stores/knowledge.svelte";
  import { formatRelativeTime } from "$lib/utils/storage";
  import {
    Plus,
    Search,
    Pin,
    PinOff,
    Trash2,
    FileText,
    Code,
    Link,
    Lightbulb,
    BookOpen,
    ArrowLeft,
    Terminal,
    Sparkles,
  } from "lucide-svelte";

  // Featured resources
  const featuredResources = [
    {
      title: "Claude Code 完整知识手册",
      description: "官方文档整理 - 命令、插件、代理、技能、钩子、权限、MCP 等核心功能",
      href: "/knowledge/claude",
      icon: Terminal,
      gradient: "linear-gradient(135deg, rgba(16,185,129,0.4) 0%, rgba(6,182,212,0.2) 100%)",
      tags: ["Claude Code", "官方文档", "完整指南"],
    },
    {
      title: "Everything Claude Code",
      description: "完整的 Claude Code 配置生态系统 - Agents、Skills、Hooks、Commands",
      href: "/knowledge/everything-claude-code",
      icon: Terminal,
      gradient: "linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(59,130,246,0.2) 100%)",
      tags: ["Claude Code", "AI 工具", "配置"],
    },
  ];

  // Form state
  let showAddDialog = $state(false);
  let newTitle = $state("");
  let newContent = $state("");
  let newCategory = $state("notes");
  let newTags = $state("");

  // Category icons mapping
  const categoryIcons: Record<string, any> = {
    notes: FileText,
    code: Code,
    resources: Link,
    ideas: Lightbulb,
  };

  const categoryGradients: Record<string, string> = {
    notes: "linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(37,99,235,0.15) 100%)",
    code: "linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(5,150,105,0.15) 100%)",
    resources: "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(124,58,237,0.15) 100%)",
    ideas: "linear-gradient(135deg, rgba(245,158,11,0.3) 0%, rgba(217,119,6,0.15) 100%)",
  };

  async function handleAdd() {
    if (!newTitle.trim() || !newContent.trim()) return;

    await knowledgeStore.add({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      tags: newTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    newTitle = "";
    newContent = "";
    newCategory = "notes";
    newTags = "";
    showAddDialog = false;
  }

  async function handleDelete(e: MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("确定要删除这条知识吗？")) {
      await knowledgeStore.delete(id);
    }
  }

  async function handleTogglePin(e: MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    await knowledgeStore.togglePin(id);
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center gap-4 mb-8">
    <a href="/" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <ArrowLeft class="w-5 h-5 text-white/60" />
    </a>
    <div class="flex-1">
      <h1 class="text-3xl font-bold text-white">知识归档</h1>
      <p class="text-white/50 mt-1">整理和管理你的学习笔记</p>
    </div>
    <Button onclick={() => (showAddDialog = true)}>
      <Plus class="w-4 h-4" />
      添加知识
    </Button>
  </div>

  <!-- Featured Resources -->
  {#if featuredResources.length > 0}
    <section class="mb-8">
      <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Sparkles class="w-5 h-5 text-yellow-400" />
        精选资源
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each featuredResources as resource}
          {@const Icon = resource.icon}
          <a
            href={resource.href}
            class="group p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
            style="background: {resource.gradient}"
          >
            <div class="flex items-start gap-4">
              <div class="p-3 rounded-2xl bg-white/10">
                <Icon class="w-6 h-6 text-white" />
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-white group-hover:text-violet-400 transition-colors">
                  {resource.title}
                </h3>
                <p class="text-sm text-white/50 mt-1">{resource.description}</p>
                <div class="flex flex-wrap gap-1 mt-3">
                  {#each resource.tags as tag}
                    <span class="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white/60">{tag}</span>
                  {/each}
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Filters -->
  <div class="flex flex-wrap items-center gap-4">
    <div class="relative flex-1 min-w-[200px] max-w-md">
      <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
      <input
        type="search"
        placeholder="搜索知识..."
        bind:value={knowledgeStore.searchQuery}
        class="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      />
    </div>

    <div class="flex gap-2">
      <button
        class={cn(
          "px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
          !knowledgeStore.selectedCategory
            ? "bg-white/10 text-white"
            : "text-white/50 hover:text-white hover:bg-white/5"
        )}
        onclick={() => (knowledgeStore.selectedCategory = null)}
      >
        全部
      </button>
      {#each knowledgeStore.categories as cat}
        {@const Icon = categoryIcons[cat.id] || FileText}
        <button
          class={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
            knowledgeStore.selectedCategory === cat.id
              ? "bg-white/10 text-white"
              : "text-white/50 hover:text-white hover:bg-white/5"
          )}
          onclick={() => (knowledgeStore.selectedCategory = cat.id)}
        >
          <Icon class="w-4 h-4" />
          {cat.name}
        </button>
      {/each}
    </div>
  </div>

  <!-- Knowledge Grid -->
  {#if knowledgeStore.isLoading}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each Array(6) as _}
        <div class="h-48 rounded-3xl bg-white/5 animate-pulse"></div>
      {/each}
    </div>
  {:else if knowledgeStore.filteredItems.length === 0}
    <BentoCard variant="glass" class="py-16 text-center">
      <BookOpen class="w-16 h-16 text-white/20 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-white mb-2">还没有知识条目</h3>
      <p class="text-white/50 mb-6">开始记录你的学习内容</p>
      <Button onclick={() => (showAddDialog = true)}>
        <Plus class="w-4 h-4" />
        添加第一条知识
      </Button>
    </BentoCard>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each knowledgeStore.filteredItems as item (item.id)}
        {@const Icon = categoryIcons[item.category] || FileText}
        <a
          href="/knowledge/{item.id}"
          class="group relative p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 hover:scale-[1.02]"
          style="background: {categoryGradients[item.category] || categoryGradients.notes}"
        >
          <!-- Pin indicator -->
          {#if item.isPinned}
            <div class="absolute top-4 right-4">
              <Pin class="w-4 h-4 text-yellow-400" />
            </div>
          {/if}

          <div class="flex items-start gap-3 mb-4">
            <div class="p-2 rounded-xl bg-white/10">
              <Icon class="w-5 h-5 text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p class="text-xs text-white/40 mt-0.5">
                {formatRelativeTime(item.updatedAt)}
              </p>
            </div>
          </div>

          <p class="text-sm text-white/60 line-clamp-3 mb-4">{item.content}</p>

          <div class="flex items-center justify-between">
            <div class="flex flex-wrap gap-1">
              {#each item.tags.slice(0, 2) as tag}
                <span class="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white/60">{tag}</span>
              {/each}
              {#if item.tags.length > 2}
                <span class="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/40">+{item.tags.length - 2}</span>
              {/if}
            </div>

            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                onclick={(e) => handleTogglePin(e, item.id)}
                title={item.isPinned ? "取消置顶" : "置顶"}
              >
                {#if item.isPinned}
                  <PinOff class="w-4 h-4 text-yellow-400" />
                {:else}
                  <Pin class="w-4 h-4 text-white/40" />
                {/if}
              </button>
              <button
                class="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                onclick={(e) => handleDelete(e, item.id)}
                title="删除"
              >
                <Trash2 class="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>

<!-- Add Dialog -->
<Dialog bind:open={showAddDialog} title="添加知识" description="记录一条新的知识内容">
  <form onsubmit={(e) => { e.preventDefault(); handleAdd(); }} class="space-y-4">
    <div>
      <label for="title" class="text-sm font-medium text-white/80 mb-1.5 block">标题</label>
      <Input id="title" bind:value={newTitle} placeholder="输入标题..." required class="bg-white/5 border-white/10 text-white" />
    </div>

    <div>
      <label class="text-sm font-medium text-white/80 mb-1.5 block">分类</label>
      <div class="grid grid-cols-4 gap-2">
        {#each knowledgeStore.categories as cat}
          {@const Icon = categoryIcons[cat.id] || FileText}
          <button
            type="button"
            class={cn(
              "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all",
              newCategory === cat.id
                ? "border-primary bg-primary/20 text-white"
                : "border-white/10 text-white/60 hover:border-white/20 hover:bg-white/5"
            )}
            onclick={() => (newCategory = cat.id)}
          >
            <Icon class="w-5 h-5" />
            <span class="text-xs">{cat.name}</span>
          </button>
        {/each}
      </div>
    </div>

    <div>
      <label for="content" class="text-sm font-medium text-white/80 mb-1.5 block">内容</label>
      <Textarea
        id="content"
        bind:value={newContent}
        placeholder="输入内容..."
        rows={6}
        required
        class="bg-white/5 border-white/10 text-white"
      />
    </div>

    <div>
      <label for="tags" class="text-sm font-medium text-white/80 mb-1.5 block">标签</label>
      <Input id="tags" bind:value={newTags} placeholder="用逗号分隔" class="bg-white/5 border-white/10 text-white" />
    </div>
  </form>

  {#snippet footer()}
    <Button variant="ghost" onclick={() => (showAddDialog = false)} class="text-white/60">取消</Button>
    <Button onclick={handleAdd} disabled={!newTitle.trim() || !newContent.trim()}>
      添加
    </Button>
  {/snippet}
</Dialog>
