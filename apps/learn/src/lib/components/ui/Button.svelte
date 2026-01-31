<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import type { Snippet } from "svelte";

  interface Props {
    variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    class?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    href?: string;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
  }

  let {
    variant = "default",
    size = "default",
    class: className = "",
    disabled = false,
    type = "button",
    href,
    onclick,
    children,
  }: Props = $props();

  const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

  const variants = {
    default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-white hover:bg-destructive/90",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-11 px-5 py-2.5 text-sm",
    sm: "h-9 px-3.5 text-xs",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10",
  };

  const classes = $derived(cn(baseStyles, variants[variant], sizes[size], className));
</script>

{#if href}
  <a {href} class={classes} aria-disabled={disabled}>
    {@render children()}
  </a>
{:else}
  <button {type} {disabled} class={classes} {onclick}>
    {@render children()}
  </button>
{/if}
