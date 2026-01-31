<script lang="ts">
import { Sun, Moon, Wrench, Github } from "lucide-svelte";
import { theme } from "$stores";
</script>

<header
  class="
  fixed top-0 left-0 right-0 z-40
  h-16
  flex items-center justify-between
  px-6
  bg-[var(--color-background)]/80
  backdrop-blur-xl
  border-b border-[var(--color-border-subtle)]
"
>
  <a href="/" class="flex items-center gap-3 group">
    <div
      class="
        w-9 h-9
        flex items-center justify-center
        rounded-[var(--radius-sm)]
        bg-[var(--color-accent)]
        text-[var(--color-background)]
        transition-transform duration-200
        group-hover:scale-110
      "
    >
      <Wrench size={18} strokeWidth={2.5} />
    </div>
    <span class="font-mono font-semibold text-lg tracking-tight">
      <span class="text-[var(--color-text)]">super</span><span class="text-[var(--color-accent)]"
        >.tools</span
      >
    </span>
  </a>

  <div class="flex items-center gap-2">
    <a
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      class="
        w-10 h-10
        flex items-center justify-center
        rounded-[var(--radius-sm)]
        text-[var(--color-text-muted)]
        hover:text-[var(--color-text)]
        hover:bg-[var(--color-surface-elevated)]
        transition-colors duration-200
      "
    >
      <Github size={20} />
    </a>

    <button
      onclick={() => theme.toggle()}
      class="
        w-10 h-10
        flex items-center justify-center
        rounded-[var(--radius-sm)]
        text-[var(--color-text-muted)]
        hover:text-[var(--color-accent)]
        hover:bg-[var(--color-surface-elevated)]
        transition-all duration-200
      "
    >
      {#if theme.current === 'dark'}
        <Sun size={20} />
      {:else}
        <Moon size={20} />
      {/if}
    </button>
  </div>
</header>
