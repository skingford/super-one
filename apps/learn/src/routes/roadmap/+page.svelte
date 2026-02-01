<script lang="ts">
  import { CheckCircle, Circle, ArrowRight, Zap } from "lucide-svelte";
</script>

<div class="space-y-8">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-heading font-bold">Your Knowledge Graph</h1>
      <p class="text-muted-foreground mt-1">Self-evolving path based on your recent performance in <span class="text-violet-400 font-medium">Rust Ownership</span>.</p>
    </div>
    <div class="flex items-center gap-4 bg-slate-900/50 px-4 py-2 rounded-xl border border-border">
      <div class="flex flex-col items-end">
        <span class="text-xs text-muted-foreground uppercase tracking-wider">Current Velocity</span>
        <span class="font-mono text-lg font-bold text-cyan-400">XP +850/hr</span>
      </div>
      <div class="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
        <Zap class="text-cyan-400" size={20} />
      </div>
    </div>
  </div>

  <!-- Graph Visualization Area -->
  <div class="relative w-full h-[600px] bg-slate-950 rounded-2xl border border-border overflow-hidden md:p-10 p-4">
    <!-- Grid Background -->
    <div class="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
    
    <!-- Central Node (Active) -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
      <div class="relative group cursor-pointer">
        <div class="absolute -inset-4 bg-violet-500/20 rounded-full blur-xl group-hover:bg-violet-500/30 transition-all duration-500"></div>
        <div class="w-24 h-24 rounded-full bg-slate-900 border-2 border-violet-500 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)] relative z-10 group-hover:scale-110 transition-transform duration-300">
          <span class="font-bold text-violet-100 text-center text-sm leading-tight">Rust<br>Ownership</span>
        </div>
        
        <!-- Satellite Nodes -->
        <div class="absolute -top-20 left-12">
            <div class="px-3 py-1 bg-violet-900/80 rounded-full text-xs text-violet-200 border border-violet-500/30 whitespace-nowrap animate-fade-up">
                Current Focus
            </div>
        </div>
      </div>
    </div>

    <!-- Connected Nodes (Past) -->
    <div class="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-12 z-10 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <div class="flex flex-col items-center gap-2">
            <div class="w-16 h-16 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center text-emerald-500">
                <CheckCircle size={24} />
            </div>
            <span class="text-xs font-medium text-slate-400">Basic Syntax</span>
        </div>
    </div>
    
    <!-- Connector Line Left -->
    <svg class="absolute inset-0 pointer-events-none z-0">
        <path d="M 350 300 Q 450 300 550 300" stroke="#334155" stroke-width="2" fill="none" stroke-dasharray="8 4" class="animate-pulse" />
    </svg>

    <!-- Connected Nodes (Future) -->
    <div class="absolute top-1/3 right-1/4 translate-x-12 z-10 group cursor-pointer">
         <div class="flex flex-col items-center gap-2">
            <div class="w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-700 hover:border-cyan-500 flex items-center justify-center text-slate-600 group-hover:text-cyan-500 transition-all">
                <Circle size={24} />
            </div>
            <span class="text-xs font-medium text-slate-500 group-hover:text-cyan-400">Concurrency</span>
        </div>
    </div>

     <div class="absolute bottom-1/3 right-1/3 translate-x-12 z-10 group cursor-pointer">
         <div class="flex flex-col items-center gap-2">
            <div class="w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-700 hover:border-cyan-500 flex items-center justify-center text-slate-600 group-hover:text-cyan-500 transition-all">
                <Circle size={24} />
            </div>
            <span class="text-xs font-medium text-slate-500 group-hover:text-cyan-400">Smart Pointers</span>
        </div>
    </div>

    <!-- Floating Legend/Controls -->
    <div class="absolute bottom-6 right-6 flex gap-2 bg-slate-900/80 p-2 rounded-xl border border-border backdrop-blur-md">
        <button class="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/5 transition-colors">2D View</button>
        <button class="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white">3D Galaxy</button>
    </div>
  </div>
  
  <!-- Recommended Actions -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-6 rounded-2xl bg-slate-900/50 border border-violet-500/20 hover:border-violet-500/50 transition-colors cursor-pointer group">
          <div class="flex items-start justify-between mb-4">
              <div class="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <span class="font-bold text-violet-400">01</span>
              </div>
              <ArrowRight class="text-slate-600 group-hover:text-violet-400 transition-colors" />
          </div>
          <h3 class="font-bold text-lg mb-1 group-hover:text-violet-300">Take the Ownership Quiz</h3>
          <p class="text-sm text-muted-foreground">Short 5-minute assessment to verify your understanding of move semantics.</p>
      </div>

       <div class="p-6 rounded-2xl bg-slate-900/50 border border-border hover:border-cyan-500/50 transition-colors cursor-pointer group">
          <div class="flex items-start justify-between mb-4">
              <div class="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <span class="font-bold text-cyan-400">02</span>
              </div>
               <ArrowRight class="text-slate-600 group-hover:text-cyan-400 transition-colors" />
          </div>
          <h3 class="font-bold text-lg mb-1 group-hover:text-cyan-300">VS Code: Borrow Checker</h3>
          <p class="text-sm text-muted-foreground">Practical lab: Fix 3 common compile-time errors in the Sandbox.</p>
      </div>
  </div>
</div>
