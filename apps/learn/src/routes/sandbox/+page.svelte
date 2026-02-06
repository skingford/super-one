<script lang="ts">
  import { onMount } from "svelte";
  import { Code, Terminal, Play, Square, Copy, RotateCcw } from "lucide-svelte";
  import { EditorState } from "@codemirror/state";
  import { EditorView, keymap, lineNumbers, highlightActiveLineGutter } from "@codemirror/view";
  import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { javascript } from "@codemirror/lang-javascript";
  import { python } from "@codemirror/lang-python";
  import { rust } from "@codemirror/lang-rust";
  import { go } from "@codemirror/lang-go";

  const pistonBaseUrl = "https://emkc.org/api/v2/piston";

  type LanguageOption = {
    id: string;
    label: string;
    runtime: string;
    versionLabel: string;
    fileName: string;
  };

  const languageOptions: LanguageOption[] = [
    { id: "rust", label: "Rust", runtime: "rust", versionLabel: "1.75+", fileName: "main.rs" },
    { id: "go", label: "Go", runtime: "go", versionLabel: "1.22+", fileName: "main.go" },
    { id: "javascript", label: "Node.js", runtime: "javascript", versionLabel: "18+", fileName: "main.js" },
    { id: "python", label: "Python", runtime: "python", versionLabel: "3.11+", fileName: "main.py" }
  ];

  const starterTemplates: Record<string, string> = {
    rust: [
      "fn main() {",
      "    println!(\"Hello, Lumina!\");",
      "}"
    ].join("\n"),
    go: [
      "package main",
      "\n",
      "import \"fmt\"",
      "\n",
      "func main() {",
      "    fmt.Println(\"Hello, Lumina!\")",
      "}"
    ].join("\n"),
    javascript: [
      "const message = \"Hello, Lumina!\";",
      "console.log(message);"
    ].join("\n"),
    python: [
      "message = \"Hello, Lumina!\"",
      "print(message)"
    ].join("\n")
  };

  let languageId = "rust";
  let stdinValue = "";
  let outputLines: string[] = [];
  let isRunning = false;
  let editorContainer: HTMLDivElement | null = null;
  let editorView: EditorView | null = null;
  let currentCode = starterTemplates[languageId];
  let abortController: AbortController | null = null;
  let lastRunMeta = "";
  let runtimeVersion = "";

  const getLanguageExtension = (id: string) => {
    switch (id) {
      case "go":
        return go();
      case "python":
        return python();
      case "javascript":
        return javascript();
      default:
        return rust();
    }
  };

  const getLanguageOption = (id: string) => languageOptions.find((option) => option.id === id) ?? languageOptions[0];

  const formatOutputBlock = (title: string, content: string) => {
    if (!content.trim()) {
      return [] as string[];
    }

    return [
      `${title}:`,
      ...content.replace(/\r\n/g, "\n").split("\n")
    ];
  };

  const setOutput = (lines: string[]) => {
    outputLines = lines.length ? lines : ["(no output)"];
  };

  const clearOutput = () => {
    outputLines = [];
    lastRunMeta = "";
  };

  const copyOutput = async () => {
    const content = outputLines.join("\n");
    if (!content) {
      return;
    }
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error("Failed to copy output", error);
    }
  };

  const resetTemplate = () => {
    const template = starterTemplates[languageId];
    if (template) {
      currentCode = template;
      if (editorView) {
        editorView.dispatch({
          changes: { from: 0, to: editorView.state.doc.length, insert: template }
        });
      }
    }
  };

  const updateRuntimeVersion = async () => {
    const option = getLanguageOption(languageId);
    try {
      const response = await fetch(`${pistonBaseUrl}/runtimes`);
      const runtimes = (await response.json()) as Array<{ language: string; version: string }>;
      const runtime = runtimes.find((item) => item.language === option.runtime);
      runtimeVersion = runtime ? runtime.version : option.versionLabel;
    } catch (error) {
      runtimeVersion = option.versionLabel;
    }
  };

  const runCode = async () => {
    if (!editorView || isRunning) {
      return;
    }

    const option = getLanguageOption(languageId);
    const code = editorView.state.doc.toString();
    currentCode = code;
    clearOutput();
    isRunning = true;
    abortController?.abort();
    abortController = new AbortController();

    setOutput(["> Sending code to Piston runtime..."]);

    try {
      const response = await fetch(`${pistonBaseUrl}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: option.runtime,
          version: "*",
          files: [{ name: option.fileName, content: code }],
          stdin: stdinValue,
          args: [],
          compile_timeout: 10000,
          run_timeout: 10000,
          compile_memory_limit: -1,
          run_memory_limit: -1
        }),
        signal: abortController.signal
      });

      if (!response.ok) {
        throw new Error(`Piston response ${response.status}`);
      }

      const result = await response.json();
      const output: string[] = [];
      const compileOutput = result.compile?.output ?? "";
      const runOutput = result.run?.output ?? "";

      output.push(...formatOutputBlock("[compile]", compileOutput));
      output.push(...formatOutputBlock("[run]", runOutput));

      if (!output.length) {
        output.push("(no output)");
      }

      lastRunMeta = `Exit code: ${result.run?.code ?? "-"}`;
      if (result.run?.signal) {
        lastRunMeta += ` | Signal: ${result.run.signal}`;
      }

      setOutput(output);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setOutput(["[error]", message]);
      lastRunMeta = "Run failed";
    } finally {
      isRunning = false;
    }
  };

  const stopRun = () => {
    abortController?.abort();
    isRunning = false;
  };

  const buildEditor = () => {
    if (!editorContainer) {
      return;
    }

    editorView?.destroy();
    const state = EditorState.create({
      doc: currentCode,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        oneDark,
        getLanguageExtension(languageId),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            currentCode = update.state.doc.toString();
          }
        }),
        EditorView.lineWrapping,
        EditorView.theme({
          "&": {
            height: "100%",
            fontSize: "13px",
            backgroundColor: "transparent"
          },
          ".cm-content": {
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
            caretColor: "#f8fafc"
          },
          ".cm-gutters": {
            backgroundColor: "transparent",
            border: "none",
            color: "#64748b"
          }
        })
      ]
    });

    editorView = new EditorView({
      state,
      parent: editorContainer
    });
  };

  const handleLanguageChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const nextLanguage = target.value;
    if (nextLanguage === languageId) {
      return;
    }
    languageId = nextLanguage;
    currentCode = starterTemplates[languageId] ?? "";
    buildEditor();
    updateRuntimeVersion();
    clearOutput();
  };

  onMount(() => {
    buildEditor();
    updateRuntimeVersion();
  });
</script>

<div class="space-y-6">
  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <h1 class="text-3xl font-heading font-bold">AI Sandbox</h1>
      <p class="text-muted-foreground mt-1">Piston 云执行引擎：Rust / Go / Node.js / Python</p>
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <div class="relative">
        <select
          class="appearance-none bg-slate-900/80 border border-border text-sm text-slate-200 rounded-lg px-3 py-2 pr-8 focus:outline-none"
          on:change={handleLanguageChange}
          value={languageId}
        >
          {#each languageOptions as option}
            <option value={option.id}>{option.label}</option>
          {/each}
        </select>
        <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500">⌄</span>
      </div>
      <button
        class="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-60"
        on:click={runCode}
        disabled={isRunning}
      >
        <Play size={18} />
        <span>{isRunning ? "Running" : "Run Environment"}</span>
      </button>
      <button
        class="px-3 py-2 border border-border rounded-lg text-sm text-slate-200 hover:bg-slate-800/80 transition-colors flex items-center gap-2 disabled:opacity-60"
        on:click={stopRun}
        disabled={!isRunning}
      >
        <Square size={14} />
        <span>Stop</span>
      </button>
      <button
        class="px-3 py-2 border border-border rounded-lg text-sm text-slate-200 hover:bg-slate-800/80 transition-colors flex items-center gap-2"
        on:click={resetTemplate}
      >
        <RotateCcw size={14} />
        <span>Reset</span>
      </button>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
    <div class="lg:col-span-2 rounded-2xl border border-border bg-slate-950/50 flex flex-col overflow-hidden">
      <div class="flex items-center justify-between px-4 py-2 border-b border-border bg-slate-900/50">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          <span class="ml-2 text-xs text-muted-foreground font-mono">
            {getLanguageOption(languageId).fileName}
          </span>
        </div>
        <div class="flex items-center gap-3 text-xs text-muted-foreground">
          <Code size={14} />
          <span>{getLanguageOption(languageId).label}</span>
          <span>{runtimeVersion}</span>
        </div>
      </div>
      <div class="flex-1 p-4" bind:this={editorContainer}></div>
    </div>

    <div class="rounded-2xl border border-border bg-slate-900/50 flex flex-col overflow-hidden">
      <div class="px-4 py-2 border-b border-border bg-slate-900/80 flex items-center justify-between">
        <div class="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase">
          <Terminal size={14} />
          <span>Console Output</span>
        </div>
        <button
          class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
          on:click={copyOutput}
        >
          <Copy size={12} />
          <span>Copy</span>
        </button>
      </div>
      <div class="flex-1 p-4 space-y-3">
        <div>
          <label class="text-xs uppercase text-slate-500">stdin</label>
          <textarea
            class="mt-2 w-full h-20 bg-slate-950/60 border border-border rounded-lg p-2 text-xs font-mono text-slate-200 focus:outline-none"
            bind:value={stdinValue}
            placeholder="Optional input for stdin"
          ></textarea>
        </div>
        <div class="flex-1 min-h-[200px] rounded-lg border border-border bg-slate-950/50 p-3 font-mono text-xs text-slate-200 overflow-auto">
          {#if outputLines.length === 0}
            <p class="text-slate-500">Output will appear here after run.</p>
          {:else}
            {#each outputLines as line}
              <div>{line}</div>
            {/each}
          {/if}
        </div>
        {#if lastRunMeta}
          <p class="text-[11px] text-slate-500">{lastRunMeta}</p>
        {/if}
      </div>
    </div>
  </div>
</div>
