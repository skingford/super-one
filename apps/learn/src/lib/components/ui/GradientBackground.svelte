<script lang="ts">
  import { cn } from "$lib/utils/cn";

  interface Props {
    class?: string;
  }

  let { class: className = "" }: Props = $props();
</script>

<div class={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
  <!-- Base dark background -->
  <div class="absolute inset-0 bg-[#0a0a0b]"></div>

  <!-- Animated gradient orbs -->
  <div
    class="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full opacity-30 blur-[120px] animate-float-slow"
    style="background: radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%);"
  ></div>

  <div
    class="absolute -bottom-[30%] -right-[20%] w-[70%] h-[70%] rounded-full opacity-25 blur-[100px] animate-float-medium"
    style="background: radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%);"
  ></div>

  <div
    class="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[80px] animate-float-fast"
    style="background: radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%);"
  ></div>

  <!-- Subtle grid pattern overlay -->
  <div
    class="absolute inset-0 opacity-[0.03]"
    style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"
  ></div>

  <!-- Noise texture -->
  <div class="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-noise"></div>
</div>

<style>
  @keyframes float-slow {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(5deg); }
    66% { transform: translate(-20px, 20px) rotate(-5deg); }
  }

  @keyframes float-medium {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-40px, -20px) rotate(-3deg); }
  }

  @keyframes float-fast {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(20px, 10px); }
    50% { transform: translate(-10px, 30px); }
    75% { transform: translate(-30px, -10px); }
  }

  :global(.animate-float-slow) {
    animation: float-slow 20s ease-in-out infinite;
  }

  :global(.animate-float-medium) {
    animation: float-medium 15s ease-in-out infinite;
  }

  :global(.animate-float-fast) {
    animation: float-fast 10s ease-in-out infinite;
  }

  .bg-noise {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }
</style>
