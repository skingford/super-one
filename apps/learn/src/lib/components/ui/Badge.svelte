<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import type { Snippet } from "svelte";

  interface Props {
    variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive";
    size?: "default" | "sm" | "lg";
    class?: string;
    children: Snippet;
  }

  let { variant = "default", size = "default", class: className = "", children }: Props = $props();

  const baseStyles = "inline-flex items-center rounded-full font-medium transition-colors";

  const variants = {
    default: "bg-primary/10 text-primary",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-input bg-transparent",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  };

  const sizes = {
    default: "px-3 py-1 text-xs",
    sm: "px-2 py-0.5 text-[10px]",
    lg: "px-4 py-1.5 text-sm",
  };
</script>

<span class={cn(baseStyles, variants[variant], sizes[size], className)}>
  {@render children()}
</span>
