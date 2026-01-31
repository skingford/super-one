<script lang="ts">
  interface Props {
    type?: 'text' | 'number' | 'url' | 'email';
    value?: string | number;
    placeholder?: string;
    disabled?: boolean;
    class?: string;
    oninput?: (e: Event) => void;
  }

  let {
    type = 'text',
    value = $bindable(''),
    placeholder = '',
    disabled = false,
    class: className = '',
    oninput
  }: Props = $props();
</script>

<input
  {type}
  bind:value
  {placeholder}
  {disabled}
  {oninput}
  class="
    w-full
    h-11
    bg-[var(--color-surface-elevated)]
    border border-[var(--color-border)]
    rounded-[var(--radius-md)]
    px-4
    font-mono text-sm
    text-[var(--color-text)]
    placeholder:text-[var(--color-text-subtle)]
    focus:outline-none focus:border-[var(--color-accent)]
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
    {className}
  "
/>
