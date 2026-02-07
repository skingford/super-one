<script lang="ts">
  import { onMount, tick } from "svelte";
  import { Bot, Mic, Send, Globe, Sparkles } from "lucide-svelte";

  type ChatRole = "mentor" | "user";

  type ChatMessage = {
    id: string;
    role: ChatRole;
    content: string;
    timestamp: string;
  };

  const mentorReplies = [
    "很好。先记住：栈是编译期大小可知、生命周期明确；Box<T> 是把数据放到堆上，指针仍在栈上。",
    "你可以把 Box 理解为“所有权转移到堆”的工具，适合大对象、递归类型或需要稳定内存地址的场景。",
    "判断规则：类型大小固定且生命周期简单 -> 栈；需要动态大小、递归、或跨作用域 -> Box/Rc/Arc。",
    "来个小练习：为什么链表节点在 Rust 里通常需要 Box？说出原因。",
    "如果你想练 Rc/Arc，先确保理解所有权与借用，再考虑共享与并发。"
  ];

  let messages: ChatMessage[] = [
    {
      id: "m1",
      role: "mentor",
      content:
        "Welcome back. I noticed you struggled with Box<T> pointers yesterday. Shall we review Heap Allocation before moving to Rc/Arc?",
      timestamp: "09:42"
    },
    {
      id: "m2",
      role: "user",
      content: "Yes, please. I'm still confused about when to use Box vs just stack allocation.",
      timestamp: "09:43"
    }
  ];

  let inputValue = "";
  let isTyping = false;
  let chatScrollContainer: HTMLDivElement | null = null;
  let replyTimer: number | undefined;

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
  };

  const scrollToBottom = async () => {
    await tick();
    if (chatScrollContainer) {
      chatScrollContainer.scrollTop = chatScrollContainer.scrollHeight;
    }
  };

  const sendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isTyping) {
      return;
    }

    messages = [
      ...messages,
      { id: crypto.randomUUID(), role: "user", content: trimmed, timestamp: getTimestamp() }
    ];
    inputValue = "";
    await scrollToBottom();
    await simulateMentorReply(trimmed);
  };

  const simulateMentorReply = async (userText: string) => {
    isTyping = true;
    await scrollToBottom();

    const reply =
      mentorReplies.find((line) => userText.toLowerCase().includes("box")) ?? mentorReplies[0];

    replyTimer = window.setTimeout(async () => {
      messages = [
        ...messages,
        {
          id: crypto.randomUUID(),
          role: "mentor",
          content: reply,
          timestamp: getTimestamp()
        }
      ];
      isTyping = false;
      await scrollToBottom();
    }, 700);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  onMount(() => {
    scrollToBottom();
    return () => {
      if (replyTimer) {
        window.clearTimeout(replyTimer);
      }
    };
  });
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

  <!-- Chat Area -->
  <div
    class="flex-1 bg-slate-950/30 p-4 overflow-y-auto space-y-6"
    bind:this={chatScrollContainer}
  >
    {#each messages as message (message.id)}
      {#if message.role === "mentor"}
        <div class="flex gap-4 max-w-3xl">
          <div class="w-8 h-8 rounded-full bg-violet-500/20 flex-shrink-0 flex items-center justify-center">
            <Bot size={16} class="text-violet-400" />
          </div>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <p class="text-sm font-medium text-violet-400">Lumina Mentor</p>
              <span class="text-[10px] text-slate-500">{message.timestamp}</span>
            </div>
            <div class="p-3 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 text-slate-300 text-sm leading-relaxed shadow-sm">
              {message.content}
            </div>
          </div>
        </div>
      {:else}
        <div class="flex gap-4 max-w-3xl ml-auto flex-row-reverse">
          <div class="w-8 h-8 rounded-full bg-cyan-500/20 flex-shrink-0 flex items-center justify-center">
            <span class="text-xs font-bold text-cyan-400">ME</span>
          </div>
          <div class="space-y-1 text-right">
            <div class="flex items-center gap-2 justify-end">
              <span class="text-[10px] text-slate-500">{message.timestamp}</span>
              <p class="text-sm font-medium text-cyan-400">You</p>
            </div>
            <div class="p-3 rounded-2xl rounded-tr-none bg-cyan-950/30 border border-cyan-900/50 text-slate-200 text-sm leading-relaxed text-left">
              {message.content}
            </div>
          </div>
        </div>
      {/if}
    {/each}

    {#if isTyping}
      <div class="flex gap-4 max-w-3xl">
        <div class="w-8 h-8 rounded-full bg-violet-500/20 flex-shrink-0 flex items-center justify-center">
          <Bot size={16} class="text-violet-400" />
        </div>
        <div class="space-y-1">
          <p class="text-sm font-medium text-violet-400">Lumina Mentor</p>
          <div class="px-4 py-3 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 text-slate-300 text-sm leading-relaxed shadow-sm">
            <span class="inline-flex gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:120ms]"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:240ms]"></span>
            </span>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <!-- Input Area -->
  <div class="p-4 bg-slate-900/50 border-t border-border">
    <div class="relative">
      <input
        type="text"
        placeholder="Ask anything about code..."
        class="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-4 pr-24 focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm"
        bind:value={inputValue}
        on:keydown={handleKeydown}
      />
      <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <button class="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Mic size={18} />
        </button>
        <button
          class="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-60"
          on:click={sendMessage}
          disabled={!inputValue.trim() || isTyping}
        >
            <Send size={16} />
        </button>
      </div>
    </div>
  </div>
</div>
