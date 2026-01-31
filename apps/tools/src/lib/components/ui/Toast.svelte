<script lang="ts">
  import { Check, X, AlertCircle } from 'lucide-svelte';

  interface Props {
    message: string;
    type?: 'success' | 'error' | 'info';
    visible?: boolean;
    ondismiss?: () => void;
  }

  let { message, type = 'success', visible = false, ondismiss }: Props = $props();

  const icons = {
    success: Check,
    error: X,
    info: AlertCircle
  } as const;

  const colors = {
    success: 'bg-[var(--color-success)]',
    error: 'bg-[var(--color-danger)]',
    info: 'bg-[var(--color-accent)]'
  } as const;

  $effect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        ondismiss?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  });

  let Icon = $derived(icons[type]);
</script>

{#if visible}
  <div
    class="
      fixed bottom-6 right-6 z-50
      flex items-center gap-3
      px-4 py-3
      bg-[var(--color-surface)]
      border border-[var(--color-border)]
      rounded-[var(--radius-md)]
      shadow-[var(--shadow-card)]
      animate-slide-in-left
    "
  >
    <div
      class="
        w-6 h-6
        flex items-center justify-center
        rounded-full
        {colors[type]}
        text-[var(--color-background)]
      "
    >
      <Icon size={14} strokeWidth={3} />
    </div>
    <span class="font-mono text-sm text-[var(--color-text)]">{message}</span>
  </div>
{/if}
