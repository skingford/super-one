<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import BentoCard from "$lib/components/ui/BentoCard.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Input from "$lib/components/ui/Input.svelte";
  import Dialog from "$lib/components/ui/Dialog.svelte";
  import Textarea from "$lib/components/ui/Textarea.svelte";
  import Progress from "$lib/components/ui/Progress.svelte";
  import { studyStore } from "$lib/stores/study.svelte";
  import { formatDate, formatDuration } from "$lib/utils/storage";
  import {
    Plus,
    Target,
    Flame,
    Clock,
    CheckCircle2,
    Circle,
    Trash2,
    ArrowLeft,
    Play,
    Pause,
    Calendar,
  } from "lucide-svelte";

  // Form state
  let showAddDialog = $state(false);
  let newTitle = $state("");
  let newDescription = $state("");
  let newGoals = $state("");

  async function handleAdd() {
    if (!newTitle.trim()) return;

    const plan = await studyStore.addPlan({
      title: newTitle.trim(),
      description: newDescription.trim(),
      startDate: new Date(),
      goals: [],
    });

    // Add goals
    const goals = newGoals
      .split("\n")
      .map((g) => g.trim())
      .filter(Boolean);
    for (const goal of goals) {
      await studyStore.addGoal(plan.id, { title: goal });
    }

    newTitle = "";
    newDescription = "";
    newGoals = "";
    showAddDialog = false;
  }

  async function handleDelete(id: string) {
    if (confirm("确定要删除这个学习计划吗？")) {
      await studyStore.deletePlan(id);
    }
  }

  async function togglePlanActive(id: string) {
    const plan = studyStore.getPlanById(id);
    if (plan) {
      await studyStore.updatePlan(id, { isActive: !plan.isActive });
    }
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center gap-4 mb-8">
    <a href="/" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <ArrowLeft class="w-5 h-5 text-white/60" />
    </a>
    <div class="flex-1">
      <h1 class="text-3xl font-bold text-white">学习计划</h1>
      <p class="text-white/50 mt-1">制定目标，跟踪进度</p>
    </div>
    <Button variant="outline" href="/study/checkin" class="border-white/10 text-white/80">
      <CheckCircle2 class="w-4 h-4" />
      今日打卡
    </Button>
    <Button onclick={() => (showAddDialog = true)}>
      <Plus class="w-4 h-4" />
      新建计划
    </Button>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <BentoCard
      variant="gradient"
      gradient="linear-gradient(135deg, rgba(249,115,22,0.4) 0%, rgba(234,88,12,0.2) 100%)"
    >
      <div class="flex items-center gap-4">
        <Flame class="w-8 h-8 text-orange-400" />
        <div>
          <p class="text-3xl font-bold text-white">{studyStore.streakDays}</p>
          <p class="text-sm text-white/60">连续打卡</p>
        </div>
      </div>
    </BentoCard>

    <BentoCard
      variant="gradient"
      gradient="linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(124,58,237,0.2) 100%)"
    >
      <div class="flex items-center gap-4">
        <Target class="w-8 h-8 text-violet-400" />
        <div>
          <p class="text-3xl font-bold text-white">{studyStore.activePlans.length}</p>
          <p class="text-sm text-white/60">进行中</p>
        </div>
      </div>
    </BentoCard>

    <BentoCard
      variant="gradient"
      gradient="linear-gradient(135deg, rgba(16,185,129,0.4) 0%, rgba(5,150,105,0.2) 100%)"
    >
      <div class="flex items-center gap-4">
        <CheckCircle2 class="w-8 h-8 text-emerald-400" />
        <div>
          <p class="text-3xl font-bold text-white">{studyStore.completedPlans.length}</p>
          <p class="text-sm text-white/60">已完成</p>
        </div>
      </div>
    </BentoCard>

    <BentoCard
      variant="gradient"
      gradient="linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(37,99,235,0.2) 100%)"
    >
      <div class="flex items-center gap-4">
        <Clock class="w-8 h-8 text-blue-400" />
        <div>
          <p class="text-2xl font-bold text-white">{formatDuration(studyStore.totalStudyMinutes)}</p>
          <p class="text-sm text-white/60">总时长</p>
        </div>
      </div>
    </BentoCard>
  </div>

  <!-- Active Plans -->
  <section>
    <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <Play class="w-5 h-5 text-green-400" />
      进行中的计划
    </h2>

    {#if studyStore.activePlans.length === 0}
      <BentoCard variant="glass" class="py-12 text-center">
        <Target class="w-12 h-12 text-white/20 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-white mb-2">还没有进行中的计划</h3>
        <p class="text-white/50 mb-6">创建一个学习计划开始吧</p>
        <Button onclick={() => (showAddDialog = true)}>
          <Plus class="w-4 h-4" />
          新建计划
        </Button>
      </BentoCard>
    {:else}
      <div class="grid md:grid-cols-2 gap-4">
        {#each studyStore.activePlans as plan (plan.id)}
          {@const progress = studyStore.getPlanProgress(plan.id)}
          <a
            href="/study/{plan.id}"
            class="group p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors">
                  {plan.title}
                </h3>
                {#if plan.description}
                  <p class="text-sm text-white/50 mt-1 line-clamp-1">{plan.description}</p>
                {/if}
              </div>
              <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  onclick={(e) => { e.preventDefault(); togglePlanActive(plan.id); }}
                  title="暂停"
                >
                  <Pause class="w-4 h-4 text-white/60" />
                </button>
                <button
                  class="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                  onclick={(e) => { e.preventDefault(); handleDelete(plan.id); }}
                  title="删除"
                >
                  <Trash2 class="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            <!-- Goals preview -->
            <div class="space-y-2 mb-4">
              {#each plan.goals.slice(0, 3) as goal}
                <div class="flex items-center gap-2 text-sm">
                  {#if goal.completed}
                    <CheckCircle2 class="w-4 h-4 text-green-400" />
                    <span class="line-through text-white/40">{goal.title}</span>
                  {:else}
                    <Circle class="w-4 h-4 text-white/30" />
                    <span class="text-white/70">{goal.title}</span>
                  {/if}
                </div>
              {/each}
              {#if plan.goals.length > 3}
                <p class="text-xs text-white/40 pl-6">还有 {plan.goals.length - 3} 个目标...</p>
              {/if}
            </div>

            <!-- Progress -->
            <div class="mb-4">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-white/50">进度</span>
                <span class="text-white font-medium">{progress.percentage}%</span>
              </div>
              <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
                  style="width: {progress.percentage}%"
                ></div>
              </div>
            </div>

            <!-- Meta -->
            <div class="flex items-center gap-4 text-xs text-white/40">
              <span class="flex items-center gap-1">
                <Calendar class="w-3.5 h-3.5" />
                {formatDate(plan.startDate)}
              </span>
              <span class="flex items-center gap-1">
                <CheckCircle2 class="w-3.5 h-3.5" />
                {plan.checkIns.length} 次打卡
              </span>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Completed Plans -->
  {#if studyStore.completedPlans.length > 0}
    <section>
      <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Pause class="w-5 h-5 text-white/40" />
        已暂停/完成
      </h2>

      <div class="grid md:grid-cols-3 gap-4">
        {#each studyStore.completedPlans as plan (plan.id)}
          {@const progress = studyStore.getPlanProgress(plan.id)}
          <div class="p-4 rounded-2xl bg-white/5 border border-white/5 opacity-60 hover:opacity-100 transition-opacity">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-medium text-white truncate">{plan.title}</h3>
              <button
                class="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                onclick={() => togglePlanActive(plan.id)}
                title="重新开始"
              >
                <Play class="w-4 h-4 text-green-400" />
              </button>
            </div>
            <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                class="h-full bg-white/30"
                style="width: {progress.percentage}%"
              ></div>
            </div>
            <p class="text-xs text-white/40 mt-2">
              {progress.completed}/{progress.total} 个目标
            </p>
          </div>
        {/each}
      </div>
    </section>
  {/if}
</div>

<!-- Add Dialog -->
<Dialog bind:open={showAddDialog} title="新建学习计划">
  <form onsubmit={(e) => { e.preventDefault(); handleAdd(); }} class="space-y-4">
    <div>
      <label for="title" class="text-sm font-medium text-white/80 mb-1.5 block">计划名称</label>
      <Input id="title" bind:value={newTitle} placeholder="例如：掌握 React" required class="bg-white/5 border-white/10 text-white" />
    </div>

    <div>
      <label for="description" class="text-sm font-medium text-white/80 mb-1.5 block">描述（可选）</label>
      <Textarea
        id="description"
        bind:value={newDescription}
        placeholder="简要描述..."
        rows={2}
        class="bg-white/5 border-white/10 text-white"
      />
    </div>

    <div>
      <label for="goals" class="text-sm font-medium text-white/80 mb-1.5 block">学习目标</label>
      <Textarea
        id="goals"
        bind:value={newGoals}
        placeholder="每行一个目标"
        rows={4}
        class="bg-white/5 border-white/10 text-white"
      />
      <p class="text-xs text-white/40 mt-1">每行输入一个学习目标</p>
    </div>
  </form>

  {#snippet footer()}
    <Button variant="ghost" onclick={() => (showAddDialog = false)} class="text-white/60">取消</Button>
    <Button onclick={handleAdd} disabled={!newTitle.trim()}>创建</Button>
  {/snippet}
</Dialog>
