<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { page } from "$app/stores";
  import {
    LayoutDashboard,
    BookOpen,
    MessageSquareText,
    Target,
    Settings,
    ChevronLeft,
    ChevronRight,
    Sparkles,
  } from "lucide-svelte";

  interface Props {
    collapsed?: boolean;
    onToggle?: () => void;
  }

  let { collapsed = $bindable(false), onToggle }: Props = $props();

  const navItems = [
    { href: "/", label: "仪表盘", icon: LayoutDashboard },
    { href: "/knowledge", label: "知识归档", icon: BookOpen },
    { href: "/interview", label: "面试准备", icon: MessageSquareText },
    { href: "/study", label: "学习计划", icon: Target },
  ];

  function isActive(href: string) {
    if (href === "/") return $page.url.pathname === "/";
    return $page.url.pathname.startsWith(href);
  }
</script>

<aside
  class={cn(
    "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40",
    "flex flex-col transition-all duration-300 ease-out",
    collapsed ? "w-[72px]" : "w-64"
  )}
>
  <!-- Logo -->
  <div class="h-16 flex items-center px-4 border-b border-sidebar-border">
    <div class="flex items-center gap-3">
      <div
        class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-chart-4 flex items-center justify-center shadow-lg"
      >
        <Sparkles class="w-5 h-5 text-white" />
      </div>
      {#if !collapsed}
        <span class="font-semibold text-lg animate-fade-in">学习搭子</span>
      {/if}
    </div>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto scrollbar-thin">
    {#each navItems as item}
      {@const active = isActive(item.href)}
      <a
        href={item.href}
        class={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
          "hover:bg-sidebar-accent group",
          active
            ? "bg-sidebar-accent text-sidebar-primary font-medium"
            : "text-sidebar-foreground/80"
        )}
        title={collapsed ? item.label : undefined}
      >
        <item.icon
          class={cn(
            "w-5 h-5 transition-transform duration-200",
            active ? "text-sidebar-primary" : "text-sidebar-foreground/60",
            "group-hover:scale-110"
          )}
        />
        {#if !collapsed}
          <span class="animate-fade-in">{item.label}</span>
        {/if}
        {#if active && !collapsed}
          <div class="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary animate-scale-in"></div>
        {/if}
      </a>
    {/each}
  </nav>

  <!-- Bottom section -->
  <div class="p-3 border-t border-sidebar-border space-y-1.5">
    <a
      href="/settings"
      class={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
        "hover:bg-sidebar-accent text-sidebar-foreground/80"
      )}
      title={collapsed ? "设置" : undefined}
    >
      <Settings class="w-5 h-5 text-sidebar-foreground/60" />
      {#if !collapsed}
        <span>设置</span>
      {/if}
    </a>

    <!-- Collapse toggle -->
    <button
      class={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
        "hover:bg-sidebar-accent text-sidebar-foreground/60"
      )}
      onclick={() => {
        collapsed = !collapsed;
        onToggle?.();
      }}
      title={collapsed ? "展开侧边栏" : "收起侧边栏"}
    >
      {#if collapsed}
        <ChevronRight class="w-5 h-5" />
      {:else}
        <ChevronLeft class="w-5 h-5" />
        <span>收起</span>
      {/if}
    </button>
  </div>
</aside>
