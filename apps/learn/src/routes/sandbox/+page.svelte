<script lang="ts">
  import { Code, Terminal, Play } from "lucide-svelte";
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-heading font-bold">AI Sandbox</h1>
      <p class="text-muted-foreground mt-1">Instant runtime environments for Rust, Go, Node.js, and Python.</p>
    </div>
    <button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
      <Play size={18} />
      <span>Run Environment</span>
    </button>
  </div>

  <!-- Placeholder Editor UI -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
    <!-- Code Editor -->
    <div class="lg:col-span-2 rounded-2xl border border-border bg-slate-950/50 flex flex-col overflow-hidden">
      <div class="flex items-center justify-between px-4 py-2 border-b border-border bg-slate-900/50">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          <span class="ml-2 text-xs text-muted-foreground font-mono">main.rs</span>
        </div>
        <div class="flex items-center gap-3">
            <span class="text-xs text-muted-foreground">Rust 1.75</span>
        </div>
      </div>
      <div class="flex-1 p-4 font-mono text-sm text-slate-300">
        <p><span class="text-purple-400">fn</span> <span class="text-blue-400">main</span>() \{</p>
        <p class="pl-4"><span class="text-slate-500">// Welcome to Lumina Sandbox</span></p>
        <p class="pl-4">println!(<span class="text-green-400">"Hello, Lumina!"</span>);</p>
        <p>}</p>
      </div>
    </div>

    <!-- Terminal / Output -->
    <div class="rounded-2xl border border-border bg-slate-900/50 flex flex-col overflow-hidden">
       <div class="px-4 py-2 border-b border-border bg-slate-900/80">
         <div class="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase">
           <Terminal size={14} />
           <span>Console Output</span>
         </div>
       </div>
       <div class="flex-1 p-4 font-mono text-xs text-slate-400">
         <p>> Compiling playground v0.1.0 (/playground)...</p>
         <p class="text-green-400 mt-2">Finished dev [unoptimized + debuginfo] target(s) in 0.45s</p>
         <p class="text-slate-500">Running `target/debug/playground`</p>
         <p class="text-white mt-1">Hello, Lumina!</p>
       </div>
    </div>
  </div>
</div>
