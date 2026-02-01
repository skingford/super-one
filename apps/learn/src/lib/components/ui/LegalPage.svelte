<script lang="ts">
  export let title: string;
  export let summary: string;
  export let sections: { heading: string; items: string[] }[] = [];
</script>

<svelte:head>
  <title>{title} - Learn</title>
</svelte:head>

<div class="max-w-3xl mx-auto py-12 text-white">
  <h1 class="text-3xl font-semibold">{title}</h1>
  <p class="mt-4 text-white/70">{summary}</p>

  <div class="mt-8 space-y-6">
    {#each sections as section}
      <section class="space-y-3">
        <h2 class="text-lg font-semibold text-white/90">{section.heading}</h2>
        <ul class="space-y-2 text-sm text-white/70">
          {#each section.items as item}
            <li class="flex gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-white/50"></span>
              <span>{item}</span>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </div>

  <a href="/" class="inline-flex mt-8 text-sm text-blue-400 hover:text-blue-300">← Back to home</a>
</div>
