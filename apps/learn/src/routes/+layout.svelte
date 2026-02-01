<script lang="ts">
  import "../app.css";
  import AppShell from "$lib/components/layout/AppShell.svelte";
  import { knowledgeStore } from "$lib/stores/knowledge.svelte";
  import { interviewStore } from "$lib/stores/interview.svelte";
  import { studyStore } from "$lib/stores/study.svelte";
  import { onMount } from "svelte";

  let { children } = $props();

  onMount(async () => {
    // Initialize all stores
    await Promise.all([knowledgeStore.init(), interviewStore.init(), studyStore.init()]);
  });
</script>

<svelte:head>
  <title>Lumina AI Learning</title>
</svelte:head>

<AppShell>
  {@render children()}
</AppShell>
