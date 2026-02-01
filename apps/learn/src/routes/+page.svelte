<script lang="ts">
  import { ArrowRight, Sparkles, Target, Zap } from "lucide-svelte";
</script>

<div class="space-y-12 pb-12">
  <!-- Hero Section -->
  <div class="relative py-12 md:py-20 text-center space-y-6">
    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium animate-fade-in">
        <Sparkles size={16} />
        <span>Knowledge evolves with you</span>
    </div>
    
    <h1 class="text-4xl md:text-6xl font-heading font-bold tracking-tight text-white animate-fade-up" style="animation-delay: 100ms">
      Welcome back, <span class="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Traveler.</span>
    </h1>
    
    <p class="text-xl text-slate-400 max-w-2xl mx-auto animate-fade-up" style="animation-delay: 200ms">
      Your neural path is optimizing. Current focus: <span class="text-slate-200 font-medium">Rust Advanced Patterns</span> and <span class="text-slate-200 font-medium">System Design</span>.
    </p>

    <div class="flex items-center justify-center gap-4 pt-4 animate-fade-up" style="animation-delay: 300ms">
      <a href="/roadmap" class="px-8 py-3.5 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors shadow-lg shadow-white/10 flex items-center gap-2">
        Continue Path
        <ArrowRight size={18} />
      </a>
      <a href="/mentor" class="px-8 py-3.5 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors border border-slate-700">
        Talk to Mentor
      </a>
    </div>
  </div>

  <!-- Features Grid -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
    <!-- Card 1 -->
    <a href="/roadmap" class="group relative p-8 rounded-3xl bg-slate-900 border border-border overflow-hidden hover:border-violet-500/50 transition-colors cursor-pointer">
      <div class="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div class="relative z-10">
        <div class="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Target class="text-violet-400" size={24} />
        </div>
        <h3 class="text-xl font-bold mb-2">Dynamic Roadmap</h3>
        <p class="text-muted-foreground text-sm leading-relaxed">Your learning tree adapts in real-time. 85% progress on Ownership.</p>
      </div>
    </a>

    <!-- Card 2 -->
    <a href="/sandbox" class="group relative p-8 rounded-3xl bg-slate-900 border border-border overflow-hidden hover:border-cyan-500/50 transition-colors cursor-pointer">
      <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div class="relative z-10">
        <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Zap class="text-cyan-400" size={24} />
        </div>
        <h3 class="text-xl font-bold mb-2">Chaos Sandbox</h3>
        <p class="text-muted-foreground text-sm leading-relaxed">Instant environments. AI throws random bugs to test your resilience.</p>
      </div>
    </a>

     <!-- Card 3 -->
    <a href="/mentor" class="group relative p-8 rounded-3xl bg-slate-900 border border-border overflow-hidden hover:border-fuchsia-500/50 transition-colors cursor-pointer">
      <div class="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div class="relative z-10">
        <div class="w-12 h-12 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Sparkles class="text-fuchsia-400" size={24} />
        </div>
        <h3 class="text-xl font-bold mb-2">Mentor Agent</h3>
        <p class="text-muted-foreground text-sm leading-relaxed">Strict or encouraging. Your personal code reviewer is online.</p>
      </div>
    </a>
  </div>

  <!-- Recent Activity / Stats Placeholder -->
  <div class="p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-900/50 border border-border">
    <div class="flex items-center justify-between mb-6">
        <h3 class="font-bold text-lg">Weekly Momentum</h3>
        <select class="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-xs text-muted-foreground focus:outline-none">
            <option>Last 7 Days</option>
        </select>
    </div>
    <div class="h-32 flex items-end justify-between gap-2">
        {#each [40, 65, 30, 85, 50, 90, 60] as height}
            <div class="w-full bg-slate-800 rounded-t-lg relative group overflow-hidden" style="height: {height}%">
                <div class="absolute inset-0 bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="absolute bottom-0 w-full h-1 bg-violet-500"></div>
            </div>
        {/each}
    </div>
    <div class="flex justify-between mt-2 text-xs text-muted-foreground font-mono">
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
    </div>
  </div>
</div>
