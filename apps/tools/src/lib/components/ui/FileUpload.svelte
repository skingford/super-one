<script lang="ts">
import { Upload } from "lucide-svelte";

interface Props {
	accept?: string;
	onfile?: (file: File) => void;
	class?: string;
}

let { accept = "image/*", onfile, class: className = "" }: Props = $props();

let isDragging = $state(false);
let inputEl: HTMLInputElement | null = null;

function handleDrop(e: DragEvent) {
	e.preventDefault();
	isDragging = false;

	const file = e.dataTransfer?.files[0];
	if (file && onfile) {
		onfile(file);
	}
}

function handleDragOver(e: DragEvent) {
	e.preventDefault();
	isDragging = true;
}

function handleDragLeave() {
	isDragging = false;
}

function handleFileSelect(e: Event) {
	const input = e.target as HTMLInputElement;
	const file = input.files?.[0];
	if (file && onfile) {
		onfile(file);
	}
}

function openFilePicker() {
	inputEl?.click();
}
</script>

<button
  type="button"
  onclick={openFilePicker}
  ondrop={handleDrop}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  class="
    relative w-full
    min-h-48
    flex flex-col items-center justify-center gap-4
    bg-[var(--color-surface-elevated)]
    border-2 border-dashed
    rounded-[var(--radius-lg)]
    cursor-pointer
    transition-all duration-300
    {isDragging
    ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] scale-[1.02]'
    : 'border-[var(--color-border)] hover:border-[var(--color-text-subtle)]'}
    {className}
  "
>
  <div
    class="
      w-14 h-14
      flex items-center justify-center
      rounded-full
      bg-[var(--color-surface)]
      border border-[var(--color-border)]
      transition-colors duration-200
      {isDragging ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}
    "
  >
    <Upload size={24} />
  </div>

  <div class="text-center">
    <p class="font-mono text-sm text-[var(--color-text)]">
      {isDragging ? 'Drop file here' : 'Drop image or click to upload'}
    </p>
    <p class="mt-1 text-xs text-[var(--color-text-subtle)]">PNG, JPG, GIF up to 10MB</p>
  </div>

  <input bind:this={inputEl} type="file" {accept} onchange={handleFileSelect} class="hidden" />
</button>
