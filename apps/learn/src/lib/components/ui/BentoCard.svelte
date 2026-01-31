<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import type { Snippet } from "svelte";

  interface Props {
    size?: "1x1" | "2x1" | "1x2" | "2x2" | "3x2" | "4x2";
    variant?: "default" | "gradient" | "glass" | "outline";
    gradient?: string;
    href?: string;
    class?: string;
    onclick?: () => void;
    children: Snippet;
  }

  let {
    size = "1x1",
    variant = "default",
    gradient,
    href,
    class: className = "",
    onclick,
    children,
  }: Props = $props();

  // Size mapping to grid spans
  const sizeClasses: Record<string, string> = {
    "1x1": "col-span-1 row-span-1",
    "2x1": "col-span-2 row-span-1",
    "1x2": "col-span-1 row-span-2",
    "2x2": "col-span-2 row-span-2",
    "3x2": "col-span-3 row-span-2",
    "4x2": "col-span-4 row-span-2",
  };

  // Variant styles
  const variantClasses: Record<string, string> = {
    default: "bg-card border border-white/5",
    gradient: "",
    glass: "bg-white/5 backdrop-blur-xl border border-white/10",
    outline: "bg-transparent border-2 border-dashed border-white/20",
  };

  const baseClasses = cn(
    "relative overflow-hidden rounded-3xl p-6",
    "transition-all duration-300 ease-out",
    "hover:scale-[1.02] hover:shadow-2xl",
    "group"
  );

  const classes = $derived(
    cn(
      baseClasses,
      sizeClasses[size],
      variant !== "gradient" && variantClasses[variant],
      className
    )
  );

  const gradientStyle = $derived(
    variant === "gradient" && gradient ? `background: ${gradient};` : ""
  );
</script>

{#if href}
  <a {href} class={classes} style={gradientStyle}>
    {@render children()}
  </a>
{:else if onclick}
  <button type="button" class={cn(classes, "text-left w-full")} {onclick} style={gradientStyle}>
    {@render children()}
  </button>
{:else}
  <div class={classes} style={gradientStyle}>
    {@render children()}
  </div>
{/if}
