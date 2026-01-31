<script lang="ts">
  import "../app.css";
  import FloatingNav from "$lib/components/layout/FloatingNav.svelte";
  import GradientBackground from "$lib/components/ui/GradientBackground.svelte";
  import Toast from "$lib/components/ui/Toast.svelte";
  import { knowledgeStore } from "$lib/stores/knowledge.svelte";
  import { interviewStore } from "$lib/stores/interview.svelte";
  import { studyStore } from "$lib/stores/study.svelte";
  import { onMount } from "svelte";

  let { children } = $props();

  let isClient = $state(false);
  let interviewUnlocked = $state(false);
  let showUnlockToast = $state(false);

  const UNLOCK_KEY = "learn_interview_unlocked";

  onMount(async () => {
    isClient = true;

    // Check if interview is already unlocked
    if (typeof localStorage !== "undefined") {
      interviewUnlocked = localStorage.getItem(UNLOCK_KEY) === "true";
    }

    // Initialize all stores
    await Promise.all([knowledgeStore.init(), interviewStore.init(), studyStore.init()]);
  });

  function handleUnlockInterview() {
    interviewUnlocked = true;
    showUnlockToast = true;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(UNLOCK_KEY, "true");
    }
  }
</script>

<svelte:head>
  <title>学习搭子</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="min-h-screen">
  <GradientBackground />

  {#if isClient}
    <FloatingNav onUnlockInterview={handleUnlockInterview} {interviewUnlocked} />

    <main class="pt-28 pb-12 px-4 md:px-8 lg:px-12">
      <div class="max-w-7xl mx-auto">
        {@render children()}
      </div>
    </main>

    <!-- Hidden interview link (only shows when unlocked) -->
    {#if interviewUnlocked}
      <a
        href="/interview"
        class="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:scale-110 transition-transform"
        title="面试准备"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </a>
    {/if}

    <Toast
      bind:show={showUnlockToast}
      message="🔓 已解锁面试模式"
      type="success"
    />
  {:else}
    <!-- Loading state -->
    <div class="flex items-center justify-center min-h-screen">
      <div class="flex flex-col items-center gap-4">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-chart-4 to-chart-5 animate-pulse"></div>
        <p class="text-white/60">加载中...</p>
      </div>
    </div>
  {/if}
</div>
