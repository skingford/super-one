<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	variant?: "primary" | "secondary" | "ghost" | "danger";
	size?: "sm" | "md" | "lg";
	disabled?: boolean;
	class?: string;
	onclick?: () => void;
	children: Snippet;
}

let {
	variant = "primary",
	size = "md",
	disabled = false,
	class: className = "",
	onclick,
	children,
}: Props = $props();

const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-mono font-medium tracking-tight
    transition-all duration-200 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]
  `;

const variants = {
	primary: `
      bg-[var(--color-accent)] text-[var(--color-background)]
      hover:brightness-110 active:brightness-95
      shadow-[0_0_20px_rgba(0,255,204,0.3)]
    `,
	secondary: `
      bg-[var(--color-surface-elevated)] text-[var(--color-text)]
      border border-[var(--color-border)]
      hover:bg-[var(--color-border)] hover:border-[var(--color-text-subtle)]
    `,
	ghost: `
      bg-transparent text-[var(--color-text-muted)]
      hover:text-[var(--color-text)] hover:bg-[var(--color-surface-elevated)]
    `,
	danger: `
      bg-[var(--color-danger)] text-white
      hover:brightness-110 active:brightness-95
    `,
};

const sizes = {
	sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)]",
	md: "h-10 px-4 text-sm rounded-[var(--radius-md)]",
	lg: "h-12 px-6 text-base rounded-[var(--radius-md)]",
};
</script>

<button
  type="button"
  class="{baseStyles} {variants[variant]} {sizes[size]} {className}"
  {disabled}
  {onclick}
>
  {@render children()}
</button>
