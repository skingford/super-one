<script lang="ts">
  import { cn } from "$lib/utils/cn";

  interface Props {
    value: number;
    max?: number;
    size?: "default" | "sm" | "lg";
    variant?: "default" | "success" | "warning";
    showLabel?: boolean;
    class?: string;
  }

  let {
    value,
    max = 100,
    size = "default",
    variant = "default",
    showLabel = false,
    class: className = "",
  }: Props = $props();

  const percentage = $derived(Math.min(100, Math.max(0, (value / max) * 100)));

  const sizes = {
    default: "h-2.5",
    sm: "h-1.5",
    lg: "h-4",
  };

  const variants = {
    default: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
  };
</script>

<div class={cn("w-full", className)}>
  {#if showLabel}
    <div class="flex justify-between items-center mb-1.5">
      <span class="text-sm text-muted-foreground">进度</span>
      <span class="text-sm font-medium">{Math.round(percentage)}%</span>
    </div>
  {/if}
  <div class={cn("w-full rounded-full bg-secondary overflow-hidden", sizes[size])}>
    <div
      class={cn("h-full rounded-full transition-all duration-500 ease-out", variants[variant])}
      style="width: {percentage}%"
    ></div>
  </div>
</div>
