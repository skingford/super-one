<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { page } from "$app/stores";
  import { Home, BookOpen, Target, Sun, Moon, Sparkles } from "lucide-svelte";

  interface Props {
    onUnlockInterview?: () => void;
    interviewUnlocked?: boolean;
  }

  let { onUnlockInterview, interviewUnlocked = false }: Props = $props();

  let isDark = $state(true);
  let logoClickCount = $state(0);
  let lastClickTime = $state(0);

  const navItems = [
    { href: "/", label: "首页", icon: Home },
    { href: "/knowledge", label: "知识", icon: BookOpen },
    { href: "/study", label: "学习", icon: Target },
  ];

  function isActive(href: string) {
    if (href === "/") return $page.url.pathname === "/";
    return $page.url.pathname.startsWith(href);
  }

  function toggleTheme() {
    isDark = !isDark;
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }

  function handleLogoClick() {
    const now = Date.now();
    // Reset count if more than 1 second between clicks
    if (now - lastClickTime > 1000) {
      logoClickCount = 1;
    } else {
      logoClickCount++;
    }
    lastClickTime = now;

    if (logoClickCount >= 5 && !interviewUnlocked) {
      onUnlockInterview?.();
      logoClickCount = 0;
    }
  }
</script>

<nav
  class={cn(
    "fixed top-6 left-1/2 -translate-x-1/2 z-50",
    "flex items-center gap-1 px-2 py-2 rounded-2xl",
    "bg-card/60 backdrop-blur-2xl border border-white/10",
    "shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
  )}
>
  <!-- Logo -->
  <button
    class={cn(
      "flex items-center justify-center w-10 h-10 rounded-xl mr-2",
      "bg-gradient-to-br from-primary via-chart-4 to-chart-5",
      "hover:scale-110 active:scale-95 transition-transform duration-200",
      "shadow-lg shadow-primary/25"
    )}
    onclick={handleLogoClick}
    title="学习搭子"
  >
    <Sparkles class="w-5 h-5 text-white" />
  </button>

  <!-- Nav Items -->
  {#each navItems as item}
    {@const active = isActive(item.href)}
    <a
      href={item.href}
      class={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200",
        active
          ? "bg-white/10 text-white font-medium"
          : "text-white/60 hover:text-white hover:bg-white/5"
      )}
    >
      <item.icon class="w-4 h-4" />
      <span class="text-sm">{item.label}</span>
    </a>
  {/each}

  <!-- Divider -->
  <div class="w-px h-6 bg-white/10 mx-2"></div>

  <!-- Theme Toggle -->
  <button
    class={cn(
      "flex items-center justify-center w-10 h-10 rounded-xl",
      "text-white/60 hover:text-white hover:bg-white/5",
      "transition-all duration-200"
    )}
    onclick={toggleTheme}
    title={isDark ? "切换亮色" : "切换暗色"}
  >
    {#if isDark}
      <Sun class="w-5 h-5" />
    {:else}
      <Moon class="w-5 h-5" />
    {/if}
  </button>
</nav>
