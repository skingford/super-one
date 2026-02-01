<script lang="ts">
  import AppNavbar from "./AppNavbar.svelte";
  
  let { children } = $props();
  let mobileOpen = $state(false);
</script>

<div class="min-h-screen bg-background text-foreground flex flex-col">
  <!-- Top Navigation -->
  <AppNavbar bind:mobileOpen />

  <!-- Main Content -->
  <main class="flex-1 relative pt-16">
    <!-- Background Ambient Glows -->
    <div class="fixed top-0 left-0 w-full h-[500px] bg-primary/5 blur-[120px] pointer-events-none -z-10"></div>
    <div class="fixed bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] pointer-events-none -z-10"></div>

    <div class="w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-12 animate-fade-in relative z-0">
      {@render children()}
    </div>
  </main>
</div>
