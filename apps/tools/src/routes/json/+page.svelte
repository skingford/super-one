<script lang="ts">
import { Braces } from "lucide-svelte";
import JsonFormatter from "$components/tools/JsonFormatter.svelte";
</script>

<svelte:head>
  <title>JSON Formatter - Super Tools</title>
  <meta name="description" content="Format, validate, and beautify JSON data with syntax highlighting" />
</svelte:head>

<div class="max-w-6xl mx-auto">
  <!-- Header -->
  <div class="mb-8 animate-fade-in">
    <div class="flex items-center gap-4 mb-4">
      <div
        class="
          w-12 h-12
          flex items-center justify-center
          rounded-[var(--radius-md)]
          bg-[#00ffcc20]
          text-[#00ffcc]
        "
      >
        <Braces size={24} />
      </div>
      <div>
        <h1 class="font-mono text-2xl font-bold text-[var(--color-text)]">
          JSON Formatter
        </h1>
        <p class="text-sm text-[var(--color-text-muted)]">
          Format, validate, and beautify JSON data
        </p>
      </div>
    </div>
  </div>

  <!-- Tool Component -->
  <div class="animate-fade-in opacity-0" style="animation-delay: 100ms">
    <JsonFormatter />
  </div>
</div>
