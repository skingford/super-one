<script lang="ts">
  import BentoGrid from "$lib/components/ui/BentoGrid.svelte";
  import BentoCard from "$lib/components/ui/BentoCard.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import { knowledgeStore } from "$lib/stores/knowledge.svelte";
  import { studyStore } from "$lib/stores/study.svelte";
  import { formatDuration, formatRelativeTime } from "$lib/utils/storage";
  import {
    Sparkles,
    Flame,
    BookOpen,
    Clock,
    Target,
    ArrowRight,
    CheckCircle2,
    Zap,
    TrendingUp,
    Search,
    HelpCircle,
    MessageCircle,
    Menu,
    X,
    ChevronDown,
    Globe
  } from "lucide-svelte";

  // Recent knowledge items
  const recentKnowledge = $derived(knowledgeStore.filteredItems.slice(0, 3));
  const activePlan = $derived(studyStore.activePlans[0]);
  const planProgress = $derived(activePlan ? studyStore.getPlanProgress(activePlan.id) : null);

  let isMobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<div class="min-h-screen bg-[#0D1117] font-['Outfit'] text-white selection:bg-blue-500/30">
  <!-- GitHub-style Header -->
  <header class="absolute top-0 left-0 right-0 z-50 py-4 px-6 lg:px-12 bg-transparent text-white/70">
    <div class="flex items-center justify-between max-w-[1280px] mx-auto">
      <div class="flex items-center gap-8">
        <a href="/" class="text-white hover:text-white/80 transition-colors">
            <div class="w-8 h-8 rounded-full bg-white text-[#0D1117] flex items-center justify-center">
                <Sparkles class="w-5 h-5 fill-current" />
            </div>
        </a>
        
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="/knowledge" class="hover:text-white transition-colors">Knowledge</a>
            <a href="/study" class="hover:text-white transition-colors">Study Plans</a>
            <a href="/interview" class="hover:text-white transition-colors">Interview</a>
        </nav>
      </div>

      <div class="hidden md:flex items-center gap-4">
        <div class="relative group">
            <div class="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-md border border-white/15 bg-[#0D1117] text-sm text-white/70 focus-within:border-white focus-within:ring-1 focus-within:ring-white transition-all w-64">
                <Search class="w-4 h-4 opacity-50" />
                <input type="text" placeholder="Search or jump to..." class="bg-transparent border-none outline-none placeholder:text-white/50 w-full text-white" />
                <div class="flex items-center border border-white/20 rounded px-1.5 text-[10px] opacity-70">/</div>
            </div>
        </div>
        <a href="/login" class="text-sm font-medium hover:text-white transition-colors">Sign in</a>
        <a href="/signup" class="text-sm font-medium px-4 py-1.5 rounded-md border border-white/70 hover:border-white hover:bg-white/10 transition-colors text-white">Sign up</a>
      </div>

       <button class="md:hidden text-white" onclick={toggleMobileMenu}>
        {#if isMobileMenuOpen}
          <X class="w-6 h-6" />
        {:else}
          <Menu class="w-6 h-6" />
        {/if}
      </button>
    </div>
  </header>

   <!-- Mobile Menu -->
    {#if isMobileMenuOpen}
        <div class="fixed inset-0 z-40 bg-[#0D1117] pt-20 px-6 animate-fade-in md:hidden">
            <nav class="flex flex-col gap-6 text-lg font-medium text-white/80">
                <a href="/knowledge" class="border-b border-white/10 pb-4">Knowledge</a>
                <a href="/study" class="border-b border-white/10 pb-4">Study Plans</a>
                <a href="/interview" class="border-b border-white/10 pb-4">Interview</a>
                <a href="/login" class="">Sign in</a>
                <a href="/signup" class="">Sign up</a>
            </nav>
        </div>
    {/if}


  <!-- Hero Section -->
  <section class="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden min-h-[90vh] flex flex-col justify-center">
    <!-- Background Effects -->
    <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
    
    <!-- Globe/Lines SVG (Abstract) -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full animate-[spin_60s_linear_infinite]">
            <path fill="none" stroke="white" stroke-width="0.5" d="M100,10 A90,90 0 1,0 100,190 A90,90 0 1,0 100,10 Z" />
            <path fill="none" stroke="white" stroke-width="0.2" d="M100,20 A80,80 0 1,0 100,180 A80,80 0 1,0 100,20 Z" />
            <path fill="none" stroke="white" stroke-width="0.1" d="M100,30 A70,70 0 1,0 100,170 A70,70 0 1,0 100,30 Z" style="transform: rotate(45deg); transform-origin: center;" />
            <path fill="none" stroke="white" stroke-width="0.1" d="M10,100 Q100,50 190,100 T10,100" />
             <path fill="none" stroke="white" stroke-width="0.1" d="M10,100 Q100,150 190,100" />
        </svg>
    </div>


    <div class="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <!-- Floating Badge -->
        <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-pointer group">
            <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span class="text-white/80 text-sm font-medium">New: AI-powered study plans</span>
            <ArrowRight class="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
        </div>

        <h1 class="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            The future of learning <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#7ee787] to-[#aff5b4]">happens together.</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Tools and trends evolve, but knowledge endures. With <strong>Learn</strong>, create, share, and master your skills on one platform.
        </p>

        <!-- Input Row -->
        <div class="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg">
             <div class="relative w-full">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    class="w-full px-5 py-3.5 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
             </div>
             <button class="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-bold transition-colors whitespace-nowrap shadow-lg shadow-green-900/20">
                Sign up for Learn
             </button>
        </div>
        
        <div class="mt-8 flex items-center gap-6">
             <button class="px-8 py-3.5 rounded-lg border border-purple-400/30 text-white font-bold hover:border-purple-400 hover:bg-purple-500/10 transition-all">
                Try Learn Pro free
             </button>
        </div>

    </div>
  </section>
  <!-- Content removed as requested -->
  
  <!-- Footer -->
  <footer class="py-12 px-6 border-t border-white/10 mt-auto">
      <div class="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/40">
           <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Sparkles class="w-3 h-3 text-white" />
                </div>
                <span>© 2026 Learn Platform, Inc.</span>
           </div>
           <div class="flex gap-6">
               <a href="/privacy" class="hover:text-blue-400">Privacy</a>
               <a href="/security" class="hover:text-blue-400">Security</a>
               <a href="/terms" class="hover:text-blue-400">Terms</a>
               <a href="/docs" class="hover:text-blue-400">Docs</a>
               <a href="/contact" class="hover:text-blue-400">Contact</a>
           </div>
      </div>
  </footer>
</div>
