<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { X } from "lucide-svelte";

  interface Props {
    message: string;
    type?: "success" | "info" | "warning" | "error";
    show: boolean;
    onclose?: () => void;
  }

  let { message, type = "info", show = $bindable(false), onclose }: Props = $props();

  const typeStyles = {
    success: "bg-green-500/20 border-green-500/30 text-green-400",
    info: "bg-blue-500/20 border-blue-500/30 text-blue-400",
    warning: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
    error: "bg-red-500/20 border-red-500/30 text-red-400",
  };

  function handleClose() {
    show = false;
    onclose?.();
  }

  // Auto-hide after 3 seconds
  $effect(() => {
    if (show) {
      const timer = setTimeout(() => {
        show = false;
        onclose?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  });
</script>

{#if show}
  <div
    class={cn(
      "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]",
      "flex items-center gap-3 px-5 py-3 rounded-2xl",
      "border backdrop-blur-xl shadow-2xl",
      "animate-slide-up",
      typeStyles[type]
    )}
  >
    <span class="text-sm font-medium">{message}</span>
    <button
      class="p-1 rounded-lg hover:bg-white/10 transition-colors"
      onclick={handleClose}
    >
      <X class="w-4 h-4" />
    </button>
  </div>
{/if}

<style>
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }
</style>
