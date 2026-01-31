<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import type { Snippet } from "svelte";

  interface Props {
    title: string;
    description?: string;
    class?: string;
    icon?: Snippet;
    action?: Snippet;
  }

  let { title, description, class: className = "", icon, action }: Props = $props();
</script>

<div class={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
  {#if icon}
    <div class="mb-4 p-4 rounded-full bg-muted/50">
      {@render icon()}
    </div>
  {/if}

  <h3 class="text-lg font-medium text-foreground">{title}</h3>

  {#if description}
    <p class="mt-2 text-sm text-muted-foreground max-w-sm">{description}</p>
  {/if}

  {#if action}
    <div class="mt-6">
      {@render action()}
    </div>
  {/if}
</div>
