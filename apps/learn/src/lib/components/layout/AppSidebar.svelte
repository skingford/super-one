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
    X
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

<!-- Mobile Overlay -->
{#if mobileOpen}
  <div 
    class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
    onclick={() => mobileOpen = false}
    transition:fade
  ></div>
{/if}

<!-- Sidebar Container -->
<aside 
  class="
    fixed top-0 left-0 z-50 h-full w-64 
    bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border
    transition-transform duration-300 ease-in-out
    lg:translate-x-0
    {mobileOpen ? 'translate-x-0' : '-translate-x-full'}
  "
>
  <div class="flex flex-col h-full p-6">
    <!-- Logo -->
    <div class="flex items-center gap-3 mb-10 px-2 pointer-events-none select-none">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/30"></div>
      <h1 class="font-heading font-bold text-xl text-foreground tracking-wide">
        Lumina<span class="text-violet-400">AI</span>
      </h1>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-2">
      <p class="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Platform</p>
      
      {#each links as link}
        {@const active = isActive(link.href)}
        <a 
          href={link.href}
          onclick={() => mobileOpen = false}
          class="
            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
            {active 
              ? 'bg-sidebar-primary/10 text-sidebar-primary border border-sidebar-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]' 
              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'}
          "
        >
          <svelte:component 
            this={link.icon} 
            size={20} 
            class={active ? "text-sidebar-primary drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" : "group-hover:text-foreground transition-colors"} 
          />
          <span class="font-medium text-sm">{link.label}</span>
          
          {#if active}
            <div class="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary shadow-[0_0_8px_currentColor]"></div>
          {/if}
        </a>
      {/each}

      <div class="mt-8">
        <p class="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Settings</p>
        <a 
          href="/settings"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200"
        >
          <Settings size={20} />
          <span class="font-medium text-sm">Preferences</span>
        </a>
      </div>
    </nav>

    <!-- User Profile (Placeholder) -->
    <div class="mt-auto pt-6 border-t border-sidebar-border">
      <button class="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-left group">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white ring-2 ring-sidebar-border group-hover:ring-sidebar-primary/50 transition-all">
          JD
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-foreground truncate">John Doe</p>
          <p class="text-xs text-muted-foreground truncate">Pro Member</p>
        </div>
        <LogOut size={16} class="text-muted-foreground group-hover:text-destructive transition-colors" />
      </button>
    </div>
  </div>
</aside>
