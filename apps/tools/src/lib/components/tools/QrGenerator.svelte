<script lang="ts">
  import { Download, Copy, RefreshCw } from 'lucide-svelte';
  import Button from '$components/ui/Button.svelte';
  import Input from '$components/ui/Input.svelte';
  import Toast from '$components/ui/Toast.svelte';
  import { generateQRCode, generateQRCodeSVG, downloadQRCode, downloadSVG } from '$utils/qrcode';
  import { copyToClipboard } from '$utils/clipboard';

  let text = $state('https://example.com');
  let qrDataUrl = $state('');
  let qrSvg = $state('');
  let isGenerating = $state(false);
  let showToast = $state(false);
  let toastMessage = $state('');

  // Options
  let size = $state(256);
  let darkColor = $state('#000000');
  let lightColor = $state('#ffffff');
  let errorLevel = $state<'L' | 'M' | 'Q' | 'H'>('M');

  const sizes = [128, 256, 512, 1024];
  const errorLevels = [
    { value: 'L', label: 'Low (7%)' },
    { value: 'M', label: 'Medium (15%)' },
    { value: 'Q', label: 'Quartile (25%)' },
    { value: 'H', label: 'High (30%)' }
  ];

  async function generate() {
    if (!text.trim()) return;

    isGenerating = true;
    try {
      const [dataUrl, svg] = await Promise.all([
        generateQRCode(text, {
          width: size,
          color: { dark: darkColor, light: lightColor },
          errorCorrectionLevel: errorLevel
        }),
        generateQRCodeSVG(text, {
          width: size,
          color: { dark: darkColor, light: lightColor },
          errorCorrectionLevel: errorLevel
        })
      ]);
      qrDataUrl = dataUrl;
      qrSvg = svg;
    } catch (e) {
      toastMessage = (e as Error).message;
      showToast = true;
    } finally {
      isGenerating = false;
    }
  }

  function handleDownloadPng() {
    if (qrDataUrl) {
      downloadQRCode(qrDataUrl, 'qrcode.png');
      toastMessage = 'Downloaded PNG';
      showToast = true;
    }
  }

  function handleDownloadSvg() {
    if (qrSvg) {
      downloadSVG(qrSvg, 'qrcode.svg');
      toastMessage = 'Downloaded SVG';
      showToast = true;
    }
  }

  async function handleCopyDataUrl() {
    if (qrDataUrl) {
      await copyToClipboard(qrDataUrl);
      toastMessage = 'Copied data URL';
      showToast = true;
    }
  }

  // Auto-generate on mount
  $effect(() => {
    generate();
  });
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <!-- Controls -->
  <div class="space-y-6">
    <!-- Text Input -->
    <div class="space-y-2">
      <label class="block font-mono text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        Content
      </label>
      <Input
        bind:value={text}
        placeholder="Enter text or URL..."
        oninput={() => generate()}
      />
    </div>

    <!-- Size -->
    <div class="space-y-2">
      <label class="block font-mono text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        Size
      </label>
      <div class="flex gap-2">
        {#each sizes as s}
          <button
            onclick={() => { size = s; generate(); }}
            class="
              flex-1 h-10
              font-mono text-sm
              rounded-[var(--radius-md)]
              border transition-all duration-200
              {size === s
                ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-[var(--color-background)]'
                : 'bg-[var(--color-surface-elevated)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text-subtle)]'}
            "
          >
            {s}px
          </button>
        {/each}
      </div>
    </div>

    <!-- Colors -->
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <label class="block font-mono text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
          Foreground
        </label>
        <div class="flex items-center gap-3">
          <input
            type="color"
            bind:value={darkColor}
            onchange={() => generate()}
            class="
              w-12 h-12
              rounded-[var(--radius-md)]
              border border-[var(--color-border)]
              cursor-pointer
            "
          />
          <Input value={darkColor} class="flex-1" oninput={(e) => { darkColor = (e.target as HTMLInputElement).value; generate(); }} />
        </div>
      </div>

      <div class="space-y-2">
        <label class="block font-mono text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
          Background
        </label>
        <div class="flex items-center gap-3">
          <input
            type="color"
            bind:value={lightColor}
            onchange={() => generate()}
            class="
              w-12 h-12
              rounded-[var(--radius-md)]
              border border-[var(--color-border)]
              cursor-pointer
            "
          />
          <Input value={lightColor} class="flex-1" oninput={(e) => { lightColor = (e.target as HTMLInputElement).value; generate(); }} />
        </div>
      </div>
    </div>

    <!-- Error Correction -->
    <div class="space-y-2">
      <label class="block font-mono text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        Error Correction
      </label>
      <div class="grid grid-cols-2 gap-2">
        {#each errorLevels as level}
          <button
            onclick={() => { errorLevel = level.value as 'L' | 'M' | 'Q' | 'H'; generate(); }}
            class="
              h-10 px-3
              font-mono text-xs
              rounded-[var(--radius-md)]
              border transition-all duration-200
              {errorLevel === level.value
                ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-[var(--color-background)]'
                : 'bg-[var(--color-surface-elevated)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text-subtle)]'}
            "
          >
            {level.label}
          </button>
        {/each}
      </div>
    </div>

    <!-- Regenerate -->
    <Button onclick={generate} disabled={isGenerating}>
      <RefreshCw size={16} class={isGenerating ? 'animate-spin' : ''} />
      {isGenerating ? 'Generating...' : 'Regenerate'}
    </Button>
  </div>

  <!-- Preview -->
  <div class="space-y-4">
    <h3 class="font-mono font-semibold text-sm text-[var(--color-text-muted)] uppercase tracking-wider">
      Preview
    </h3>

    <div
      class="
        relative
        aspect-square
        max-w-md mx-auto
        flex items-center justify-center
        bg-[var(--color-surface-elevated)]
        border border-[var(--color-border)]
        rounded-[var(--radius-lg)]
        overflow-hidden
      "
    >
      {#if qrDataUrl}
        <div class="relative p-8">
          <img
            src={qrDataUrl}
            alt="Generated QR Code"
            class="w-full h-full object-contain rounded-[var(--radius-md)]"
            style="image-rendering: pixelated;"
          />
          <!-- Decorative corners -->
          <div class="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--color-accent)]"></div>
          <div class="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[var(--color-accent)]"></div>
          <div class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[var(--color-accent)]"></div>
          <div class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--color-accent)]"></div>
        </div>
      {:else}
        <div class="text-center">
          <div
            class="
              w-16 h-16 mx-auto mb-4
              flex items-center justify-center
              rounded-full
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              text-[var(--color-text-subtle)]
            "
          >
            <RefreshCw size={24} class={isGenerating ? 'animate-spin' : ''} />
          </div>
          <p class="font-mono text-sm text-[var(--color-text-subtle)]">
            {isGenerating ? 'Generating...' : 'Enter text to generate'}
          </p>
        </div>
      {/if}
    </div>

    <!-- Download Buttons -->
    {#if qrDataUrl}
      <div class="flex gap-3">
        <Button class="flex-1" onclick={handleDownloadPng}>
          <Download size={16} />
          Download PNG
        </Button>
        <Button class="flex-1" variant="secondary" onclick={handleDownloadSvg}>
          <Download size={16} />
          Download SVG
        </Button>
        <Button variant="ghost" onclick={handleCopyDataUrl}>
          <Copy size={16} />
        </Button>
      </div>
    {/if}
  </div>
</div>

<Toast message={toastMessage} visible={showToast} ondismiss={() => (showToast = false)} />
