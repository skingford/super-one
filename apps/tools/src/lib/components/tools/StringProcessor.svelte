<script lang="ts">
import { Copy, Trash2, Download } from "lucide-svelte";
import Button from "$components/ui/Button.svelte";
import Textarea from "$components/ui/Textarea.svelte";
import Toast from "$components/ui/Toast.svelte";
import {
	convertCase,
	stringCaseOptions,
	getStringStats,
	type StringCaseType,
} from "$utils/string";
import { copyToClipboard } from "$utils/clipboard";

let input = $state("");
let selectedType = $state<StringCaseType>("upper");
let output = $state("");
let stats = $state<{ chars: number; words: number; lines: number; bytes: string } | null>(null);
let showToast = $state(false);
let toastMessage = $state("");
let toastType = $state<"success" | "error">("success");

function showNotification(
	message: string,
	type: "success" | "error" = "success",
) {
	toastMessage = message;
	toastType = type;
	showToast = true;
}

function handleConvert(type: StringCaseType) {
	if (!input.trim()) {
		showNotification("Please enter some text", "error");
		return;
	}
	selectedType = type;
	output = convertCase(input, type);
	stats = getStringStats(output);
	const option = stringCaseOptions.find((o) => o.type === type);
	showNotification(`Converted to ${option?.label || type}`);
}

function handleClear() {
	input = "";
	output = "";
	stats = null;
}

async function handleCopy() {
	if (output) {
		const success = await copyToClipboard(output);
		showNotification(
			success ? "Copied to clipboard" : "Failed to copy",
			success ? "success" : "error",
		);
	}
}

function handleDownload() {
	if (!output) return;
	const blob = new Blob([output], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `converted-${selectedType}.txt`;
	a.click();
	URL.revokeObjectURL(url);
	showNotification("Downloaded");
}

// Live preview of all conversions
let previews = $derived.by(() => {
	if (!input.trim()) return [];
	return stringCaseOptions.map((option) => ({
		...option,
		result: convertCase(input, option.type),
	}));
});
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <!-- Input Panel -->
  <div class="space-y-4">
    <div class="flex items-center justify-between gap-4">
      <h3 class="font-mono font-semibold text-sm text-[var(--color-text-muted)] uppercase tracking-wider">
        Input
      </h3>
      <Button variant="ghost" size="sm" onclick={handleClear}>
        <Trash2 size={14} />
        Clear
      </Button>
    </div>

    <Textarea
      bind:value={input}
      placeholder="Enter text to convert...&#10;&#10;Examples:&#10;• hello world&#10;• HelloWorld&#10;• HELLO_WORLD"
      rows={8}
    />

    <!-- Conversion Buttons Grid -->
    <div class="space-y-3">
      <h4 class="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
        Convert to
      </h4>
      <div class="grid grid-cols-2 gap-2">
        {#each stringCaseOptions as option}
          <button
            onclick={() => handleConvert(option.type)}
            class="
              group
              p-3
              text-left
              bg-[var(--color-surface-elevated)]
              border border-[var(--color-border)]
              rounded-[var(--radius-md)]
              hover:border-[var(--color-accent)]
              hover:bg-[var(--color-surface)]
              transition-all duration-200
              {selectedType === option.type && output ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5' : ''}
            "
          >
            <div class="font-mono text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
              {option.label}
            </div>
            <div class="font-mono text-xs text-[var(--color-text-subtle)] mt-0.5">
              {option.example}
            </div>
          </button>
        {/each}
      </div>
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
          <span><span class="text-[var(--color-accent)]">{stats.chars}</span> chars</span>
          <span><span class="text-[var(--color-accent)]">{stats.words}</span> words</span>
          <span><span class="text-[var(--color-accent)]">{stats.bytes}</span></span>
        </div>
      {/if}
    </div>

    {#if output}
      <div
        class="
          relative
          min-h-[200px]
          bg-[var(--color-surface-elevated)]
          border border-[var(--color-border)]
          rounded-[var(--radius-md)]
          overflow-auto
        "
      >
        <pre class="p-4 font-mono text-sm leading-relaxed text-[var(--color-text)] whitespace-pre-wrap break-all">{output}</pre>

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
    {:else}
      <div
        class="
          min-h-[200px]
          flex items-center justify-center
          bg-[var(--color-surface-elevated)]
          border border-[var(--color-border)]
          rounded-[var(--radius-md)]
        "
      >
        <p class="font-mono text-sm text-[var(--color-text-subtle)]">
          Select a conversion type to see output
        </p>
      </div>
    {/if}

    <!-- Live Preview -->
    {#if previews.length > 0}
      <div class="space-y-3">
        <h4 class="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
          All Conversions Preview
        </h4>
        <div
          class="
            bg-[var(--color-surface-elevated)]
            border border-[var(--color-border-subtle)]
            rounded-[var(--radius-md)]
            divide-y divide-[var(--color-border-subtle)]
            max-h-[300px]
            overflow-auto
          "
        >
          {#each previews as preview}
            <div
              class="
                w-full
                flex items-center justify-between gap-4
                p-3
                text-left
                hover:bg-[var(--color-surface)]
                transition-colors duration-150
                {selectedType === preview.type && output ? 'bg-[var(--color-accent)]/5' : ''}
              "
            >
              <button
                onclick={() => handleConvert(preview.type)}
                class="flex items-center gap-4 flex-1 min-w-0"
              >
                <span class="font-mono text-xs text-[var(--color-text-muted)] w-28 shrink-0">
                  {preview.label}
                </span>
                <span class="font-mono text-sm text-[var(--color-text)] truncate flex-1">
                  {preview.result}
                </span>
              </button>
              <button
                onclick={() => {
                  copyToClipboard(preview.result);
                  showNotification("Copied!");
                }}
                class="
                  w-6 h-6
                  flex items-center justify-center
                  rounded
                  text-[var(--color-text-subtle)]
                  hover:text-[var(--color-accent)]
                  hover:bg-[var(--color-surface-elevated)]
                  transition-colors
                  shrink-0
                "
              >
                <Copy size={12} />
              </button>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<Toast message={toastMessage} type={toastType} visible={showToast} ondismiss={() => (showToast = false)} />
