<script lang="ts">
import { Copy, Check, ExternalLink, RefreshCw, ScanLine } from "lucide-svelte";
import Button from "$components/ui/Button.svelte";
import FileUpload from "$components/ui/FileUpload.svelte";
import Toast from "$components/ui/Toast.svelte";
import { parseQRCode } from "$utils/qrcode";
import { copyToClipboard } from "$utils/clipboard";

let isParsing = $state(false);
let result = $state("");
let error = $state("");
let uploadedImage = $state("");
let showToast = $state(false);
let toastMessage = $state("");
let toastType = $state<"success" | "error">("success");

async function handleFile(file: File) {
	isParsing = true;
	error = "";
	result = "";

	// Show preview
	const reader = new FileReader();
	reader.onload = (e) => {
		uploadedImage = e.target?.result as string;
	};
	reader.readAsDataURL(file);

	// Parse QR
	const parseResult = await parseQRCode(file);

	if (parseResult.success && parseResult.data) {
		result = parseResult.data;
		toastMessage = "QR code decoded!";
		toastType = "success";
		showToast = true;
	} else {
		error = parseResult.error || "Failed to parse QR code";
		toastMessage = error;
		toastType = "error";
		showToast = true;
	}

	isParsing = false;
}

async function handleCopy() {
	if (result) {
		await copyToClipboard(result);
		toastMessage = "Copied to clipboard";
		toastType = "success";
		showToast = true;
	}
}

function handleReset() {
	result = "";
	error = "";
	uploadedImage = "";
}

function isUrl(text: string): boolean {
	try {
		new URL(text);
		return true;
	} catch {
		return false;
	}
}
</script>

<div class="max-w-2xl mx-auto space-y-8">
  <!-- Upload Area -->
  <div class="space-y-4">
    <h3 class="font-mono font-semibold text-sm text-[var(--color-text-muted)] uppercase tracking-wider">
      Upload QR Code Image
    </h3>

    {#if uploadedImage}
      <div class="relative">
        <div
          class="
            relative
            aspect-square
            max-w-sm mx-auto
            bg-[var(--color-surface-elevated)]
            border border-[var(--color-border)]
            rounded-[var(--radius-lg)]
            overflow-hidden
          "
        >
          <img
            src={uploadedImage}
            alt="Uploaded QR Code"
            class="w-full h-full object-contain p-4"
          />

          {#if isParsing}
            <div class="absolute inset-0 flex items-center justify-center bg-[var(--color-background)]/80">
              <div class="text-center">
                <ScanLine size={48} class="mx-auto mb-3 text-[var(--color-accent)] animate-pulse" />
                <p class="font-mono text-sm text-[var(--color-text)]">Scanning...</p>
              </div>
            </div>
          {/if}

          <!-- Scan lines animation -->
          {#if isParsing}
            <div
              class="
                absolute inset-x-4 h-1
                bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent
                animate-scan
              "
            ></div>
          {/if}
        </div>

        <div class="absolute top-3 right-3">
          <button
            onclick={handleReset}
            class="
              w-8 h-8
              flex items-center justify-center
              rounded-full
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              text-[var(--color-text-muted)]
              hover:text-[var(--color-danger)]
              hover:border-[var(--color-danger)]
              transition-colors duration-200
            "
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>
    {:else}
      <FileUpload accept="image/*" onfile={handleFile} />
    {/if}
  </div>

  <!-- Result -->
  {#if result || error}
    <div class="space-y-4 animate-fade-in">
      <h3 class="font-mono font-semibold text-sm text-[var(--color-text-muted)] uppercase tracking-wider">
        Result
      </h3>

      {#if error}
        <div
          class="
            p-6
            bg-[var(--color-danger)]/10
            border border-[var(--color-danger)]/30
            rounded-[var(--radius-lg)]
          "
        >
          <div class="flex items-center gap-3">
            <div
              class="
                w-10 h-10
                flex items-center justify-center
                rounded-full
                bg-[var(--color-danger)]/20
                text-[var(--color-danger)]
              "
            >
              <ScanLine size={20} />
            </div>
            <div>
              <p class="font-mono font-medium text-[var(--color-danger)]">Scan Failed</p>
              <p class="text-sm text-[var(--color-text-muted)]">{error}</p>
            </div>
          </div>
        </div>
      {:else}
        <div
          class="
            p-6
            bg-[var(--color-surface)]
            border border-[var(--color-border)]
            rounded-[var(--radius-lg)]
          "
        >
          <div class="flex items-start gap-4">
            <div
              class="
                w-10 h-10
                flex-shrink-0
                flex items-center justify-center
                rounded-full
                bg-[var(--color-success)]/20
                text-[var(--color-success)]
              "
            >
              <Check size={20} strokeWidth={3} />
            </div>

            <div class="flex-1 min-w-0">
              <p class="font-mono font-medium text-[var(--color-success)] mb-2">Decoded Successfully</p>

              <div
                class="
                  p-4
                  bg-[var(--color-surface-elevated)]
                  border border-[var(--color-border)]
                  rounded-[var(--radius-md)]
                  break-all
                "
              >
                <p class="font-mono text-sm text-[var(--color-text)]">{result}</p>
              </div>

              <div class="flex gap-3 mt-4">
                <Button onclick={handleCopy}>
                  <Copy size={16} />
                  Copy
                </Button>

                {#if isUrl(result)}
                  <Button
                    variant="secondary"
                    onclick={() => window.open(result, '_blank')}
                  >
                    <ExternalLink size={16} />
                    Open URL
                  </Button>
                {/if}
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Tips -->
  <div
    class="
      p-4
      bg-[var(--color-surface-elevated)]
      border border-[var(--color-border-subtle)]
      rounded-[var(--radius-md)]
    "
  >
    <h4 class="font-mono font-medium text-sm text-[var(--color-text)] mb-2">Tips</h4>
    <ul class="space-y-1 text-sm text-[var(--color-text-muted)]">
      <li class="flex items-center gap-2">
        <span class="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
        Supports PNG, JPG, and GIF formats
      </li>
      <li class="flex items-center gap-2">
        <span class="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
        Works best with clear, high-contrast images
      </li>
      <li class="flex items-center gap-2">
        <span class="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
        All processing happens locally in your browser
      </li>
    </ul>
  </div>
</div>

<Toast message={toastMessage} type={toastType} visible={showToast} ondismiss={() => (showToast = false)} />

<style lang="css">
  @keyframes scan {
    0% {
      top: 1rem;
    }
    50% {
      top: calc(100% - 1rem);
    }
    100% {
      top: 1rem;
    }
  }

  .animate-scan {
    animation: scan 1.5s ease-in-out infinite;
  }
</style>
