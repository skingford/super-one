<script lang="ts">
import { Clock } from "lucide-svelte";
import { TimeProcessor } from "$components";
</script>

<svelte:head>
  <title>Time Converter - Super Tools</title>
  <meta name="description" content="Convert timestamps, timezones, and date formats with ease" />
</svelte:head>

<div class="max-w-6xl mx-auto">
  <!-- Header -->
  <div class="mb-8 animate-fade-in">
    <div class="flex items-center gap-4 mb-4">
      <div
        class="
          w-12 h-12
          flex items-center justify-center
          rounded-md
          bg-[#fbbf2420]
          text-[#fbbf24]
        "
      >
        <Clock size={24} />
      </div>
      <div>
        <h1 class="font-mono text-2xl font-bold text-text">
          Time Converter
        </h1>
        <p class="text-sm text-text-muted">
          Convert timestamps, timezones, and date formats
        </p>
      </div>
    </div>
  </div>

  <!-- Tool Component -->
  <div class="animate-fade-in opacity-0" style="animation-delay: 100ms">
    <TimeProcessor />
  </div>
</div>
