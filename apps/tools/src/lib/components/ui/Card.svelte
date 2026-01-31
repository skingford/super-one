<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    hover?: boolean;
    children: Snippet;
  }

  let { class: className = '', hover = false, children }: Props = $props();
</script>

<div
  class="
    bg-[var(--color-surface)]
    border border-[var(--color-border)]
    rounded-[var(--radius-lg)]
    shadow-[var(--shadow-card)]
    {hover ? 'transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]' : ''}
    {className}
  "
>
  {@render children()}
</div>
