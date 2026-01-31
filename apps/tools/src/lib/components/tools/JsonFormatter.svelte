<script lang="ts">
import {
	Copy,
	Braces,
	Minimize2,
	FileCheck,
	Trash2,
	Download,
	Wrench,
	Sparkles,
} from "lucide-svelte";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import Button from "$components/ui/Button.svelte";
import Textarea from "$components/ui/Textarea.svelte";
import Toast from "$components/ui/Toast.svelte";
import {
	formatJson,
	formatJsonWithRepair,
	minifyJson,
	minifyJsonWithRepair,
	validateJson,
	getJsonStats,
	repairJson,
} from "$utils/json";
import { copyToClipboard } from "$utils/clipboard";

hljs.registerLanguage("json", json);

let input = $state("");
let output = $state("");
let error = $state("");
let stats = $state<{ keys: number; depth: number; size: string } | null>(null);
let showToast = $state(false);
let toastMessage = $state("");
let toastType = $state<"success" | "error">("success");
let indentSize = $state(2);
let autoRepair = $state(true);
let wasRepaired = $state(false);

function showNotification(
	message: string,
	type: "success" | "error" = "success",
) {
	toastMessage = message;
	toastType = type;
	showToast = true;
}

function handleFormat() {
	const result = autoRepair
		? formatJsonWithRepair(input, indentSize)
		: formatJson(input, indentSize);

	if (result.success && result.formatted) {
		output = result.formatted;
		error = "";
		stats = getJsonStats(result.data);
		wasRepaired = result.repaired ?? false;
		showNotification(
			result.repaired ? "Formatted & Repaired!" : "Formatted successfully",
		);
	} else {
		error = result.error || "Invalid JSON";
		output = "";
		stats = null;
		wasRepaired = false;
	}
}

function handleRepairOnly() {
	try {
		const repaired = repairJson(input);
		input = repaired;
		showNotification("Input repaired - click Format to see result");
	} catch {
		showNotification("Could not repair input", "error");
	}
}

function handleMinify() {
	const result = autoRepair ? minifyJsonWithRepair(input) : minifyJson(input);

	if (result.success && result.formatted) {
		output = result.formatted;
		error = "";
		stats = getJsonStats(result.data);
		wasRepaired = result.repaired ?? false;
		showNotification(
			result.repaired ? "Minified & Repaired!" : "Minified successfully",
		);
	} else {
		error = result.error || "Invalid JSON";
		output = "";
		stats = null;
		wasRepaired = false;
	}
}

function handleValidate() {
	const result = validateJson(input);
	if (result.success) {
		error = "";
		stats = getJsonStats(result.data);
		wasRepaired = false;
		showNotification("Valid JSON!");
	} else {
		error = result.error || "Invalid JSON";
		stats = null;
		wasRepaired = false;
		showNotification("Invalid JSON", "error");
	}
}

function handleClear() {
	input = "";
	output = "";
	error = "";
	stats = null;
	wasRepaired = false;
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
	const blob = new Blob([output], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "formatted.json";
	a.click();
	URL.revokeObjectURL(url);
	showNotification("Downloaded");
}

let highlightedOutput = $derived.by(() => {
	if (!output) return "";
	try {
		return hljs.highlight(output, { language: "json" }).value;
	} catch {
		return output;
	}
});
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <!-- Input Panel -->
  <div class="space-y-4">
    <div class="flex items-center justify-between gap-4">
      <h3 class="font-mono font-semibold text-sm text-[var(--color-text-muted)] uppercase tracking-wider">
        Input
      </h3>
      <div class="flex items-center gap-3">
        <!-- Auto Repair Toggle -->
        <label class="flex items-center gap-2 cursor-pointer group">
          <div class="relative">
            <input
              type="checkbox"
              bind:checked={autoRepair}
              class="sr-only peer"
            />
            <div
              class="
                w-9 h-5
                bg-[var(--color-surface-elevated)]
                border border-[var(--color-border)]
                rounded-full
                peer-checked:bg-[var(--color-accent)]
                peer-checked:border-[var(--color-accent)]
                transition-colors duration-200
              "
            ></div>
            <div
              class="
                absolute top-0.5 left-0.5
                w-4 h-4
                bg-[var(--color-text-subtle)]
                rounded-full
                peer-checked:translate-x-4
                peer-checked:bg-[var(--color-background)]
                transition-all duration-200
              "
            ></div>
          </div>
          <span class="font-mono text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]">
            Auto-fix
          </span>
        </label>

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
    </div>

    <Textarea
      bind:value={input}
      placeholder={"Paste JSON, or try:\n• 'hello' (single quotes)\n• {name: 'test'} (unquoted keys)\n• [1, 2, 3,] (trailing comma)"}
      rows={20}
    />

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-2">
      <Button onclick={handleFormat}>
        {#if autoRepair}
          <Sparkles size={16} />
          Format & Fix
        {:else}
          <Braces size={16} />
          Format
        {/if}
      </Button>
      <Button variant="secondary" onclick={handleRepairOnly}>
        <Wrench size={16} />
        Repair
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

    <!-- Repair Help -->
    <div
      class="
        p-3
        bg-[var(--color-surface-elevated)]
        border border-[var(--color-border-subtle)]
        rounded-[var(--radius-md)]
      "
    >
      <p class="font-mono text-xs font-medium text-[var(--color-text-muted)] mb-2">
        Auto-fix supports:
      </p>
      <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-[var(--color-text-subtle)]">
        <span class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
          Single quotes → double
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
          Unquoted keys
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
          Trailing commas
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
          Comments removal
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
          Python None/True/False
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
          Unquoted values
        </span>
      </div>
    </div>
  </div>

  <!-- Output Panel -->
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h3 class="font-mono font-semibold text-sm text-[var(--color-text-muted)] uppercase tracking-wider">
          Output
        </h3>
        {#if wasRepaired}
          <span
            class="
              px-2 py-0.5
              font-mono text-xs font-medium
              bg-[var(--color-success)]/10
              text-[var(--color-success)]
              border border-[var(--color-success)]/30
              rounded-full
            "
          >
            Repaired
          </span>
        {/if}
      </div>
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
        <div class="text-center max-w-sm">
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
          <p class="font-mono text-sm text-[var(--color-danger)] mb-3">{error}</p>
          {#if !autoRepair}
            <p class="text-xs text-[var(--color-text-subtle)]">
              Try enabling "Auto-fix" to repair malformed JSON
            </p>
          {/if}
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
