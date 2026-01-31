<script lang="ts">
import "../app.css";
import Header from "$components/layout/Header.svelte";
import Sidebar from "$components/layout/Sidebar.svelte";
import { theme } from "$stores/theme";
import { onMount } from "svelte";
import type { Snippet } from "svelte";

interface Props {
	children: Snippet;
}

let { children }: Props = $props();

onMount(() => {
	theme.init();
});
</script>

<svelte:head>
  <meta name="theme-color" content="#0a0a0a" />
</svelte:head>

<div class="min-h-screen bg-[var(--color-background)]">
  <Header />
  <Sidebar />

  <main class="lg:pl-64 pt-16 min-h-screen">
    <div class="p-6 lg:p-8">
      {@render children()}
    </div>
  </main>
</div>
