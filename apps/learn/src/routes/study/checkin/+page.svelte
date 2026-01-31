<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { goto } from "$app/navigation";
  import BentoCard from "$lib/components/ui/BentoCard.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Textarea from "$lib/components/ui/Textarea.svelte";
  import { studyStore } from "$lib/stores/study.svelte";
  import { MOOD_CONFIG } from "$lib/types";
  import type { Mood } from "$lib/types";
  import { formatDate, formatDuration } from "$lib/utils/storage";
  import { CheckCircle2, Flame, ArrowLeft, Sparkles } from "lucide-svelte";

  // Form state
  let selectedPlan = $state<string | null>(null);
  let content = $state("");
  let duration = $state(30);
  let mood = $state<Mood>("good");

  const durationPresets = [15, 30, 60, 90, 120];

  const moodMessages: Record<Mood, string> = {
    great: "太棒了！保持这个状态！",
    good: "不错哦，继续加油！",
    okay: "每一步都算数，坚持就是胜利！",
    tired: "累了就休息一下，明天继续！",
    struggling: "困难只是暂时的，你能行的！",
  };

  async function handleCheckIn() {
    if (!selectedPlan || !content.trim()) return;

    await studyStore.checkIn(selectedPlan, {
      content: content.trim(),
      duration,
      mood,
    });

    goto("/study");
  }
</script>

<div class="max-w-2xl mx-auto">
  <!-- Header -->
  <div class="flex items-center gap-4 mb-8">
    <a href="/study" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <ArrowLeft class="w-5 h-5 text-white/60" />
    </a>
    <div>
      <h1 class="text-3xl font-bold text-white">学习打卡</h1>
      <p class="text-white/50 mt-1">
        {formatDate(new Date())} · 连续打卡 {studyStore.streakDays} 天
      </p>
    </div>
  </div>

  <!-- Hero -->
  <BentoCard
    variant="gradient"
    gradient="linear-gradient(135deg, rgba(249,115,22,0.4) 0%, rgba(234,88,12,0.2) 100%)"
    class="text-center mb-8"
  >
    <Flame class="w-16 h-16 text-orange-400 mx-auto mb-4" />
    <h2 class="text-2xl font-bold text-white mb-2">
      {#if studyStore.hasCheckedInToday}
        今日已打卡
      {:else}
        记录今天的学习
      {/if}
    </h2>
    <p class="text-white/60">
      {#if studyStore.hasCheckedInToday}
        你今天已经完成了 {studyStore.todayCheckIns.length} 次打卡
      {:else}
        选择学习计划，记录今天的收获
      {/if}
    </p>
  </BentoCard>

  {#if studyStore.hasCheckedInToday}
    <!-- Today's check-ins -->
    <div class="space-y-4">
      {#each studyStore.todayCheckIns as checkIn}
        <BentoCard variant="glass">
          <div class="flex items-center justify-between mb-3">
            <span class="px-3 py-1 rounded-full text-sm bg-white/10 text-white/80">
              {checkIn.planTitle}
            </span>
            <span class="text-sm text-white/40">{formatDuration(checkIn.duration)}</span>
          </div>
          <p class="text-white/80">{checkIn.content}</p>
        </BentoCard>
      {/each}

      <Button href="/study" class="w-full" variant="outline">
        查看学习计划
      </Button>
    </div>
  {:else if studyStore.activePlans.length === 0}
    <!-- No active plans -->
    <BentoCard variant="glass" class="text-center py-12">
      <p class="text-white/50 mb-6">还没有学习计划，先创建一个吧</p>
      <Button href="/study">创建学习计划</Button>
    </BentoCard>
  {:else}
    <!-- Check-in form -->
    <div class="space-y-6">
      <!-- Select plan -->
      <div>
        <label class="text-sm font-medium text-white/80 mb-3 block">选择学习计划</label>
        <div class="grid gap-3">
          {#each studyStore.activePlans as plan}
            {@const progress = studyStore.getPlanProgress(plan.id)}
            <button
              type="button"
              class={cn(
                "p-4 rounded-2xl border text-left transition-all duration-200",
                selectedPlan === plan.id
                  ? "border-primary bg-primary/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              )}
              onclick={() => (selectedPlan = plan.id)}
            >
              <div class="flex items-center justify-between">
                <span class="font-medium text-white">{plan.title}</span>
                <span class="text-sm text-white/50">{progress.percentage}%</span>
              </div>
            </button>
          {/each}
        </div>
      </div>

      <!-- Duration -->
      <div>
        <label class="text-sm font-medium text-white/80 mb-3 block">学习时长</label>
        <div class="flex flex-wrap gap-2 mb-3">
          {#each durationPresets as preset}
            <button
              type="button"
              class={cn(
                "px-4 py-2.5 rounded-xl border transition-all",
                duration === preset
                  ? "border-primary bg-primary text-white"
                  : "border-white/10 text-white/60 hover:border-white/20"
              )}
              onclick={() => (duration = preset)}
            >
              {formatDuration(preset)}
            </button>
          {/each}
        </div>
        <div class="flex items-center gap-4">
          <input
            type="range"
            min="5"
            max="240"
            step="5"
            bind:value={duration}
            class="flex-1 h-2 rounded-full bg-white/10 appearance-none cursor-pointer accent-primary"
          />
          <span class="text-sm font-medium text-white w-20 text-right">{formatDuration(duration)}</span>
        </div>
      </div>

      <!-- Mood -->
      <div>
        <label class="text-sm font-medium text-white/80 mb-3 block">今天学习状态</label>
        <div class="grid grid-cols-5 gap-2">
          {#each Object.entries(MOOD_CONFIG) as [key, config]}
            <button
              type="button"
              class={cn(
                "py-4 rounded-xl border transition-all duration-200 flex flex-col items-center gap-1",
                mood === key
                  ? "border-primary bg-primary/10"
                  : "border-white/10 hover:border-white/20"
              )}
              onclick={() => (mood = key as Mood)}
            >
              <span class="text-2xl">{config.emoji}</span>
              <span class="text-xs text-white/60">{config.label}</span>
            </button>
          {/each}
        </div>
        <p class="text-sm text-white/50 mt-3 text-center">{moodMessages[mood]}</p>
      </div>

      <!-- Content -->
      <div>
        <label for="content" class="text-sm font-medium text-white/80 mb-1.5 block">今日学习记录</label>
        <Textarea
          id="content"
          bind:value={content}
          placeholder="今天学了什么？有什么收获或困惑？"
          rows={4}
          class="bg-white/5 border-white/10 text-white"
        />
      </div>

      <!-- Submit -->
      <Button
        class="w-full"
        disabled={!selectedPlan || !content.trim()}
        onclick={handleCheckIn}
      >
        <Sparkles class="w-4 h-4" />
        完成打卡
      </Button>
    </div>
  {/if}
</div>
