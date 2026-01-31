<script lang="ts">
import { tools, getIcon } from "$config";
import {
	ArrowRight,
	Sparkles,
	Plus,
	Zap,
	Shield,
	Moon,
} from "lucide-svelte";
</script>

<svelte:head>
  <title>Super Tools - Developer Utilities</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
  <!-- Hero -->
  <div class="mb-12 animate-fade-in">
    <div class="flex items-center gap-3 mb-4">
      <div
        class="
          w-10 h-10
          flex items-center justify-center
          rounded-[var(--radius-md)]
          bg-[var(--color-accent-subtle)]
          text-[var(--color-accent)]
        "
      >
        <Sparkles size={20} />
      </div>
      <span
        class="
          px-3 py-1
          font-mono text-xs font-medium
          bg-[var(--color-surface-elevated)]
          border border-[var(--color-border)]
          rounded-full
          text-[var(--color-text-muted)]
        "
      >
        Developer Tools
      </span>
    </div>

    <h1 class="font-mono text-4xl lg:text-5xl font-bold tracking-tight mb-4">
      <span class="text-[var(--color-text)]">super</span><span class="text-[var(--color-accent)]">.tools</span>
    </h1>

    <p class="text-lg text-[var(--color-text-muted)] max-w-xl">
      A collection of fast, minimal utilities for developers.
      <span class="text-[var(--color-text)]">No tracking. No ads. Just tools.</span>
    </p>
  </div>

  <!-- Tools Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each tools as tool, i}
      {@const Icon = getIcon(tool.icon)}
      <a
        href={tool.path}
        class="
          group
          relative
          p-6
          bg-[var(--color-surface)]
          border border-[var(--color-border)]
          rounded-[var(--radius-lg)]
          transition-all duration-300
          hover:border-[var(--color-accent)]
          hover:shadow-[var(--shadow-glow)]
          animate-fade-in
          opacity-0
        "
        style="animation-delay: {(i + 1) * 100}ms"
      >
        <!-- Icon -->
        <div
          class="
            w-12 h-12
            flex items-center justify-center
            rounded-[var(--radius-md)]
            mb-4
            transition-all duration-300
            group-hover:scale-110
          "
          style="background: {tool.color}20; color: {tool.color}"
        >
          <Icon size={24} />
        </div>

        <!-- Content -->
        <h3 class="font-mono font-semibold text-lg text-[var(--color-text)] mb-1">
          {tool.name}
        </h3>
        <p class="text-sm text-[var(--color-text-muted)]">
          {tool.description}
        </p>

        <!-- Arrow -->
        <div
          class="
            absolute top-6 right-6
            w-8 h-8
            flex items-center justify-center
            rounded-full
            bg-[var(--color-surface-elevated)]
            text-[var(--color-text-subtle)]
            transition-all duration-300
            group-hover:bg-[var(--color-accent)]
            group-hover:text-[var(--color-background)]
            group-hover:translate-x-1
          "
        >
          <ArrowRight size={16} />
        </div>

        <!-- Glow effect on hover -->
        <div
          class="
            absolute inset-0
            rounded-[var(--radius-lg)]
            opacity-0
            transition-opacity duration-300
            group-hover:opacity-100
            pointer-events-none
          "
          style="box-shadow: inset 0 0 30px {tool.color}10"
        ></div>
      </a>
    {/each}

    <!-- Coming Soon Card -->
    <div
      class="
        relative
        p-6
        bg-[var(--color-surface-elevated)]
        border border-dashed border-[var(--color-border)]
        rounded-[var(--radius-lg)]
        animate-fade-in
        opacity-0
      "
      style="animation-delay: {(tools.length + 1) * 100}ms"
    >
      <div
        class="
          w-12 h-12
          flex items-center justify-center
          rounded-[var(--radius-md)]
          bg-[var(--color-surface)]
          border border-[var(--color-border)]
          text-[var(--color-text-subtle)]
          mb-4
        "
      >
        <Plus size={24} />
      </div>

      <h3 class="font-mono font-semibold text-lg text-[var(--color-text-subtle)] mb-1">
        More Coming
      </h3>
      <p class="text-sm text-[var(--color-text-subtle)]">
        Base64, UUID, Hash...
      </p>
    </div>
  </div>

  <!-- Features -->
  <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in opacity-0" style="animation-delay: 500ms">
    <div class="text-center p-6">
      <div
        class="
          w-12 h-12 mx-auto mb-4
          flex items-center justify-center
          rounded-full
          bg-[var(--color-surface-elevated)]
          border border-[var(--color-border)]
          text-[var(--color-accent)]
        "
      >
        <Zap size={20} />
      </div>
      <h4 class="font-mono font-medium text-[var(--color-text)] mb-2">Instant</h4>
      <p class="text-sm text-[var(--color-text-muted)]">Everything runs locally in your browser</p>
    </div>

    <div class="text-center p-6">
      <div
        class="
          w-12 h-12 mx-auto mb-4
          flex items-center justify-center
          rounded-full
          bg-[var(--color-surface-elevated)]
          border border-[var(--color-border)]
          text-[var(--color-accent)]
        "
      >
        <Shield size={20} />
      </div>
      <h4 class="font-mono font-medium text-[var(--color-text)] mb-2">Private</h4>
      <p class="text-sm text-[var(--color-text-muted)]">No data leaves your device</p>
    </div>

    <div class="text-center p-6">
      <div
        class="
          w-12 h-12 mx-auto mb-4
          flex items-center justify-center
          rounded-full
          bg-[var(--color-surface-elevated)]
          border border-[var(--color-border)]
          text-[var(--color-accent)]
        "
      >
        <Moon size={20} />
      </div>
      <h4 class="font-mono font-medium text-[var(--color-text)] mb-2">Dark Mode</h4>
      <p class="text-sm text-[var(--color-text-muted)]">Easy on the eyes, day or night</p>
    </div>
  </div>
</div>
