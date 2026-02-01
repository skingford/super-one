<script lang="ts">
  import { Bot, Mic, Send, Globe, Sparkles } from "lucide-svelte";
</script>

<div class="h-[calc(100vh-8rem)] flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
  <!-- Mentor Header -->
  <div class="p-4 border-b border-border bg-slate-900/50 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
        <Bot class="text-white" size={20} />
      </div>
      <div>
        <h2 class="font-heading font-bold text-lg leading-tight">Lumina Mentor</h2>
        <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span class="text-xs text-muted-foreground">Online • Strict Mode</span>
        </div>
      </div>
    </div>
    
    <div class="flex items-center gap-2">
      <button class="p-2 rounded-lg hover:bg-slate-800 text-muted-foreground hover:text-foreground transition-colors" title="Switch Language">
        <Globe size={18} />
      </button>
      <button class="p-2 rounded-lg hover:bg-slate-800 text-muted-foreground hover:text-foreground transition-colors" title="Change Persona">
        <Sparkles size={18} />
      </button>
    </div>
  </div>

  <!-- Chat Area (Placeholder) -->
  <div class="flex-1 bg-slate-950/30 p-4 overflow-y-auto space-y-6">
    <!-- AI Message -->
    <div class="flex gap-4 max-w-3xl">
      <div class="w-8 h-8 rounded-full bg-violet-500/20 flex-shrink-0 flex items-center justify-center">
        <Bot size={16} class="text-violet-400" />
      </div>
      <div class="space-y-1">
        <p class="text-sm font-medium text-violet-400">Lumina Mentor</p>
        <div class="p-3 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 text-slate-300 text-sm leading-relaxed shadow-sm">
          Welcome back. I noticed you struggled with <code>Box&lt;T&gt;</code> pointers yesterday. Shall we review <strong>Heap Allocation</strong> before moving to Rc/Arc?
        </div>
      </div>
    </div>

    <!-- User Message -->
    <div class="flex gap-4 max-w-3xl ml-auto flex-row-reverse">
       <div class="w-8 h-8 rounded-full bg-cyan-500/20 flex-shrink-0 flex items-center justify-center">
        <span class="text-xs font-bold text-cyan-400">ME</span>
      </div>
      <div class="space-y-1 text-right">
        <p class="text-sm font-medium text-cyan-400">You</p>
         <div class="p-3 rounded-2xl rounded-tr-none bg-cyan-950/30 border border-cyan-900/50 text-slate-200 text-sm leading-relaxed text-left">
          Yes, please. I'm still confused about when to use Box vs just stack allocation.
        </div>
      </div>
    </div>
  </div>

  <!-- Input Area -->
  <div class="p-4 bg-slate-900/50 border-t border-border">
    <div class="relative">
      <input 
        type="text" 
        placeholder="Ask anything about code..." 
        class="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-4 pr-24 focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm"
      />
      <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <button class="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Mic size={18} />
        </button>
        <button class="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            <Send size={16} />
        </button>
      </div>
    </div>
  </div>
</div>
