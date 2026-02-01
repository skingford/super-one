<script lang="ts">
  import { cn } from "$lib/utils/cn";
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
    ArrowLeft,
    Terminal,
    Sparkles,
    Filter,
    FolderOpen
  } from "lucide-svelte";

  // Featured resources
  const featuredResources = [
    {
      title: "Claude Code Manual",
      description: "Official documentation: Commands, Agents, Skills & Hooks.",
      href: "/knowledge/claude",
      icon: Terminal,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/50",
      tags: ["Guide", "Official"],
    },
    {
      title: "Everything Claude",
      description: "Complete ecosystem: Agents, Skills, Hooks configuration.",
      href: "/knowledge/everything-claude-code",
      icon: Sparkles,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "hover:border-violet-500/50",
      tags: ["Ecosystem", "Tools"],
    },
  ];

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

<div class="space-y-8 animate-fade-in">
  <!-- Header Section -->
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 class="text-3xl font-heading font-bold text-foreground">Knowledge Base</h1>
      <p class="text-muted-foreground mt-1">Curate and evolve your personal learning nodes.</p>
    </div>
    <button 
      onclick={() => (showAddDialog = true)}
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-105"
    >
      <Plus size={18} />
      <span>New Entry</span>
    </button>
  </div>

  <!-- Featured Grid -->
  {#if featuredResources.length > 0}
    <div class="grid md:grid-cols-2 gap-6">
      {#each featuredResources as resource}
        {@const Icon = resource.icon}
        <a
          href={resource.href}
          class="group relative p-6 rounded-3xl bg-slate-900/40 border border-border {resource.border} transition-all duration-300 hover:bg-slate-900/60 overflow-hidden"
        >
          <!-- Hover Gradient -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="relative flex items-start gap-4">
            <div class="p-3 rounded-2xl {resource.bg}">
              <Icon class="w-6 h-6 {resource.color}" />
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-lg text-foreground group-hover:text-white transition-colors">
                {resource.title}
              </h3>
              <p class="text-sm text-muted-foreground mt-1 leading-relaxed">{resource.description}</p>
              <div class="flex gap-2 mt-4">
                {#each resource.tags as tag}
                  <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-white/5 text-white/70 border border-white/5">{tag}</span>
                {/each}
              </div>
            </div>
            <div class="p-2 rounded-full hover:bg-white/10 text-muted-foreground group-hover:text-foreground transition-colors self-start -mr-2 -mt-2">
                <ArrowLeft class="w-5 h-5 rotate-180" />
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}

  <!-- Search & Filter Toolkit -->
  <div class="sticky top-20 z-30 p-2 rounded-2xl bg-background/80 backdrop-blur-xl border border-border shadow-sm flex flex-col md:flex-row gap-2">
    <!-- Search -->
    <div class="relative flex-1">
      <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="search"
        placeholder="Search nodes..."
        bind:value={knowledgeStore.searchQuery}
        class="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-900/50 border border-transparent focus:bg-slate-900 focus:border-primary/30 text-sm transition-all focus:outline-none focus:ring-0"
      />
    </div>

    <!-- Filters -->
    <div class="flex items-center gap-1 overflow-x-auto no-scrollbar px-1">
      <button
        onclick={() => (knowledgeStore.selectedCategory = null)}
        class={cn(
          "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
          !knowledgeStore.selectedCategory
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
        )}
      >
        All
      </button>
      {#each knowledgeStore.categories as cat}
        {@const Icon = categoryIcons[cat.id] || FileText}
        <button
          onclick={() => (knowledgeStore.selectedCategory = cat.id)}
          class={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
            knowledgeStore.selectedCategory === cat.id
              ? "bg-white/10 text-white border border-white/10"
              : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
          )}
        >
          <Icon class="w-3.5 h-3.5" />
          {cat.name}
        </button>
      {/each}
    </div>
  </div>

  <!-- Content Grid -->
  {#if knowledgeStore.isLoading}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(6) as _}
        <div class="h-48 rounded-3xl bg-slate-900/30 animate-pulse"></div>
      {/each}
    </div>
  {:else if knowledgeStore.filteredItems.length === 0}
    <div class="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-3xl bg-slate-900/20">
      <div class="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4">
        <FolderOpen class="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 class="text-lg font-bold">No knowledge nodes found</h3>
      <p class="text-muted-foreground mb-6 max-w-xs mx-auto">Start building your graph by adding a new entry.</p>
      <Button onclick={() => (showAddDialog = true)} variant="outline">
        <Plus class="w-4 h-4 mr-2" />
        Add First Node
      </Button>
    </div>
  {:else}
    <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {#each knowledgeStore.filteredItems as item (item.id)}
        {@const Icon = categoryIcons[item.category] || FileText}
        <a
          href="/knowledge/{item.id}"
          class="group block relative break-inside-avoid rounded-3xl bg-slate-900/40 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
        >
          <div class="p-6">
            <!-- Header -->
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="p-2 rounded-xl bg-slate-800/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Icon class="w-4 h-4" />
                    </div>
                     <div>
                        <h3 class="font-bold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
                        <p class="text-[10px] text-muted-foreground font-mono mt-0.5">{formatRelativeTime(item.updatedAt)}</p>
                    </div>
                </div>
                
                {#if item.isPinned}
                    <Pin class="w-3.5 h-3.5 text-secondary shrink-0" />
                {/if}
            </div>

            <!-- Content Preview -->
            <p class="text-sm text-muted-foreground line-clamp-4 leading-relaxed mb-4 font-normal">
                {item.content}
            </p>

            <!-- Footer -->
            <div class="flex items-center justify-between pt-4 border-t border-border/50">
                <div class="flex flex-wrap gap-1">
                    {#each item.tags.slice(0, 2) as tag}
                        <span class="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700/50">{tag}</span>
                    {/each}
                     {#if item.tags.length > 2}
                        <span class="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800 text-slate-500">+{item.tags.length - 2}</span>
                    {/if}
                </div>
                
                <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-200">
                    <button 
                         class="p-1.5 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground"
                         onclick={(e) => handleTogglePin(e, item.id)}
                    >
                        {#if item.isPinned}<PinOff size={14}/>{:else}<Pin size={14}/>{/if}
                    </button>
                    <button 
                         class="p-1.5 rounded-lg hover:bg-background text-muted-foreground hover:text-destructive"
                         onclick={(e) => handleDelete(e, item.id)}
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>

<!-- Add Dialog (Using existing Dialog component) -->
<Dialog bind:open={showAddDialog} title="New Knowledge Node" description="Add to your personal graph.">
  <form onsubmit={(e) => { e.preventDefault(); handleAdd(); }} class="space-y-4">
    <div class="space-y-1.5">
      <label for="title" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</label>
      <Input id="title" bind:value={newTitle} placeholder="e.g. React Patterns" required />
    </div>

    <div class="space-y-1.5">
      <label class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</label>
      <div class="grid grid-cols-4 gap-2">
        {#each knowledgeStore.categories as cat}
          {@const Icon = categoryIcons[cat.id] || FileText}
          <button
            type="button"
            class={cn(
              "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-xs font-medium",
              newCategory === cat.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-slate-900/50 text-muted-foreground hover:bg-slate-900 hover:border-slate-700"
            )}
            onclick={() => (newCategory = cat.id)}
          >
            <Icon class="w-4 h-4" />
            <span>{cat.name}</span>
          </button>
        {/each}
      </div>
    </div>

    <div class="space-y-1.5">
      <label for="content" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</label>
      <Textarea
        id="content"
        bind:value={newContent}
        placeholder="Markdown supported..."
        rows={6}
        required
      />
    </div>

    <div class="space-y-1.5">
      <label for="tags" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags</label>
      <Input id="tags" bind:value={newTags} placeholder="comma, separated" />
    </div>
  </form>

  {#snippet footer()}
    <Button variant="ghost" onclick={() => (showAddDialog = false)}>Cancel</Button>
    <Button onclick={handleAdd} disabled={!newTitle.trim() || !newContent.trim()}>
      Create Node
    </Button>
  {/snippet}
</Dialog>
