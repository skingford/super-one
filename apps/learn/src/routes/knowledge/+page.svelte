<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { onMount } from "svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Input from "$lib/components/ui/Input.svelte";
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
    ArrowRight,
    Terminal,
    Sparkles,
    Filter,
    FolderOpen,
    Cpu,
    Zap,
    LayoutGrid,
    List
  } from "lucide-svelte";
  import { fade, fly } from "svelte/transition";

  // Featured resources - Enhanced visual data
  const featuredResources = [
    {
      title: "Claude Code Manual",
      description: "Complete command reference, agent capabilities, and hook system documentation.",
      href: "/knowledge/claude",
      icon: Terminal,
      color: "text-emerald-400",
      gradient: "from-emerald-500/20 to-teal-500/5",
      border: "group-hover:border-emerald-500/30",
      tags: ["Official", "Reference"],
    },
    {
      title: "Everything Claude",
      description: "Deep dive into the ecosystem: specialized agents, custom skills, and configuration patterns.",
      href: "/knowledge/everything-claude-code",
      icon: Sparkles,
      color: "text-violet-400",
      gradient: "from-violet-500/20 to-fuchsia-500/5",
      border: "group-hover:border-violet-500/30",
      tags: ["Ecosystem", "Advanced"],
    },
    {
      title: "BMAD-METHOD",
      description: "AI-driven agile development framework with 12+ specialized agents and 50+ guided workflows.",
      href: "/knowledge/bmad-method",
      icon: Cpu,
      color: "text-cyan-400",
      gradient: "from-cyan-500/20 to-emerald-500/5",
      border: "group-hover:border-cyan-500/30",
      tags: ["AI-Driven", "Agile"],
    },
    {
      title: "OpenSpec",
      description: "Spec-first + OPSX workflow to align humans and AI before coding.",
      href: "/knowledge/openspec",
      icon: BookOpen,
      color: "text-amber-400",
      gradient: "from-amber-500/20 to-orange-500/5",
      border: "group-hover:border-amber-500/30",
      tags: ["Spec-First", "OPSX"],
    },
  ];

  const hasSearch = $derived(knowledgeStore.searchQuery.trim().length > 0);

  // Form state
  let showAddDialog = $state(false);
  let newTitle = $state("");
  let newContent = $state("");
  let newCategory = $state("notes");
  let newTags = $state("");

  const categoryIcons: Record<string, any> = {
    notes: FileText,
    code: Code,
    resources: Link,
    ideas: Lightbulb,
  };

  const categoryColors: Record<string, string> = {
    notes: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    code: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    resources: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    ideas: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  };

  let featuredMode = $state<"always" | "empty">("always");

  onMount(() => {
    knowledgeStore.searchQuery = "";
    knowledgeStore.selectedCategory = null;
  });

  function escapeHtml(value: string) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function highlightHTML(value: string) {
    if (!value) return "";
    const query = knowledgeStore.searchQuery.trim();
    if (!query) return escapeHtml(value);

    const escapedQuery = escapeRegExp(query);
    const splitRe = new RegExp(`(${escapedQuery})`, "ig");
    const matchRe = new RegExp(`^${escapedQuery}$`, "i");

    return value
      .split(splitRe)
      .map((part) =>
        matchRe.test(part)
          ? `<mark class="rounded bg-emerald-400/20 text-emerald-200 px-0.5">${escapeHtml(part)}</mark>`
          : escapeHtml(part)
      )
      .join("");
  }

  async function handleAdd() {
    if (!newTitle.trim() || !newContent.trim()) return;

    await knowledgeStore.add({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      tags: newTags.split(",").map((t) => t.trim()).filter(Boolean),
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
    if (confirm("Delete this item?")) {
      await knowledgeStore.delete(id);
    }
  }

  async function handleTogglePin(e: MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    await knowledgeStore.togglePin(id);
  }
</script>

<div class="space-y-12 animate-fade-in pb-20">
  <!-- Search & Filter Bar (Floating Glass) -->
  <div class="sticky top-8 z-30 mx-auto max-w-4xl">
      <div class="p-1.5 rounded-2xl bg-[#0a0f0a]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 flex flex-col sm:flex-row gap-2 transition-all duration-300 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20">
        <!-- Main Search -->
        <div class="relative flex-1">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search nodes, tags, or content..."
            bind:value={knowledgeStore.searchQuery}
            class="w-full h-11 pl-11 pr-4 rounded-xl bg-transparent text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:bg-white/5 transition-colors"
          />
        </div>

        <div class="w-px h-8 bg-white/10 hidden sm:block self-center"></div>

        <!-- Category Filters -->
        <div class="flex items-center gap-1 overflow-x-auto no-scrollbar px-1 py-1 sm:py-0">
          <button
            onclick={() => (knowledgeStore.selectedCategory = null)}
            class={cn(
              "px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap",
              !knowledgeStore.selectedCategory
                ? "bg-white text-black shadow-lg shadow-white/10"
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            )}
          >
            All
          </button>
          {#each knowledgeStore.categories as cat}
             {@const Icon = categoryIcons[cat.id]}
            <button
              onclick={() => (knowledgeStore.selectedCategory = cat.id)}
              class={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap border",
                knowledgeStore.selectedCategory === cat.id
                  ? "bg-slate-800 text-white border-slate-600 shadow-lg"
                  : "border-transparent text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              {#if Icon}
                 <Icon size={12} />
              {/if}
              {cat.name}
            </button>
          {/each}
        </div>

        <div class="w-px h-8 bg-white/10 hidden sm:block self-center"></div>

        <!-- Featured Toggle -->
        <div class="flex items-center gap-2 px-1 py-1 sm:py-0">
          <span class="text-[10px] uppercase tracking-widest text-white/40">精选</span>
          <button
            class={cn(
              "px-3 py-2 rounded-xl text-[11px] font-medium transition-all whitespace-nowrap border",
              featuredMode === "always"
                ? "bg-white text-black border-white shadow-lg shadow-white/10"
                : "border-transparent text-muted-foreground hover:text-white hover:bg-white/5"
            )}
            onclick={() => (featuredMode = "always")}
          >
            始终显示
          </button>
          <button
            class={cn(
              "px-3 py-2 rounded-xl text-[11px] font-medium transition-all whitespace-nowrap border",
              featuredMode === "empty"
                ? "bg-white text-black border-white shadow-lg shadow-white/10"
                : "border-transparent text-muted-foreground hover:text-white hover:bg-white/5"
            )}
            onclick={() => (featuredMode = "empty")}
          >
            仅无结果
          </button>
        </div>
      </div>
  </div>

  {#snippet featuredGrid()}
    {#if featuredResources.length > 0}
      <div class="grid md:grid-cols-2 gap-4">
        {#each featuredResources as resource}
          {@const Icon = resource.icon}
          <a
            href={resource.href}
            class="group relative p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 {resource.border} transition-all duration-500 hover:bg-slate-900/60 overflow-hidden"
          >
            <!-- Background Gradient -->
            <div class={`absolute inset-0 bg-gradient-to-br ${resource.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <div class="relative z-10 flex flex-col h-full justify-between">
              <div class="mb-8">
                 <div class="flex items-center justify-between mb-4">
                     <div class={`p-3 rounded-2xl bg-slate-950/50 border border-white/5 ${resource.color}`}>
                        <Icon size={24} />
                     </div>
                     <ArrowRight class={`w-5 h-5 ${resource.color} opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`} />
                 </div>
                 
                <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
                  {@html highlightHTML(resource.title)}
                </h3>
                 <p class="text-muted-foreground leading-relaxed group-hover:text-slate-300 transition-colors">
                    {@html highlightHTML(resource.description)}
                 </p>
              </div>
              
              <div class="flex gap-2">
                 {#each resource.tags as tag}
                    <span class="px-2.5 py-1 rounded-md text-xs font-mono bg-black/40 border border-white/5 text-slate-400 group-hover:border-white/10 transition-colors">
                      {@html highlightHTML(tag)}
                    </span>
                 {/each}
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  {/snippet}

  {#if featuredMode === "always"}
    {@render featuredGrid()}
  {/if}

  <!-- Hero / Header Section -->
  <div class="relative">
      <div class="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div class="space-y-4 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-muted-foreground backdrop-blur-sm">
             <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             Knowledge Graph Active
          </div>
          <h1 class="text-5xl md:text-6xl font-heading font-bold tracking-tight text-white">
            Your Digital <span class="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Cortex.</span>
          </h1>
          <p class="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Curate your personal knowledge nodes. Capture insights, code snippets, and resources in a unified neural network.
          </p>
        </div>
        
        <div class="flex gap-4">
             <Button 
              onclick={() => (showAddDialog = true)}
              class="h-12 px-6 rounded-xl bg-white text-black font-bold hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95"
            >
              <Plus class="w-5 h-5 mr-2" />
              New Node
            </Button>
        </div>
      </div>

  </div>

  <!-- Content Grid (Masonry effect using columns) -->
  {#if knowledgeStore.isLoading}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(6) as _}
        <div class="h-64 rounded-3xl bg-white/5 animate-pulse border border-white/5"></div>
      {/each}
    </div>
  {:else if knowledgeStore.filteredItems.length === 0}
    <div class="flex flex-col items-center justify-center py-32 text-center">
      {#if featuredMode === "empty"}
        <div class="mb-10 w-full max-w-4xl">
          {@render featuredGrid()}
        </div>
      {/if}
      <div class="flex flex-col items-center text-center">
        <div class="relative mb-6">
            <div class="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            <div class="relative z-10 w-20 h-20 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center">
              <FolderOpen class="w-10 h-10 text-muted-foreground" />
            </div>
        </div>
        {#if hasSearch}
          <h3 class="text-xl font-bold text-white mb-2">未找到匹配结果</h3>
          <p class="text-muted-foreground mb-8 max-w-sm mx-auto">
            未找到与“{knowledgeStore.searchQuery.trim()}”匹配的内容，请尝试更换关键词。
          </p>
        {:else if knowledgeStore.selectedCategory}
          <h3 class="text-xl font-bold text-white mb-2">该分类暂无内容</h3>
          <p class="text-muted-foreground mb-8 max-w-sm mx-auto">
            当前分类还没有内容，试试切换分类或新增节点。
          </p>
        {:else}
          <h3 class="text-xl font-bold text-white mb-2">No nodes found</h3>
          <p class="text-muted-foreground mb-8 max-w-sm mx-auto">
            Your knowledge graph is empty for this query. Plant a new seed.
          </p>
        {/if}
        {#if hasSearch}
          <Button
            onclick={() => (knowledgeStore.searchQuery = "")}
            variant="outline"
            class="border-white/10 hover:bg-white/5"
          >
            清空搜索
          </Button>
        {:else if knowledgeStore.selectedCategory}
          <Button
            onclick={() => (knowledgeStore.selectedCategory = null)}
            variant="outline"
            class="border-white/10 hover:bg-white/5"
          >
            清除分类筛选
          </Button>
        {:else}
          <Button onclick={() => (showAddDialog = true)} variant="outline" class="border-white/10 hover:bg-white/5">
            <Plus class="w-4 h-4 mr-2" />
            Create Node
          </Button>
        {/if}
      </div>
    </div>
  {:else}
    <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:balance]">
      {#each knowledgeStore.filteredItems as item (item.id)}
        {@const Icon = categoryIcons[item.category] || FileText}
        {@const colors = categoryColors[item.category] || categoryColors.notes}
        
        <div class="break-inside-avoid">
             <a
            href="/knowledge/{item.id}"
            class="group block relative rounded-3xl bg-[#0F1115] border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1 overflow-hidden"
            >
                <div class="p-6">
                    <!-- Card Header -->
                    <div class="flex items-start justify-between gap-4 mb-4">
                        <div class="flex items-center gap-3">
                            <div class={cn("p-2.5 rounded-xl transition-colors", colors)}>
                                <Icon class="w-4 h-4" />
                            </div>
                            <div class="flex flex-col">
                                <h3 class="font-bold text-slate-200 group-hover:text-white transition-colors">
                                  {@html highlightHTML(item.title)}
                                </h3>
                                <span class="text-[10px] font-mono text-slate-500 mt-0.5">{formatRelativeTime(item.updatedAt)}</span>
                            </div>
                        </div>
                        
                        {#if item.isPinned}
                             <div class="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                                <Pin size={12} strokeWidth={3} />
                             </div>
                        {/if}
                    </div>

                    <!-- Content Snippet -->
                    <div class="relative">
                         <p class="text-sm text-slate-400/80 leading-relaxed max-h-[160px] overflow-hidden group-hover:text-slate-300 transition-colors">
                            {@html highlightHTML(item.content)}
                         </p>
                         <div class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0F1115] to-transparent"></div>
                    </div>

                    <!-- Footer / Actions -->
                    <div class="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                        <div class="flex flex-wrap gap-1.5">
                            {#each item.tags.slice(0, 3) as tag}
                                <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-slate-400 group-hover:bg-white/10 transition-colors">
                                  #
                                  {@html highlightHTML(tag)}
                                </span>
                            {/each}
                        </div>
                        
                         <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-4 group-hover:translate-x-0">
                             <button
                                 class="p-2 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-colors"
                                 onclick={(e) => handleTogglePin(e, item.id)}
                            >
                                <Pin size={14} />
                             </button>
                             <button
                                 class="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"
                                 onclick={(e) => handleDelete(e, item.id)}
                            >
                                <Trash2 size={14} />
                             </button>
                         </div>
                    </div>
                </div>
            </a>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- Add Dialog (Using existing Dialog component) -->
<Dialog bind:open={showAddDialog} title="New Knowledge Node" description="Capture a new idea or resource.">
  <form onsubmit={(e) => { e.preventDefault(); handleAdd(); }} class="space-y-6 py-2">
    <div class="space-y-2">
      <label for="title" class="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Title</label>
      <Input id="title" bind:value={newTitle} placeholder="e.g. Advanced Rust Lifetimes" required class="bg-slate-950/50 border-white/10 focus:border-primary/50" />
    </div>

    <fieldset class="space-y-2">
      <legend class="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Category</legend>
      <div class="grid grid-cols-4 gap-3">
        {#each knowledgeStore.categories as cat}
          {@const Icon = categoryIcons[cat.id] || FileText}
          <button
            type="button"
            class={cn(
              "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-300",
              newCategory === cat.id
                ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                : "border-white/5 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
            )}
            onclick={() => (newCategory = cat.id)}
          >
            <Icon size={20} />
            <span class="text-xs font-medium mt-1">{cat.name}</span>
          </button>
        {/each}
      </div>
    </fieldset>

    <div class="space-y-2">
      <label for="content" class="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Content</label>
      <Textarea
        id="content"
        bind:value={newContent}
        placeholder="Markdown content supported..."
        rows={8}
        required
        class="bg-slate-950/50 border-white/10 focus:border-primary/50 resize-none font-mono text-sm leading-relaxed"
      />
    </div>

    <div class="space-y-2">
      <label for="tags" class="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Tags</label>
      <Input id="tags" bind:value={newTags} placeholder="comma, separated, tags" class="bg-slate-950/50 border-white/10 focus:border-primary/50" />
    </div>
  </form>

  {#snippet footer()}
    <div class="flex justify-end gap-3 pt-2">
         <Button variant="ghost" onclick={() => (showAddDialog = false)} class="hover:bg-white/5">Cancel</Button>
        <Button onclick={handleAdd} disabled={!newTitle.trim() || !newContent.trim()} class="bg-white text-black hover:bg-white/90 font-bold">
        Create Node
        </Button>
    </div>
  {/snippet}
</Dialog>
