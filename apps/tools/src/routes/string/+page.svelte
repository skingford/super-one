<script lang="ts">
import { CaseSensitive } from "lucide-svelte";
import { StringProcessor } from "$components";
</script>

<svelte:head>
  <title>String Converter - Super Tools</title>
  <meta name="description" content="Convert text between different cases: UPPER, lower, Title, camelCase, snake_case, and more" />
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
          bg-[#06b6d420]
          text-[#06b6d4]
        "
      >
        <CaseSensitive size={24} />
      </div>
      <div>
        <h1 class="font-mono text-2xl font-bold text-[var(--color-text)]">
          String Converter
        </h1>
        <p class="text-sm text-[var(--color-text-muted)]">
          Convert text between different case styles
        </p>
      </div>
    </div>
  </div>

  <!-- Tool Component -->
  <div class="animate-fade-in opacity-0" style="animation-delay: 100ms">
    <StringProcessor />
  </div>
</div>
