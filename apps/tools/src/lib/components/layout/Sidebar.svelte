<script lang="ts">
  import { page } from '$app/stores';
  import { tools } from '$stores/tools';
  import { Braces, QrCode, ScanLine, Box } from 'lucide-svelte';

  let currentPath = $state('/');

  page.subscribe((value) => {
    currentPath = value.url.pathname;
  });

  const iconMap = {
    Braces,
    QrCode,
    ScanLine,
    Box
  } as const;

  type IconName = keyof typeof iconMap;

  function getIcon(iconName: string) {
    return iconMap[iconName as IconName] ?? Box;
  }
</script>

<aside
  class="
  fixed left-0 top-16 bottom-0
  w-64
  bg-[var(--color-surface)]
  border-r border-[var(--color-border-subtle)]
  overflow-y-auto
  hidden lg:block
"
>
  <nav class="p-4">
    <div class="mb-3 px-3">
      <span class="font-mono text-xs font-medium uppercase tracking-widest text-[var(--color-text-subtle)]">
        Tools
      </span>
    </div>

    <ul class="space-y-1">
      {#each tools as tool, i}
        {@const isActive = currentPath === tool.path}
        {@const Icon = getIcon(tool.icon)}
        <li style="animation-delay: {i * 50}ms" class="animate-fade-in opacity-0">
          <a
            href={tool.path}
            class="
              group
              flex items-center gap-3
              px-3 py-2.5
              rounded-[var(--radius-md)]
              transition-all duration-200
              {isActive
              ? 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]'
              : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]'}
            "
          >
            <div
              class="
                w-8 h-8
                flex items-center justify-center
                rounded-[var(--radius-sm)]
                transition-all duration-200
                {isActive
                ? 'bg-[var(--color-accent)] text-[var(--color-background)]'
                : 'bg-[var(--color-surface-elevated)] group-hover:bg-[var(--color-border)]'}
              "
              style={isActive ? '' : `--tool-color: ${tool.color}`}
            >
              <Icon size={16} strokeWidth={2} />
            </div>

            <div class="flex-1 min-w-0">
              <div class="font-mono font-medium text-sm">{tool.name}</div>
              <div class="text-xs text-[var(--color-text-subtle)] truncate">
                {tool.description}
              </div>
            </div>

            {#if isActive}
              <div class="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></div>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--color-border-subtle)]">
    <div class="px-3 py-2 text-xs text-[var(--color-text-subtle)] font-mono">
      <span class="text-[var(--color-accent)]">v0.1.0</span> · Made with Svelte
    </div>
  </div>
</aside>
