<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import BentoCard from "$lib/components/ui/BentoCard.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Dialog from "$lib/components/ui/Dialog.svelte";
  import Textarea from "$lib/components/ui/Textarea.svelte";
  import Input from "$lib/components/ui/Input.svelte";
  import { interviewStore } from "$lib/stores/interview.svelte";
  import { INTERVIEW_CATEGORIES, DIFFICULTY_CONFIG } from "$lib/types";
  import type { InterviewCategory, Difficulty } from "$lib/types";
  import {
    Plus,
    Search,
    Star,
    StarOff,
    Trash2,
    Play,
    ArrowLeft,
    Monitor,
    Server,
    Binary,
    Network,
    Users,
    Lock,
  } from "lucide-svelte";

  // Form state
  let showAddDialog = $state(false);
  let newQuestion = $state("");
  let newAnswer = $state("");
  let newCategory = $state<InterviewCategory>("frontend");
  let newDifficulty = $state<Difficulty>("medium");
  let newTags = $state("");

  const categoryIcons: Record<InterviewCategory, any> = {
    frontend: Monitor,
    backend: Server,
    algorithm: Binary,
    "system-design": Network,
    behavioral: Users,
  };

  const categoryGradients: Record<InterviewCategory, string> = {
    frontend: "linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(37,99,235,0.15) 100%)",
    backend: "linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(5,150,105,0.15) 100%)",
    algorithm: "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(124,58,237,0.15) 100%)",
    "system-design": "linear-gradient(135deg, rgba(249,115,22,0.3) 0%, rgba(234,88,12,0.15) 100%)",
    behavioral: "linear-gradient(135deg, rgba(236,72,153,0.3) 0%, rgba(219,39,119,0.15) 100%)",
  };

  async function handleAdd() {
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    await interviewStore.add({
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      category: newCategory,
      difficulty: newDifficulty,
      tags: newTags.split(",").map((t) => t.trim()).filter(Boolean),
    });

    newQuestion = "";
    newAnswer = "";
    newCategory = "frontend";
    newDifficulty = "medium";
    newTags = "";
    showAddDialog = false;
  }

  async function handleDelete(e: MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("确定要删除这道题目吗？")) {
      await interviewStore.delete(id);
    }
  }

  async function handleToggleFavorite(e: MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    await interviewStore.toggleFavorite(id);
  }

  function startPractice() {
    const options: { category?: InterviewCategory; difficulty?: Difficulty } = {};
    if (interviewStore.selectedCategory) options.category = interviewStore.selectedCategory;
    if (interviewStore.selectedDifficulty) options.difficulty = interviewStore.selectedDifficulty;
    interviewStore.startPractice(options);
  }
</script>

<div class="space-y-6">
  <!-- Header with secret badge -->
  <div class="flex items-center gap-4 mb-8">
    <a href="/" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <ArrowLeft class="w-5 h-5 text-white/60" />
    </a>
    <div class="flex-1">
      <div class="flex items-center gap-2">
        <h1 class="text-3xl font-bold text-white">面试准备</h1>
        <span class="px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-400 flex items-center gap-1">
          <Lock class="w-3 h-3" />
          隐藏功能
        </span>
      </div>
      <p class="text-white/50 mt-1">收集面试题目，练习作答</p>
    </div>
    {#if interviewStore.totalCount > 0}
      <Button variant="outline" href="/interview/practice" class="border-white/10 text-white/80">
        <Play class="w-4 h-4" />
        开始练习
      </Button>
    {/if}
    <Button onclick={() => (showAddDialog = true)}>
      <Plus class="w-4 h-4" />
      添加题目
    </Button>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <BentoCard variant="gradient" gradient="linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(37,99,235,0.2) 100%)">
      <p class="text-3xl font-bold text-white">{interviewStore.totalCount}</p>
      <p class="text-sm text-white/60">总题目</p>
    </BentoCard>
    <BentoCard variant="gradient" gradient="linear-gradient(135deg, rgba(245,158,11,0.4) 0%, rgba(217,119,6,0.2) 100%)">
      <p class="text-3xl font-bold text-white">{interviewStore.favoriteCount}</p>
      <p class="text-sm text-white/60">收藏</p>
    </BentoCard>
    <BentoCard variant="gradient" gradient="linear-gradient(135deg, rgba(16,185,129,0.4) 0%, rgba(5,150,105,0.2) 100%)">
      <p class="text-3xl font-bold text-white">{interviewStore.difficultyStats.easy}</p>
      <p class="text-sm text-white/60">简单</p>
    </BentoCard>
    <BentoCard variant="gradient" gradient="linear-gradient(135deg, rgba(239,68,68,0.4) 0%, rgba(220,38,38,0.2) 100%)">
      <p class="text-3xl font-bold text-white">{interviewStore.difficultyStats.hard}</p>
      <p class="text-sm text-white/60">困难</p>
    </BentoCard>
  </div>

  <!-- Filters -->
  <div class="flex flex-wrap items-center gap-4">
    <div class="relative flex-1 min-w-[200px] max-w-md">
      <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
      <input
        type="search"
        placeholder="搜索题目..."
        bind:value={interviewStore.searchQuery}
        class="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>

    <select
      class="h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
      bind:value={interviewStore.selectedCategory}
    >
      <option value={null}>全部分类</option>
      {#each Object.entries(INTERVIEW_CATEGORIES) as [key, config]}
        <option value={key}>{config.label}</option>
      {/each}
    </select>

    <select
      class="h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
      bind:value={interviewStore.selectedDifficulty}
    >
      <option value={null}>全部难度</option>
      {#each Object.entries(DIFFICULTY_CONFIG) as [key, config]}
        <option value={key}>{config.label}</option>
      {/each}
    </select>

    <Button
      variant={interviewStore.showFavoritesOnly ? "default" : "outline"}
      onclick={() => (interviewStore.showFavoritesOnly = !interviewStore.showFavoritesOnly)}
      class={interviewStore.showFavoritesOnly ? "" : "border-white/10 text-white/60"}
    >
      <Star class="w-4 h-4" />
      收藏
    </Button>
  </div>

  <!-- Questions List -->
  {#if interviewStore.isLoading}
    <div class="space-y-4">
      {#each Array(5) as _}
        <div class="h-32 rounded-3xl bg-white/5 animate-pulse"></div>
      {/each}
    </div>
  {:else if interviewStore.filteredQuestions.length === 0}
    <BentoCard variant="glass" class="py-16 text-center">
      <Binary class="w-16 h-16 text-white/20 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-white mb-2">还没有面试题目</h3>
      <p class="text-white/50 mb-6">开始添加面试题目，建立你的题库</p>
      <Button onclick={() => (showAddDialog = true)}>
        <Plus class="w-4 h-4" />
        添加第一道题
      </Button>
    </BentoCard>
  {:else}
    <div class="space-y-4">
      {#each interviewStore.filteredQuestions as q (q.id)}
        {@const catConfig = INTERVIEW_CATEGORIES[q.category]}
        {@const diffConfig = DIFFICULTY_CONFIG[q.difficulty]}
        {@const Icon = categoryIcons[q.category]}
        <a
          href="/interview/{q.id}"
          class="group block p-6 rounded-3xl transition-all duration-300 hover:scale-[1.01]"
          style="background: {categoryGradients[q.category]}"
        >
          <div class="flex items-start gap-4">
            <div class="p-3 rounded-xl bg-white/10 shrink-0">
              <Icon class="w-6 h-6 text-white" />
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-4">
                <h3 class="font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {q.question}
                </h3>
                <div class="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    onclick={(e) => handleToggleFavorite(e, q.id)}
                  >
                    {#if q.isFavorite}
                      <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {:else}
                      <StarOff class="w-4 h-4 text-white/40" />
                    {/if}
                  </button>
                  <button
                    class="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                    onclick={(e) => handleDelete(e, q.id)}
                  >
                    <Trash2 class="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              <p class="text-sm text-white/50 line-clamp-2 mt-2">{q.answer}</p>

              <div class="flex items-center gap-3 mt-3">
                <span class="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white/70">{catConfig.label}</span>
                <span class={cn("px-2 py-0.5 rounded-full text-xs", diffConfig.bgColor, diffConfig.color)}>
                  {diffConfig.label}
                </span>
                {#each q.tags.slice(0, 2) as tag}
                  <span class="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/50">{tag}</span>
                {/each}
                {#if q.practiceCount > 0}
                  <span class="text-xs text-white/40 ml-auto">练习 {q.practiceCount} 次</span>
                {/if}
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>

<!-- Add Dialog -->
<Dialog bind:open={showAddDialog} title="添加面试题">
  <form onsubmit={(e) => { e.preventDefault(); handleAdd(); }} class="space-y-4">
    <div>
      <label for="question" class="text-sm font-medium text-white/80 mb-1.5 block">题目</label>
      <Textarea id="question" bind:value={newQuestion} placeholder="输入面试题目..." rows={3} required class="bg-white/5 border-white/10 text-white" />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="text-sm font-medium text-white/80 mb-1.5 block">分类</label>
        <select
          class="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          bind:value={newCategory}
        >
          {#each Object.entries(INTERVIEW_CATEGORIES) as [key, config]}
            <option value={key}>{config.label}</option>
          {/each}
        </select>
      </div>
      <div>
        <label class="text-sm font-medium text-white/80 mb-1.5 block">难度</label>
        <select
          class="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          bind:value={newDifficulty}
        >
          {#each Object.entries(DIFFICULTY_CONFIG) as [key, config]}
            <option value={key}>{config.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <div>
      <label for="answer" class="text-sm font-medium text-white/80 mb-1.5 block">参考答案</label>
      <Textarea id="answer" bind:value={newAnswer} placeholder="输入参考答案..." rows={5} required class="bg-white/5 border-white/10 text-white" />
    </div>

    <div>
      <label for="tags" class="text-sm font-medium text-white/80 mb-1.5 block">标签</label>
      <Input id="tags" bind:value={newTags} placeholder="用逗号分隔" class="bg-white/5 border-white/10 text-white" />
    </div>
  </form>

  {#snippet footer()}
    <Button variant="ghost" onclick={() => (showAddDialog = false)} class="text-white/60">取消</Button>
    <Button onclick={handleAdd} disabled={!newQuestion.trim() || !newAnswer.trim()}>添加</Button>
  {/snippet}
</Dialog>
