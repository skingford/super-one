<script lang="ts">
  import { ScanLine } from 'lucide-svelte';
  import QrParser from '$components/tools/QrParser.svelte';
</script>

<svelte:head>
  <title>QR Code Scanner - Super Tools</title>
  <meta name="description" content="Decode QR codes from uploaded images" />
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
          bg-[#a855f720]
          text-[#a855f7]
        "
      >
        <ScanLine size={24} />
      </div>
      <div>
        <h1 class="font-mono text-2xl font-bold text-[var(--color-text)]">
          QR Code Scanner
        </h1>
        <p class="text-sm text-[var(--color-text-muted)]">
          Decode QR codes from uploaded images
        </p>
      </div>
    </div>
  </div>

  <!-- Tool Component -->
  <div class="animate-fade-in opacity-0" style="animation-delay: 100ms">
    <QrParser />
  </div>
</div>
