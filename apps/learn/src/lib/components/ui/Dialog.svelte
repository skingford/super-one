<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { X } from "lucide-svelte";
  import type { Snippet } from "svelte";

  interface Props {
    open: boolean;
    title?: string;
    description?: string;
    class?: string;
    onclose?: () => void;
    children: Snippet;
    footer?: Snippet;
  }

  let {
    open = $bindable(false),
    title,
    description,
    class: className = "",
    onclose,
    children,
    footer,
  }: Props = $props();

  function handleClose() {
    open = false;
    onclose?.();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  function handleBackdropKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      handleClose();
    }
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    onclick={handleBackdropClick}
    onkeydown={handleBackdropKeydown}
  >
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"></div>

    <!-- Dialog -->
    <div
      class={cn(
        "relative z-10 w-full max-w-lg rounded-3xl",
        "bg-[#1c1c1e] border border-white/10 shadow-2xl",
        "animate-scale-in",
        className
      )}
    >
      <!-- Close button -->
      <button
        class="absolute right-4 top-4 p-2 rounded-xl hover:bg-white/10 transition-colors"
        onclick={handleClose}
        aria-label="关闭"
      >
        <X class="w-5 h-5 text-white/60" />
      </button>

      <!-- Header -->
      {#if title || description}
        <div class="p-6 pb-0">
          {#if title}
            <h2 class="text-xl font-semibold text-white">{title}</h2>
          {/if}
          {#if description}
            <p class="mt-1.5 text-sm text-white/50">{description}</p>
          {/if}
        </div>
      {/if}

      <!-- Content -->
      <div class="p-6">
        {@render children()}
      </div>

      <!-- Footer -->
      {#if footer}
        <div class="px-6 pb-6 pt-2 flex justify-end gap-3">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}
