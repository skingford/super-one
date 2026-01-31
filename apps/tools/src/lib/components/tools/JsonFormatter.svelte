<script lang="ts">
  import { Copy, Check, Braces, Minimize2, FileCheck, Trash2, Download } from 'lucide-svelte';
  import hljs from 'highlight.js/lib/core';
  import json from 'highlight.js/lib/languages/json';
  import Button from '$components/ui/Button.svelte';
  import Textarea from '$components/ui/Textarea.svelte';
  import Toast from '$components/ui/Toast.svelte';
  import { formatJson, minifyJson, validateJson, getJsonStats } from '$utils/json';
  import { copyToClipboard } from '$utils/clipboard';

  hljs.registerLanguage('json', json);

  let input = $state('');
  let output = $state('');
  let error = $state('');
  let stats = $state<{ keys: number; depth: number; size: string } | null>(null);
  let showToast = $state(false);
  let toastMessage = $state('');
  let toastType = $state<'success' | 'error'>('success');
  let indentSize = $state(2);

  function showNotification(message: string, type: 'success' | 'error' = 'success') {
    toastMessage = message;
    toastType = type;
    showToast = true;
  }

  function handleFormat() {
    const result = formatJson(input, indentSize);
    if (result.success && result.formatted) {
      output = result.formatted;
      error = '';
      stats = getJsonStats(result.data);
      showNotification('Formatted successfully');
    } else {
      error = result.error || 'Invalid JSON';
      output = '';
      stats = null;
    }
  }

  function handleMinify() {
    const result = minifyJson(input);
    if (result.success && result.formatted) {
      output = result.formatted;
      error = '';
      stats = getJsonStats(result.data);
      showNotification('Minified successfully');
    } else {
      error = result.error || 'Invalid JSON';
      output = '';
      stats = null;
    }
  }

  function handleValidate() {
    const result = validateJson(input);
    if (result.success) {
      error = '';
      stats = getJsonStats(result.data);
      showNotification('Valid JSON!');
    } else {
      error = result.error || 'Invalid JSON';
      stats = null;
      showNotification('Invalid JSON', 'error');
    }
  }

  function handleClear() {
    input = '';
    output = '';
    error = '';
    stats = null;
  }

  async function handleCopy() {
    if (output) {
      const success = await copyToClipboard(output);
      showNotification(success ? 'Copied to clipboard' : 'Failed to copy', success ? 'success' : 'error');
    }
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Downloaded');
  }

  let highlightedOutput = $derived.by(() => {
    if (!output) return '';
    try {
      return hljs.highlight(output, { language: 'json' }).value;
    } catch {
      return output;
    }
  });
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <!-- Input Panel -->
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="font-mono font-semibold text-sm text-[var(--color-text-muted)] uppercase tracking-wider">
        Input
      </h3>
      <select
        bind:value={indentSize}
        class="
          h-8 px-2
          bg-[var(--color-surface-elevated)]
          border border-[var(--color-border)]
          rounded-[var(--radius-sm)]
          font-mono text-xs
          text-[var(--color-text)]
          focus:outline-none focus:border-[var(--color-accent)]
        "
      >
        <option value={2}>2 spaces</option>
        <option value={4}>4 spaces</option>
        <option value={1}>1 tab</option>
      </select>
    </div>

    <Textarea
      bind:value={input}
      placeholder={'{"paste": "your JSON here"}'}
      rows={20}
    />

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-2">
      <Button onclick={handleFormat}>
        <Braces size={16} />
        Format
      </Button>
      <Button variant="secondary" onclick={handleMinify}>
        <Minimize2 size={16} />
        Minify
      </Button>
      <Button variant="secondary" onclick={handleValidate}>
        <FileCheck size={16} />
        Validate
      </Button>
      <Button variant="ghost" onclick={handleClear}>
        <Trash2 size={16} />
        Clear
      </Button>
    </div>
  </div>

  <!-- Output Panel -->
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="font-mono font-semibold text-sm text-[var(--color-text-muted)] uppercase tracking-wider">
        Output
      </h3>
      {#if stats}
        <div class="flex items-center gap-4 font-mono text-xs text-[var(--color-text-subtle)]">
          <span><span class="text-[var(--color-accent)]">{stats.keys}</span> keys</span>
          <span><span class="text-[var(--color-accent)]">{stats.depth}</span> depth</span>
          <span><span class="text-[var(--color-accent)]">{stats.size}</span></span>
        </div>
      {/if}
    </div>

    {#if error}
      <div
        class="
          min-h-[400px]
          flex items-center justify-center
          bg-[var(--color-surface-elevated)]
          border border-[var(--color-danger)]/30
          rounded-[var(--radius-md)]
          p-6
        "
      >
        <div class="text-center">
          <div
            class="
              w-12 h-12 mx-auto mb-4
              flex items-center justify-center
              rounded-full
              bg-[var(--color-danger)]/10
              text-[var(--color-danger)]
            "
          >
            <Braces size={24} />
          </div>
          <p class="font-mono text-sm text-[var(--color-danger)]">{error}</p>
        </div>
      </div>
    {:else if output}
      <div
        class="
          relative
          min-h-[400px] max-h-[600px]
          bg-[var(--color-surface-elevated)]
          border border-[var(--color-border)]
          rounded-[var(--radius-md)]
          overflow-auto
        "
      >
        <pre class="p-4 font-mono text-sm leading-relaxed"><code>{@html highlightedOutput}</code></pre>

        <div class="absolute top-3 right-3 flex gap-2">
          <button
            onclick={handleCopy}
            class="
              w-8 h-8
              flex items-center justify-center
              rounded-[var(--radius-sm)]
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              text-[var(--color-text-muted)]
              hover:text-[var(--color-accent)]
              hover:border-[var(--color-accent)]
              transition-colors duration-200
            "
          >
            <Copy size={14} />
          </button>
          <button
            onclick={handleDownload}
            class="
              w-8 h-8
              flex items-center justify-center
              rounded-[var(--radius-sm)]
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              text-[var(--color-text-muted)]
              hover:text-[var(--color-accent)]
              hover:border-[var(--color-accent)]
              transition-colors duration-200
            "
          >
            <Download size={14} />
          </button>
        </div>
      </div>
    {:else}
      <div
        class="
          min-h-[400px]
          flex items-center justify-center
          bg-[var(--color-surface-elevated)]
          border border-[var(--color-border)]
          rounded-[var(--radius-md)]
        "
      >
        <p class="font-mono text-sm text-[var(--color-text-subtle)]">
          Output will appear here
        </p>
      </div>
    {/if}

    {#if output}
      <div class="flex gap-2">
        <Button variant="secondary" onclick={handleCopy}>
          <Copy size={16} />
          Copy
        </Button>
        <Button variant="secondary" onclick={handleDownload}>
          <Download size={16} />
          Download
        </Button>
      </div>
    {/if}
  </div>
</div>

<Toast message={toastMessage} type={toastType} visible={showToast} ondismiss={() => (showToast = false)} />

<style lang="css">
  :global(.hljs-string) {
    color: var(--color-success);
  }
  :global(.hljs-number) {
    color: var(--color-accent);
  }
  :global(.hljs-literal) {
    color: var(--color-warning);
  }
  :global(.hljs-attr) {
    color: var(--color-text);
  }
  :global(.hljs-punctuation) {
    color: var(--color-text-muted);
  }
</style>
