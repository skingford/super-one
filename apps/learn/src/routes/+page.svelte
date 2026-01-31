<script lang="ts">
  import BentoGrid from "$lib/components/ui/BentoGrid.svelte";
  import BentoCard from "$lib/components/ui/BentoCard.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import { knowledgeStore } from "$lib/stores/knowledge.svelte";
  import { studyStore } from "$lib/stores/study.svelte";
  import { formatDuration, formatRelativeTime } from "$lib/utils/storage";
  import {
    Sparkles,
    Flame,
    BookOpen,
    Clock,
    Target,
    ArrowRight,
    CheckCircle2,
    Zap,
    TrendingUp,
  } from "lucide-svelte";

  // Recent knowledge items
  const recentKnowledge = $derived(knowledgeStore.filteredItems.slice(0, 3));
  const activePlan = $derived(studyStore.activePlans[0]);
  const planProgress = $derived(activePlan ? studyStore.getPlanProgress(activePlan.id) : null);

  // Greeting based on time
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 6) return "夜深了，注意休息";
    if (hour < 12) return "早安，新的一天";
    if (hour < 14) return "午安，继续加油";
    if (hour < 18) return "下午好";
    if (hour < 22) return "晚上好";
    return "夜深了，早点休息";
  }

  function getMotivation() {
    const messages = [
      "每一步都算数",
      "保持学习的热情",
      "今天也要进步一点点",
      "坚持就是胜利",
      "学无止境",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }
</script>

<div class="space-y-6">
  <BentoGrid>
    <!-- Hero Card - Welcome -->
    <BentoCard
      size="2x2"
      variant="gradient"
      gradient="linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.2) 50%, rgba(236,72,153,0.15) 100%)"
      class="flex flex-col justify-between"
    >
      <div>
        <div class="flex items-center gap-2 mb-4">
          <div class="p-2 rounded-xl bg-white/10 backdrop-blur">
            <Sparkles class="w-5 h-5 text-white" />
          </div>
          <span class="text-sm text-white/60">学习搭子</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
          {getGreeting()}
        </h1>
        <p class="text-white/60 text-lg">
          {getMotivation()}
        </p>
      </div>

      <div class="flex gap-3 mt-6">
        {#if !studyStore.hasCheckedInToday}
          <Button href="/study/checkin" class="bg-white/10 hover:bg-white/20 border-0">
            <CheckCircle2 class="w-4 h-4" />
            今日打卡
          </Button>
        {:else}
          <div class="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 text-green-400">
            <CheckCircle2 class="w-4 h-4" />
            <span class="text-sm">已打卡</span>
          </div>
        {/if}
        <Button href="/knowledge/new" variant="ghost" class="text-white/80 hover:text-white hover:bg-white/10">
          <Zap class="w-4 h-4" />
          记录知识
        </Button>
      </div>
    </BentoCard>

    <!-- Streak Card -->
    <BentoCard
      size="1x1"
      variant="gradient"
      gradient="linear-gradient(135deg, rgba(249,115,22,0.4) 0%, rgba(234,88,12,0.25) 100%)"
      href="/study/checkin"
    >
      <div class="h-full flex flex-col justify-between">
        <Flame class="w-8 h-8 text-orange-400" />
        <div>
          <p class="text-4xl font-bold text-white">{studyStore.streakDays}</p>
          <p class="text-white/60 text-sm">连续打卡</p>
        </div>
      </div>
    </BentoCard>

    <!-- Knowledge Count Card -->
    <BentoCard
      size="1x1"
      variant="gradient"
      gradient="linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(37,99,235,0.25) 100%)"
      href="/knowledge"
    >
      <div class="h-full flex flex-col justify-between">
        <BookOpen class="w-8 h-8 text-blue-400" />
        <div>
          <p class="text-4xl font-bold text-white">{knowledgeStore.totalCount}</p>
          <p class="text-white/60 text-sm">知识条目</p>
        </div>
      </div>
    </BentoCard>

    <!-- Study Time Card -->
    <BentoCard
      size="1x1"
      variant="gradient"
      gradient="linear-gradient(135deg, rgba(16,185,129,0.4) 0%, rgba(5,150,105,0.25) 100%)"
      href="/study"
    >
      <div class="h-full flex flex-col justify-between">
        <Clock class="w-8 h-8 text-emerald-400" />
        <div>
          <p class="text-2xl font-bold text-white">{formatDuration(studyStore.totalStudyMinutes)}</p>
          <p class="text-white/60 text-sm">学习时长</p>
        </div>
      </div>
    </BentoCard>

    <!-- Active Plan Card -->
    <BentoCard
      size="1x1"
      variant="gradient"
      gradient="linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(124,58,237,0.25) 100%)"
      href="/study"
    >
      <div class="h-full flex flex-col justify-between">
        <Target class="w-8 h-8 text-violet-400" />
        <div>
          <p class="text-4xl font-bold text-white">{studyStore.activePlans.length}</p>
          <p class="text-white/60 text-sm">学习计划</p>
        </div>
      </div>
    </BentoCard>

    <!-- Current Plan Progress -->
    {#if activePlan && planProgress}
      <BentoCard size="2x1" variant="glass" href="/study/{activePlan.id}">
        <div class="flex items-center justify-between h-full">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <TrendingUp class="w-4 h-4 text-violet-400" />
              <span class="text-sm text-white/60">当前计划</span>
            </div>
            <h3 class="text-lg font-semibold text-white mb-3 line-clamp-1">{activePlan.title}</h3>
            <div class="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
                style="width: {planProgress.percentage}%"
              ></div>
            </div>
          </div>
          <div class="ml-6 text-right">
            <p class="text-3xl font-bold text-white">{planProgress.percentage}%</p>
            <p class="text-sm text-white/60">{planProgress.completed}/{planProgress.total}</p>
          </div>
        </div>
      </BentoCard>
    {:else}
      <BentoCard size="2x1" variant="outline" href="/study">
        <div class="flex items-center justify-center h-full gap-3">
          <Target class="w-6 h-6 text-white/40" />
          <p class="text-white/40">创建第一个学习计划</p>
          <ArrowRight class="w-5 h-5 text-white/40" />
        </div>
      </BentoCard>
    {/if}

    <!-- Recent Knowledge -->
    <BentoCard size="3x2" variant="glass" class="md:col-span-3 lg:col-span-4">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <BookOpen class="w-5 h-5 text-blue-400" />
          <h2 class="text-lg font-semibold text-white">最近知识</h2>
        </div>
        <a href="/knowledge" class="flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors">
          查看全部
          <ArrowRight class="w-4 h-4" />
        </a>
      </div>

      {#if recentKnowledge.length > 0}
        <div class="space-y-3">
          {#each recentKnowledge as item}
            <a
              href="/knowledge/{item.id}"
              class="block p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-white group-hover:text-blue-400 transition-colors truncate">
                    {item.title}
                  </h3>
                  <p class="text-sm text-white/50 mt-1 line-clamp-1">{item.content}</p>
                </div>
                <span class="text-xs text-white/40 shrink-0">
                  {formatRelativeTime(item.updatedAt)}
                </span>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <div class="flex flex-col items-center justify-center py-8 text-center">
          <BookOpen class="w-12 h-12 text-white/20 mb-3" />
          <p class="text-white/40 mb-4">还没有知识条目</p>
          <Button href="/knowledge/new" variant="outline" class="text-white/60 border-white/20">
            添加第一条
          </Button>
        </div>
      {/if}
    </BentoCard>

    <!-- Quick Actions -->
    <BentoCard size="2x1" variant="glass" class="md:col-span-2">
      <div class="flex items-center justify-between h-full">
        <a
          href="/knowledge/new"
          class="flex-1 flex flex-col items-center justify-center py-4 rounded-2xl hover:bg-white/5 transition-colors group"
        >
          <div class="p-3 rounded-xl bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors mb-2">
            <BookOpen class="w-6 h-6 text-blue-400" />
          </div>
          <span class="text-sm text-white/60 group-hover:text-white transition-colors">记录知识</span>
        </a>
        <div class="w-px h-12 bg-white/10"></div>
        <a
          href="/study/checkin"
          class="flex-1 flex flex-col items-center justify-center py-4 rounded-2xl hover:bg-white/5 transition-colors group"
        >
          <div class="p-3 rounded-xl bg-green-500/20 group-hover:bg-green-500/30 transition-colors mb-2">
            <CheckCircle2 class="w-6 h-6 text-green-400" />
          </div>
          <span class="text-sm text-white/60 group-hover:text-white transition-colors">学习打卡</span>
        </a>
        <div class="w-px h-12 bg-white/10"></div>
        <a
          href="/study"
          class="flex-1 flex flex-col items-center justify-center py-4 rounded-2xl hover:bg-white/5 transition-colors group"
        >
          <div class="p-3 rounded-xl bg-violet-500/20 group-hover:bg-violet-500/30 transition-colors mb-2">
            <Target class="w-6 h-6 text-violet-400" />
          </div>
          <span class="text-sm text-white/60 group-hover:text-white transition-colors">学习计划</span>
        </a>
      </div>
    </BentoCard>
  </BentoGrid>
</div>
