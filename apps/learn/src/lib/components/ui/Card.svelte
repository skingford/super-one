<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import type { Snippet } from "svelte";

  interface Props {
    variant?: "default" | "interactive" | "glass";
    class?: string;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
  }

  let { variant = "default", class: className = "", onclick, children }: Props = $props();

  const baseStyles = "rounded-2xl border bg-card text-card-foreground";

  const variants = {
    default: "shadow-sm",
    interactive:
      "shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/20 cursor-pointer",
    glass: "backdrop-blur-xl bg-card/80 shadow-lg border-white/10",
  };
</script>

{#if onclick}
  <button class={cn(baseStyles, variants[variant], className)} {onclick} type="button">
    {@render children()}
  </button>
{:else}
  <div class={cn(baseStyles, variants[variant], className)}>
    {@render children()}
  </div>
{/if}
