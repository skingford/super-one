<script lang="ts">
import { QrCode } from "lucide-svelte";
import { QrGenerator } from "$components";
</script>

<svelte:head>
  <title>QR Code Generator - Super Tools</title>
  <meta name="description" content="Generate QR codes with customizable size, colors, and error correction" />
</svelte:head>

<div class="max-w-4xl mx-auto">
  <!-- Header -->
  <div class="mb-8 animate-fade-in">
    <div class="flex items-center gap-4 mb-4">
      <div
        class="
          w-12 h-12
          flex items-center justify-center
          rounded-[var(--radius-md)]
          bg-[#ff6b4a20]
          text-[#ff6b4a]
        "
      >
        <QrCode size={24} />
      </div>
      <div>
        <h1 class="font-mono text-2xl font-bold text-[var(--color-text)]">
          QR Code Generator
        </h1>
        <p class="text-sm text-[var(--color-text-muted)]">
          Create QR codes with custom colors and sizes
        </p>
      </div>
    </div>
  </div>

  <!-- Tool Component -->
  <div class="animate-fade-in opacity-0" style="animation-delay: 100ms">
    <QrGenerator />
  </div>
</div>
