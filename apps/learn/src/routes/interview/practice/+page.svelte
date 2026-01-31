<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { goto } from "$app/navigation";
  import BentoCard from "$lib/components/ui/BentoCard.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import { interviewStore } from "$lib/stores/interview.svelte";
  import { INTERVIEW_CATEGORIES, DIFFICULTY_CONFIG } from "$lib/types";
  import {
    ChevronLeft,
    ChevronRight,
    Eye,
    EyeOff,
    Star,
    Check,
    X,
    Shuffle,
    ArrowLeft,
  } from "lucide-svelte";
  import { onMount } from "svelte";

  onMount(() => {
    if (!interviewStore.practiceMode && interviewStore.totalCount > 0) {
      interviewStore.startPractice();
    }
  });

  function handleExit() {
    interviewStore.endPractice();
    goto("/interview");
  }

  function handleNext() {
    interviewStore.markPracticed();
    interviewStore.nextQuestion();
  }

  function handleRestart() {
    interviewStore.startPractice();
  }
</script>

<div class="max-w-4xl mx-auto">
  {#if interviewStore.practiceMode && interviewStore.currentPracticeQuestion}
    {@const question = interviewStore.currentPracticeQuestion}
    {@const progress = interviewStore.practiceProgress}
    {@const catConfig = INTERVIEW_CATEGORIES[question.category]}
    {@const diffConfig = DIFFICULTY_CONFIG[question.difficulty]}

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <Button variant="ghost" onclick={handleExit} class="text-white/60">
        <X class="w-4 h-4" />
        退出练习
      </Button>
      <div class="flex items-center gap-4">
        <span class="text-sm text-white/50">
          {progress.current} / {progress.total}
        </span>
        <div class="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-primary to-chart-4 transition-all duration-300"
            style="width: {(progress.current / progress.total) * 100}%"
          ></div>
        </div>
      </div>
    </div>

    <!-- Question Card -->
    <BentoCard variant="glass" class="p-8 animate-scale-in">
      <!-- Meta -->
      <div class="flex items-center gap-3 mb-6">
        <span class="px-3 py-1 rounded-full text-sm bg-white/10 text-white/70">{catConfig.label}</span>
        <span class={cn("px-3 py-1 rounded-full text-sm", diffConfig.bgColor, diffConfig.color)}>
          {diffConfig.label}
        </span>
        <button
          class="ml-auto p-2 rounded-xl hover:bg-white/10 transition-colors"
          onclick={() => interviewStore.toggleFavorite(question.id)}
        >
          {#if question.isFavorite}
            <Star class="w-5 h-5 text-yellow-400 fill-yellow-400" />
          {:else}
            <Star class="w-5 h-5 text-white/40" />
          {/if}
        </button>
      </div>

      <!-- Question -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-white leading-relaxed">{question.question}</h2>
        {#if question.tags.length > 0}
          <div class="flex flex-wrap gap-2 mt-4">
            {#each question.tags as tag}
              <span class="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/50">{tag}</span>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Answer Toggle -->
      <div class="border-t border-white/10 pt-6">
        <Button
          variant="outline"
          class="w-full justify-center gap-2 border-white/10 text-white/80"
          onclick={() => interviewStore.toggleAnswer()}
        >
          {#if interviewStore.showAnswer}
            <EyeOff class="w-4 h-4" />
            隐藏答案
          {:else}
            <Eye class="w-4 h-4" />
            显示答案
          {/if}
        </Button>

        {#if interviewStore.showAnswer}
          <div class="mt-6 p-6 rounded-2xl bg-white/5 animate-fade-up">
            <h3 class="text-sm font-medium text-white/50 mb-3">参考答案</h3>
            <div class="text-white/80 leading-relaxed whitespace-pre-wrap">
              {question.answer}
            </div>
          </div>
        {/if}
      </div>
    </BentoCard>

    <!-- Navigation -->
    <div class="flex items-center justify-between mt-8">
      <Button
        variant="outline"
        onclick={() => interviewStore.prevQuestion()}
        disabled={progress.current === 1}
        class="border-white/10 text-white/60"
      >
        <ChevronLeft class="w-4 h-4" />
        上一题
      </Button>

      <Button variant="ghost" onclick={handleRestart} class="text-white/60">
        <Shuffle class="w-4 h-4" />
        重新开始
      </Button>

      {#if progress.current < progress.total}
        <Button onclick={handleNext}>
          下一题
          <ChevronRight class="w-4 h-4" />
        </Button>
      {:else}
        <Button onclick={handleExit} class="bg-green-600 hover:bg-green-700">
          <Check class="w-4 h-4" />
          完成练习
        </Button>
      {/if}
    </div>
  {:else}
    <!-- No practice mode -->
    <div class="flex items-center gap-4 mb-8">
      <a href="/interview" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
        <ArrowLeft class="w-5 h-5 text-white/60" />
      </a>
      <h1 class="text-3xl font-bold text-white">面试练习</h1>
    </div>

    <BentoCard variant="glass" class="py-16 text-center">
      <Shuffle class="w-16 h-16 text-white/20 mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-white mb-2">准备开始练习</h2>
      <p class="text-white/50 mb-6">
        {interviewStore.totalCount > 0
          ? "点击下方按钮开始面试题练习"
          : "还没有面试题，先添加一些题目吧"}
      </p>
      {#if interviewStore.totalCount > 0}
        <Button onclick={() => interviewStore.startPractice()}>
          <Shuffle class="w-4 h-4" />
          开始随机练习
        </Button>
      {:else}
        <Button href="/interview">返回题库</Button>
      {/if}
    </BentoCard>
  {/if}
</div>
