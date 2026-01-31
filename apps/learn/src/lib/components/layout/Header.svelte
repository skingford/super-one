<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { page } from "$app/stores";
  import { Search, Bell, Sun, Moon } from "lucide-svelte";
  import Button from "$lib/components/ui/Button.svelte";

  interface Props {
    sidebarCollapsed?: boolean;
  }

  let { sidebarCollapsed = false }: Props = $props();

  let isDark = $state(true);
  let searchQuery = $state("");

  function toggleTheme() {
    isDark = !isDark;
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }

  // Page titles
  const pageTitles: Record<string, string> = {
    "/": "仪表盘",
    "/knowledge": "知识归档",
    "/interview": "面试准备",
    "/study": "学习计划",
    "/settings": "设置",
  };

  function getPageTitle(pathname: string): string {
    if (pageTitles[pathname]) return pageTitles[pathname];
    for (const [path, title] of Object.entries(pageTitles)) {
      if (pathname.startsWith(path) && path !== "/") return title;
    }
    return "学习搭子";
  }
</script>

<header
  class={cn(
    "fixed top-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b border-border z-30",
    "flex items-center justify-between px-6 transition-all duration-300",
    sidebarCollapsed ? "left-[72px]" : "left-64"
  )}
>
  <!-- Left: Page title -->
  <div>
    <h1 class="text-xl font-semibold">{getPageTitle($page.url.pathname)}</h1>
  </div>

  <!-- Right: Actions -->
  <div class="flex items-center gap-3">
    <!-- Search -->
    <div class="relative">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="search"
        placeholder="搜索..."
        bind:value={searchQuery}
        class={cn(
          "h-10 w-64 rounded-xl border border-input bg-background pl-10 pr-4 text-sm",
          "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
          "transition-all duration-200"
        )}
      />
    </div>

    <!-- Notifications -->
    <Button variant="ghost" size="icon">
      <Bell class="w-5 h-5" />
    </Button>

    <!-- Theme toggle -->
    <Button variant="ghost" size="icon" onclick={toggleTheme}>
      {#if isDark}
        <Sun class="w-5 h-5" />
      {:else}
        <Moon class="w-5 h-5" />
      {/if}
    </Button>

    <!-- User avatar -->
    <button class="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-chart-4 flex items-center justify-center text-white font-medium text-sm hover:scale-105 transition-transform">
      K
    </button>
  </div>
</header>
