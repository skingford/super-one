<script lang="ts">
  import { page } from "$app/stores";
  import { 
    Map, 
    Bot, 
    Code, 
    BookOpen, 
    Settings, 
    LogOut,
    Menu,
    X,
    Sparkles
  } from "lucide-svelte";
  import { fade, slide } from "svelte/transition";

  let { mobileOpen = $bindable(false) } = $props();

  const links = [
    { href: "/roadmap", label: "Roadmap", icon: Map },
    { href: "/mentor", label: "Mentor", icon: Bot },
    { href: "/sandbox", label: "Sandbox", icon: Code },
    { href: "/knowledge", label: "Knowledge", icon: BookOpen },
  ];

  function isActive(path: string) {
    return $page.url.pathname.startsWith(path);
  }
</script>

<header class="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-md border-b border-border">
  <div class="h-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-3 group">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all duration-300"></div>
      <h1 class="font-heading font-bold text-xl text-foreground tracking-wide">
        Lumina<span class="text-violet-400">AI</span>
      </h1>
    </a>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center gap-1">
      {#each links as link}
        {@const active = isActive(link.href)}
        {@const Icon = link.icon}
        <a 
          href={link.href}
          class="
            flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
            {active 
              ? 'bg-white/10 text-white font-medium' 
              : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}
          "
        >
          <Icon
            size={18} 
            class={active ? "text-violet-400" : "opacity-70"} 
          />
          <span class="text-sm">{link.label}</span>
        </a>
      {/each}
    </nav>

    <!-- Desktop User Actions -->
    <div class="hidden md:flex items-center gap-4">
        <button class="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Settings">
            <Settings size={20} />
        </button>
        <div class="h-8 w-[1px] bg-border"></div>
        <button class="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-white/5 transition-colors group">
             <div class="text-right hidden lg:block">
                <p class="text-sm font-medium text-foreground">John Doe</p>
            </div>
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white ring-2 ring-transparent group-hover:ring-violet-500/50 transition-all">
                JD
            </div>
        </button>
    </div>

    <!-- Mobile Menu Button -->
    <button 
      class="md:hidden p-2 -mr-2 text-foreground"
      onclick={() => mobileOpen = !mobileOpen}
    >
      {#if mobileOpen}
        <X size={24} />
      {:else}
        <Menu size={24} />
      {/if}
    </button>
  </div>
</header>

<!-- Mobile Navigation Overlay -->
{#if mobileOpen}
  <div 
    class="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-20 px-6"
    transition:fade={{ duration: 200 }}
  >
    <nav class="flex flex-col gap-2">
      {#each links as link}
        {@const active = isActive(link.href)}
        {@const Icon = link.icon}
        <a 
          href={link.href}
          onclick={() => mobileOpen = false}
          class="
            flex items-center gap-4 p-4 rounded-xl transition-all duration-200 border border-transparent
            {active 
              ? 'bg-white/10 border-white/10 text-white' 
              : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'}
          "
        >
          <Icon
            size={24} 
            class={active ? "text-violet-400" : ""} 
          />
          <span class="text-lg font-medium">{link.label}</span>
        </a>
      {/each}
       <div class="h-[1px] bg-border my-4"></div>
       <a href="/settings" class="flex items-center gap-4 p-4 text-muted-foreground">
          <Settings size={24} />
          <span class="text-lg font-medium">Settings</span>
       </a>
    </nav>
  </div>
{/if}
