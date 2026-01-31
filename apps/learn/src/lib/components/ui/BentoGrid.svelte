<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import type { Snippet } from "svelte";

  interface Props {
    class?: string;
    children: Snippet;
  }

  let { class: className = "", children }: Props = $props();
</script>

<div
  class={cn(
    "grid gap-4 md:gap-6",
    "grid-cols-2 md:grid-cols-4 lg:grid-cols-6",
    "auto-rows-[minmax(120px,auto)]",
    className
  )}
>
  {@render children()}
</div>
